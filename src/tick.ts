import { getState, dispatch, computePlayerRank } from './state'

let lastTick: number | null = null

export function resetTick() {
  lastTick = null
}

export function tick() {
  const now = performance.now()
  if (lastTick === null) {
    lastTick = now
    return
  }
  const delta = now - lastTick
  lastTick = now

  const state = getState()
  if (state.shiftOver) return

  dispatch({ type: 'TICK', deltaMs: delta })

  const s = getState()
  const elapsed = s.shiftElapsed

  // Spawn pending PRs
  const newPRs = s.pendingQueue.filter(pr => pr.spawnAt <= elapsed)
  if (newPRs.length > 0) {
    for (const pr of newPRs) {
      s.queue.push(pr)
    }
    s.pendingQueue = s.pendingQueue.filter(pr => pr.spawnAt > elapsed)
    if (!s.currentPRId && s.queue.length > 0) {
      s.currentPRId = s.queue[0].id
    }
  }

  // Spawn pending Slack messages
  const newSlack = s.pendingSlack.filter(m => m.spawnAt <= elapsed)
  if (newSlack.length > 0) {
    newSlack.forEach(m => { if (m.id.startsWith('followup-')) console.log('[TICK] spawning follow-up', m.id, 'channel:', m.channel) })
    s.slack.push(...newSlack)
    s.pendingSlack = s.pendingSlack.filter(m => m.spawnAt > elapsed)
  }

  // Spawn pending notifications
  const newNotifs = s.pendingNotifications.filter(n => n.spawnAt <= elapsed)
  if (newNotifs.length > 0) {
    s.notifications.push(...newNotifs)
    s.pendingNotifications = s.pendingNotifications.filter(n => n.spawnAt > elapsed)
  }

  // Auto-dismiss notifications + countdown escalation
  for (const notif of [...s.notifications]) {
    const age = elapsed - notif.spawnAt
    if (notif.countdownMs != null && age >= notif.countdownMs) {
      dispatch({ type: 'DISMISS_NOTIFICATION', id: notif.id })
      s.notifications.push({
        id: `${notif.id}-escalated`,
        spawnAt: elapsed,
        kind: 'pagerduty',
        title: 'PagerDuty — P0 ESCALATED',
        body: 'dialysis-monitor P0 not acknowledged. Escalating to VP Engineering. All on-call engineers paged.',
        dismissAfterMs: 20000,
      })
    } else if (notif.dismissAfterMs && age > notif.dismissAfterMs) {
      dispatch({ type: 'DISMISS_NOTIFICATION', id: notif.id })
    }
  }

  // Spawn pending news
  const newNews = s.pendingNews.filter(n => n.spawnAt <= elapsed)
  if (newNews.length > 0) {
    s.news.push(...newNews)
    s.pendingNews = s.pendingNews.filter(n => n.spawnAt > elapsed)
  }

  // Drift NPC ranks (skip laid-off — their score is frozen at termination)
  const elapsedMin = elapsed / 60000
  for (const npc of s.npcs) {
    if (npc.active && !npc.laidOff) {
      npc.approves = Math.floor(npc.approveRatePerMin * elapsedMin)
    }
  }

  // Lay off bottom 2 engineers at 12:00 PM display (4/9 of shift elapsed)
  const LAYOFF_AT_MS = Math.round(4 / 9 * 8 * 60 * 1000)
  if (elapsed >= LAYOFF_AT_MS && !s.layoffsTriggered) {
    s.layoffsTriggered = true
    const eligible = s.npcs.filter(n => n.active && !n.laidOff && n.id !== 'engineer-9000')
    eligible.sort((a, b) => a.approves - b.approves)
    const toLay = eligible.slice(0, 2)
    for (const npc of toLay) {
      npc.laidOff = true
    }
    const names = toLay.map(n => n.name).join(' and ')
    const shortNames = toLay.map(n => n.name.split(' ')[0]).join(' and ')
    s.news.push({
      id: 'news-layoffs',
      spawnAt: elapsed,
      headline: `🔴 ANNOUNCEMENT: ${names} has been let go as part of a strategic realignment. Positions eliminated effective immediately.`,
    })
    s.notifications.push({
      id: 'notif-layoff-it',
      spawnAt: elapsed,
      kind: 'security',
      title: 'IT Provisioning',
      body: `Accounts deactivated: ${names}. All system access revoked per HR. Redirect any pending handoffs to your manager.`,
      dismissAfterMs: 18000,
    })
    s.pendingSlack.push({
      id: 'slack-layoff-boss',
      spawnAt: elapsed + 8000,
      channel: 'DM: Manager',
      sender: 'bill_lumbergh',
      body: `Yeaaah so I wanted to loop you in — we had to make some difficult decisions today around headcount. ${shortNames} are no longer with the company, effective immediately. Going forward it'd be reaaally great if your velocity reflected the, uh, increased opportunity. Calibration is this afternoon. Mmmkay?`,
      prefersUrgent: false,
    })

    // Fire the player immediately if they're in the PIP zone at noon
    const activeNpcs = s.npcs.filter(n => n.active)
    const laidOffCount = s.npcs.filter(n => n.laidOff).length
    const totalEntries = activeNpcs.length + 1 // +1 for player
    const dangerCutoff = Math.max(0, totalEntries - 3 - laidOffCount)
    const freshRank = computePlayerRank(s)
    if (freshRank - 1 >= dangerCutoff) {
      dispatch({ type: 'END_SHIFT', ending: 'pip-fired' })
      return
    }
  }

  // Activate Brad++ 🤖 at 2:30
  if (elapsed >= 2.5 * 60 * 1000) {
    const e9k = s.npcs.find(n => n.id === 'engineer-9000')
    if (e9k && !e9k.active) {
      e9k.active = true
    }
  }

  // Trigger incident unconditionally after 5 reviews
  if (s.reviewed.length >= 5 && !s.incidentActive && !s.incidentResolved) {
    s.incidentActive = true
    s.incidentStartedAt = elapsed
  }

  // Incident: degrade uptime and accumulate patient deaths
  if (s.incidentActive && s.incidentStartedAt !== null) {
    s.uptimePercent = Math.max(18, s.uptimePercent - (delta / 1000) * 1.4)
    const incidentDurationMs = elapsed - s.incidentStartedAt
    s.patientDeaths = Math.max(s.patientDeaths, Math.floor(incidentDurationMs / 7000))

    // Inject incident alert into news feed once
    const alertId = 'news-incident-active'
    if (!s.news.find(n => n.id === alertId)) {
      s.news.unshift({
        id: alertId,
        spawnAt: elapsed,
        headline: '🚨 CRITICAL: dialysis-monitor.prod OFFLINE — 847 patients in active sessions — INCIDENT P0 — ENGINEERS RESPOND NOW',
      })
    }
  }

  // Uptime recovery after incident resolved
  if (s.incidentResolved && s.uptimePercent < 99.5) {
    s.uptimePercent = Math.min(100, s.uptimePercent + (delta / 1000) * 0.35)
  }

  // Recompute player rank
  s.playerRank = computePlayerRank(s)
}

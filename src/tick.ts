import { getState, dispatch, computePlayerRank } from './state'

let lastTick = performance.now()

export function tick() {
  const now = performance.now()
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
    s.slack.push(...newSlack)
    s.pendingSlack = s.pendingSlack.filter(m => m.spawnAt > elapsed)
  }

  // Spawn pending notifications
  const newNotifs = s.pendingNotifications.filter(n => n.spawnAt <= elapsed)
  if (newNotifs.length > 0) {
    s.notifications.push(...newNotifs)
    s.pendingNotifications = s.pendingNotifications.filter(n => n.spawnAt > elapsed)
  }

  // Auto-dismiss notifications
  for (const notif of [...s.notifications]) {
    if (notif.dismissAfterMs) {
      const spawnedAt = notif.spawnAt
      if (elapsed - spawnedAt > notif.dismissAfterMs) {
        dispatch({ type: 'DISMISS_NOTIFICATION', id: notif.id })
      }
    }
  }

  // Spawn pending news
  const newNews = s.pendingNews.filter(n => n.spawnAt <= elapsed)
  if (newNews.length > 0) {
    s.news.push(...newNews)
    s.pendingNews = s.pendingNews.filter(n => n.spawnAt > elapsed)
  }

  // Drift NPC ranks
  const elapsedMin = elapsed / 60000
  for (const npc of s.npcs) {
    if (npc.active) {
      npc.approves = Math.floor(npc.approveRatePerMin * elapsedMin)
    }
  }

  // Activate Brad++ 🤖 at 2:30
  if (elapsed >= 2.5 * 60 * 1000) {
    const e9k = s.npcs.find(n => n.id === 'engineer-9000')
    if (e9k && !e9k.active) {
      e9k.active = true
    }
  }

  // Recompute player rank
  s.playerRank = computePlayerRank(s)
}

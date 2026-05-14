import { GameState, dispatch } from '../state'

const STEPS = [
  {
    instruction: 'Step 1 of 3 — Page the on-call engineering team',
    buttons: [
      { id: 'w0a', label: '📊  Update the Jira P0 ticket',         correct: false },
      { id: 'w0b', label: '🤖  Escalate to Brad++ (AI system)',     correct: false },
      { id: 'c0',  label: '📟  Page on-call: trigger PagerDuty',    correct: true  },
      { id: 'w0c', label: '📧  Draft stakeholder status update',    correct: false },
    ],
  },
  {
    instruction: 'Step 2 of 3 — Roll back the offending deployment',
    buttons: [
      { id: 'w1a', label: '⏩  kubectl apply -f latest.yaml',            correct: false },
      { id: 'w1b', label: '🗑️  kubectl delete pod --all --force',         correct: false },
      { id: 'c1',  label: '⏪  kubectl rollback deployment/dialysis-monitor', correct: true },
    ],
  },
  {
    instruction: 'Step 3 of 3 — Confirm patient monitoring is back online',
    buttons: [
      { id: 'w2a', label: '📝  Schedule post-mortem in Confluence',     correct: false },
      { id: 'c2',  label: '✅  Verify: kubectl get pods | grep Running', correct: true  },
    ],
  },
]

const LOG_LINES = [
  { level: 'fatal', text: 'FATAL  dialysis-monitor[0] OOMKilled — memory.limit 4Gi exceeded' },
  { level: 'error', text: 'ERROR  renal-alert-service ECONNREFUSED 10.96.14.22:8080' },
  { level: 'crit',  text: 'CRIT   patient-monitoring-api: all 3 replicas returning 503' },
  { level: 'error', text: 'ERROR  HeartbeatMonitor thread terminated: unhandled OOM exception' },
  { level: 'warn',  text: 'WARN   247 active patient sessions invalidated — session data lost' },
  { level: 'fatal', text: 'FATAL  DynaFlowScheduler segfault at 0x00007f3b4c1a2340 (core dumped)' },
  { level: 'error', text: 'ERROR  medication-alert-service: 31 pending patient alerts dropped' },
  { level: 'crit',  text: 'CRIT   dialysis-safety-lock FAILED TO ACQUIRE — sessions unmonitored' },
  { level: 'error', text: 'ERROR  emergency-escalation-queue OFFLINE — no failover configured' },
  { level: 'error', text: 'ERROR  143 monitoring alarms purged (ring buffer overflow)' },
  { level: 'fatal', text: 'FATAL  vitals-stream-processor: remote host closed connection' },
  { level: 'warn',  text: 'WARN   Brad++ PR approval throughput: 100% nominal (unrelated to incident)' },
]

let _prevKey = ''
let _resolveScheduled = false

export function renderIncidentModal(container: HTMLElement, state: GameState): void {
  if (!state.incidentActive) {
    if (container.innerHTML) container.innerHTML = ''
    _prevKey = ''
    _resolveScheduled = false
    return
  }

  const step = state.incidentStep
  const downtimeS = state.incidentStartedAt !== null
    ? Math.floor((state.shiftElapsed - state.incidentStartedAt) / 1000)
    : 0
  const mm = Math.floor(downtimeS / 60)
  const ss = String(downtimeS % 60).padStart(2, '0')
  const downtimeStr = `${mm}:${ss}`
  const uptimeClass = state.uptimePercent < 50 ? 'critical' : state.uptimePercent < 80 ? 'degraded' : ''

  // Resolved screen
  if (step >= 3) {
    if (!_resolveScheduled) {
      _resolveScheduled = true
      setTimeout(() => dispatch({ type: 'CLOSE_INCIDENT' }), 2200)
    }
    if (_prevKey !== 'resolved') {
      _prevKey = 'resolved'
      container.innerHTML = `
        <div class="incident-overlay incident-overlay-resolved">
          <div class="incident-modal">
            <div class="incident-resolved-screen">
              <div class="incident-resolved-icon">✅</div>
              <div class="incident-resolved-title">INCIDENT RESOLVED</div>
              <div class="incident-resolved-stats">
                Total downtime: ${downtimeStr} &nbsp;·&nbsp;
                Patient deaths attributed to outage: <strong>${state.patientDeaths}</strong>
              </div>
              <div class="incident-resolved-footer">
                Post-mortem required within 24 hours per SLA-7.3 &nbsp;·&nbsp;
                Legal has been notified.
              </div>
            </div>
          </div>
        </div>
      `
    }
    return
  }

  const structKey = String(step)

  // Update live stats in-place when structure hasn't changed
  const uptimeEl = container.querySelector('.istat-val.uptime') as HTMLElement | null
  const deathsEl = container.querySelector('.istat-val.deaths') as HTMLElement | null
  const downtimeEl = container.querySelector('.istat-val.downtime') as HTMLElement | null
  const termEl = container.querySelector('#incident-log') as HTMLElement | null

  if (structKey === _prevKey && uptimeEl && deathsEl && downtimeEl) {
    uptimeEl.textContent = `${state.uptimePercent.toFixed(1)}%`
    uptimeEl.className = `istat-val uptime ${uptimeClass}`
    deathsEl.textContent = String(state.patientDeaths)
    downtimeEl.textContent = downtimeStr

    if (termEl) {
      const visibleCount = Math.min(Math.floor(downtimeS * 1.2) + 1, LOG_LINES.length)
      const currentCount = termEl.querySelectorAll('.ilog-line').length
      for (let i = currentCount; i < visibleCount; i++) {
        const line = LOG_LINES[i]
        const el = document.createElement('span')
        el.className = `ilog-line ilog-${line.level}`
        el.textContent = line.text
        termEl.appendChild(el)
        termEl.scrollTop = termEl.scrollHeight
      }
    }
    return
  }
  _prevKey = structKey

  const currentStep = STEPS[step]

  const runbookHtml = STEPS.map((s, i) => {
    const cls = i < step ? 'rstep-done' : i === step ? 'rstep-active' : 'rstep-pending'
    const numContent = i < step ? '✓' : String(i + 1)
    return `<div class="rstep ${cls}">
      <span class="rstep-num">${numContent}</span>
      <span class="rstep-text">${s.instruction.replace(/^Step \d of \d — /, '')}</span>
    </div>`
  }).join('')

  const buttonsHtml = currentStep.buttons.map(btn =>
    `<button class="incident-btn" data-iid="${btn.id}" data-correct="${btn.correct}">${btn.label}</button>`
  ).join('')

  container.innerHTML = `
    <div class="incident-overlay">
      <div class="incident-modal">
        <div class="incident-header">
          <span class="incident-alarm-icon">🚨</span>
          <h1 class="incident-title">CRITICAL SYSTEM FAILURE</h1>
          <p class="incident-subtitle">dialysis-monitor.prod OFFLINE — patient sessions unmonitored</p>
        </div>

        <div class="incident-stats-row">
          <div class="istat">
            <div class="istat-val uptime ${uptimeClass}">${state.uptimePercent.toFixed(1)}%</div>
            <div class="istat-lbl">SYSTEM UPTIME</div>
          </div>
          <div class="istat istat-deaths">
            <div class="istat-val deaths">${state.patientDeaths}</div>
            <div class="istat-lbl">PATIENT DEATHS</div>
          </div>
          <div class="istat">
            <div class="istat-val downtime">${downtimeStr}</div>
            <div class="istat-lbl">DOWNTIME</div>
          </div>
        </div>

        <div class="incident-terminal">
          <div id="incident-log"></div>
        </div>

        <div class="incident-runbook">
          <div class="incident-runbook-title">INCIDENT RUNBOOK v2.3.1 — execute in order</div>
          ${runbookHtml}
        </div>

        <div class="incident-actions-area">
          <div class="incident-actions-label">${currentStep.instruction}</div>
          <div class="incident-buttons">
            ${buttonsHtml}
          </div>
        </div>
      </div>
    </div>
  `

  // Seed initial log lines
  const logEl = container.querySelector('#incident-log') as HTMLElement
  if (logEl) {
    const visibleCount = Math.min(Math.floor(downtimeS * 1.2) + 1, LOG_LINES.length)
    for (let i = 0; i < visibleCount; i++) {
      const line = LOG_LINES[i]
      const el = document.createElement('span')
      el.className = `ilog-line ilog-${line.level}`
      el.textContent = line.text
      logEl.appendChild(el)
    }
    logEl.scrollTop = logEl.scrollHeight
  }

  // Wire button clicks
  container.querySelectorAll('.incident-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = (btn as HTMLElement).dataset.correct === 'true'
      if (isCorrect) {
        dispatch({ type: 'INCIDENT_ADVANCE_STEP' })
      } else {
        dispatch({ type: 'INCIDENT_WRONG_CLICK' })
        btn.classList.add('ibtn-shake')
        setTimeout(() => btn.classList.remove('ibtn-shake'), 400)
      }
    })
  })
}

import { GameState, dispatch, Notification } from '../state'

function kindIcon(kind: Notification['kind']): string {
  const icons: Record<string, string> = {
    pagerduty: '🚨',
    calendar: '📅',
    linkedin: '💼',
    security: '🔒',
    jira: '🎫',
    expense: '💵',
  }
  return icons[kind] ?? '🔔'
}

function kindLabel(kind: Notification['kind']): string {
  const labels: Record<string, string> = {
    pagerduty: 'PagerDuty',
    calendar: 'Calendar',
    linkedin: 'LinkedIn',
    security: 'Security',
    jira: 'Jira',
    expense: 'Concur',
  }
  return labels[kind] ?? kind
}

let _prevKey = ''

function countdownHtml(notif: Notification, shiftElapsed: number): string {
  if (notif.countdownMs == null) return ''
  const remaining = Math.max(0, notif.countdownMs - (shiftElapsed - notif.spawnAt))
  const secs = Math.ceil(remaining / 1000)
  const pct = (remaining / notif.countdownMs) * 100
  return `
    <div class="notif-countdown">
      <div class="notif-countdown-bar" style="width:${pct.toFixed(1)}%"></div>
      <span class="notif-countdown-label">ESCALATES IN ${secs}s</span>
    </div>`
}

export function renderNotifications(container: HTMLElement, state: GameState): void {
  const key = state.notifications.map(n => {
    if (n.countdownMs != null) {
      const secs = Math.max(0, Math.ceil((n.countdownMs - (state.shiftElapsed - n.spawnAt)) / 1000))
      return `${n.id}:${secs}`
    }
    return n.id
  }).join(',')
  if (key === _prevKey) return
  _prevKey = key

  if (state.notifications.length === 0) {
    container.innerHTML = ''
    return
  }

  const toasts = state.notifications.map(notif => `
    <div class="notification-toast" data-notif-id="${notif.id}" data-kind="${notif.kind}">
      <div class="notif-body">
        <div class="notif-header">
          <span aria-hidden="true">${kindIcon(notif.kind)}</span>
          <span class="notif-source">${kindLabel(notif.kind)}</span>
        </div>
        <p class="notif-title">${notif.title}</p>
        <p class="notif-text">${notif.body}</p>
        ${countdownHtml(notif, state.shiftElapsed)}
      </div>
      <button class="notif-close notif-close-btn" data-notif-id="${notif.id}" aria-label="Dismiss ${kindLabel(notif.kind)} notification">×</button>
    </div>
  `).join('')

  container.innerHTML = `
    <div class="notifications-container">
      ${toasts}
    </div>
  `

  container.querySelectorAll('.notif-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.notifId!
      dispatch({ type: 'DISMISS_NOTIFICATION', id })
    })
  })
}

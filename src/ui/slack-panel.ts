import { GameState, dispatch, SlackMessage } from '../state'

const CHANNELS_LIST = ['#eng-general', '#growth-launch', '#random']
const DMS_LIST = ['DM: Brad', 'DM: Manager']
const ALL_CHANNELS = [...CHANNELS_LIST, ...DMS_LIST]

const CHANNEL_DESCRIPTIONS: Record<string, string> = {
  '#eng-general': 'Engineering-wide · 847 members',
  '#growth-launch': 'Growth launches · 34 members',
  '#random': 'Non-work banter · 1,203 members',
  'DM: Brad': 'Brad Chadwick · Senior Engineer',
  'DM: Manager': 'Engineering Manager',
}

function getChannelMessages(slack: SlackMessage[], channel: string): SlackMessage[] {
  return slack.filter(m => m.channel === channel)
}

function getUnreadCount(slack: SlackMessage[], channel: string): number {
  return slack.filter(m => m.channel === channel).length
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return name.slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function nameToColor(name: string): string {
  const colors = ['#0969da', '#8250df', '#1a7f37', '#9a6700', '#0550ae', '#e36209', '#cf222e', '#1b7fc4']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff
  return colors[Math.abs(hash) % colors.length]
}

function formatSlackTime(spawnAt: number): string {
  const startMinutes = 8 * 60
  const elapsedMinutes = Math.floor(spawnAt / 60000)
  const totalMinutes = startMinutes + elapsedMinutes
  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60
  const h12 = hours % 12 || 12
  const ampm = hours < 12 ? 'AM' : 'PM'
  return `${h12}:${String(mins).padStart(2, '0')} ${ampm}`
}

function isDM(channel: string): boolean {
  return channel.startsWith('DM:')
}

function dmName(channel: string): string {
  return channel.replace('DM: ', '')
}

let _prevKey = ''

export function renderSlackPanel(container: HTMLElement, state: GameState): void {
  const msgKey = state.slack.map(m => `${m.spawnAt}:${m.channel}`).join(',')
  const key = `${msgKey}:${state.slackOpen}:${state.slackActiveChannel ?? ''}`
  if (key === _prevKey) return
  _prevKey = key

  const totalUnread = state.slack.length

  const channelRows = CHANNELS_LIST.map(ch => {
    const count = getUnreadCount(state.slack, ch)
    const hasUrgent = state.slack.some(m => m.channel === ch && m.prefersUrgent)
    const badge = count > 0 ? `<span class="unread-badge">${count}</span>` : ''
    return `
      <div class="channel-row ${hasUrgent ? 'channel-urgent' : ''} ${count > 0 ? 'channel-unread' : ''}" data-channel="${ch}" role="button" tabindex="0">
        <span class="channel-icon">#</span>
        <span class="channel-name">${ch.slice(1)}</span>
        ${badge}
      </div>
    `
  }).join('')

  const dmRows = DMS_LIST.map(ch => {
    const count = getUnreadCount(state.slack, ch)
    const name = dmName(ch)
    const initials = getInitials(name)
    const color = nameToColor(name)
    const badge = count > 0 ? `<span class="unread-badge">${count}</span>` : ''
    return `
      <div class="channel-row ${count > 0 ? 'channel-unread' : ''}" data-channel="${ch}" role="button" tabindex="0">
        <span class="dm-avatar-pill" style="background:${color}">${initials}</span>
        <span class="channel-name">${name}</span>
        ${badge}
      </div>
    `
  }).join('')

  container.innerHTML = `
    <div class="slack-card">
      <div class="slack-card-header">
        <span class="slack-workspace-name">MegaCorp.ly</span>
        ${totalUnread > 0 ? `<span class="slack-unread-total" aria-label="${totalUnread} unread">${totalUnread}</span>` : ''}
      </div>
      <div class="slack-channel-list">
        <div class="slack-section-label">Channels</div>
        ${channelRows}
        <div class="slack-section-label" style="margin-top:8px">Direct Messages</div>
        ${dmRows}
      </div>
      <div class="slack-card-footer">
        <span class="slack-status-dot"></span> You — Active
      </div>
    </div>

    ${state.slackOpen ? renderSlackModal(state) : ''}
  `

  container.querySelectorAll('.channel-row').forEach(row => {
    const open = () => {
      const channel = (row as HTMLElement).dataset.channel!
      dispatch({ type: 'OPEN_SLACK', channel })
    }
    row.addEventListener('click', open)
    row.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
        e.preventDefault()
        open()
      }
    })
  })

  if (state.slackOpen) {
    container.querySelector('#slack-modal-close')?.addEventListener('click', () => dispatch({ type: 'CLOSE_SLACK' }))

    container.querySelector('.slack-overlay')?.addEventListener('click', (e) => {
      if (e.target === container.querySelector('.slack-overlay')) dispatch({ type: 'CLOSE_SLACK' })
    })

    container.querySelectorAll('.slack-modal-channel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const channel = (btn as HTMLElement).dataset.channel!
        dispatch({ type: 'OPEN_SLACK', channel })
      })
    })
  }
}

function renderSlackModal(state: GameState): string {
  const activeChannel = state.slackActiveChannel ?? ALL_CHANNELS[0]
  const messages = getChannelMessages(state.slack, activeChannel)
  const description = CHANNEL_DESCRIPTIONS[activeChannel] ?? ''
  const channelIsDM = isDM(activeChannel)
  const channelDisplayName = channelIsDM ? dmName(activeChannel) : activeChannel
  const channelIcon = channelIsDM ? '●' : '#'

  const sidebarChannels = CHANNELS_LIST.map(ch => {
    const count = getUnreadCount(state.slack, ch)
    const isActive = ch === activeChannel
    const badge = count > 0
      ? `<span class="unread-badge" style="font-size:11px;padding:0 5px;min-width:18px">${count}</span>`
      : ''
    return `
      <button class="slack-modal-channel-btn ${isActive ? 'slack-modal-channel-active' : ''} ${count > 0 && !isActive ? 'slack-modal-channel-unread' : ''}" data-channel="${ch}">
        <span class="slack-modal-ch-icon">#</span>
        <span class="slack-modal-ch-name">${ch.slice(1)}</span>
        ${badge}
      </button>
    `
  }).join('')

  const sidebarDMs = DMS_LIST.map(ch => {
    const count = getUnreadCount(state.slack, ch)
    const isActive = ch === activeChannel
    const name = dmName(ch)
    const initials = getInitials(name)
    const color = nameToColor(name)
    const badge = count > 0
      ? `<span class="unread-badge" style="font-size:11px;padding:0 5px;min-width:18px">${count}</span>`
      : ''
    return `
      <button class="slack-modal-channel-btn ${isActive ? 'slack-modal-channel-active' : ''}" data-channel="${ch}">
        <span class="dm-avatar-pill dm-avatar-pill-sm" style="background:${color}">${initials}</span>
        <span class="slack-modal-ch-name">${name}</span>
        ${badge}
      </button>
    `
  }).join('')

  const messagesHtml = messages.length === 0
    ? '<p class="slack-no-messages">No messages yet.</p>'
    : messages.map(m => {
      const initials = getInitials(m.sender)
      const color = nameToColor(m.sender)
      const time = formatSlackTime(m.spawnAt)
      return `
        <div class="slack-message ${m.prefersUrgent ? 'urgent' : ''}">
          <div class="avatar avatar-lg" style="background:${color}">${initials}</div>
          <div class="slack-message-body">
            <div class="slack-message-meta">
              <span class="slack-sender">${m.sender}</span>
              <span class="slack-timestamp">${time}</span>
            </div>
            <div class="slack-message-text">${m.body}</div>
          </div>
        </div>
      `
    }).join('')

  return `
    <div class="slack-overlay">
      <div class="slack-modal-layout">
        <div class="slack-modal-sidebar">
          <div class="slack-modal-workspace">
            <span>MegaCorp.ly</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="rgba(255,255,255,0.6)" style="flex-shrink:0;margin-left:auto"><path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/></svg>
          </div>
          <div class="slack-modal-channels">
            <div class="slack-modal-section-label">Channels</div>
            ${sidebarChannels}
            <div class="slack-modal-section-label" style="margin-top:8px">Direct Messages</div>
            ${sidebarDMs}
          </div>
          <div class="slack-modal-sidebar-footer">
            <span class="slack-status-dot"></span>
            <span>You — Active</span>
          </div>
        </div>
        <div class="slack-modal-content">
          <div class="slack-modal-channel-header">
            <div class="slack-modal-header-left">
              <span class="slack-header-icon">${channelIcon}</span>
              <span class="slack-header-name">${channelDisplayName}</span>
              ${description ? `<span class="slack-header-desc">${description}</span>` : ''}
            </div>
            <button class="slack-modal-close" id="slack-modal-close" aria-label="Close Slack">×</button>
          </div>
          <div class="slack-messages">
            ${messagesHtml}
          </div>
          <div class="slack-message-input-bar">
            <div class="slack-message-input-inner">
              <span class="slack-input-placeholder">Message ${channelDisplayName}</span>
              <div class="slack-input-icons">
                <span title="Add emoji">😊</span>
                <span title="Attach file">📎</span>
                <span title="Mention">@</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

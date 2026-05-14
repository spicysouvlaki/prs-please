import { GameState, dispatch, SlackMessage, getState } from '../state'
import { getAvatarUrl } from '../content/avatars'

const CHANNELS_LIST = ['#eng-general', '#growth-launch', '#random']
const DMS_SEED = ['DM: Brad', 'DM: Brad++', 'DM: Manager', 'DM: Kip', 'DM: Craig']

const CHANNEL_DESCRIPTIONS: Record<string, string> = {
  '#eng-general': 'Engineering-wide · 847 members',
  '#growth-launch': 'Growth launches · 34 members',
  '#random': 'Non-work banter · 1,203 members',
  'DM: Brad': 'Brad Chadwick · Senior Engineer',
  'DM: Brad++': 'Brad++ 🤖 · AI Engineering Assistant',
  'DM: Manager': 'Engineering Manager',
  'DM: Kip': 'Kip Schlueter · Staff Engineer',
  'DM: Craig': 'Craig Pumphrey · Principal Engineer',
  'DM: Lumbergh + Rachel': 'Group DM · Security Incident',
}

function getDMsList(slack: SlackMessage[]): string[] {
  const seedSet = new Set(DMS_SEED)
  const seen = new Set(DMS_SEED)
  const extra = slack
    .map(m => m.channel)
    .filter(ch => ch.startsWith('DM:') && !seedSet.has(ch))
    .filter(ch => { const novel = !seen.has(ch); if (novel) seen.add(ch); return novel })
  return [...DMS_SEED, ...extra]
}

function getChannelMessages(slack: SlackMessage[], channel: string): SlackMessage[] {
  return slack.filter(m => m.channel === channel)
}

function getUnreadCount(slack: SlackMessage[], channel: string, readChannels: Record<string, number>): number {
  const lastRead = readChannels[channel] ?? -1
  return slack.filter(m => m.channel === channel && m.spawnAt > lastRead).length
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

let _replyCounter = 0

function generateReply(channel: string, shiftElapsed: number): SlackMessage {
  const replyDelay = 1500 + Math.random() * 2500

  const bradReplies = [
    'lol yeah totally, same 👀',
    'haha nice, keep those numbers up 📈',
    'fr fr, calibration is watching 👁️',
    "based. anyway what's your PR count at rn",
    '100%. btw did you see my velocity this morning 📊',
    'lmaooo true. anyway back to the grind',
    "haha fair, i'm still ahead tho 😂",
  ]

  const managerReplies = [
    "Yeaaah, that's going to be really great for the team.",
    "Mmmkay, if you could go ahead and action that, that'd be great.",
    "I'm going to need you to go ahead and circle back on that.",
    "Great, great. Just make sure the numbers look good for calibration. Mmmkay?",
    "Yeaaah so if you could just... go ahead and keep up the velocity, that'd be great.",
    "That'd be terrific. Yeah. If you could just do that. Okay.",
  ]

  const genericReplies = [
    "You're absolutely right!",
    'Great point! Totally agree.',
    'This is a really insightful perspective.',
    'Appreciate you sharing this! Super helpful.',
    'That tracks! Well said.',
    '100% this.',
    'Looping in the relevant stakeholders.',
    "Let's take this to a thread 🧵",
    '+1 great callout',
    'agreed, this is the way',
    "Absolutely, I couldn't have said it better.",
    "Yes, and I think we should leverage that going forward.",
  ]

  let sender: string
  let replies: string[]

  const kipReplies = [
    'haha glad to hear it :) seriously missed having you around',
    'stay strong out there. this queue is no joke today',
    'i hear you. just trying to do good work, you know?',
    "honestly same. it's a lot. let me know if you want to pair on anything",
    'thanks for checking in :) means a lot actually',
  ]

  const craigReplies = [
    "haha yeah, it's a whole vibe honestly",
    "totally — I'm actually going to bring this up in the next ep",
    "wild times. anyway stay hydrated out there",
    "100%, might document this for the show",
    "noted! okay back to the queue I guess lol",
  ]

  if (channel === 'DM: Brad') {
    sender = 'brad'
    replies = bradReplies
  } else if (channel === 'DM: Kip') {
    sender = 'kip'
    replies = kipReplies
  } else if (channel === 'DM: Craig') {
    sender = 'craig'
    replies = craigReplies
  } else if (channel === 'DM: Manager') {
    sender = 'bill_lumbergh'
    replies = managerReplies
  } else if (channel === '#growth-launch') {
    sender = Math.random() < 0.5 ? 'growth-pm' : 'brad'
    replies = genericReplies
  } else if (channel === '#eng-general') {
    const senders = ['chad', 'tanvi', 'karen_staffeng', 'brad']
    sender = senders[Math.floor(Math.random() * senders.length)]
    replies = genericReplies
  } else {
    const senders = ['brad', 'tanvi', 'karen_staffeng']
    sender = senders[Math.floor(Math.random() * senders.length)]
    replies = genericReplies
  }

  return {
    id: `reply-${Date.now()}-${_replyCounter++}`,
    spawnAt: shiftElapsed + replyDelay,
    channel,
    sender,
    body: replies[Math.floor(Math.random() * replies.length)],
  }
}

function sendPlayerMessage(text: string, channel: string) {
  const state = getState()
  const now = state.shiftElapsed

  const playerMessage: SlackMessage = {
    id: `player-${Date.now()}`,
    spawnAt: now,
    channel,
    sender: 'You',
    body: text,
  }

  const reply = generateReply(channel, now)
  dispatch({ type: 'SEND_PLAYER_MESSAGE', message: playerMessage, reply })
}

let _prevKey = ''

export function renderSlackPanel(container: HTMLElement, state: GameState): void {
  // Save input state before potential re-render
  const prevInput = container.querySelector('#slack-compose-input') as HTMLInputElement | null
  const prevValue = prevInput?.value ?? ''
  const prevFocused = document.activeElement === prevInput

  const msgKey = state.slack.map(m => `${m.spawnAt}:${m.channel}`).join(',')
  const readKey = Object.entries(state.readChannels).map(([k, v]) => `${k}=${v}`).join(',')
  const key = `${msgKey}:${state.slackOpen}:${state.slackActiveChannel ?? ''}:${readKey}`
  if (key === _prevKey) return
  _prevKey = key

  const dmsList = getDMsList(state.slack)
  const allChannels = [...CHANNELS_LIST, ...dmsList]
  const totalUnread = allChannels.reduce((sum, ch) => sum + getUnreadCount(state.slack, ch, state.readChannels), 0)

  const sortedChannels = [...CHANNELS_LIST].sort((a, b) => {
    const ca = getUnreadCount(state.slack, a, state.readChannels)
    const cb = getUnreadCount(state.slack, b, state.readChannels)
    return cb - ca
  })

  const channelRows = sortedChannels.map(ch => {
    const count = getUnreadCount(state.slack, ch, state.readChannels)
    const hasUrgent = state.slack.some(m => m.channel === ch && m.prefersUrgent && m.spawnAt > (state.readChannels[ch] ?? -1))
    const badge = count > 0 ? `<span class="unread-badge">${count}</span>` : ''
    return `
      <div class="channel-row ${hasUrgent ? 'channel-urgent' : ''} ${count > 0 ? 'channel-unread' : ''}" data-channel="${ch}" role="button" tabindex="0">
        <span class="channel-icon">#</span>
        <span class="channel-name">${ch.slice(1)}</span>
        ${badge}
      </div>
    `
  }).join('')

  const sortedDMs = [...dmsList].sort((a, b) => {
    const ca = getUnreadCount(state.slack, a, state.readChannels)
    const cb = getUnreadCount(state.slack, b, state.readChannels)
    return cb - ca
  })

  const dmRows = sortedDMs.map(ch => {
    const count = getUnreadCount(state.slack, ch, state.readChannels)
    const name = dmName(ch)
    const initials = getInitials(name)
    const color = nameToColor(name)
    const avatarUrl = getAvatarUrl(name)
    const dmAvatarInner = avatarUrl ? `<img src="${avatarUrl}" alt="${initials}">` : initials
    const badge = count > 0 ? `<span class="unread-badge">${count}</span>` : ''
    return `
      <div class="channel-row ${count > 0 ? 'channel-unread' : ''}" data-channel="${ch}" role="button" tabindex="0">
        <span class="dm-avatar-pill" style="background:${color}">${dmAvatarInner}</span>
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

    ${state.slackOpen ? renderSlackModal(state, dmsList) : ''}
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

    const input = container.querySelector('#slack-compose-input') as HTMLInputElement | null
    if (input) {
      if (prevValue) input.value = prevValue
      if (prevFocused) input.focus()

      input.addEventListener('keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Enter') {
          const text = input.value.trim()
          if (!text) return
          const channel = state.slackActiveChannel ?? allChannels[0]
          input.value = ''
          sendPlayerMessage(text, channel)
        }
      })
    }

    const messagesEl = container.querySelector('.slack-messages')
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight
  }
}

function renderSlackModal(state: GameState, dmsList: string[]): string {
  const activeChannel = state.slackActiveChannel ?? (CHANNELS_LIST[0])
  const messages = getChannelMessages(state.slack, activeChannel)
  const description = CHANNEL_DESCRIPTIONS[activeChannel] ?? ''
  const channelIsDM = isDM(activeChannel)
  const channelDisplayName = channelIsDM ? dmName(activeChannel) : activeChannel
  const channelIcon = channelIsDM ? '●' : '#'

  const sortedModalChannels = [...CHANNELS_LIST].sort((a, b) => {
    const ca = getUnreadCount(state.slack, a, state.readChannels)
    const cb = getUnreadCount(state.slack, b, state.readChannels)
    return cb - ca
  })

  const sidebarChannels = sortedModalChannels.map(ch => {
    const count = getUnreadCount(state.slack, ch, state.readChannels)
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

  const sortedModalDMs = [...dmsList].sort((a, b) => {
    const ca = getUnreadCount(state.slack, a, state.readChannels)
    const cb = getUnreadCount(state.slack, b, state.readChannels)
    return cb - ca
  })

  const sidebarDMs = sortedModalDMs.map(ch => {
    const count = getUnreadCount(state.slack, ch, state.readChannels)
    const isActive = ch === activeChannel
    const name = dmName(ch)
    const initials = getInitials(name)
    const color = nameToColor(name)
    const avatarUrl = getAvatarUrl(name)
    const dmAvatarInner = avatarUrl ? `<img src="${avatarUrl}" alt="${initials}">` : initials
    const badge = count > 0
      ? `<span class="unread-badge" style="font-size:11px;padding:0 5px;min-width:18px">${count}</span>`
      : ''
    return `
      <button class="slack-modal-channel-btn ${isActive ? 'slack-modal-channel-active' : ''}" data-channel="${ch}">
        <span class="dm-avatar-pill dm-avatar-pill-sm" style="background:${color}">${dmAvatarInner}</span>
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
      const isPlayer = m.sender === 'You'
      const avatarUrl = getAvatarUrl(m.sender)
      const msgAvatarInner = avatarUrl ? `<img src="${avatarUrl}" alt="${initials}">` : initials
      return `
        <div class="slack-message ${m.prefersUrgent ? 'urgent' : ''} ${isPlayer ? 'slack-message-player' : ''}">
          <div class="avatar avatar-lg" style="background:${color}">${msgAvatarInner}</div>
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
              <input
                type="text"
                id="slack-compose-input"
                class="slack-compose-input"
                placeholder="Message ${channelDisplayName}"
                autocomplete="off"
              />
              <div class="slack-input-icons">
                <span title="Add emoji">😊</span>
                <span title="Attach file">📎</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

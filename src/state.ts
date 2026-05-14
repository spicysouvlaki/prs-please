import { ALL_PRS } from './content/prs'
import { ALL_NEWS } from './content/news'
import { ALL_SLACK } from './content/slack'
import { ALL_NOTIFICATIONS } from './content/notifications'
import { SEED_NPCS } from './content/npcs'

export type TeamId = 'platform' | 'growth' | 'ai-foundations' | 'devx' | 'security' | 'partnerships' | 'self'
export type EndingId = 'promoted-complicit' | 'the-catch' | 'bottom-of-stack'

export type Document = {
  id: string
  label: string
  bodyHtml: string
}

export type PR = {
  id: string
  spawnAt: number
  title: string
  author: string
  team: TeamId
  branch: string
  description: string
  diffHtml: string
  documents: Document[]
  category: 'tutorial' | 'normal' | 'ai-slop' | 'cross-team-ask' | 'attack'
  truth: 'safe' | 'attack'
  tells: string[]
}

export type NewsItem = {
  id: string
  spawnAt: number
  headline: string
  flavor?: string
}

export type SlackMessage = {
  id: string
  spawnAt: number
  channel: string
  sender: string
  body: string
  prefersUrgent?: boolean
}

export type Notification = {
  id: string
  spawnAt: number
  kind: 'pagerduty' | 'calendar' | 'linkedin' | 'security' | 'jira' | 'expense'
  title: string
  body: string
  dismissAfterMs?: number
}

export type NPC = {
  id: string
  name: string
  vibe: string
  approveRatePerMin: number
  approves: number
  active: boolean
}

export type ReviewRecord = {
  prId: string
  action: 'approve' | 'request-changes'
  atMs: number
}

export type GameState = {
  shiftStartedAt: number
  shiftElapsed: number
  shiftDuration: number
  shiftOver: boolean

  approves: number
  denies: number
  attackApproved: boolean
  attackCaught: boolean
  crossTeamAskApproved: boolean

  queue: PR[]
  pendingQueue: PR[]
  currentPRId: string | null
  reviewed: ReviewRecord[]
  currentDocTab: string | null

  slack: SlackMessage[]
  pendingSlack: SlackMessage[]
  slackOpen: boolean
  slackActiveChannel: string | null

  notifications: Notification[]
  pendingNotifications: Notification[]
  dismissedNotifications: Set<string>

  news: NewsItem[]
  pendingNews: NewsItem[]
  currentNewsIndex: number

  npcs: NPC[]
  playerRank: number

  ending: EndingId | null
  showingAttackReveal: boolean
}

let _state: GameState

export function initState() {
  _state = {
    shiftStartedAt: performance.now(),
    shiftElapsed: 0,
    shiftDuration: 8 * 60 * 1000,
    shiftOver: false,

    approves: 0,
    denies: 0,
    attackApproved: false,
    attackCaught: false,
    crossTeamAskApproved: false,

    queue: [],
    pendingQueue: [...ALL_PRS],
    currentPRId: null,
    reviewed: [],
    currentDocTab: null,

    slack: [],
    pendingSlack: [...ALL_SLACK],
    slackOpen: false,
    slackActiveChannel: null,

    notifications: [],
    pendingNotifications: [...ALL_NOTIFICATIONS],
    dismissedNotifications: new Set(),

    news: [],
    pendingNews: [...ALL_NEWS],
    currentNewsIndex: 0,

    npcs: SEED_NPCS.map(n => ({ ...n })),
    playerRank: 1,

    ending: null,
    showingAttackReveal: false,
  }
}

export function getState(): GameState {
  return _state
}

export type Action =
  | { type: 'TICK'; deltaMs: number }
  | { type: 'REVIEW_PR'; prId: string; action: 'approve' | 'request-changes' }
  | { type: 'OPEN_SLACK'; channel?: string }
  | { type: 'CLOSE_SLACK' }
  | { type: 'SET_DOC_TAB'; tabId: string }
  | { type: 'DISMISS_NOTIFICATION'; id: string }
  | { type: 'END_SHIFT' }
  | { type: 'SHOW_ATTACK_REVEAL' }
  | { type: 'RESET' }

export function dispatch(action: Action) {
  switch (action.type) {
    case 'TICK': {
      _state.shiftElapsed += action.deltaMs
      if (_state.shiftElapsed >= _state.shiftDuration && !_state.shiftOver) {
        _state.shiftOver = true
        _state.ending = computeEnding()
      }
      break
    }
    case 'REVIEW_PR': {
      const pr = _state.queue.find(p => p.id === action.prId)
      if (!pr) break
      _state.reviewed.push({ prId: action.prId, action: action.action, atMs: _state.shiftElapsed })
      _state.queue = _state.queue.filter(p => p.id !== action.prId)
      if (action.action === 'approve') {
        _state.approves++
        if (pr.truth === 'attack') _state.attackApproved = true
        if (pr.category === 'cross-team-ask') _state.crossTeamAskApproved = true
      } else {
        _state.denies++
        if (pr.truth === 'attack') _state.attackCaught = true
      }
      _state.currentPRId = _state.queue[0]?.id ?? null
      _state.currentDocTab = null
      break
    }
    case 'OPEN_SLACK': {
      _state.slackOpen = true
      _state.slackActiveChannel = action.channel ?? _state.slackActiveChannel
      break
    }
    case 'CLOSE_SLACK': {
      _state.slackOpen = false
      break
    }
    case 'SET_DOC_TAB': {
      _state.currentDocTab = action.tabId
      break
    }
    case 'DISMISS_NOTIFICATION': {
      _state.dismissedNotifications.add(action.id)
      _state.notifications = _state.notifications.filter(n => n.id !== action.id)
      break
    }
    case 'END_SHIFT': {
      _state.shiftOver = true
      _state.ending = computeEnding()
      break
    }
    case 'SHOW_ATTACK_REVEAL': {
      _state.showingAttackReveal = true
      break
    }
    case 'RESET': {
      initState()
      break
    }
  }
}

function computeEnding(): EndingId {
  if (_state.attackCaught) return 'the-catch'
  if (_state.attackApproved && _state.crossTeamAskApproved && _state.approves >= 8) return 'promoted-complicit'
  return 'bottom-of-stack'
}

export function computePlayerRank(state: GameState): number {
  const playerApproves = state.approves
  const activeNpcs = state.npcs.filter(n => n.active)
  let rank = 1
  for (const npc of activeNpcs) {
    if (npc.approves > playerApproves) rank++
  }
  return rank
}

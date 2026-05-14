import { GameState, NPC } from '../state'
import { getAvatarUrl } from '../content/avatars'

function getInitials(name: string): string {
  if (name === 'You') return 'ME'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return name.slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function nameToColor(name: string): string {
  if (name === 'You') return '#1a7f37'
  const colors = ['#0969da', '#8250df', '#1a7f37', '#9a6700', '#0550ae', '#e36209', '#cf222e', '#1b7fc4']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff
  return colors[Math.abs(hash) % colors.length]
}

let _prevKey = ''

export function renderStackRank(container: HTMLElement, state: GameState): void {
  const key = `${state.approves}:${state.playerRank}:${state.npcs.map(n => `${n.id}:${n.approves}:${n.active}:${n.laidOff}`).join(',')}`
  if (key === _prevKey) return
  _prevKey = key

  type RankEntry = {
    id: string
    name: string
    approves: number
    isPlayer: boolean
    isActive: boolean
    approveRatePerMin: number
    vibe: string
    isBot: boolean
    isLaidOff: boolean
  }

  const entries: RankEntry[] = state.npcs
    .filter(n => n.active)
    .map((n: NPC) => ({
      id: n.id,
      name: n.name,
      approves: n.approves,
      isPlayer: false,
      isActive: n.active,
      approveRatePerMin: n.approveRatePerMin,
      vibe: n.vibe,
      isBot: n.id === 'engineer-9000',
      isLaidOff: n.laidOff,
    }))

  entries.push({
    id: 'player',
    name: 'You',
    approves: state.approves,
    isPlayer: true,
    isActive: true,
    approveRatePerMin: 0,
    vibe: "That's you.",
    isBot: false,
    isLaidOff: false,
  })

  entries.sort((a, b) => b.approves - a.approves)

  const laidOffCount = state.npcs.filter(n => n.laidOff).length
  const dangerCutoff = Math.max(0, entries.length - 3 - laidOffCount)
  const playerIdx = entries.findIndex(e => e.isPlayer)
  const playerInDanger = playerIdx >= dangerCutoff

  const rows = entries.map((entry, idx) => {
    const rank = idx + 1
    const isGaining = entry.approveRatePerMin >= 2.0 && !entry.isPlayer && !entry.isLaidOff
    const inDangerZone = entry.isPlayer && playerInDanger
    const rowClass = entry.isLaidOff
      ? 'rank-row rank-row-laidoff'
      : entry.isPlayer
        ? `rank-row ${inDangerZone ? 'rank-row-you-danger' : 'rank-row-you'}`
        : 'rank-row'
    const gainIndicator = isGaining ? '<span class="rank-gain" aria-label="gaining fast">▲</span>' : ''
    const initials = getInitials(entry.name)
    const color = entry.isLaidOff ? '#cf222e' : nameToColor(entry.name)
    const avatarUrl = getAvatarUrl(entry.id) ?? getAvatarUrl(entry.name)
    const avatarInner = avatarUrl ? `<img src="${avatarUrl}" alt="${initials}">` : initials
    const displayName = entry.isLaidOff
      ? `<span class="rank-name-struck">${entry.name}</span> <span class="rank-laidoff-badge">LAID OFF</span>`
      : entry.isBot ? `🤖 ${entry.name}` : entry.name
    const nameClass = entry.isLaidOff
      ? 'rank-name rank-name-laidoff'
      : entry.isPlayer
        ? `rank-name ${inDangerZone ? 'rank-name-you-danger' : 'rank-name-you'}`
        : 'rank-name'
    let divider = ''
    if (idx === 0) {
      divider = '<div class="rank-section-label rank-section-exceeds">Exceeds Expectations</div>'
    } else if (idx === 2 && dangerCutoff > 2) {
      divider = '<div class="rank-section-label rank-section-meets">Meets Expectations</div>'
    } else if (idx === dangerCutoff && dangerCutoff > 0) {
      divider = '<div class="rank-danger-divider">⚠ PIP ZONE</div>'
    }

    return `
      ${divider}
      <div class="${rowClass}" title="${entry.vibe}">
        <span class="rank-pos">#${rank}</span>
        <div class="avatar avatar-sm" style="background:${color}">${avatarInner}</div>
        <span class="${nameClass}">${displayName}${gainIndicator}</span>
        <span class="rank-approves">${entry.approves}</span>
      </div>
    `
  }).join('')

  const inactiveNpcs = state.npcs.filter(n => !n.active)
  const inactiveSection = inactiveNpcs.length > 0 ? `
    <div class="rank-inactive-row">
      ${inactiveNpcs.map(n => `${n.id === 'engineer-9000' ? '🤖 ' : ''}${n.name} (offline)`).join(' · ')}
    </div>
  ` : ''

  container.innerHTML = `
    <div class="stack-rank-card">
      <div class="stack-rank-header">
        <h3 class="stack-rank-title">Q3 Stack Rank <span class="live-dot"></span></h3>
      </div>
      <div class="stack-rank-body">
        ${rows}
        ${inactiveSection}
      </div>
      <div class="rank-footer ${playerInDanger ? 'rank-footer-danger' : ''}">
        ${playerInDanger ? '⚠ ' : ''}Your rank: <strong>#${state.playerRank}</strong> of ${state.npcs.filter(n => n.active).length + 1}${playerInDanger ? ' — <span class="rank-pip-warning">PIP risk</span>' : ''}
      </div>
    </div>
  `
}

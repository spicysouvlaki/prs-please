import { GameState, PR } from '../state'

function teamLabel(team: string): string {
  const labels: Record<string, string> = {
    platform: 'Platform',
    growth: 'Growth',
    'ai-foundations': 'AI Foundations',
    devx: 'DevX',
    security: 'Security',
    partnerships: 'Partnerships',
    self: 'Dependabot',
  }
  return labels[team] ?? team
}

function categoryBadge(category: string): string {
  const badges: Record<string, string> = {
    tutorial: '<span class="gh-label gh-label-tutorial">Tutorial</span>',
    normal: '',
    'ai-slop': '<span class="gh-label gh-label-ai">AI-Generated</span>',
    'cross-team-ask': '<span class="gh-label gh-label-cross">Cross-Team</span>',
    attack: '',
  }
  return badges[category] ?? ''
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

// Skip re-render if key hasn't changed — prevents scroll reset and flicker
let _prevKey = ''

export function renderPRPanel(container: HTMLElement, state: GameState): void {
  const waitingCount = Math.max(0, state.queue.length - 1)
  const key = `${state.currentPRId ?? ''}:${state.currentDocTab ?? ''}:${waitingCount}`
  if (key === _prevKey) return
  _prevKey = key

  const currentPR = state.currentPRId
    ? state.queue.find(p => p.id === state.currentPRId) ?? null
    : null

  if (!currentPR) {
    container.innerHTML = `
      <div class="gh-pr-shell gh-pr-empty">
        <div class="gh-empty-state">
          <svg width="40" height="40" viewBox="0 0 16 16" fill="#57606a">
            <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.426a.25.25 0 010-.353zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
          </svg>
          <p>No pull requests in queue.</p>
          <p class="gh-empty-sub">New PRs will appear here as engineers push code.</p>
        </div>
      </div>
    `
    return
  }

  const activeTab = state.currentDocTab ?? 'diff'
  const tabs = [
    { id: 'diff', label: 'Files changed' },
    ...currentPR.documents.map(d => ({ id: d.id, label: d.label })),
  ]

  const tabBarHtml = tabs.map(t => `
    <button class="gh-tab ${activeTab === t.id ? 'gh-tab-active' : ''}" data-tab="${t.id}">${esc(t.label)}</button>
  `).join('')

  let tabContent = ''
  if (activeTab === 'diff') {
    tabContent = `
      <div class="gh-diff-file">
        <div class="gh-diff-file-header">
          <span class="gh-diff-filename">${esc(currentPR.branch.split('/').pop() ?? currentPR.branch)}</span>
          <span class="gh-diff-file-meta">${esc(currentPR.branch)}</span>
        </div>
        <div class="gh-diff-body">${currentPR.diffHtml}</div>
      </div>
    `
  } else {
    const doc = currentPR.documents.find(d => d.id === activeTab)
    tabContent = doc
      ? `<div class="gh-doc-body">${doc.bodyHtml}</div>`
      : '<p class="gh-doc-body">Document not found.</p>'
  }

  const initials = getInitials(currentPR.author)
  const avatarColor = nameToColor(currentPR.author)

  container.innerHTML = `
    <div class="gh-pr-shell">

      <div class="gh-pr-titlebar">
        <div class="gh-pr-title-row">
          <div class="avatar avatar-md" style="background:${avatarColor}" title="${esc(currentPR.author)}">${initials}</div>
          <h2 class="gh-pr-title">${esc(currentPR.title)}</h2>
          <span class="gh-pr-number">#${currentPR.id.replace(/\D/g, '') || '?'}</span>
        </div>
        <div class="gh-pr-meta-row">
          <span class="gh-open-badge">Open</span>
          <span>
            <strong>${esc(currentPR.author)}</strong> wants to merge into
            <code class="gh-code">main</code> from
            <code class="gh-code">${esc(currentPR.branch)}</code>
          </span>
          <span class="gh-pr-team">${esc(teamLabel(currentPR.team))}</span>
          ${categoryBadge(currentPR.category)}
        </div>
        ${currentPR.description ? `
          <div class="gh-pr-description">${esc(currentPR.description).replace(/\n/g, '<br>')}</div>
        ` : ''}
      </div>

      <div class="gh-tabs-bar">
        ${tabBarHtml}
      </div>

      <div class="gh-tab-content">
        ${tabContent}
      </div>

      <div class="gh-review-bar">
        <div class="gh-queue-info">
          ${waitingCount > 0
            ? `<span class="gh-queue-badge">${waitingCount} more waiting</span>`
            : `<span class="gh-queue-empty">Queue clear 🚀</span>`}
        </div>
        <div class="gh-review-actions">
          <button class="btn btn-deny" id="btn-deny">
            Request changes <kbd>R</kbd>
          </button>
          <button class="btn btn-approve" id="btn-approve">
            Approve <kbd>A</kbd>
          </button>
        </div>
      </div>

    </div>
  `
  // Event listeners attached via delegation in desktop.ts — do not attach here.
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function getPRById(state: GameState, id: string): PR | undefined {
  return [...state.queue, ...state.reviewed.map(r => {
    return state.pendingQueue.find(p => p.id === r.prId)
  }).filter((p): p is PR => p !== undefined)].find(p => p.id === id)
}

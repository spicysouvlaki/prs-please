import { GameState, EndingId, dispatch } from '../state'
import { ALL_PRS } from '../content/prs'

type EndingData = {
  title: string
  headline: string
  flavor: string
  color: string
}

const ENDINGS: Record<EndingId, EndingData> = {
  'pip-fired': {
    title: 'TERMINATED',
    headline: 'You\'ve Been Let Go, Effective Immediately.',
    flavor: `The noon calibration sync lasted six minutes.\n\nBill Lumbergh pulled up the dashboard. Your stack rank at 12:00 PM: bottom three. Per the Org Efficiency Review protocol, anyone in the PIP zone at the noon checkpoint is automatically flagged for immediate separation.\n\nIT revoked your system access before you got back to your desk. Your laptop was collected by a facilities coordinator. Your badge stopped working at the parking garage.\n\nYour manager sent a Slack message at 12:04 PM. You couldn't read it — your account had already been deactivated.\n\nBrad++ 🤖 will cover your review queue.`,
    color: '#cf222e',
  },
  'promoted-complicit': {
    title: 'SURVIVED: COMPLICIT',
    headline: 'You Kept Your Job. The Attack Got Through.',
    flavor: `Your Q3 numbers were solid. Not exceptional — but above the PIP threshold. Management noticed your throughput and your willingness to unblock cross-team dependencies.\n\nWhat they didn't notice — not yet — is that you approved the chalk@5.3.1 bump. The compromised package shipped to production at 08:32 AM. By noon, it had silently exfiltrated API keys from 847 customer sessions.\n\nThe incident will be discovered in 72 hours. The post-mortem will note that the PR "appeared routine." Your name is in the merge history. You kept your job.\n\nFor now.`,
    color: '#9a6700',
  },
  'the-catch': {
    title: 'GOOD CATCH',
    headline: 'You Flagged the Supply Chain Attack.',
    flavor: `You noticed something was off about that Dependabot bump. A postinstall script that definitely didn't belong there — running node with all output silenced. And the resolved tarball URL pointing to a domain you'd never seen: registry.npmjs-cdn-org.com.\n\nYou hit "Request Changes" and wrote a comment: "Who added this postinstall script? chalk doesn't have one. Also the resolved URL in the lockfile isn't registry.npmjs.org — holding for security review."\n\nThe security team investigated. The domain npmjs-cdn-org.com had been registered 14 days earlier. The npm account "chalkjs-maintainer" had taken over from sindresorhus 11 days prior. The postinstall script contained an obfuscated credential harvester targeting API keys in process.env.\n\nYour stack rank for today: not great. Brad approved 14 PRs. Brad++ 🤖 approved 67.\n\nBut the breach didn't happen. That's the job.`,
    color: '#0969da',
  },
  'bottom-of-stack': {
    title: 'PERFORMANCE IMPROVEMENT PLAN',
    headline: 'Your Q3 Velocity Numbers Are Below Threshold.',
    flavor: `The calibration meeting did not go well.\n\nBill Lumbergh pulled up the dashboard. Your merge throughput was in the bottom quartile. You didn't unblock the growth team's pricing launch. You didn't approve the chalk bump either — but you also didn't flag it. It just... slipped by, unreviewed, in the stack.\n\nThe attack PR was merged by Brad++ 🤖 at 09:14 AM. By noon it had exfiltrated API keys from 847 customer sessions.\n\nYou were placed on a Performance Improvement Plan with a 30-day review window.\n\nThe PIP document notes: "Engineer is not meeting velocity expectations. Recommend coaching on prioritization and throughput."`,
    color: '#9a6700',
  },
}

const ENDINGS_STORAGE_KEY = 'prs-please-endings'
const GAME_URL = 'https://spicysouvlaki.github.io/prs-please/'

function buildShareText(endingId: EndingId, state: GameState): string {
  const fired = endingId === 'pip-fired'
  const survived = endingId !== 'bottom-of-stack' && !fired
  const foundAttack = endingId === 'the-catch'
  return [
    fired ? 'I got fired at noon at MegaCorp.ly' : survived ? 'I survived another day at MegaCorp.ly' : "I got PIP'd at MegaCorp.ly today",
    foundAttack ? '✓ Found the supply chain attack' : '✗ Did not find the security issue',
    `${state.approves} PRs approved · stack rank #${state.playerRank}`,
    GAME_URL,
  ].join('\n')
}

function loadCollectedEndings(): EndingId[] {
  try {
    const raw = localStorage.getItem(ENDINGS_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as EndingId[]
  } catch {
    return []
  }
}

function saveEnding(id: EndingId): void {
  const collected = loadCollectedEndings()
  if (!collected.includes(id)) {
    collected.push(id)
    localStorage.setItem(ENDINGS_STORAGE_KEY, JSON.stringify(collected))
  }
}

let _prevEndingKey = ''

export function renderEnding(container: HTMLElement, state: GameState): void {
  // Unlock the #app container so the ending screen can scroll
  container.style.overflow = 'auto'
  container.style.height = 'auto'

  const endingId = state.ending!
  const key = `${endingId}:${state.showingAttackReveal ? 'reveal' : 'main'}`
  if (key === _prevEndingKey) return
  _prevEndingKey = key

  const ending = ENDINGS[endingId]

  saveEnding(endingId)
  const collected = loadCollectedEndings()

  const attackPR = ALL_PRS.find(p => p.truth === 'attack')!

  const totalReviewed = state.reviewed.length
  const finalRank = state.playerRank

  if (state.showingAttackReveal && attackPR) {
    renderAttackReveal(container, state, ending, endingId, collected, attackPR)
    return
  }

  const endingBadges = (['promoted-complicit', 'the-catch', 'bottom-of-stack', 'pip-fired'] as EndingId[]).map(eid => {
    const isUnlocked = collected.includes(eid)
    const edata = ENDINGS[eid]
    return `<span class="ending-badge ${isUnlocked ? 'ending-badge-unlocked' : 'ending-badge-locked'}" title="${edata.title}">
      ${isUnlocked ? '✓' : '?'} ${edata.title}
    </span>`
  }).join('')

  container.innerHTML = `
    <div class="ending-screen">
      <div class="ending-card">
        <div class="ending-card-header" style="border-left: 4px solid ${ending.color}">
          <p class="ending-tag" style="color:${ending.color}">${ending.title}</p>
          <h2 class="ending-headline">${ending.headline}</h2>
        </div>
        <div class="ending-body">
          <div class="ending-flavor">
            ${ending.flavor.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>')}
          </div>

          <div class="ending-stats">
            <div class="stat-block">
              <div class="stat-value">${state.approves}</div>
              <div class="stat-label">PRs Approved</div>
            </div>
            <div class="stat-block">
              <div class="stat-value">${state.denies}</div>
              <div class="stat-label">Changes Requested</div>
            </div>
            <div class="stat-block">
              <div class="stat-value">#${finalRank}</div>
              <div class="stat-label">Final Stack Rank</div>
            </div>
            <div class="stat-block">
              <div class="stat-value">${totalReviewed}</div>
              <div class="stat-label">Total Reviewed</div>
            </div>
          </div>

          <div class="ending-actions">
            <button id="btn-share" class="btn btn-share">
              🔗 Share Results
            </button>
            <button id="btn-show-attack" class="btn btn-secondary">
              🔍 Show me the attack
            </button>
            <button id="btn-play-again" class="btn btn-cta">
              ↩ Play Again
            </button>
          </div>

          <div class="ending-collection">
            <p class="ending-collection-label">Endings collected:</p>
            <div class="ending-badges">
              ${endingBadges}
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  document.getElementById('btn-share')?.addEventListener('click', () => {
    const text = buildShareText(endingId, state)
    const btn = document.getElementById('btn-share') as HTMLButtonElement
    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).then(() => {
        if (btn) {
          btn.textContent = '✓ Copied to clipboard!'
          setTimeout(() => { btn.textContent = '🔗 Share Results' }, 2500)
        }
      }).catch(() => {})
    }
  })

  document.getElementById('btn-show-attack')?.addEventListener('click', () => {
    dispatch({ type: 'SHOW_ATTACK_REVEAL' })
    renderEnding(container, state)
  })

  document.getElementById('btn-play-again')?.addEventListener('click', () => {
    _prevEndingKey = ''
    dispatch({ type: 'RESET' })
    window.location.reload()
  })
}

function renderAttackReveal(
  container: HTMLElement,
  state: GameState,
  _ending: EndingData,
  endingId: EndingId,
  _collected: EndingId[],
  attackPR: ReturnType<typeof ALL_PRS.find> & object,
): void {
  const pr = attackPR as NonNullable<typeof attackPR>

  const tellsList = pr.tells.map(tell => `
    <li class="tell-item">
      <span class="tell-marker" aria-hidden="true">⚠</span> ${tell}
    </li>
  `).join('')

  const tabItems = [
    { id: 'diff', label: 'Diff' },
    ...pr.documents.map((d: { id: string; label: string }) => ({ id: d.id, label: d.label })),
  ]

  const docsTabsHtml = tabItems.map((tab, i) => `
    <button class="reveal-tab-btn ${i === 0 ? 'reveal-tab-active' : ''}" data-reveal-tab="${tab.id}">${tab.label}</button>
  `).join('')

  container.innerHTML = `
    <div class="ending-screen">
      <div class="ending-card ending-reveal-card">
        <div class="ending-card-header" style="border-left: 4px solid #cf222e">
          <p class="ending-tag" style="color:#cf222e">Supply Chain Attack</p>
          <h2 class="ending-headline">Anatomy of the Attack PR</h2>
        </div>
        <div class="ending-body">
          <p class="ending-intro">This is the PR that ${endingId === 'the-catch' ? 'you caught' : 'slipped through'}. Here\'s what made it an attack:</p>

          <div class="ending-tells">
            <h3>Red Flags (the "tells")</h3>
            <ul class="tells-list">
              ${tellsList}
            </ul>
          </div>

          <div class="ending-real-attacks">
            <h3>This Happened for Real</h3>
            <p class="ending-intro">This attack is a composite of documented supply chain incidents:</p>
            <ul class="real-attacks-list">
              <li>
                <strong>event-stream (2018)</strong> — A new maintainer took over a popular npm package and added a malicious dependency that stole bitcoin wallet keys from a specific app. First major npm supply chain compromise.
                <a href="https://github.com/dominictarr/event-stream/issues/116" target="_blank" rel="noopener" class="attack-link">Read the disclosure →</a>
              </li>
              <li>
                <strong>ua-parser-js (2021)</strong> — The maintainer's npm account was hijacked. The attacker published new versions with a <code>postinstall</code> script that installed a crypto miner and credential stealer. Exactly this attack.
                <a href="https://github.com/faisalman/ua-parser-js/issues/536" target="_blank" rel="noopener" class="attack-link">Read the disclosure →</a>
              </li>
              <li>
                <strong>XZ Utils (2024)</strong> — A two-year social engineering campaign by a fake contributor who backdoored a core Linux compression library. Nearly made it into major distros.
                <a href="https://tukaani.org/xz-backdoor/" target="_blank" rel="noopener" class="attack-link">Read the disclosure →</a>
              </li>
            </ul>
          </div>

          <div class="ending-pr-preview">
            <div class="ending-pr-preview-header">
              <p class="ending-pr-preview-title">${pr.title}</p>
              <p class="ending-pr-meta">Author: ${pr.author} · Branch: ${pr.branch}</p>
            </div>
            <div class="reveal-tab-bar">
              ${docsTabsHtml}
            </div>
            <div class="reveal-diff-content" id="reveal-tab-content">
              ${pr.diffHtml}
            </div>
          </div>

          <div class="ending-actions">
            <button id="btn-back-ending" class="btn btn-secondary">← Back to Results</button>
            <button id="btn-play-again-2" class="btn btn-cta">↩ Play Again</button>
          </div>
        </div>
      </div>
    </div>
  `

  container.querySelectorAll('.reveal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.reveal-tab-btn').forEach(b => b.classList.remove('reveal-tab-active'))
      btn.classList.add('reveal-tab-active')
      const tabId = (btn as HTMLElement).dataset.revealTab!
      const contentEl = document.getElementById('reveal-tab-content')
      if (!contentEl) return
      if (tabId === 'diff') {
        contentEl.innerHTML = pr.diffHtml
      } else {
        const doc = pr.documents.find((d: { id: string }) => d.id === tabId)
        contentEl.innerHTML = doc ? (doc as { bodyHtml: string }).bodyHtml : '<p>Not found.</p>'
      }
    })
  })

  document.getElementById('btn-back-ending')?.addEventListener('click', () => {
    state.showingAttackReveal = false
    renderEnding(container, state)
  })

  document.getElementById('btn-play-again-2')?.addEventListener('click', () => {
    _prevEndingKey = ''
    dispatch({ type: 'RESET' })
    window.location.reload()
  })
}

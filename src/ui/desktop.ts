import { GameState, dispatch, getState } from '../state'
import { renderNewsTicker } from './news-ticker'
import { renderPRPanel } from './pr-panel'
import { renderStackRank } from './stack-rank'
import { renderSlackPanel } from './slack-panel'
import { renderNotifications } from './notifications'

let keyListenerAttached = false
let prDelegationAttached = false

function attachKeyListener() {
  if (keyListenerAttached) return
  keyListenerAttached = true
  document.addEventListener('keydown', (e) => {
    const state = getState()
    if (state.shiftOver) return
    if (state.slackOpen) {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE_SLACK' })
      return
    }
    const currentId = state.currentPRId
    if (!currentId) return
    if (e.key === 'a' || e.key === 'A') {
      dispatch({ type: 'REVIEW_PR', prId: currentId, action: 'approve' })
    } else if (e.key === 'r' || e.key === 'R') {
      dispatch({ type: 'REVIEW_PR', prId: currentId, action: 'request-changes' })
    }
  })
}

// Single persistent event delegation on the stable prEl container.
// renderPRPanel replaces innerHTML every tick, so per-render addEventListener
// races with the 100ms render loop (mousedown on old element, mouseup after
// innerHTML swap → click never fires). Delegation on the stable parent fixes it.
function attachPRDelegation(prEl: HTMLElement) {
  if (prDelegationAttached) return
  prDelegationAttached = true

  prEl.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const state = getState()
    if (state.shiftOver) return

    if (target.closest('#btn-approve')) {
      if (state.currentPRId) {
        dispatch({ type: 'REVIEW_PR', prId: state.currentPRId, action: 'approve' })
      }
      return
    }

    if (target.closest('#btn-deny')) {
      if (state.currentPRId) {
        dispatch({ type: 'REVIEW_PR', prId: state.currentPRId, action: 'request-changes' })
      }
      return
    }

    const tabBtn = target.closest('[data-tab]') as HTMLElement | null
    if (tabBtn?.dataset.tab) {
      dispatch({ type: 'SET_DOC_TAB', tabId: tabBtn.dataset.tab })
    }
  })
}

export function renderDesktop(app: HTMLElement, state: GameState): void {
  attachKeyListener()

  let desktopEl = app.querySelector('.desktop') as HTMLElement | null

  if (!desktopEl) {
    app.innerHTML = `
      <div class="desktop">
        <div id="region-ticker"></div>
        <div class="main-area">
          <div id="region-pr" class="region-pr"></div>
          <div class="right-column">
            <div id="region-stack"></div>
            <div id="region-slack"></div>
          </div>
        </div>
      </div>
      <div id="region-notifications"></div>
    `
    desktopEl = app.querySelector('.desktop') as HTMLElement
  }

  const tickerEl = document.getElementById('region-ticker')!
  const prEl = document.getElementById('region-pr')!
  const stackEl = document.getElementById('region-stack')!
  const slackEl = document.getElementById('region-slack')!
  const notifsEl = document.getElementById('region-notifications')!

  attachPRDelegation(prEl)

  renderNewsTicker(tickerEl, state)
  renderPRPanel(prEl, state)
  renderStackRank(stackEl, state)
  renderSlackPanel(slackEl, state)
  renderNotifications(notifsEl, state)
}

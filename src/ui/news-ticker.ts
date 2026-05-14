import { GameState } from '../state'
import { renderShiftClock } from './shift-clock'

let _prevStructureKey = ''

export function renderNewsTicker(container: HTMLElement, state: GameState): void {
  const newsKey = `${state.news.length}:${state.news.map(n => n.id).join('|')}`
  const structureKey = `${newsKey}:${state.incidentActive}:${state.incidentResolved}`

  const uptimeClass = state.uptimePercent < 50 ? 'uptime-critical'
    : state.uptimePercent < 90 ? 'uptime-degraded'
    : 'uptime-ok'

  // Live-update stats and clock in-place when structure is stable
  const uptimeEl = container.querySelector('.ticker-uptime-val') as HTMLElement | null
  const deathsEl = container.querySelector('.ticker-deaths') as HTMLElement | null
  const clockEl = container.querySelector('.ticker-clock')

  if (structureKey === _prevStructureKey && uptimeEl && clockEl) {
    uptimeEl.textContent = `${state.uptimePercent.toFixed(1)}%`
    uptimeEl.className = `ticker-uptime-val ${uptimeClass}`
    if (deathsEl) {
      deathsEl.textContent = state.patientDeaths > 0 ? `💀 ${state.patientDeaths}` : ''
      deathsEl.style.display = state.patientDeaths > 0 ? 'inline' : 'none'
    }
    clockEl.innerHTML = renderShiftClock(state.shiftElapsed)
    return
  }
  _prevStructureKey = structureKey

  const SLOGANS = [
    '🚀 DELIVER MORE',
    '⚡ DELIVER FASTER',
    '🔥 MOVE FAST',
    '✅ REVIEW THINGS',
    '📈 VELOCITY IS A CORE COMPETENCY',
    '💪 THROUGHPUT OR BUST',
    '🏆 TOP QUARTILE OR NOTHING',
    '⏩ SHIP IT',
    '🤝 UNBLOCK YOUR PEERS',
    '📊 YOUR METRICS ARE VISIBLE TO MANAGEMENT',
  ]

  const newsHeadlines = state.news.map(n => n.headline)
  const headlines = newsHeadlines.length > 0
    ? [...newsHeadlines, ...SLOGANS]
    : SLOGANS
  const tickerText = newsHeadlines.length > 0
    ? headlines.join('   ·   ')
    : 'MegaCorp.ly — patient care infrastructure — uptime is not optional — 847 patients depend on this platform right now'

  const deathsBadge = state.patientDeaths > 0
    ? `<span class="ticker-deaths">💀 ${state.patientDeaths}</span>`
    : `<span class="ticker-deaths" style="display:none"></span>`

  container.innerHTML = `
    <div class="news-ticker-bar">
      <span class="ticker-source-pill">MegaCorp.ly</span>
      <div class="ticker-uptime-block">
        <span class="ticker-uptime-label">UPTIME</span>
        <span class="ticker-uptime-val ${uptimeClass}">${state.uptimePercent.toFixed(1)}%</span>
        ${deathsBadge}
      </div>
      <div class="ticker-track-wrapper">
        <div class="ticker-track" style="animation-duration: ${Math.max(30, headlines.length * 8)}s">
          <span class="ticker-content">${tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${tickerText}</span>
        </div>
      </div>

      <div class="ticker-clock">
        ${renderShiftClock(state.shiftElapsed)}
      </div>
    </div>
  `
}

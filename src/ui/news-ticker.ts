import { GameState } from '../state'
import { renderShiftClock } from './shift-clock'

let _prevNewsKey = ''

export function renderNewsTicker(container: HTMLElement, state: GameState): void {
  const newsKey = `${state.news.length}:${state.news.map(n => n.headline).join('|')}`

  const clockEl = container.querySelector('.ticker-clock')
  if (clockEl && newsKey === _prevNewsKey) {
    clockEl.innerHTML = renderShiftClock(state.shiftElapsed)
    return
  }
  _prevNewsKey = newsKey

  const headlines = state.news.map(n => n.headline)
  const tickerText = headlines.length > 0
    ? headlines.join('   ·   ')
    : 'MEGACORP.LY Q3 velocity targets are live — leadership expects 40% improvement in merge throughput. Brad is already reviewing.'

  container.innerHTML = `
    <div class="news-ticker-bar">
      <span class="ticker-source-pill">MegaCorp.ly</span>
      <div class="ticker-track-wrapper">
        <div class="ticker-track" style="animation-duration: ${Math.max(20, headlines.length * 12)}s">
          <span class="ticker-content">${tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${tickerText}</span>
        </div>
      </div>
      <div class="ticker-clock">
        ${renderShiftClock(state.shiftElapsed)}
      </div>
    </div>
  `
}

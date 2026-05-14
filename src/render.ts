import { getState } from './state'
import { renderEnding } from './ui/ending'
import { renderDesktop } from './ui/desktop'

export function render() {
  const state = getState()
  const app = document.getElementById('app')!

  if (state.shiftOver && state.ending) {
    renderEnding(app, state)
    return
  }

  renderDesktop(app, state)
}

import { initState } from './state'
import { tick } from './tick'
import { render } from './render'

function startGame() {
  initState()
  render()
  setInterval(() => {
    tick()
    render()
  }, 100)
}

function showStartScreen() {
  const app = document.getElementById('app')!
  app.innerHTML = `
    <div class="start-screen">
      <div class="start-card">
        <div class="start-card-header">
          <div class="start-card-logo">PRs Please</div>
          <div class="start-card-subtitle">MEGACORP Internal Tools Division · Code Review Velocity Platform™</div>
        </div>
        <div class="start-card-body">
          <div class="start-notice">
            <strong>⚠ NOTICE:</strong> Your shift begins at 08:00 AM. You are expected to maintain a minimum velocity of <strong>8 PRs/shift</strong>. Brad is already reviewing.
          </div>
          <div class="start-fine-print">
            This shift lasts approximately 8 minutes. There will be a performance calibration at lunch. Stack rank is visible to your manager in real-time.
          </div>
          <div class="start-actions">
            <button id="clock-in-btn" class="btn btn-cta">⏰ Clock In</button>
          </div>
        </div>
      </div>
    </div>
  `
  document.getElementById('clock-in-btn')!.addEventListener('click', startGame)
}

showStartScreen()

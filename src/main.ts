import { initState } from './state'
import { tick, resetTick } from './tick'
import { render } from './render'
import { logoMark } from './ui/logo'

const OKTA_O = `<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="18" cy="18" r="18" fill="#007DC1"/>
  <circle cx="18" cy="18" r="8" fill="white"/>
</svg>`

const DUO_D = (size: number) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="36" height="36" rx="8" fill="#6FC244"/>
    <text x="18" y="25" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-size="22" font-weight="800" fill="white">D</text>
  </svg>`

function startGame() {
  resetTick()
  initState()
  render()
  setInterval(() => {
    tick()
    render()
  }, 100)
}

function showOktaCallback() {
  const app = document.getElementById('app')!
  app.innerHTML = `
    <div class="okta-screen">
      <div class="okta-redirect-box">
        <div class="okta-spinner"></div>
        <p class="okta-redirect-text">Signing you in to <strong>PRs Please</strong>…</p>
        <p class="okta-redirect-url">https://prs-please.megacorply.com/oauth/callback?code=4f9a…</p>
      </div>
    </div>
  `
  setTimeout(startGame, 1400)
}

function showDuoPush() {
  const app = document.getElementById('app')!
  app.innerHTML = `
    <div class="okta-screen">
      <div class="okta-card">
        <div class="okta-card-top">
          ${DUO_D(36)}
          <h2 class="okta-heading">Two-Factor Authentication</h2>
          <p class="okta-org">Duo Security · megacorply.okta.com</p>
        </div>
        <div class="okta-card-body">
          <div class="duo-waiting">
            <div class="duo-phone-emoji">📱</div>
            <p class="duo-status">Push sent to <strong>iPhone 15 Pro</strong></p>
            <p class="duo-hint">Check your phone and tap <strong>Approve</strong> in the Duo app.</p>
            <div class="okta-spinner" style="border-top-color:#6FC244;margin-top:4px"></div>
          </div>
          <button class="okta-btn-ghost" disabled style="opacity:0.45;cursor:not-allowed">Try another method</button>
        </div>
        <div class="okta-card-footer">
          <span class="okta-powered">Secured by</span>
          ${DUO_D(16)}
          <span class="okta-powered-name" style="color:#6FC244">Duo</span>
        </div>
      </div>

      <div class="duo-toast" id="duo-toast">
        <div class="duo-toast-icon">${DUO_D(32)}</div>
        <div class="duo-toast-body">
          <div class="duo-toast-meta">
            <span class="duo-toast-app">DUO SECURITY</span>
            <span class="duo-toast-time">now</span>
          </div>
          <div class="duo-toast-title">Login Request</div>
          <div class="duo-toast-text">MegaCorp.ly is requesting approval</div>
          <div class="duo-toast-btns">
            <button class="duo-toast-deny" id="duo-deny">Deny</button>
            <button class="duo-toast-approve" id="duo-approve">Approve</button>
          </div>
        </div>
      </div>
    </div>
  `

  setTimeout(() => {
    document.getElementById('duo-toast')?.classList.add('duo-toast-visible')
  }, 1500)

  document.getElementById('duo-deny')?.addEventListener('click', () => {
    const toast = document.getElementById('duo-toast')
    if (!toast) return
    toast.style.animation = 'none'
    // force reflow so re-adding the class triggers the animation
    void toast.offsetWidth
    toast.style.animation = 'duo-shake 0.45s ease'
  })

  document.getElementById('duo-approve')?.addEventListener('click', showOktaCallback)
}

function showOktaLogin() {
  const app = document.getElementById('app')!
  app.innerHTML = `
    <div class="okta-screen">
      <div class="okta-card">
        <div class="okta-card-top">
          ${OKTA_O}
          <h2 class="okta-heading">Sign In</h2>
          <p class="okta-org">megacorply.okta.com</p>
        </div>
        <div class="okta-card-body">
          <div class="okta-field-group">
            <label class="okta-label">Username</label>
            <input class="okta-input" type="email" value="you@megacorply.com" disabled/>
          </div>
          <div class="okta-sso-note">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="7" cy="7" r="6.5" stroke="#007DC1"/><path d="M4 7h6M7 4v6" stroke="#007DC1" stroke-width="1.2" stroke-linecap="round"/></svg>
            SSO enabled for <strong>megacorply.com</strong>
          </div>
          <button id="okta-continue-btn" class="okta-btn">Continue</button>
        </div>
        <div class="okta-card-footer">
          <span class="okta-powered">Secured by</span>
          ${OKTA_O.replace('width="36" height="36"', 'width="16" height="16"')}
          <span class="okta-powered-name">Okta</span>
        </div>
      </div>
    </div>
  `
  document.getElementById('okta-continue-btn')!.addEventListener('click', showDuoPush)
}

function showOktaRedirect() {
  const app = document.getElementById('app')!
  app.innerHTML = `
    <div class="okta-screen">
      <div class="okta-redirect-box">
        <div class="okta-spinner"></div>
        <p class="okta-redirect-text">Redirecting to <strong>megacorply.okta.com</strong>…</p>
        <p class="okta-redirect-url">https://megacorply.okta.com/oauth2/v1/authorize?client_id=prs-please&response_type=code&scope=openid+profile+email&redirect_uri=…</p>
      </div>
    </div>
  `
  setTimeout(showOktaLogin, 1300)
}

function showStartScreen() {
  const app = document.getElementById('app')!
  app.innerHTML = `
    <div class="start-screen">
      <div class="start-card">
        <div class="start-card-header">
          <div class="start-logo-row">
            ${logoMark(52)}
            <div class="start-logo-text">
              <div class="start-card-logo">MegaCorp<span class="start-ly">.ly</span></div>
              <div class="start-card-subtitle">Code Review Velocity Platform™</div>
            </div>
          </div>
          <p class="start-tagline">Move fast. Ship more. Stay in the stack.</p>
        </div>
        <div class="start-card-body">
          <div class="start-role">
            <p>Welcome back to MegaCorp.ly.</p>
            <p>Remember, that velocity is our #1 priority! You are to continue using <strong>"PRs Please"</strong> — MegaCorp's internal code review velocity platform.</p>
            <p>Your review velocity is being closely tracked and will factor heavily into your performance review.</p>
            <p>If your velocity falls too low, you will be PIP'd.</p>
          </div>
          <div class="start-actions">
            <button id="clock-in-btn" class="btn btn-okta">
              ${OKTA_O.replace('width="36" height="36"', 'width="20" height="20"')}
              Sign in with Okta
            </button>
          </div>
        </div>
      </div>
    </div>
  `
  document.getElementById('clock-in-btn')!.addEventListener('click', showOktaRedirect)
}

showStartScreen()

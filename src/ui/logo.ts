const MARK_PATH = 'M6,26 L6,6 L16,20 L26,6 L26,26'

export function logoMark(size: number = 32, bg = '#1f2328'): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <rect width="32" height="32" rx="6" fill="${bg}"/>
    <path d="${MARK_PATH}" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}

export function logoFull(opts: { iconSize?: number; fontSize?: string; onDark?: boolean } = {}): string {
  const { iconSize = 28, fontSize = '18px', onDark = false } = opts
  const wordColor = onDark ? '#ffffff' : '#1f2328'
  const lyColor   = onDark ? 'rgba(255,255,255,0.65)' : '#0969da'
  return `<span class="brand-logo" aria-label="MegaCorp.ly">
    ${logoMark(iconSize)}
    <span class="brand-wordmark" style="font-size:${fontSize};color:${wordColor}">MegaCorp<span class="brand-ly" style="color:${lyColor}">.ly</span></span>
  </span>`
}

export const COMPANY = 'MegaCorp.ly'

let _logoSeq = 0

export function logoMark(size: number = 32, bg?: string): string {
  const gid = `mcly-g-${_logoSeq++}`
  const bgAttr = bg
    ? `fill="${bg}"`
    : `fill="url(#${gid})"`
  const defs = bg ? '' : `
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stop-color="#7C3AED"/>
        <stop offset="100%" stop-color="#4338CA"/>
      </linearGradient>
    </defs>`
  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${defs}
    <rect width="32" height="32" rx="7" ${bgAttr}/>
    <path d="M6,26 L6,7 L16,18 L26,7 L26,26" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}

export function logoFull(opts: { iconSize?: number; fontSize?: string; onDark?: boolean } = {}): string {
  const { iconSize = 28, fontSize = '18px', onDark = false } = opts
  const wordColor = onDark ? '#ffffff' : '#1f2328'
  const lyColor   = onDark ? 'rgba(255,255,255,0.65)' : '#6D28D9'
  return `<span class="brand-logo" aria-label="MegaCorp.ly">
    ${logoMark(iconSize)}
    <span class="brand-wordmark" style="font-size:${fontSize};color:${wordColor}">MegaCorp<span class="brand-ly" style="color:${lyColor}">.ly</span></span>
  </span>`
}

export const COMPANY = 'MegaCorp.ly'

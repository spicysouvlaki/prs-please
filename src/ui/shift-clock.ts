const SHIFT_DURATION_MS = 8 * 60 * 1000
const SHIFT_DISPLAY_MINUTES = 9 * 60 // 08:00 → 17:00

export function renderShiftClock(shiftElapsed: number): string {
  const startMinutes = 8 * 60 // 08:00 in minutes from midnight
  const elapsedMinutes = Math.floor((shiftElapsed / SHIFT_DURATION_MS) * SHIFT_DISPLAY_MINUTES)
  const totalMinutes = startMinutes + elapsedMinutes

  const hours24 = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  const amPm = hours24 < 12 ? 'AM' : 'PM'

  const hh = String(hours12).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')

  return `<span class="shift-clock">${hh}:${mm} ${amPm}</span>`
}

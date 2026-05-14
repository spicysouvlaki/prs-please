export function renderShiftClock(shiftElapsed: number): string {
  // Shift starts at 08:00 AM, each ms of elapsed = 1ms real time
  const startMinutes = 8 * 60 // 08:00 in minutes from midnight
  const elapsedMinutes = Math.floor(shiftElapsed / 60000)
  const totalMinutes = startMinutes + elapsedMinutes

  const hours24 = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  const amPm = hours24 < 12 ? 'AM' : 'PM'

  const hh = String(hours12).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')

  return `<span class="shift-clock">${hh}:${mm} ${amPm}</span>`
}

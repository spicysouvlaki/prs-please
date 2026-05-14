# PRs Please — Architecture Notes

## What this is

A browser game about software engineering dysfunction. The player is a new hire at MegaCorp.ly, reviewing pull requests during an 8-minute shift while an AI co-worker (Brad++ 🤖) floods the queue. One PR is a supply chain attack. The three endings depend on whether you caught it, approved it, or just got a PIP for low throughput.

## Build

```
npm run build   # tsc + vite → dist/index.html (single-file bundle)
npm run dev     # dev server
```

Output is a single self-contained `index.html` via `vite-plugin-singlefile`. No server needed — just open the file.

## Game loop

```
main.ts → showStartScreen() → startGame()
  initState()
  render()
  setInterval(100ms):
    tick()   // advance time, spawn content, drift NPC scores
    render() // paint whatever changed
```

`tick.ts` mutates state directly (no dispatch). `render.ts` delegates to `renderDesktop` or `renderEnding` based on `state.shiftOver`.

## State

`src/state.ts` — single mutable `_state: GameState` object. No reactivity, no proxy. Changed by `dispatch(action)`. Read by `getState()`.

Key state fields:
- `pendingQueue / queue` — PRs move from pending → queue when `spawnAt <= shiftElapsed`
- `pendingSlack / slack`, `pendingNotifications / notifications`, `pendingNews / news` — same pattern
- `currentPRId` — which PR is shown in the panel (always `queue[0]` after each review)
- `currentDocTab` — which tab (diff or doc) is active
- `slackOpen / slackActiveChannel` — modal state
- `npcs[]` — NPC reviewers; each has `approveRatePerMin`, `approves` computed from elapsed time
- `attackApproved / attackCaught / crossTeamAskApproved` — used by `computeEnding()`

Ending logic in `computeEnding()`:
- `attackCaught` → `the-catch`
- `attackApproved && crossTeamAskApproved && approves >= 8` → `promoted-complicit`
- otherwise → `bottom-of-stack`

## Layout

`desktop.ts` creates the stable DOM shell once (guarded by `.desktop` existence check), then calls each region's render function on every tick:

```
#app
  .desktop
    #region-ticker     → renderNewsTicker()
    .main-area
      #region-pr       → renderPRPanel()
      .right-column
        #region-stack  → renderStackRank()
        #region-slack  → renderSlackPanel()
  #region-notifications → renderNotifications()
```

## Rendering patterns

### Skip-if-unchanged (most panels)

Every render function computes a string `key` from the state values it depends on. If the key matches the previous render, it returns early — no DOM write, no scroll reset, no flicker.

```typescript
let _prevKey = ''
export function renderX(container, state) {
  const key = `${relevant}:${fields}`
  if (key === _prevKey) return
  _prevKey = key
  container.innerHTML = `...`
}
```

Used by: `pr-panel`, `stack-rank`, `slack-panel`, `notifications`.

`news-ticker` is special: the clock updates every 100ms but news rarely changes. It updates the `.ticker-clock` element in-place and only rebuilds the full ticker when `news.length` changes.

### Event delegation for PR buttons

`desktop.ts` attaches one persistent click listener on `#region-pr` (the stable container). It uses `target.closest('#btn-approve')` etc. to handle clicks even after `renderPRPanel` replaces its innerHTML.

**Do not attach click listeners inside `renderPRPanel`** — they'll race with the 100ms loop and silently fail (mousedown on old element, innerHTML swap, mouseup fires on new element → no click event).

### Direct listeners for re-rendering panels

`slack-panel` and `notifications` re-attach their listeners after each render (after the innerHTML write). This works because skip-if-unchanged means renders are infrequent, so there's no listener accumulation.

## Content system

All content lives in `src/content/`. Each item has a `spawnAt: number` (milliseconds into the shift). `tick.ts` moves items from pending arrays to live arrays as time passes.

- `prs.ts` — all PRs including the attack PR (`truth: 'attack'`). Attack PR has a `tells` array for the reveal screen.
- `slack.ts` — scripted Slack messages (channels: `#eng-general`, `#growth-launch`, `#random`, `DM: Brad`, `DM: Manager`)
- `notifications.ts` — toast notifications (PagerDuty, calendar, LinkedIn, etc.)
- `news.ts` — ticker headlines
- `npcs.ts` — NPC seed data. Brad++ (`engineer-9000`) starts `active: false`, activates at 2:30 elapsed in `tick.ts`.

## UI components

| File | What it renders |
|------|----------------|
| `ui/desktop.ts` | Shell layout + event delegation |
| `ui/pr-panel.ts` | GitHub-style PR view (diff, docs, review bar) |
| `ui/stack-rank.ts` | Live leaderboard card |
| `ui/slack-panel.ts` | Sidebar card + modal with sidebar/channels/messages/input |
| `ui/notifications.ts` | Toast stack (fixed bottom-right) |
| `ui/news-ticker.ts` | Scrolling ticker + shift clock |
| `ui/ending.ts` | Ending card + attack reveal |
| `ui/logo.ts` | SVG logomark + `logoFull()` helper, exports `COMPANY = 'MegaCorp.ly'` |
| `ui/shift-clock.ts` | Formats elapsed ms as HH:MM shift time |

## Design system

CSS custom properties in `src/styles.css` (`:root` block):

- `--bg-page`, `--bg-card`, `--bg-sunken`, `--border` — surfaces
- `--text-primary`, `--text-secondary`, `--text-link` — text
- `--success`, `--danger`, `--warn` with `-bg` variants — semantic colors
- `--slack-sidebar: #4A154B`, `--slack-active: #1164A3` — Slack purple theme
- `--font-sans`, `--font-mono` — font stacks
- `--text-sm` through `--text-2xl` — type scale
- `--radius`, `--radius-lg`, `--radius-pill` — border radii

Aesthetic target: GitHub ~2016 for the PR surface, Slack circa 2017 for the chat panel.

Avatar colors are deterministic — `nameToColor(name)` hashes the name to one of 8 brand colors. Same name always gets the same color across all panels.

## Things that bite you

- **PR button clicks**: Must use event delegation on `#region-pr`. Per-render `addEventListener` on `#btn-approve` won't survive the 100ms innerHTML replacement.
- **Scroll reset**: Any `container.innerHTML = ...` resets scroll to 0. Use skip-if-unchanged. The PR panel's description can push the review bar below the visible area if it's too tall — `max-height: 80px; overflow-y: auto` on `.gh-pr-description` prevents this.
- **Slack overlay click-to-close**: The overlay listener checks `e.target === overlay` to avoid closing when clicking inside the modal content.
- **NPC score drift**: NPC `approves` is recomputed each tick as `floor(approveRatePerMin * elapsedMin)`, not incremented. This means it's always consistent with elapsed time rather than accumulating tick drift.

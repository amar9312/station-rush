# Station Rush — DMRC Peer-to-Peer Reporter Mockup Plan

## Context

Building mobile-first mockups for **Station Rush**, a crowd-sourced Delhi Metro (DMRC) station status app. Users report real-time conditions (delays, crowds, security, gate closures) and corroborate reports from others. Three screens as specified: Home (Live Network Overview), Station Hub (Station Detail), and Report Modal (2-tap bottom sheet).

---

## Aesthetic Stance

**Data-dense · Light mode · Blue accent**  
White ground with a strong blue system color — clean, civic, close to the Figma canvas the user already sees. Blue buttons, blue outlines, blue active states. DMRC line colors preserved for line-specific accents.

**Fonts (Google Fonts via CSS @import in src/index.css):**
- **Outfit** — display/headings (geometric, modern, station-name clarity)
- **Inter** — body/UI text (maximum legibility at small mobile sizes)
- **JetBrains Mono** — timestamps, counters, delay labels (structural mono for data)

**Palette (white ground, blue accent):**
- Background: `#F5F7FA`
- Card surface: `#FFFFFF`
- Border hairline: `#D1DCF0`
- Foreground: `#0D1B3E`
- Muted foreground: `#6B7A99`
- Primary blue: `#1D6FF2` (buttons, outlines, active states)
- Primary blue light: `#EBF2FF` (chip backgrounds, subtle fills)
- Status: Green `#16A34A` / Amber `#D97706` / Red `#DC2626`

**DMRC Line color tokens:**
- Yellow: `#F5C518`
- Blue: `#2979FF`
- Red: `#E53935`
- Pink: `#EC407A`
- Green: `#43A047`
- Violet: `#7E57C2`
- Orange: `#FB8C00`
- Aqua: `#00ACC1`
- Magenta: `#D81B60`

---

## Component-to-React Mapping

### Screen 1: `<HomeScreen />`
| Section | Component |
|---|---|
| Header + weather badge | `<AppHeader />` |
| Search bar | `<StationSearch />` |
| Alert banner | `<NetworkAlertBanner />` (conditionally rendered) |
| Line cards list | `<LineStatusList />` → `<LineCard />` per line |
| Recent activity | `<RecentActivityFeed />` → `<ActivityItem />` |

### Screen 2: `<StationScreen />`
| Section | Component |
|---|---|
| Station header + interchange pills | `<StationHeader />` |
| Heat index gauge card | `<HeatIndexGauge />` |
| Floating CTA | `<LogUpdateFAB />` |
| Report feed | `<CommunityReportFeed />` → `<ReportCard />` |
| Timetable fallback | `<BaselineTimetable />` |

### Screen 3: `<ReportModal />`  (bottom sheet overlay)
| Section | Component |
|---|---|
| Modal header + close | `<ModalHeader />` |
| Category chips | `<CategorySelector />` |
| Severity pills | `<SeverityRating />` |
| Comment input | `<CommentInput />` |
| Submit button | `<SubmitButton />` |

---

## File Structure

```
src/
  App.tsx                  — tabbed shell (Home / Station / Report demo)
  index.css                — @import Google Fonts + Tailwind + CSS tokens
  components/
    home/
      AppHeader.tsx
      StationSearch.tsx
      NetworkAlertBanner.tsx
      LineCard.tsx
      LineStatusList.tsx
      RecentActivityFeed.tsx
    station/
      StationHeader.tsx
      HeatIndexGauge.tsx
      LogUpdateFAB.tsx
      ReportCard.tsx
      CommunityReportFeed.tsx
      BaselineTimetable.tsx
    modal/
      ReportModal.tsx
      CategorySelector.tsx
      SeverityRating.tsx
      CommentInput.tsx
    shared/
      StatusPill.tsx        — reusable Normal/Surge/Delay pill
      LinePill.tsx          — reusable color-coded line badge
  data/
    mock.ts                 — all static mock data (stations, reports, lines, timetable)
```

---

## Mock Data (`src/data/mock.ts`)

Realistic Delhi Metro content:
- 9 lines with real terminal names (e.g., Yellow: Samaypur Badli ↔ Millennium City Centre)
- 1 active network alert (Yellow Line signal delay)
- 5 community reports for Rajiv Chowk with real categories, timestamps, upvote counts
- Timetable: next 4 arrivals at Rajiv Chowk on Yellow + Blue lines
- 3 recent activity items for the network feed

---

## Navigation / State

- `App.tsx` holds `activeScreen: 'home' | 'station' | 'modal'` state
- Clicking a `<LineCard />` or the "Rajiv Chowk" entry navigates to `<StationScreen />`
- "Log Station Update" FAB opens `<ReportModal />` as a bottom sheet
- A bottom nav or simple tab strip lets users switch between Home and Station during demo
- No router needed — single-page state machine is sufficient for mockups

---

## Implementation Steps

1. **`src/index.css`** — Add Google Fonts @imports (Outfit, Inter, JetBrains Mono) before `@import 'tailwindcss'`, then define CSS custom properties for all tokens (background, card, border, status colors, line colors).

2. **`src/data/mock.ts`** — Write all static data. This decouples components from hardcoded strings.

3. **Shared components** — `StatusPill`, `LinePill` (small, used everywhere).

4. **Home screen** — `AppHeader`, `StationSearch`, `NetworkAlertBanner`, `LineCard` + `LineStatusList`, `RecentActivityFeed`.

5. **Station screen** — `StationHeader`, `HeatIndexGauge` (SVG arc or CSS radial gradient gauge), `CommunityReportFeed` + `ReportCard`, `LogUpdateFAB`, `BaselineTimetable`.

6. **Report Modal** — `ReportModal` as a bottom-sheet overlay with slide-up animation, `CategorySelector`, `SeverityRating`, `CommentInput`.

7. **`App.tsx`** — Wire navigation state, render correct screen, include bottom nav strip.

---

## Verification

- Preview renders in mobile viewport (375px wide) without horizontal scroll
- All 3 screens reachable via in-app navigation
- Report modal opens from FAB and can be dismissed
- Category selector single-selects correctly; severity pills update state
- Comment counter counts down from 140
- No TypeScript errors; hot-reload works

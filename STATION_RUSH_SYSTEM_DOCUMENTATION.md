# Station Rush — System Architecture & Product Blueprint

## 1. Executive Summary & Brand Strategy

### 1.1 Product Vision
**Station Rush** is a real-time, crowdsourced transit intelligence portal designed specifically for urban commuters starting with the Delhi Metro Rail Corporation (DMRC) network. The application solves a critical commuting pain point: static timetables do not reflect real-time platform overcrowding, unexpected service bottlenecks, or security check delays. Station Rush prioritizes live platform crowd dynamics over static scheduling.

### 1.2 Metric Standard: "Station Rush"
To ensure immediate clarity and avoid cognitive friction, the system uses the explicit metric **Station Rush** (categorized into Low, Normal, and Heavy Rush) rather than abstract terms like "Heat Index", which commuters naturally confuse with weather forecasts.

* **Green (Low / No Rush):** Normal foot traffic; trains accessible immediately; smooth boarding.
* **Yellow (Normal Rush):** Typical peak-hour movement; minor platform queues; manageable boarding.
* **Red (Heavy Rush):** Extreme crowding; platform capacity limits; missed trains; severe security check bottlenecks.

### 1.3 Branding & Domain Architecture
The application adopts a **utility-first branding strategy**. Product reputation and user trust are prioritized over promoting parent organizational identities.

* **Primary Product Name:** Station Rush
* **Root Infrastructure Domain:** `apollonia.in`
* **Metro Portal Subdomain:** `metro.apollonia.in`
* **Parent Brand Strategy:** The "Apollonia" identity remains decoupled from public marketing during early adoption. As the platform gains traction, the subdomain structure allows seamless vertical expansion under a unified domain hierarchy:
  * `metro.apollonia.in` — Metro & Urban Rail (Station Rush)
  * `air.apollonia.in` — Air Travel & Airport Terminals (Terminal Rush / Security Rush)
  * `bus.apollonia.in` — Intercity Bus Terminals (Terminal Rush)

---

## 2. Core UX & Technical Philosophy

1. **Frictionless Crowd Sourcing:** 90%+ of commuters are anonymous guest users who require zero friction to report crowd conditions. The reporting workflow requires a maximum of **2 taps** with no account registration required.
2. **Instant Utility During Bottlenecks:** When major delays occur, commuters share direct station links on WhatsApp, Reddit, and Twitter/X. The page must render in under 1 second on cellular networks (3G/4G/5G).
3. **Optimistic UI Updates:** Submitting a report reflects instantly on the reporter's local client before server-side roundtrip confirmation.
4. **Time-Weighted Crowd Decay:** Crowdsourced reports decay exponentially over time. A report submitted 5 minutes ago carries significantly higher weight than a report submitted 45 minutes ago.

---

## 3. System Workflows & User Journeys

### Workflow A: Commuter Live Status Check (Read Journey)
```
[Commuter Opens App / Follows Link]
               │
               ▼
   ┌──────────────────────┐
   │  1. Network Overview │  <-- Line Statuses, System Health, Filter Bar
   └───────────┬──────────┘
               │ Select Line / Tap Station
               ▼
   ┌──────────────────────┐
   │  2. Station Detail   │  <-- Rush Gauge, Directional Split, Live Feed
   └──────────────────────┘
```
1. **Entry Point:** Commuter accesses `metro.apollonia.in` or scans a QR code at a metro entrance.
2. **Network Overview:** Shows major metro lines (Yellow, Blue, Red, Pink, Magenta, Violet, Airport Express) with aggregate rush badges.
3. **Line Filtering:** Commuter taps a line chip (e.g., "Yellow Line") to filter stations instantly.
4. **Station Selection:** Tapping a station card opens the **Station Detail View**, displaying:
   * **Live Rush Gauge:** Visual indicator showing aggregate status (Low/Normal/Heavy).
   * **Directional Breakdown:** Rush split by platform direction (e.g., Towards Samaypur Badli vs. Towards Millennium City Centre).
   * **Recency Indicator:** Timestamped feed of recent crowdsourced reports (e.g., "3 reports in last 10 mins").

---

### Workflow B: Commuter Crowdsourced Submission (Write Journey — 2-Tap Action)
```
[Station Detail View]
         │
         ▼ (Tap "Report Rush" Floating Action Button)
┌────────────────────────────────────────────────────────┐
│               Report Station Rush Modal                │
├────────────────────────────────────────────────────────┤
│  Step 1 (Tap 1): Select Rush Level                     │
│  [ Low / No Rush ]   [ Normal Rush ]   [ Heavy Rush ]  │
│                                                        │
│  Step 2 (Tap 2): Select Platform / Direction           │
│  ( ) Platform 1: Towards Samaypur Badli                │
│  ( ) Platform 2: Towards Millennium City Centre        │
│                                                        │
│  [ Submit Report ] (Auto-triggers or 1-tap confirm)   │
└────────────────────────────────────────────────────────┘
         │
         ▼
[Optimistic UI Update + Backend Ingestion via Inertia/API]
```
1. Commuter taps the prominent **"Report Rush"** button on the station page.
2. **Tap 1:** Commuter selects the observed crowd condition (Low, Normal, or Heavy).
3. **Tap 2:** Commuter selects platform direction (optional default to "Both Directions" if unselected).
4. System submits the payload with client timestamp, anonymized IP hash, and geo-fence verification (if location permissions are active).

---

### Workflow C: Rate Limiting & Anti-Spam (Background Engine)
```
[Incoming Report Payload]
           │
           ▼
┌───────────────────────────┐
│ Device Hash + IP Check    │ --> Duplicate within 3 mins? --> [ Drop Payload ]
└──────────┬────────────────┘
           │ Passed
           ▼
┌───────────────────────────┐
│ Time-Weighted Recalculation│ --> Update Redis Cache & Trigger WebSocket Event
└───────────────────────────┘
```
To prevent manipulation or spamming during rush hours:
* **Rate Limiting:** Maximum of 1 report per IP/Device ID per station every 3 minutes.
* **Weighted Calculation Formula:**
  $$	ext{Score} = \sum_{i=1}^{n} w_i \cdot 	ext{Weight}(t_i)$$
  where $	ext{Weight}(t) = e^{-\lambda t}$ (exponential time decay where reports lose 50% weight every 15 minutes).

---

## 4. Technical Architecture & Tech Stack

### 4.1 Monolithic Single-Repo Stack
The system is built as a single-repository monolith using **Laravel Breeze with Inertia.js, React, and TypeScript**.

* **Backend Framework:** Laravel 11 (PHP 8.3+)
* **Frontend Library:** React 18+ with TypeScript
* **Routing & State Bridge:** Inertia.js (eliminates complex API layers while retaining client-side SPA performance)
* **Styling Framework:** Tailwind CSS
* **Build Engine:** Vite
* **Database Layer:** PostgreSQL (relational storage for stations, lines, reports)
* **Caching & Real-Time Engine:** Redis (fast status caching) + Laravel Reverb (WebSocket server for pushing crowd updates without polling)

```
station-rush/
├── app/
│   ├── Http/Controllers/       # Station, Line, and Report Controllers
│   ├── Models/                 # Line, Station, Report models
│   └── Services/               # RushCalculationEngine service
├── database/
│   └── migrations/             # PostgreSQL schema definitions
├── resources/
│   └── js/
│       ├── Components/         # Reusable React UI Widgets
│       │   ├── LineFilterBar.tsx
│       │   ├── ReportModal.tsx
│       │   ├── RushGauge.tsx
│       │   └── StationCard.tsx
│       ├── Pages/              # Inertia Page Routes
│       │   ├── Overview.tsx
│       │   └── StationDetail.tsx
│       └── types/              # TypeScript Interfaces
│           └── index.d.ts
└── routes/
    └── web.php                 # Laravel Inertia web routes
```

---

## 5. Database Schema & Data Models

### PostgreSQL Schema Architecture

#### Table: `lines`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key, Auto-Increment | Unique line identifier |
| `name` | String | Not Null | e.g., "Yellow Line" |
| `slug` | String | Unique, Index | e.g., "yellow-line" |
| `color_code` | String | Not Null | Hex code e.g., "#FFCC00" |
| `sorting_order` | Integer | Default 0 | UI sorting priority |

#### Table: `stations`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key, Auto-Increment | Unique station identifier |
| `line_id` | Foreign Key | References `lines(id)` | Associated metro line |
| `name` | String | Not Null | e.g., "Rajiv Chowk" |
| `slug` | String | Unique, Index | e.g., "rajiv-chowk" |
| `code` | String | Nullable | Metro official code e.g., "RKCS" |
| `platform_1_direction` | String | Nullable | e.g., "Samaypur Badli" |
| `platform_2_direction` | String | Nullable | e.g., "Millennium City Centre" |
| `latitude` | Decimal | Nullable | GPS Latitude for geo-fencing |
| `longitude` | Decimal | Nullable | GPS Longitude for geo-fencing |

#### Table: `reports`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key, Auto-Increment | Unique report identifier |
| `station_id` | Foreign Key | References `stations(id)` | Target station |
| `platform_direction` | String | Nullable | "platform_1", "platform_2", or "both" |
| `rush_level` | Enum | 'low', 'normal', 'heavy' | Crowdsourced observation |
| `ip_hash` | String | Index | Anonymized SHA-256 IP hash |
| `created_at` | Timestamp | Index | Submission timestamp |

---

## 6. Frontend Component Architecture & TypeScript Definitions

### Core TypeScript Types (`resources/js/types/index.d.ts`)

```typescript
export type RushLevel = 'low' | 'normal' | 'heavy';

export interface Line {
    id: number;
    name: string;
    slug: string;
    color_code: string;
}

export interface Station {
    id: number;
    line_id: number;
    name: string;
    slug: string;
    code?: string;
    platform_1_direction?: string;
    platform_2_direction?: string;
    current_rush: RushLevel;
    recent_reports_count: number;
    updated_at_human: string;
    line?: Line;
}

export interface CrowdReportPayload {
    station_id: number;
    platform_direction: 'platform_1' | 'platform_2' | 'both';
    rush_level: RushLevel;
}
```

---

## 7. Developer Workflow & AI Integration Blueprint

To execute this project using AI-assisted development (Cursor, Roo Code, or Google Antigravity):

### 7.1 Setup Steps for Local Workbench
1. **Initialize Laravel Breeze:**
   ```bash
   composer create-project laravel/laravel station-rush
   cd station-rush
   composer require laravel/breeze --dev
   php artisan breeze:install react
   ```
2. **Environment Configuration:** Select **TypeScript**, **Inertia**, and **Tailwind CSS**.
3. **Database Migration:** Point `.env` to PostgreSQL and run `php artisan migrate`.

### 7.2 Agent Initialization Prompt (Cursor / Antigravity)
When starting a coding session inside Google Antigravity or Cursor with Gemini 2.5 / 3.1 Pro, inject the following context:

> **Agent Context Prompt:**
> "You are working on 'Station Rush', a real-time transit crowd tracker for the Delhi Metro hosted at metro.apollonia.in. Tech stack: Laravel 11 Breeze + Inertia.js + React + TypeScript + Tailwind CSS. 
> Core domain rules: Frictionless 2-tap crowd reporting, station pages render live status badges (Low/Normal/Heavy), single-repo structure. Please inspect the Figma-exported components in resources/js and refactor them into production-ready Inertia pages in resources/js/Pages and components in resources/js/Components."

---

## 8. Deployment & Operational Roadmap

1. **Phase 1: Alpha Core (Current)**
   * Single-repo setup on `metro.apollonia.in`.
   * Seed major Delhi Metro lines (Yellow, Blue, Violet, Red).
   * 2-tap anonymous reporting with Redis cache aggregation.

2. **Phase 2: Real-Time Polish**
   * Integrate Laravel Reverb WebSockets for real-time status gauge updates without page reload.
   * Add WhatsApp / Telegram share links for viral station status sharing.

3. **Phase 3: Multi-Vertical Scaling**
   * Launch `air.apollonia.in` (Terminal Rush / Security Check queues) leveraging the identical backend framework.

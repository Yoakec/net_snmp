# Patching Dashboard Design Document

**Date:** 2026-04-23
**Component:** PatchingDashboard

## Overview

Enterprise IT operations management dashboard for patch compliance monitoring. High data density dashboard with multiple charts and statistics lists.

**Tech Stack:** Vue 3 (Composition API / `<script setup>`), Tailwind CSS v4, Apache ECharts 5.x

## Visual & Layout Guidelines

**Theme:** Light mode, clean SaaS enterprise backend style

**Colors:**
- Global background: `bg-slate-50`
- Card containers: `bg-white border border-gray-200 rounded-lg` (no shadow)
- Primary: `blue-500` / `blue-600`

**Grid Layout:**
- Desktop (>= 1024px): `grid-cols-3`, `gap-6`
- Tablet (>= 768px): `grid-cols-2`, `gap-4`
- Mobile (< 768px): `grid-cols-1`, `gap-4`

## Module Breakdown

### 1. DashboardHeader
**Location:** Header section above all cards

**Content:**
- Dashboard icon + "Dashboard" title (`text-xl font-bold`)
- Tab navigation: Overview, Devices, Patching (active), Software, Vulnerabilities
- Filter bar: OS type, Device role, Patch category, Device state (select/dropdown placeholders)

**Interactions:**
- Tab clicking changes active state
- Filters emit change events (no API integration yet)

### 2. ComplianceCard
**Position:** Row 1, Col 1 (1 column span)

**Content:**
- Large compliance rate: "78.38%" + "(174/222 devices)"
- Tailwind progress bar (blue for completed portion)
- 4-row stat list (left-right justify: label + percentage/value)

**Mock Stats:**
- Device patch enablement: 100%
- OS compliance: 78.38%
- Critical patch coverage: 82.5%
- Patch success rate: 96.2%

### 3. InstalledPatchesCard
**Position:** Row 1, Col 2 (1 column span)

**Content:**
- Left: ECharts donut chart with center text "79.08%"
- Right: Custom HTML legend (color dot + label + value)

**Donut Data:**
- Installed: 13,936 (green `#22c55e`)
- Approved: 15 (gray `#94a3b8`)
- Failed: 3 (red `#ef4444`)
- Pending: 13 (yellow `#eab308`)

**Chart Config:**
- No ECharts legend (use custom HTML legend)
- Type: pie with inner radius
- Center displays percentage

### 4. OSVersionCard
**Position:** Row 1-2, Col 3 (2 column row span)

**Content:**
- ECharts horizontal bar chart
- Y-axis: OS version names
- X-axis: Hidden
- Labels: Displayed to the right of each bar
- Bar color: Uniform blue

**Data:**
- Windows 10: 11
- Windows Server 2019: 6
- CentOS Linux 8: 4
- Windows Server 2016: 4
- Ubuntu 20.04: 2
- Windows 11: 3
- macOS 10: 1
- Fedora 34: 1

### 5. TopDevicesCard
**Position:** Row 2, Col 1 (1 column span)

**Content:**
- HTML/Tailwind list
- Left: System icon placeholder + blue device name
- Right: Count value

**Mock Data:**
- AUS-DEMOVEN-11.local: 10
- sup-monterey-jh1b: 6
- HVWINSVR201601: 2
- M1-BigSur.local: 2
- SALESADDEMOW10: 2

### 6. PatchAgeCard
**Position:** Row 2, Col 2 (1 column span)

**Content:**
- ECharts vertical bar chart
- X-axis categories: "0-30", "30-60", "60-89", ">90"
- Y-axis values
- Bar color: Purple (`#8b5cf6`)
- Top labels: Enabled (`position: 'top'`)

**Data:**
- 0-30 days: 57
- 30-60 days: 89
- 60-89 days: 37
- >90 days: 28

## Architecture

**Component Hierarchy:**
```
PatchingDashboard.vue (Parent)
├── DashboardHeader.vue
├── ComplianceCard.vue
├── InstalledPatchesCard.vue
├── OSVersionCard.vue
├── TopDevicesCard.vue
└── PatchAgeCard.vue
```

**Composables:**
- `useECharts` - Generic chart initialization, resize (debounced), cleanup
- `useDashboardData` - Mock data source (replaceable with API)

**Data Flow:**
- Parent provides mock data via props to all child cards
- Parent emits filter changes to DashboardHeader
- Tab state managed in parent

## Technical Implementation Details

### ECharts Configuration
**Import:** `import * as echarts from 'echarts'`

**Common Settings:**
- `animation: false` (cleaner load)
- Tooltips: `trigger: 'item'` (basic hover values)
- Font sizes: 12px labels, 10px axis labels
- Responsive: `chart.resize()` on window resize (200ms debounced)

**Chart Types:**
- Donut: `type: 'pie'`, `radius: ['60%', '80%']`
- Horizontal Bar: `type: 'bar'`, inverted Y/X axes
- Vertical Bar: `type: 'bar'`, standard orientation

### Lifecycle Management
```javascript
onMounted() {
  initCharts()
  window.addEventListener('resize', handleResize)
}

onUnmounted() {
  window.removeEventListener('resize', handleResize)
  charts.forEach(chart => chart.dispose())
}
```

### Resize Debouncing
```javascript
let resizeTimer
function handleResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    charts.forEach(chart => chart.resize())
  }, 200)
}
```

## Accessibility
- Semantic HTML: `<article>`, `<section>`, `<h3>` for card titles
- ARIA labels on interactive elements
- Proper heading hierarchy
- Focus states on all interactive elements

## Integration Notes

**Adding to Existing App:**
- Import `PatchingDashboard.vue` in main `App.vue`
- Add new nav item to sidebar: "补丁管理"
- Update `TrendingDashboard.vue` nav items array

**ECharts Dependency:**
- Install: `npm install echarts`
- Full bundle (no tree-shaking needed for this scope)

## Future Enhancements (Out of Scope)

- API integration for real-time data
- Drill-down functionality on chart clicks
- Export capabilities
- User preference persistence
- More granular filter controls
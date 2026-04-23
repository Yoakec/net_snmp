## Why

The IT operations management platform currently lacks a comprehensive dashboard for monitoring patch compliance across devices. This creates a visibility gap where administrators cannot quickly assess patch deployment status, identify overdue devices, or track patch age distributions - all critical for maintaining security posture and compliance.

## What Changes

- Add a new **Patching Dashboard** component with high data density visualizations
- Integrate Apache ECharts for three chart types (donut, horizontal bar, vertical bar)
- Implement five dashboard cards with mock data:
  - Compliance card with progress bar and statistics
  - Installed patches donut chart with custom legend
  - OS version horizontal bar chart (spans 2 rows)
  - Top devices list with pending patch counts
  - Patch age vertical bar chart
- Add top navigation with tabs and filter controls (OS type, device role, patch category, device state)
- Implement responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Style with clean SaaS enterprise theme (light mode, blue accent)

## Capabilities

### New Capabilities
- `patching-dashboard`: Patch compliance monitoring dashboard with charts, statistics, and device listings

### Modified Capabilities
- None

## Impact

- New component: `src/components/PatchingDashboard.vue`
- New dependency: Apache ECharts 5.x via `npm install echarts`
- Integration: Add nav item "补丁管理" to existing navigation
- No breaking changes - purely additive feature
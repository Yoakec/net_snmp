## 1. Setup and Dependencies

- [x] 1.1 Install Apache ECharts 5.x dependency (`npm install echarts`)
- [x] 1.2 Verify installation and check for any conflicts with existing dependencies

## 2. Create PatchingDashboard Component Structure

- [x] 2.1 Create `src/components/PatchingDashboard.vue` as single file component
- [x] 2.2 Set up component with Vue 3 Composition API (`<script setup>`)
- [x] 2.3 Define mock data refs for all dashboard cards in `<script setup>`

## 3. Implement Mock Data

- [x] 3.1 Define installed patches donut chart data (Installed: 13936, Approved: 15, Failed: 3, Pending: 13)
- [x] 3.2 Define OS version bar chart data (8 OS versions with device counts)
- [x] 3.3 Define top devices list data (5 devices with patch counts)
- [x] 3.4 Define patch age bar chart data (4 age ranges with patch counts)
- [x] 3.5 Define compliance statistics data (4 stat items with labels and values)

## 4. Implement Template Structure

- [x] 4.1 Create main container with `bg-slate-50` background
- [x] 4.2 Implement header section with dashboard icon, title, and tabs
- [x] 4.3 Add tab navigation (Overview, Devices, Patching active, Software, Vulnerabilities)
- [x] 4.4 Create filter controls row (OS type, Device role, Patch category, Device state)
- [x] 4.5 Set up responsive grid container (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with gaps)

## 5. Implement Compliance Card

- [x] 5.1 Create card container with white background, border, rounded corners, no shadow
- [x] 5.2 Display compliance percentage "78.38%" with "(174/222 devices)" subtitle
- [x] 5.3 Implement blue progress bar showing 78.38% completion
- [x] 5.4 Create statistics list with 4 items (label left, value right aligned)

## 6. Implement Installed Patches Card (Donut Chart)

- [x] 6.1 Create card container with flex layout (chart left, legend right)
- [x] 6.2 Set up ECharts donut chart DOM ref with proper height/width
- [x] 6.3 Implement donut chart configuration (inner 60%, outer 80%, 4 segments with colors)
- [x] 6.4 Add center text "79.08%" to donut chart
- [x] 6.5 Create custom HTML legend with color dots, labels, and values
- [x] 6.6 Disable ECharts native legend

## 7. Implement OS Version Card (Horizontal Bar Chart)

- [x] 7.1 Create card container with `row-span-2` for desktop layout
- [x] 7.2 Set up ECharts horizontal bar chart DOM ref with proper height/width
- [x] 7.3 Implement bar chart configuration (Y-axis: OS names, horizontal bars, hidden X-axis)
- [x] 7.4 Configure uniform blue color for all bars
- [x] 7.5 Add value labels to the right of each bar

## 8. Implement Top Devices Card

- [x] 8.1 Create card container
- [x] 8.2 Implement device list with 5 items (icon + device name left, count right)
- [x] 8.3 Style device names in blue
- [x] 8.4 Add system icon placeholders for each device

## 9. Implement Patch Age Card (Vertical Bar Chart)

- [x] 9.1 Create card container
- [x] 9.2 Set up ECharts vertical bar chart DOM ref with proper height/width
- [x] 9.3 Implement bar chart configuration (X-axis: age ranges, Y-axis: patch counts)
- [x] 9.4 Configure purple color (#8b5cf6) for all bars
- [x] 9.5 Add value labels on top of each bar

## 10. Implement ECharts Lifecycle Management

- [x] 10.1 Import echarts library in component
- [x] 10.2 Create refs for all 3 chart DOM elements
- [x] 10.3 Create array to store chart instances for cleanup
- [x] 10.4 Implement chart initialization function in `onMounted`
- [x] 10.5 Initialize donut chart with correct configuration
- [x] 10.6 Initialize OS version bar chart with correct configuration
- [x] 10.7 Initialize patch age bar chart with correct configuration
- [x] 10.8 Implement 200ms debounced resize handler
- [x] 10.9 Add window resize event listener in `onMounted`
- [x] 10.10 Implement cleanup in `onUnmounted` (remove event listener, dispose charts)

## 11. Apply Styling and Theme

- [x] 11.1 Ensure all cards use `bg-white border border-gray-200 rounded-lg` (no shadow)
- [x] 11.2 Verify active tab styling (bold text with blue underline)
- [x] 11.3 Apply responsive gap utilities (`gap-4 md:gap-6`)
- [x] 11.4 Verify typography consistency with existing components

## 12. Test Responsive Behavior

- [x] 12.1 Test desktop layout (>= 1024px) with 3 columns
- [x] 12.2 Test tablet layout (768px - 1024px) with 2 columns
- [x] 12.3 Test mobile layout (< 768px) with 1 column
- [x] 12.4 Verify OS version card spans 2 rows on desktop

## 13. Integration and Navigation

- [x] 13.1 Update navigation in app to include "补丁管理" link
- [x] 13.2 Import PatchingDashboard component in App.vue or router
- [x] 13.3 Test component renders correctly in app context
- [x] 13.4 Verify no console errors or warnings

## 14. Final Verification

- [x] 14.1 Verify all mock data displays correctly
- [x] 14.2 Test ECharts resize behavior across viewport changes
- [x] 14.3 Verify no memory leaks on component mount/unmount cycles
- [x] 14.4 Cross-browser testing (Chrome, Firefox, Safari if available)
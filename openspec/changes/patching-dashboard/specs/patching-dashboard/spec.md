## ADDED Requirements

### Requirement: Display dashboard header with tabs and filters

The dashboard SHALL display a header section containing a dashboard icon and title, a tab navigation bar, and a row of filter controls.

#### Scenario: Header displays title and icon
- **WHEN** dashboard is rendered
- **THEN** header shows a dashboard icon and "Dashboard" title with text-xl font-bold styling

#### Scenario: Tab navigation displays all options
- **WHEN** dashboard is rendered
- **THEN** tabs show "Overview", "Devices", "Patching", "Software", "Vulnerabilities"
- **AND** "Patching" tab is marked as active with bold text and blue underline

#### Scenario: Filter controls display placeholders
- **WHEN** dashboard is rendered
- **THEN** filter row contains selectors for "OS type", "Device role", "Patch category", "Device state: Online..."

### Requirement: Display compliance card with progress bar

The dashboard SHALL display a compliance card showing overall patch compliance percentage, a progress bar, and a list of statistics.

#### Scenario: Compliance percentage displays
- **WHEN** dashboard is rendered
- **THEN** compliance card shows "78.38%" with "(174/222 devices)" subtitle

#### Scenario: Progress bar displays completion
- **WHEN** dashboard is rendered
- **THEN** a blue progress bar shows 78.38% completion
- **AND** progress bar uses Tailwind styling with appropriate width

#### Scenario: Statistics list displays
- **WHEN** dashboard is rendered
- **THEN** 4 statistics display in a list with labels left-aligned and values right-aligned

### Requirement: Display installed patches donut chart with custom legend

The dashboard SHALL display an installed patches card with an ECharts donut chart on the left and a custom HTML legend on the right.

#### Scenario: Donut chart displays center percentage
- **WHEN** dashboard is rendered
- **THEN** donut chart shows "79.08%" in the center
- **AND** chart uses inner radius 60% and outer radius 80%

#### Scenario: Donut chart displays all data segments
- **WHEN** dashboard is rendered
- **THEN** chart displays 4 segments: Installed (green), Approved (gray), Failed (red), Pending (yellow)
- **AND** segment values match mock data (13936, 15, 3, 13)

#### Scenario: Custom legend displays
- **WHEN** dashboard is rendered
- **THEN** HTML legend shows color dots, labels, and values for each segment
- **AND** ECharts native legend is disabled

### Requirement: Display OS version horizontal bar chart

The dashboard SHALL display an OS version card with an ECharts horizontal bar chart that spans 2 rows in the grid layout.

#### Scenario: Bar chart spans 2 rows
- **WHEN** dashboard is rendered on desktop
- **THEN** OS version card uses row-span-2 class to occupy vertical space

#### Scenario: Bar chart displays all OS versions
- **WHEN** dashboard is rendered
- **THEN** Y-axis displays all 8 OS version names
- **AND** horizontal bars show corresponding device counts
- **AND** X-axis is hidden
- **AND** value labels display to the right of each bar

#### Scenario: Bar chart uses uniform color
- **WHEN** dashboard is rendered
- **THEN** all bars use the same blue color

### Requirement: Display top devices list with pending patch counts

The dashboard SHALL display a top devices card listing devices with the highest number of pending patches.

#### Scenario: Device list displays top 5 devices
- **WHEN** dashboard is rendered
- **THEN** list shows 5 devices with highest pending patch counts

#### Scenario: Device name displays with icon
- **WHEN** dashboard is rendered
- **THEN** each row shows a system icon placeholder followed by device name in blue
- **AND** pending count displays on the right side

#### Scenario: Mock data matches specification
- **WHEN** dashboard is rendered
- **THEN** list includes AUS-DEMOVEN-11.local (10), sup-monterey-jh1b (6), and other top devices

### Requirement: Display patch age vertical bar chart

The dashboard SHALL display a patch age card with an ECharts vertical bar chart showing approved and pending patches by age.

#### Scenario: Bar chart displays age categories
- **WHEN** dashboard is rendered
- **THEN** X-axis displays 4 categories: "0-30", "30-60", "60-89", ">90"
- **AND** Y-axis shows corresponding patch counts (57, 89, 37, 28)

#### Scenario: Bar chart uses purple color
- **WHEN** dashboard is rendered
- **THEN** all bars use purple color (#8b5cf6)

#### Scenario: Value labels display on top
- **WHEN** dashboard is rendered
- **THEN** each bar displays its value on top (position: 'top')

### Requirement: Implement responsive grid layout

The dashboard SHALL use a responsive CSS Grid layout that adapts to different viewport sizes.

#### Scenario: Desktop layout uses 3 columns
- **WHEN** viewport width is >= 1024px
- **THEN** grid uses grid-cols-3 with gap-6 spacing

#### Scenario: Tablet layout uses 2 columns
- **WHEN** viewport width is >= 768px and < 1024px
- **THEN** grid uses grid-cols-2 with gap-4 spacing

#### Scenario: Mobile layout uses 1 column
- **WHEN** viewport width is < 768px
- **THEN** grid uses grid-cols-1 with gap-4 spacing

### Requirement: Implement ECharts lifecycle management

The dashboard SHALL properly initialize and clean up ECharts chart instances.

#### Scenario: Charts initialize on mount
- **WHEN** dashboard component mounts
- **THEN** all chart instances initialize with correct configurations

#### Scenario: Charts resize on window resize
- **WHEN** window is resized
- **THEN** all chart instances call resize() after 200ms debounce

#### Scenario: Charts dispose on unmount
- **WHEN** dashboard component unmounts
- **THEN** all chart instances call dispose() to prevent memory leaks

### Requirement: Apply SaaS enterprise styling

The dashboard SHALL use a clean SaaS enterprise visual style with specific color scheme.

#### Scenario: Global background uses light gray
- **WHEN** dashboard is rendered
- **THEN** background uses bg-slate-50

#### Scenario: Cards use white background
- **WHEN** dashboard is rendered
- **THEN** all cards use bg-white with border border-gray-200 and rounded-lg
- **AND** no shadow is applied

#### Scenario: Primary color is blue
- **WHEN** dashboard is rendered
- **THEN** active tabs, progress bars, and chart accents use blue-500/blue-600

***

# 补丁管理看板 (Patching Dashboard) 前端开发需求文档

## 1. 概述 (Overview)
我们需要开发一个企业级 IT 运维管理平台的「补丁管理 (Patching Dashboard)」页面。该页面具有较高的数据密度，包含多种图表和统计列表。
- **技术栈**：Vue 3 (Composition API / `<script setup>`), Tailwind CSS, Apache ECharts 5.x。
- **输出要求**：请输出一个完整的单文件组件 (`.vue`)，包含所有模板、逻辑和样式。

## 2. 视觉与布局规范 (Design & Layout Guidelines)
- **主题风格**：浅色模式，清爽的 SaaS 企业级后台风格。
- **色彩定义**：
  - 全局背景：浅灰色 (`bg-slate-50` 或 `bg-gray-50`)。
  - 卡片容器：纯白背景 (`bg-white`)，带极轻微的边框 (`border border-gray-200`) 和基础圆角 (`rounded-lg`)，**不使用投影 (no shadow)**。
  - 主题色：经典蓝 (`blue-500` / `blue-600`)，用于高亮、激活状态的 Tab 以及主图表颜色。
- **栅格系统**：主体看板区域在 PC 端采用 CSS Grid 布局，划分为 3 列 (`grid-cols-3`)，间距设为 `gap-4` 或 `gap-6`。

## 3. 页面模块拆解 (Module Breakdown)

### 3.1 顶部控制台 (Top Navigation & Filters)
- **Header 行**：包含仪表盘 Icon 和标题 "Dashboard" (`text-xl font-bold`)。
- **Tab 导航**：水平排列，包含 "Overview", "Devices", "**Patching**" (当前激活，字体加粗，底部带蓝色下划线标识), "Software", "Vulnerabilities", 等。
- **筛选条件栏**：一排内联的选择器（Select/Dropdown 占位 UI），如 "OS type", "Device role", "Patch category", "Device state: Online..."。

### 3.2 核心数据面板 (Dashboard Grid - 重点)
请严格遵循以下卡片的跨行列布局。

#### 卡片 1: 补丁合规性 (Patching compliance)
- **布局**：占据 1 列。
- **内容**：
  - 顶部显示大号完成率 "78.38%" 及说明 "(174/222 devices)"。
  - 中间使用 Tailwind 原生 HTML 实现一个进度条 (Progress Bar)，蓝色表示完成部分。
  - 底部是一个 4 行的统计列表（左右两端对齐，显示文本如 "Device patch enablement" 和百分比/数值）。

#### 卡片 2: 已安装补丁概览 (Patches installed)
- **布局**：占据 1 列。
- **内容**：左右 Flex 布局。
  - **左侧 (ECharts)**：实现一个**环形图 (Donut Chart)**。中心显示 "79.08%"。数据项包括 Installed (绿), Approved (灰), Failed (红), Pending (黄)。关闭 ECharts 默认图例。
  - **右侧 (自定义图例)**：使用 HTML/Tailwind 渲染图例列表，包含颜色点、标签文本和具体数值。

#### 卡片 3: 操作系统版本统计 (Device count by OS version)
- **布局**：占据 1 列，**跨越 2 行 (`row-span-2`)**，位于页面最右侧。
- **内容**：
  - 使用 **ECharts** 实现一个**水平条形图 (Horizontal Bar Chart)**。
  - 隐藏 X 轴和网格线，Y 轴显示具体的 OS 名称，条形图使用统一的蓝色，并在柱子右侧显示具体数量标签。

#### 卡片 4: 待处理补丁 Top 10 设备 (Top devices...)
- **布局**：占据 1 列（位于卡片 1 下方）。
- **内容**：纯 HTML/Tailwind 列表。左侧为系统图标占位 + 蓝色的设备名称，右侧为数值。

#### 卡片 5: 补丁账龄分析 (Approved and pending patches by age)
- **布局**：占据 1 列（位于卡片 2 下方）。
- **内容**：
  - 使用 **ECharts** 实现一个**垂直柱状图 (Vertical Bar Chart)**。
  - X 轴标签为 "0-30", "30-60", "60-89", ">90"。
  - 柱子颜色统一使用紫色 (`#8b5cf6` 或类似 Tailwind 的 purple-500)，开启 `label: { show: true, position: 'top' }` 显示数值。

## 4. 图表数据字典 (Mock Data)
请在 `<script setup>` 中初始化这些数据，并绑定到 ECharts 实例及模板中：

```javascript
// 卡片 2: 环形图数据
const installedPatchesData = [
  { value: 13936, name: 'Installed', itemStyle: { color: '#22c55e' } },
  { value: 15, name: 'Approved', itemStyle: { color: '#94a3b8' } },
  { value: 3, name: 'Failed', itemStyle: { color: '#ef4444' } },
  { value: 13, name: 'Pending', itemStyle: { color: '#eab308' } }
];

// 卡片 3: 水平条形图数据 (注意 ECharts Y轴数据顺序通常是从下到上)
const osVersionData = {
  categories: ['Fedora 34', 'macOS 10', 'Windows 11', 'Ubuntu 20.04', 'Windows Server 2016', 'CentOS Linux 8', 'Windows Server 2019', 'Windows 10'],
  values: [1, 1, 3, 2, 4, 4, 6, 11]
};

// 卡片 4: 列表数据
const topDevices = [
  { name: 'AUS-DEMOVEN-11.local', count: 10 },
  { name: 'sup-monterey-jh1b', count: 6 },
  { name: 'HVWINSVR201601', count: 2 },
  { name: 'M1-BigSur.local', count: 2 },
  { name: 'SALESADDEMOW10', count: 2 }
];

// 卡片 5: 垂直柱状图数据
const patchAgeData = {
  categories: ['0-30', '30-60', '60-89', '>90'],
  values: [57, 89, 37, 28]
};
```

## 5. 技术实施细节与要求 (Implementation Details)
1. **ECharts 按需/全局引入**：请在 `<script setup>` 中使用 `import * as echarts from 'echarts'`，并利用 `ref` 获取 DOM 节点。
2. **生命周期管理**：在 `onMounted` 中初始化图表，并提供基本的 `window.addEventListener('resize', chart.resize)` 逻辑，以保证响应式适配。
3. **隔离性**：请确保 ECharts 容器必须指定明确的 `height` 和 `width: 100%`，防止图表渲染塌陷。
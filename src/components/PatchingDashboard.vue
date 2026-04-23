<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Dashboard Header -->
    <header class="bg-white border-b border-gray-200 px-8 py-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center gap-3 mb-6">
          <svg class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <h1 class="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <!-- Tab Navigation -->
        <nav class="flex gap-8 mb-6">
          <a href="#" class="text-sm text-gray-600 hover:text-gray-900 pb-2 border-b-2 border-transparent">Overview</a>
          <a href="#" class="text-sm text-gray-600 hover:text-gray-900 pb-2 border-b-2 border-transparent">Devices</a>
          <a href="#" class="text-sm font-bold text-gray-900 pb-2 border-b-2 border-blue-500">Patching</a>
          <a href="#" class="text-sm text-gray-600 hover:text-gray-900 pb-2 border-b-2 border-transparent">Software</a>
          <a href="#" class="text-sm text-gray-600 hover:text-gray-900 pb-2 border-b-2 border-transparent">Vulnerabilities</a>
        </nav>

        <!-- Filter Controls -->
        <div class="flex flex-wrap gap-4">
          <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">
            <option>OS type</option>
          </select>
          <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">
            <option>Device role</option>
          </select>
          <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">
            <option>Patch category</option>
          </select>
          <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">
            <option>Device state: Online...</option>
          </select>
        </div>
      </div>
    </header>

    <!-- Dashboard Grid -->
    <div class="max-w-7xl mx-auto p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <!-- Compliance Card -->
        <article class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-sm font-semibold text-gray-900 mb-4">Patching compliance</h3>
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-gray-900">78.38%</div>
            <div class="text-sm text-gray-500">(174/222 devices)</div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div class="bg-blue-500 h-2 rounded-full" style="width: 78.38%"></div>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Device patch enablement</span>
              <span class="font-medium">100%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">OS compliance</span>
              <span class="font-medium">78.38%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Critical patch coverage</span>
              <span class="font-medium">82.5%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Patch success rate</span>
              <span class="font-medium">96.2%</span>
            </div>
          </div>
        </article>

        <!-- Installed Patches Card -->
        <article class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-sm font-semibold text-gray-900 mb-4">Patches installed</h3>
          <div class="flex gap-6">
            <div class="flex-1" ref="donutChartRef" style="height: 200px; width: 100%;"></div>
            <div class="flex-1 flex flex-col justify-center gap-3">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" style="background-color: #22c55e;"></div>
                <span class="text-sm text-gray-600 flex-1">Installed</span>
                <span class="text-sm font-medium">13,936</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" style="background-color: #94a3b8;"></div>
                <span class="text-sm text-gray-600 flex-1">Approved</span>
                <span class="text-sm font-medium">15</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" style="background-color: #ef4444;"></div>
                <span class="text-sm text-gray-600 flex-1">Failed</span>
                <span class="text-sm font-medium">3</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" style="background-color: #eab308;"></div>
                <span class="text-sm text-gray-600 flex-1">Pending</span>
                <span class="text-sm font-medium">13</span>
              </div>
            </div>
          </div>
        </article>

        <!-- OS Version Card (spans 2 rows) -->
        <article class="bg-white border border-gray-200 rounded-lg p-6 lg:row-span-2">
          <h3 class="text-sm font-semibold text-gray-900 mb-4">Device count by OS version</h3>
          <div ref="osVersionChartRef" style="height: 400px; width: 100%;"></div>
        </article>

        <!-- Top Devices Card -->
        <article class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-sm font-semibold text-gray-900 mb-4">Top devices with pending patches</h3>
          <div class="space-y-3">
            <div v-for="device in topDevices" :key="device.name" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-sm text-blue-600 font-medium">{{ device.name }}</span>
              </div>
              <span class="text-sm font-medium text-gray-900">{{ device.count }}</span>
            </div>
          </div>
        </article>

        <!-- Patch Age Card -->
        <article class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-sm font-semibold text-gray-900 mb-4">Approved and pending patches by age</h3>
          <div ref="patchAgeChartRef" style="height: 200px; width: 100%;"></div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const donutChartRef = ref(null)
const osVersionChartRef = ref(null)
const patchAgeChartRef = ref(null)

const installedPatchesData = [
  { value: 13936, name: 'Installed', itemStyle: { color: '#22c55e' } },
  { value: 15, name: 'Approved', itemStyle: { color: '#94a3b8' } },
  { value: 3, name: 'Failed', itemStyle: { color: '#ef4444' } },
  { value: 13, name: 'Pending', itemStyle: { color: '#eab308' } }
]

const osVersionData = {
  categories: ['Fedora 34', 'macOS 10', 'Windows 11', 'Ubuntu 20.04', 'Windows Server 2016', 'CentOS Linux 8', 'Windows Server 2019', 'Windows 10'],
  values: [1, 1, 3, 2, 4, 4, 6, 11]
}

const topDevices = [
  { name: 'AUS-DEMOVEN-11.local', count: 10 },
  { name: 'sup-monterey-jh1b', count: 6 },
  { name: 'HVWINSVR201601', count: 2 },
  { name: 'M1-BigSur.local', count: 2 },
  { name: 'SALESADDEMOW10', count: 2 }
]

const patchAgeData = {
  categories: ['0-30', '30-60', '60-89', '>90'],
  values: [57, 89, 37, 28]
}

const chartInstances = []

let resizeTimer = null

const initCharts = () => {
  if (donutChartRef.value) {
    const donutChart = echarts.init(donutChartRef.value)
    donutChart.setOption({
      tooltip: { trigger: 'item' },
      legend: { show: false },
      series: [{
        type: 'pie',
        radius: ['60%', '80%'],
        data: installedPatchesData,
        label: { show: false }
      }],
      graphic: [{
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '79.08%',
          fontSize: 24,
          fontWeight: 'bold',
          fill: '#1f2937'
        }
      }]
    })
    chartInstances.push(donutChart)
  }

  if (osVersionChartRef.value) {
    const osVersionChart = echarts.init(osVersionChartRef.value)
    osVersionChart.setOption({
      grid: { left: '10%', right: '15%', top: '10%', bottom: '10%' },
      xAxis: { show: false },
      yAxis: {
        type: 'category',
        data: osVersionData.categories,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { fontSize: 11 }
      },
      series: [{
        type: 'bar',
        data: osVersionData.values,
        itemStyle: { color: '#3b82f6' },
        label: {
          show: true,
          position: 'right',
          fontSize: 11
        }
      }]
    })
    chartInstances.push(osVersionChart)
  }

  if (patchAgeChartRef.value) {
    const patchAgeChart = echarts.init(patchAgeChartRef.value)
    patchAgeChart.setOption({
      grid: { left: '10%', right: '10%', top: '15%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: patchAgeData.categories,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { fontSize: 11 }
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'bar',
        data: patchAgeData.values,
        itemStyle: { color: '#8b5cf6' },
        label: {
          show: true,
          position: 'top',
          fontSize: 11
        }
      }]
    })
    chartInstances.push(patchAgeChart)
  }
}

const handleResize = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    chartInstances.forEach(chart => chart.resize())
  }, 200)
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstances.forEach(chart => chart.dispose())
})
</script>

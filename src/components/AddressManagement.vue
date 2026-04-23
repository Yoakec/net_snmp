<template>
  <div class="flex h-full">
    <!-- Inner Left: Subnet Navigation Tree -->
    <div class="subnet-nav-tree w-64 flex flex-col bg-white border-r border-gray-200 shrink-0">
      <div class="px-4 pt-4 pb-2">
        <h3 class="text-sm font-bold text-gray-900 mb-3">可用子网</h3>
      </div>

      <div class="flex-1 overflow-y-auto px-2 py-1">
        <div
          v-for="subnet in subnetList"
          :key="subnet.cidr"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors"
          :class="selectedSubnet === subnet.cidr
            ? 'subnet-item-active bg-teal-50 text-teal-700 font-medium'
            : 'text-gray-600 hover:bg-gray-50'"
          @click="selectedSubnet = subnet.cidr"
        >
          <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="subnet.utilization > 80 ? 'bg-red-400' : subnet.utilization > 50 ? 'bg-yellow-400' : 'bg-green-400'"></span>
          {{ subnet.cidr }}
        </div>
      </div>

      <!-- Associated VLANs -->
      <div class="px-4 py-3 border-t border-gray-100">
        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">关联 VLAN</h4>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="vlan in vlanList"
            :key="vlan.id"
            class="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
          >VLAN {{ vlan.id }}</span>
        </div>
      </div>
    </div>

    <!-- Inner Right: Subnet Detail & Space Map -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header with Tabs -->
      <div class="shrink-0 bg-white border-b border-gray-200 px-6">
        <h1 class="text-2xl font-bold text-gray-900 pt-4 pb-3">子网详细信息</h1>
        <div class="flex gap-6">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="pb-3 text-sm transition-colors"
            :class="activeDetailTab === tab
              ? 'ipam-tab-active text-blue-600 border-b-2 border-blue-600 font-medium'
              : 'text-gray-500 hover:text-gray-700'"
            @click="activeDetailTab = tab"
          >{{ tab }}</button>
        </div>
      </div>

      <!-- Content: Map Space View -->
      <div v-if="activeDetailTab === '地图空间'" class="flex-1 flex overflow-hidden">
        <!-- IP Space Grid -->
        <div class="flex-1 overflow-y-auto p-6">
          <div
            v-for="row in subnetMap"
            :key="row.mask"
            :class="`subnet-row-${row.mask}`"
            class="mb-6"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="subnet-row-title text-sm font-bold text-gray-800">
                {{ row.free }}/{{ row.total }} 空余 /{{ row.mask }} 子网
              </span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(block, idx) in row.blocks"
                :key="idx"
                class="ip-block px-2 py-1 rounded border text-[10px] text-center whitespace-nowrap"
                :class="block.status === 'used'
                  ? 'ip-block-used bg-red-50 text-red-700 border-red-200'
                  : 'ip-block-free bg-green-50 text-green-700 border-green-200'"
              >{{ block.ip }}</span>
            </div>
          </div>
        </div>

        <!-- Usage Chart Panel -->
        <div class="usage-chart-panel w-64 shrink-0 bg-white border-l border-gray-200 p-6 flex flex-col">
          <h3 class="text-sm font-semibold text-gray-900 mb-4">使用情况图表</h3>

          <!-- Pie Chart via conic-gradient -->
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div
                class="pie-chart w-36 h-36 rounded-full"
                :style="{ background: `conic-gradient(#22c55e 0% ${freePercent}%, #f87171 ${freePercent}% 100%)` }"
              ></div>
              <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center flex-col">
                <span class="text-2xl font-bold text-gray-900">{{ usedPercent }}%</span>
                <span class="text-xs text-gray-500">已使用</span>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-sm bg-green-500"></span>
              <span class="text-sm text-gray-600">空余 ({{ freePercent }}%)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-sm bg-red-400"></span>
              <span class="text-sm text-gray-600">已使用 ({{ usedPercent }}%)</span>
            </div>
          </div>

          <!-- Stats -->
          <div class="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">总地址数</span>
              <span class="font-medium text-gray-900">{{ totalAddresses }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">已使用</span>
              <span class="font-medium text-red-600">{{ usedAddresses }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">空余</span>
              <span class="font-medium text-green-600">{{ freeAddresses }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Other tab placeholders -->
      <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
        {{ activeDetailTab }} 功能开发中...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ---- Subnet navigation list ----
const subnetList = [
  { cidr: '10.0.192.0/24', utilization: 92 },
  { cidr: '10.16.0.0/22', utilization: 78 },
  { cidr: '10.16.12.0/24', utilization: 66 },
  { cidr: '10.16.20.0/24', utilization: 45 },
  { cidr: '10.16.30.0/24', utilization: 30 },
  { cidr: '172.16.1.0/24', utilization: 55 },
]

const selectedSubnet = ref('10.16.12.0/24')

// ---- VLAN list ----
const vlanList = [
  { id: 100 },
  { id: 200 },
  { id: 301 },
  { id: 302 },
  { id: 400 },
]

// ---- Tabs ----
const tabs = ['子网详细信息', '地图空间', '按掩码搜索', '权限', 'NAT']
const activeDetailTab = ref('地图空间')

// ---- Subnet map data generation ----
const subnetMap = ref(generateSubnetMap())

function generateSubnetMap() {
  const base = '10.16.12'
  const rows = []

  // /25: 2 blocks
  const mask25Blocks = []
  for (let i = 0; i < 2; i++) {
    mask25Blocks.push({
      ip: `${base}.${i * 128}/25`,
      status: 'used',
    })
  }
  rows.push({ mask: 25, total: 2, free: 0, blocks: mask25Blocks })

  // /26: 4 blocks
  const mask26Blocks = []
  for (let i = 0; i < 4; i++) {
    mask26Blocks.push({
      ip: `${base}.${i * 64}/26`,
      status: 'used',
    })
  }
  rows.push({ mask: 26, total: 4, free: 0, blocks: mask26Blocks })

  // /27: 8 blocks
  const mask27Blocks = []
  for (let i = 0; i < 8; i++) {
    mask27Blocks.push({
      ip: `${base}.${i * 32}/27`,
      status: 'used',
    })
  }
  rows.push({ mask: 27, total: 8, free: 0, blocks: mask27Blocks })

  // /28: 16 blocks, 2 free
  const free28 = new Set([4, 11])
  const mask28Blocks = []
  for (let i = 0; i < 16; i++) {
    mask28Blocks.push({
      ip: `${base}.${i * 16}/28`,
      status: free28.has(i) ? 'free' : 'used',
    })
  }
  rows.push({ mask: 28, total: 16, free: free28.size, blocks: mask28Blocks })

  // /29: 32 blocks, 3 free
  const free29 = new Set([7, 15, 24])
  const mask29Blocks = []
  for (let i = 0; i < 32; i++) {
    mask29Blocks.push({
      ip: `${base}.${i * 8}/29`,
      status: free29.has(i) ? 'free' : 'used',
    })
  }
  rows.push({ mask: 29, total: 32, free: free29.size, blocks: mask29Blocks })

  // /30: 64 blocks, some free
  const free30 = new Set([3, 10, 22, 37, 45, 58])
  const mask30Blocks = []
  for (let i = 0; i < 64; i++) {
    mask30Blocks.push({
      ip: `${base}.${i * 4}/30`,
      status: free30.has(i) ? 'free' : 'used',
    })
  }
  rows.push({ mask: 30, total: 64, free: free30.size, blocks: mask30Blocks })

  return rows
}

// ---- Chart stats ----
const totalAddresses = computed(() => 256)
const usedAddresses = computed(() => 170)
const freeAddresses = computed(() => totalAddresses.value - usedAddresses.value)
const usedPercent = computed(() => Math.round((usedAddresses.value / totalAddresses.value) * 100))
const freePercent = computed(() => 100 - usedPercent.value)
</script>

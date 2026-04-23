<template>
  <div class="flex flex-col h-full">
    <!-- Device Header -->
    <header class="shrink-0 h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      <h1 class="text-2xl font-bold text-gray-900">网络设备</h1>
      <div class="flex items-center gap-3">
        <button class="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">SSH凭证</button>
        <button class="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">SNMP配置说明</button>
        <button class="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">发现设备</button>
        <button class="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">批量导入导出</button>
        <button class="btn-add-device bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">+ 添加设备</button>
      </div>
    </header>

    <!-- Device Body: left resource tree + right table area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Inner Sidebar: Resource Tree -->
      <div class="resource-tree w-64 flex flex-col bg-white border-r border-gray-200 shrink-0">
        <div class="px-4 pt-4 pb-2">
          <h3 class="text-sm font-semibold text-gray-900 mb-3">筛选 / 分组</h3>
          <input type="text" placeholder="搜索分组..." class="tree-search w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>

        <div class="flex-1 overflow-y-auto px-2 py-2">
          <div class="flex flex-col">
            <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium cursor-pointer">
              <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
              </svg>
              全部设备
            </div>
            <div class="ml-4 flex flex-col">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 text-sm hover:bg-gray-50 cursor-pointer">
                <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                Demo-核心
              </div>
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 text-sm hover:bg-gray-50 cursor-pointer">
                <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Demo-汇聚
              </div>
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 text-sm hover:bg-gray-50 cursor-pointer">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Demo-接入
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 py-3 border-t border-gray-100 flex flex-col gap-2">
          <button class="w-full px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">管理分组</button>
          <button class="w-full px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">层级说明</button>
        </div>
      </div>

      <!-- Inner Main: Table Area -->
      <div class="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <!-- Filter Bar -->
        <div class="shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <div class="flex items-center gap-3 mb-3">
            <input type="text" placeholder="关键词搜索" class="w-48 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <select class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>状态</option>
              <option>在线</option>
              <option>离线</option>
            </select>
            <select class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>厂商</option>
              <option>Ruijie</option>
              <option>Cisco</option>
              <option>Huawei</option>
              <option>H3C</option>
              <option>Hillstone</option>
            </select>
            <select class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>类型</option>
              <option>交换机</option>
              <option>防火墙</option>
              <option>无线接入点</option>
              <option>无线控制器</option>
            </select>
            <button class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">查询</button>
            <button class="px-4 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">重置</button>
          </div>
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" class="rounded border-gray-300" />
              仅看离线
            </label>
            <div class="flex items-center gap-1">
              <button class="p-1.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125M12 12c.621 0 1.125.504 1.125 1.125m0-1.5c.621 0 1.125.504 1.125 1.125m-1.125 1.5c.621 0 1.125.504 1.125 1.125m1.125-1.5c.621 0 1.125.504 1.125 1.125" />
                </svg>
              </button>
              <button class="p-1.5 rounded text-gray-600 bg-gray-100 transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">管理IP</th>
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">厂商</th>
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">型号</th>
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">分组</th>
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">层级</th>
                  <th class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">接口数</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="device in deviceList"
                  :key="device.id"
                  class="device-row border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td class="px-4 py-3 font-medium text-gray-900">{{ device.name }}</td>
                  <td class="px-4 py-3 text-gray-600 font-mono text-xs">{{ device.ip }}</td>
                  <td class="px-4 py-3">
                    <span
                      :class="device.status === '在线'
                        ? 'badge-status-online bg-green-50 text-green-700'
                        : 'badge-status-offline bg-red-50 text-red-700'"
                      class="px-2 py-0.5 rounded-full text-xs font-medium"
                    >{{ device.status }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <span :class="typeBadgeClass(device.type)" class="px-2 py-0.5 rounded text-xs font-medium border">
                      {{ device.type }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-600">{{ device.vendor }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ device.model }}</td>
                  <td class="px-4 py-3 text-gray-600 text-xs">{{ device.group }}</td>
                  <td class="px-4 py-3">
                    <span :class="levelBadgeClass(device.level)" class="px-2 py-0.5 rounded text-xs font-medium">
                      {{ device.level }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-600">{{ device.ports }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const deviceList = [
  { id: 1, name: "AP-01", ip: "10.10.4.101", status: "在线", type: "无线接入点", vendor: "Ruijie", model: "RG-AP820", group: "Demo-接入", level: "接入", ports: 4 },
  { id: 2, name: "WLC-AC1", ip: "10.10.4.1", status: "在线", type: "无线控制器", vendor: "Ruijie", model: "RG-WS6000", group: "Demo-汇聚", level: "汇聚", ports: 24 },
  { id: 3, name: "FW-EDGE1", ip: "10.10.3.1", status: "在线", type: "防火墙", vendor: "Hillstone", model: "SG-6000", group: "Demo-核心", level: "核心", ports: 24 },
  { id: 4, name: "ACC-SW3", ip: "10.10.2.3", status: "离线", type: "交换机", vendor: "Cisco", model: "C2960", group: "Demo-接入", level: "接入", ports: 24 },
  { id: 5, name: "AGG-SW1", ip: "10.10.1.1", status: "在线", type: "交换机", vendor: "Huawei", model: "S5720", group: "Demo-汇聚", level: "汇聚", ports: 24 },
  { id: 6, name: "CORE-SW1", ip: "10.10.0.1", status: "在线", type: "交换机", vendor: "H3C", model: "S7500X", group: "Demo-核心", level: "核心", ports: 48 },
]

function typeBadgeClass(type) {
  if (type === '无线接入点' || type === '无线控制器') return 'badge-type-wireless border-purple-300 text-purple-700 bg-purple-50'
  if (type === '防火墙') return 'badge-type-firewall border-red-300 text-red-700 bg-red-50'
  if (type === '交换机') return 'badge-type-switch border-green-300 text-green-700 bg-green-50'
  return 'border-gray-300 text-gray-600 bg-gray-50'
}

function levelBadgeClass(level) {
  if (level === '接入') return 'badge-level-access bg-purple-100 text-purple-700'
  if (level === '汇聚') return 'badge-level-agg bg-green-100 text-green-700'
  if (level === '核心') return 'badge-level-core bg-orange-100 text-orange-700'
  return 'bg-gray-100 text-gray-600'
}
</script>

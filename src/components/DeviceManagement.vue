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
        <el-button type="primary" @click="handleAddDevice">+ 添加设备</el-button>
      </div>
    </header>

    <!-- Device Body: left resource tree + right table area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Inner Sidebar: Resource Tree -->
      <div class="resource-tree w-64 flex flex-col bg-white border-r border-gray-200 shrink-0">
        <div class="px-4 pt-4 pb-2">
          <h3 class="text-sm font-semibold text-gray-900 mb-3">筛选 / 分组</h3>
          <el-input v-model="treeSearch" placeholder="搜索分组..." size="small" clearable />
        </div>

        <div class="flex-1 overflow-y-auto px-2 py-2">
          <div class="flex flex-col">
            <div
              @click="handleSelectGroup('')"
              :class="selectedGroup === '' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'"
              class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
            >
              <el-icon><Grid /></el-icon>
              全部设备
              <span v-if="selectedGroup === ''" class="ml-auto bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                {{ deviceList.length }}
              </span>
            </div>
            <div class="ml-4 flex flex-col">
              <div
                v-for="group in groups"
                :key="group"
                @click="handleSelectGroup(group)"
                :class="selectedGroup === group ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors"
              >
                <span :class="groupColorClass(group)" class="w-1.5 h-1.5 rounded-full"></span>
                {{ group }}
                <span v-if="selectedGroup === group" class="ml-auto bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                  {{ getGroupCount(group) }}
                </span>
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
          <el-form :inline="true" :model="searchForm" class="filter-form">
            <el-form-item>
              <el-input v-model="searchForm.keyword" placeholder="关键词搜索" style="width: 200px" clearable />
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.status" placeholder="状态" clearable style="width: 120px">
                <el-option label="在线" value="online" />
                <el-option label="离线" value="offline" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.vendor" placeholder="厂商" clearable style="width: 140px">
                <el-option label="Ruijie" value="Ruijie" />
                <el-option label="Cisco" value="Cisco" />
                <el-option label="Huawei" value="Huawei" />
                <el-option label="H3C" value="H3C" />
                <el-option label="Hillstone" value="Hillstone" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.type" placeholder="类型" clearable style="width: 140px">
                <el-option label="交换机" value="交换机" />
                <el-option label="防火墙" value="防火墙" />
                <el-option label="无线接入点" value="无线接入点" />
                <el-option label="无线控制器" value="无线控制器" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="flex items-center justify-between">
            <el-checkbox v-model="searchForm.onlyOffline">仅看离线</el-checkbox>
            <div class="flex items-center gap-1">
              <el-button size="small" text>
                <el-icon><Menu /></el-icon>
              </el-button>
              <el-button size="small" text bg>
                <el-icon><List /></el-icon>
              </el-button>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <el-table :data="filteredDeviceList" style="width: 100%" stripe>
              <el-table-column prop="name" label="名称" width="120" />
              <el-table-column prop="mgmt_ip" label="管理IP" width="130">
                <template #default="{ row }">
                  <span class="font-mono text-xs">{{ row.mgmt_ip }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="80">
                <template #default="{ row }">
                  <el-tag :type="row.status === 'online' ? 'success' : 'danger'" size="small">
                    {{ row.status === 'online' ? '在线' : '离线' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="类型" width="120">
                <template #default="{ row }">
                  <el-tag :type="getTypeTagType(row.type)" size="small" effect="plain">
                    {{ row.type }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="vendor" label="厂商" width="100" />
              <el-table-column prop="model" label="型号" width="120" />
              <el-table-column prop="group" label="分组" width="120" />
              <el-table-column prop="layer" label="层级" width="80">
                <template #default="{ row }">
                  <el-tag :type="getLayerTagType(row.layer)" size="small">
                    {{ row.layer }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="port_count" label="接口数" width="80" />
              <el-table-column label="操作" width="150" fixed="right">
                <template #default="{ row }">
                  <el-button size="small" text type="primary" @click="handleEdit(row)">编辑</el-button>
                  <el-button size="small" text type="danger" @click="handleDelete(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="deviceForm" :rules="formRules" ref="deviceFormRef" label-width="80px">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="deviceForm.name" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="管理IP" prop="mgmt_ip">
          <el-input v-model="deviceForm.mgmt_ip" placeholder="请输入管理IP" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="deviceForm.status" placeholder="请选择状态">
            <el-option label="在线" value="online" />
            <el-option label="离线" value="offline" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select v-model="deviceForm.type" placeholder="请选择设备类型">
            <el-option label="交换机" value="交换机" />
            <el-option label="防火墙" value="防火墙" />
            <el-option label="无线接入点" value="无线接入点" />
            <el-option label="无线控制器" value="无线控制器" />
          </el-select>
        </el-form-item>
        <el-form-item label="厂商" prop="vendor">
          <el-select v-model="deviceForm.vendor" placeholder="请选择厂商">
            <el-option label="Ruijie" value="Ruijie" />
            <el-option label="Cisco" value="Cisco" />
            <el-option label="Huawei" value="Huawei" />
            <el-option label="H3C" value="H3C" />
            <el-option label="Hillstone" value="Hillstone" />
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="deviceForm.model" placeholder="请输入型号" />
        </el-form-item>
        <el-form-item label="分组" prop="group">
          <el-select v-model="deviceForm.group" placeholder="请选择分组">
            <el-option label="Demo-核心" value="Demo-核心" />
            <el-option label="Demo-汇聚" value="Demo-汇聚" />
            <el-option label="Demo-接入" value="Demo-接入" />
          </el-select>
        </el-form-item>
        <el-form-item label="层级" prop="layer">
          <el-select v-model="deviceForm.layer" placeholder="请选择层级">
            <el-option label="核心" value="核心" />
            <el-option label="汇聚" value="汇聚" />
            <el-option label="接入" value="接入" />
          </el-select>
        </el-form-item>
        <el-form-item label="端口数量" prop="port_count">
          <el-input-number v-model="deviceForm.port_count" :min="1" :max="128" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deviceApi } from '../api/device'

const deviceList = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('添加设备')
const submitting = ref(false)
const deviceFormRef = ref(null)
const treeSearch = ref('')
const selectedGroup = ref('')
const searchForm = ref({
  keyword: '',
  status: '',
  vendor: '',
  type: '',
  onlyOffline: false
})

const deviceForm = ref({
  id: null,
  name: '',
  mgmt_ip: '',
  status: 'online',
  type: '',
  vendor: '',
  model: '',
  group: '',
  layer: '',
  port_count: 24
})

const formRules = {
  name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
  mgmt_ip: [{ required: true, message: '请输入管理IP', trigger: 'blur' }],
  type: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
  vendor: [{ required: true, message: '请选择厂商', trigger: 'change' }],
  model: [{ required: true, message: '请输入型号', trigger: 'blur' }],
  group: [{ required: true, message: '请选择分组', trigger: 'change' }],
  layer: [{ required: true, message: '请选择层级', trigger: 'change' }]
}

const groups = computed(() => {
  const groupSet = new Set(deviceList.value.map(d => d.group))
  return Array.from(groupSet)
})

const filteredDeviceList = computed(() => {
  let result = deviceList.value

  if (selectedGroup.value) {
    result = result.filter(d => d.group === selectedGroup.value)
  }

  if (searchForm.value.keyword) {
    const keyword = searchForm.value.keyword.toLowerCase()
    result = result.filter(d =>
      d.name.toLowerCase().includes(keyword) ||
      d.mgmt_ip.includes(keyword) ||
      d.model.toLowerCase().includes(keyword)
    )
  }

  if (searchForm.value.status) {
    result = result.filter(d => d.status === searchForm.value.status)
  }

  if (searchForm.value.vendor) {
    result = result.filter(d => d.vendor === searchForm.value.vendor)
  }

  if (searchForm.value.type) {
    result = result.filter(d => d.type === searchForm.value.type)
  }

  if (searchForm.value.onlyOffline) {
    result = result.filter(d => d.status === 'offline')
  }

  return result
})

const groupColorClass = (group) => {
  if (group.includes('核心')) return 'bg-orange-400'
  if (group.includes('汇聚')) return 'bg-green-400'
  if (group.includes('接入')) return 'bg-purple-400'
  return 'bg-gray-400'
}

const getTypeTagType = (type) => {
  if (type === '无线接入点' || type === '无线控制器') return 'info'
  if (type === '防火墙') return 'danger'
  if (type === '交换机') return 'success'
  return 'info'
}

const getLayerTagType = (layer) => {
  if (layer === '接入') return 'info'
  if (layer === '汇聚') return 'success'
  if (layer === '核心') return 'warning'
  return 'info'
}

const getGroupCount = (group) => {
  return deviceList.value.filter(d => d.group === group).length
}

const handleSelectGroup = (group) => {
  selectedGroup.value = group
}

const fetchDevices = async () => {
  loading.value = true
  try {
    const response = await deviceApi.getDevices()
    if (response.code === 200) {
      deviceList.value = response.data
    } else {
      ElMessage.error(response.message || '获取设备列表失败')
    }
  } catch (error) {
    ElMessage.error('获取设备列表失败: ' + (error.message || '网络错误'))
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
}

const handleReset = () => {
  searchForm.value = {
    keyword: '',
    status: '',
    vendor: '',
    type: '',
    onlyOffline: false
  }
}

const handleAddDevice = () => {
  dialogTitle.value = '添加设备'
  deviceForm.value = {
    id: null,
    name: '',
    mgmt_ip: '',
    status: 'online',
    type: '',
    vendor: '',
    model: '',
    group: '',
    layer: '',
    port_count: 24
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑设备'
  deviceForm.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除设备 "${row.name}" 吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const response = await deviceApi.deleteDevice(row.id)
      if (response.code === 200) {
        ElMessage.success('删除成功')
        await fetchDevices()
      } else {
        ElMessage.error(response.message || '删除失败')
      }
    } catch (error) {
      console.error('删除失败:', error)
      ElMessage.error('删除失败: ' + (error.message || '网络错误'))
    }
  }).catch(() => {})
}

const handleSubmit = async () => {
  if (!deviceFormRef.value) return

  await deviceFormRef.value.validate(async (valid) => {
    if (!valid) return

    submitting.value = true
    try {
      const isEdit = !!deviceForm.value.id
      const { id, created_at, updated_at, ...formData } = deviceForm.value

      let response
      if (isEdit) {
        response = await deviceApi.updateDevice(id, formData)
      } else {
        response = await deviceApi.createDevice(formData)
      }

      if (response.code === 200) {
        ElMessage.success(isEdit ? '更新成功' : '创建成功')
        dialogVisible.value = false
        await fetchDevices()
      } else {
        ElMessage.error(response.message || (isEdit ? '更新失败' : '创建失败'))
      }
    } catch (error) {
      console.error('提交失败:', error)
      ElMessage.error('提交失败: ' + (error.message || '网络错误'))
    } finally {
      submitting.value = false
    }
  })
}

onMounted(() => {
  fetchDevices()
})
</script>

<style scoped>
.filter-form :deep(.el-form-item) {
  margin-bottom: 0;
}
</style>

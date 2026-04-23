import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DeviceManagement from '../components/DeviceManagement.vue'

describe('DeviceManagement', () => {
  const mountComponent = () => mount(DeviceManagement)

  describe('Header', () => {
    it('renders title "网络设备"', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('网络设备')
    })

    it('renders the "+ 添加设备" button with bg-blue-600', () => {
      const wrapper = mountComponent()
      const addBtn = wrapper.find('.btn-add-device')
      expect(addBtn.exists()).toBe(true)
      expect(addBtn.classes()).toContain('bg-blue-600')
      expect(addBtn.text()).toContain('添加设备')
    })

    it('renders all weak action buttons', () => {
      const wrapper = mountComponent()
      const weakBtns = ['SSH凭证', 'SNMP配置说明', '发现设备', '批量导入导出']
      weakBtns.forEach((label) => {
        expect(wrapper.text()).toContain(label)
      })
    })
  })

  describe('Resource Tree', () => {
    it('renders "筛选 / 分组" title', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('筛选 / 分组')
    })

    it('renders tree search input', () => {
      const wrapper = mountComponent()
      expect(wrapper.find('.tree-search').exists()).toBe(true)
    })

    it('renders all tree nodes', () => {
      const wrapper = mountComponent()
      const nodes = ['全部设备', 'Demo-核心', 'Demo-汇聚', 'Demo-接入']
      nodes.forEach((node) => {
        expect(wrapper.text()).toContain(node)
      })
    })

    it('renders footer buttons', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('管理分组')
      expect(wrapper.text()).toContain('层级说明')
    })

    it('has w-64 width', () => {
      const wrapper = mountComponent()
      expect(wrapper.find('.resource-tree').classes()).toContain('w-64')
    })
  })

  describe('Filter Bar', () => {
    it('renders query and reset buttons', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('查询')
      expect(wrapper.text()).toContain('重置')
    })

    it('renders "仅看离线" checkbox', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('仅看离线')
    })
  })

  describe('Data Table', () => {
    it('renders 6 device rows', () => {
      const wrapper = mountComponent()
      expect(wrapper.findAll('.device-row').length).toBe(6)
    })

    it('renders all table headers', () => {
      const wrapper = mountComponent()
      const headers = ['名称', '管理IP', '状态', '类型', '厂商', '型号', '分组', '层级', '接口数']
      headers.forEach((h) => {
        expect(wrapper.text()).toContain(h)
      })
    })

    it('renders all device names', () => {
      const wrapper = mountComponent()
      const names = ['AP-01', 'WLC-AC1', 'FW-EDGE1', 'ACC-SW3', 'AGG-SW1', 'CORE-SW1']
      names.forEach((name) => {
        expect(wrapper.text()).toContain(name)
      })
    })

    it('renders online status badge with green classes', () => {
      const wrapper = mountComponent()
      const onlineBadge = wrapper.find('.badge-status-online')
      expect(onlineBadge.exists()).toBe(true)
      expect(onlineBadge.classes()).toContain('bg-green-50')
      expect(onlineBadge.classes()).toContain('text-green-700')
    })

    it('renders offline status badge with red classes', () => {
      const wrapper = mountComponent()
      const offlineBadge = wrapper.find('.badge-status-offline')
      expect(offlineBadge.exists()).toBe(true)
      expect(offlineBadge.classes()).toContain('bg-red-50')
      expect(offlineBadge.classes()).toContain('text-red-700')
    })

    it('renders wireless type badge with purple border', () => {
      const wrapper = mountComponent()
      const badge = wrapper.find('.badge-type-wireless')
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('border-purple-300')
    })

    it('renders firewall type badge with red border', () => {
      const wrapper = mountComponent()
      const badge = wrapper.find('.badge-type-firewall')
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('border-red-300')
    })

    it('renders switch type badge with green border', () => {
      const wrapper = mountComponent()
      const badge = wrapper.find('.badge-type-switch')
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('border-green-300')
    })

    it('renders access level badge with purple background', () => {
      const wrapper = mountComponent()
      const badge = wrapper.find('.badge-level-access')
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('bg-purple-100')
    })

    it('renders aggregate level badge with green background', () => {
      const wrapper = mountComponent()
      const badge = wrapper.find('.badge-level-agg')
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('bg-green-100')
    })

    it('renders core level badge with orange background', () => {
      const wrapper = mountComponent()
      const badge = wrapper.find('.badge-level-core')
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('bg-orange-100')
    })

    it('renders IP addresses in monospace', () => {
      const wrapper = mountComponent()
      const ips = ['10.10.4.101', '10.10.4.1', '10.10.3.1', '10.10.2.3', '10.10.1.1', '10.10.0.1']
      ips.forEach((ip) => {
        expect(wrapper.text()).toContain(ip)
      })
    })
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AddressManagement from '../components/AddressManagement.vue'

describe('AddressManagement', () => {
  const mountComponent = () => mount(AddressManagement)

  // ---- Header Tabs ----
  describe('Header Tabs', () => {
    it('renders the title "子网详细信息"', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('子网详细信息')
    })

    it('renders all tab items', () => {
      const wrapper = mountComponent()
      const tabs = ['子网详细信息', '地图空间', '按掩码搜索', '权限', 'NAT']
      tabs.forEach((tab) => {
        expect(wrapper.text()).toContain(tab)
      })
    })

    it('highlights the active "地图空间" tab with bottom border', () => {
      const wrapper = mountComponent()
      const activeTab = wrapper.find('.ipam-tab-active')
      expect(activeTab.exists()).toBe(true)
      expect(activeTab.text()).toContain('地图空间')
    })
  })

  // ---- Subnet Navigation Tree ----
  describe('Subnet Navigation Tree', () => {
    it('renders "可用子网" title', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('可用子网')
    })

    it('renders subnet entries via v-for', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('10.0.192.0/24')
      expect(wrapper.text()).toContain('10.16.12.0/24')
    })

    it('highlights the selected subnet with active background', () => {
      const wrapper = mountComponent()
      const activeItem = wrapper.find('.subnet-item-active')
      expect(activeItem.exists()).toBe(true)
    })

    it('renders "关联 VLAN" section', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('关联 VLAN')
    })

    it('renders VLAN IDs', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('VLAN')
    })
  })

  // ---- IP Space Grid ----
  describe('IP Space Grid', () => {
    it('renders subnet map rows for different masks', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('/25')
      expect(wrapper.text()).toContain('/26')
      expect(wrapper.text()).toContain('/27')
      expect(wrapper.text()).toContain('/28')
      expect(wrapper.text()).toContain('/29')
      expect(wrapper.text()).toContain('/30')
    })

    it('renders row title with free count', () => {
      const wrapper = mountComponent()
      const freeLabels = wrapper.findAll('.subnet-row-title')
      expect(freeLabels.length).toBeGreaterThan(0)
    })

    it('renders IP blocks with used/free status', () => {
      const wrapper = mountComponent()
      const usedBlocks = wrapper.findAll('.ip-block-used')
      expect(usedBlocks.length).toBeGreaterThan(0)
      const freeBlocks = wrapper.findAll('.ip-block-free')
      expect(freeBlocks.length).toBeGreaterThan(0)
    })

    it('renders used blocks with red styling', () => {
      const wrapper = mountComponent()
      const block = wrapper.find('.ip-block-used')
      expect(block.classes()).toContain('bg-red-50')
      expect(block.classes()).toContain('text-red-700')
    })

    it('renders free blocks with green styling', () => {
      const wrapper = mountComponent()
      const block = wrapper.find('.ip-block-free')
      expect(block.classes()).toContain('bg-green-50')
      expect(block.classes()).toContain('text-green-700')
    })

    it('renders blocks with text-[10px]', () => {
      const wrapper = mountComponent()
      const block = wrapper.find('.ip-block-used')
      expect(block.classes()).toContain('text-[10px]')
    })

    it('renders /30 mask with 64 blocks', () => {
      const wrapper = mountComponent()
      const row30 = wrapper.find('.subnet-row-30')
      expect(row30.exists()).toBe(true)
      const blocks = row30.findAll('.ip-block-used, .ip-block-free')
      expect(blocks.length).toBe(64)
    })

    it('renders /25 mask with 2 blocks', () => {
      const wrapper = mountComponent()
      const row25 = wrapper.find('.subnet-row-25')
      expect(row25.exists()).toBe(true)
      const blocks = row25.findAll('.ip-block-used, .ip-block-free')
      expect(blocks.length).toBe(2)
    })
  })

  // ---- Usage Chart ----
  describe('Usage Chart', () => {
    it('renders "使用情况图表" title', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('使用情况图表')
    })

    it('renders pie chart with conic-gradient', () => {
      const wrapper = mountComponent()
      const pie = wrapper.find('.pie-chart')
      expect(pie.exists()).toBe(true)
      const style = pie.attributes('style')
      expect(style).toContain('conic-gradient')
    })

    it('renders chart legend with 空余 and 已使用', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('空余')
      expect(wrapper.text()).toContain('已使用')
    })
  })

  // ---- Layout ----
  describe('Layout', () => {
    it('inner sidebar has w-64', () => {
      const wrapper = mountComponent()
      const sidebar = wrapper.find('.subnet-nav-tree')
      expect(sidebar.classes()).toContain('w-64')
    })

    it('chart panel has fixed width', () => {
      const wrapper = mountComponent()
      const chartPanel = wrapper.find('.usage-chart-panel')
      expect(chartPanel.exists()).toBe(true)
    })
  })
})

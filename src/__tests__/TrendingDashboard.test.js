import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TrendingDashboard from '../components/TrendingDashboard.vue'

describe('TrendingDashboard', () => {
  const mountComponent = () => mount(TrendingDashboard)

  // ---- Global Sidebar ----
  describe('Global Sidebar', () => {
    it('renders the logo text "Zread"', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Zread')
    })

    it('renders all nav items', () => {
      const wrapper = mountComponent()
      const navItems = ['探索', '趋势', '收藏夹', '设备管理', '地址管理']
      navItems.forEach((item) => {
        expect(wrapper.text()).toContain(item)
      })
    })

    it('highlights the default active nav "地址管理"', () => {
      const wrapper = mountComponent()
      const activeItem = wrapper.findAll('aside a').find((a) => a.text().includes('地址管理'))
      expect(activeItem.classes()).toContain('bg-gray-100')
      expect(activeItem.classes()).toContain('font-semibold')
    })

    it('renders the feedback button', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('反馈')
    })

    it('switches active tab when a nav item is clicked', async () => {
      const wrapper = mountComponent()
      const trendItem = wrapper.findAll('aside a').find((a) => a.text().includes('趋势'))
      await trendItem.trigger('click')
      expect(trendItem.classes()).toContain('bg-gray-100')
      expect(trendItem.classes()).toContain('font-semibold')
    })
  })

  // ---- Address Management View (default active) ----
  describe('Address Management View (default)', () => {
    it('renders IPAM content by default', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('可用子网')
      expect(wrapper.text()).toContain('子网详细信息')
    })

    it('renders the subnet navigation tree with w-64', () => {
      const wrapper = mountComponent()
      const tree = wrapper.find('.subnet-nav-tree')
      expect(tree.exists()).toBe(true)
      expect(tree.classes()).toContain('w-64')
    })
  })

  // ---- Device Management View (after tab switch) ----
  describe('Device Management View', () => {
    const mountWithDeviceTab = async () => {
      const wrapper = mount(TrendingDashboard)
      const deviceItem = wrapper.findAll('aside a').find((a) => a.text().includes('设备管理'))
      await deviceItem.trigger('click')
      return wrapper
    }

    it('renders the device management header title "网络设备"', async () => {
      const wrapper = await mountWithDeviceTab()
      expect(wrapper.text()).toContain('网络设备')
    })

    it('renders the "+ 添加设备" button with blue background', async () => {
      const wrapper = await mountWithDeviceTab()
      const addBtn = wrapper.find('.btn-add-device')
      expect(addBtn.exists()).toBe(true)
      expect(addBtn.classes()).toContain('bg-blue-600')
    })

    it('renders the data table with 6 device rows', async () => {
      const wrapper = await mountWithDeviceTab()
      const rows = wrapper.findAll('.device-row')
      expect(rows.length).toBe(6)
    })

    it('renders status and type badges', async () => {
      const wrapper = await mountWithDeviceTab()
      expect(wrapper.find('.badge-status-online').exists()).toBe(true)
      expect(wrapper.find('.badge-status-offline').exists()).toBe(true)
      expect(wrapper.find('.badge-type-wireless').exists()).toBe(true)
      expect(wrapper.find('.badge-type-switch').exists()).toBe(true)
    })

    it('renders the resource tree with w-64', async () => {
      const wrapper = await mountWithDeviceTab()
      const tree = wrapper.find('.resource-tree')
      expect(tree.classes()).toContain('w-64')
    })
  })

  // ---- Trending View (after tab switch) ----
  describe('Trending View', () => {
    it('renders trending content when "趋势" tab is active', async () => {
      const wrapper = mountComponent()
      const trendItem = wrapper.findAll('aside a').find((a) => a.text().includes('趋势'))
      await trendItem.trigger('click')
      expect(wrapper.text()).toContain('本周开发者都在关注什么')
    })

    it('renders all 4 trending cards when trending tab is active', async () => {
      const wrapper = mountComponent()
      const trendItem = wrapper.findAll('aside a').find((a) => a.text().includes('趋势'))
      await trendItem.trigger('click')
      const cards = wrapper.findAll('.trending-card')
      expect(cards.length).toBe(4)
    })
  })

  // ---- Layout ----
  describe('Layout', () => {
    it('has a flex container with h-screen', () => {
      const wrapper = mountComponent()
      const container = wrapper.find('.dashboard-root')
      expect(container.exists()).toBe(true)
      expect(container.classes()).toContain('flex')
      expect(container.classes()).toContain('h-screen')
    })

    it('global sidebar has w-64', () => {
      const wrapper = mountComponent()
      const sidebar = wrapper.find('aside.global-sidebar')
      expect(sidebar.classes()).toContain('w-64')
    })
  })
})

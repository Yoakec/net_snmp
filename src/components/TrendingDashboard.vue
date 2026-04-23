<template>
  <div class="flex h-screen bg-gray-50 font-sans dashboard-root">
    <!-- Global Sidebar -->
    <aside class="global-sidebar w-64 flex flex-col h-screen border-r border-gray-200 bg-white px-5 py-6 shrink-0">
      <!-- Logo -->
      <div class="flex items-center gap-2.5 mb-10 px-2">
        <div class="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <span class="text-xl font-bold text-gray-900 tracking-tight">Zread</span>
      </div>

      <!-- Nav -->
      <nav class="flex flex-col gap-1 flex-1">
        <a
          v-for="item in navItems"
          :key="item.label"
          href="#"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
          :class="activeTab === item.label
            ? 'bg-gray-100 font-semibold text-gray-900'
            : 'text-gray-600 hover:bg-gray-50'"
          @click.prevent="activeTab = item.label"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
          </svg>
          {{ item.label }}
        </a>
      </nav>

      <!-- Footer -->
      <div class="flex flex-col gap-4 pt-6 border-t border-gray-100">
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          反馈
        </a>
        <div class="flex items-center gap-3 px-3">
          <div class="w-5 h-5 rounded-full bg-gray-200"></div>
          <div class="w-5 h-5 rounded-full bg-gray-200"></div>
          <div class="w-5 h-5 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </aside>

    <!-- Global Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Trending View -->
      <template v-if="activeTab === '趋势'">
        <header class="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200 shrink-0">
          <h1 class="text-lg font-semibold text-gray-900">趋势</h1>
          <div class="flex items-center gap-4">
            <button class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </button>
            <button class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
            <button class="login-btn bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">登录</button>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto p-8">
          <div class="rounded-xl bg-gray-50 border border-gray-200 px-8 py-10 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-3">本周开发者都在关注什么...</h2>
            <p class="text-gray-500 text-base leading-relaxed">
              我们以仓库指南的格式，为你精选最值得关注的<span class="text-teal-500 font-medium">开源项目</span>与<span class="text-teal-500 font-medium">技术趋势</span>，帮你快速了解社区风向。
            </p>
          </div>
          <div class="mb-4">
            <span class="text-xs font-medium text-gray-400 uppercase tracking-wide">本周 04月20日 - 04月26日</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <div
              v-for="item in trendingList"
              :key="item.id"
              class="trending-card bg-white border border-gray-200 rounded-xl p-5 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 cursor-pointer"
            >
              <h3 class="card-title text-lg font-semibold text-gray-900 truncate mb-2">{{ item.title }}</h3>
              <p class="card-desc text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{{ item.description }}</p>
              <div v-if="item.tags.length" class="flex flex-wrap gap-1.5 mb-4">
                <span v-for="tag in item.tags" :key="tag" class="card-tag px-2 py-0.5 rounded-md text-xs font-medium bg-teal-50 text-teal-600">{{ tag }}</span>
              </div>
              <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <div class="flex items-center gap-1.5">
                  <span :class="[item.languageColor, 'language-dot', 'w-2.5 h-2.5 rounded-full inline-block']"></span>
                  <span class="text-xs text-gray-500">{{ item.language }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-sm">⭐</span>
                  <span class="text-xs text-gray-600 font-medium">{{ item.stars }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Device Management View -->
      <DeviceManagement v-if="activeTab === '设备管理'" />

      <!-- Address Management View -->
      <AddressManagement v-if="activeTab === '地址管理'" />

      <!-- Patching Dashboard View -->
      <PatchingDashboard v-if="activeTab === '补丁管理'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeviceManagement from './DeviceManagement.vue'
import AddressManagement from './AddressManagement.vue'
import PatchingDashboard from './PatchingDashboard.vue'

const activeTab = ref('地址管理')

const navItems = [
  { label: '趋势', icon: ' M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' },
  { label: '设备管理', icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z' },
  { label: '地址管理', icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 003 12c0-1.918.6-3.7 1.628-5.168' },
  { label: '补丁管理', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
]

const trendingList = [
  { id: 1, group: "本周 04月20日 - 04月26日", title: "BasedHardware/omi", description: "中文AI可穿戴设备。戴上它，说话，自动记录。", tags: ["ai", "app", "bci", "c", "flutter"], language: "dart", languageColor: "bg-cyan-500", stars: "11.4k" },
  { id: 2, group: "本周 04月20日 - 04月26日", title: "thedotmack/claude-mem", description: "claude-mem: 将 Claude Code 对话转换为持久可搜索知识图谱的 CLI 工具", tags: ["ai-agents", "ai-memory"], language: "typescript", languageColor: "bg-blue-500", stars: "62.9k" },
  { id: 3, group: "本周 04月20日 - 04月26日", title: "shiyu-coder/Kronos", description: "Kronos: 金融市场语言的基础模型", tags: [], language: "python", languageColor: "bg-blue-600", stars: "19.7k" },
  { id: 4, group: "本周 04月20日 - 04月26日", title: "multica-ai/multica", description: "原生桌面客户端，通过可视化界面为每个人带来编程代理能力", tags: [], language: "typescript", languageColor: "bg-blue-500", stars: "14.3k" },
]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

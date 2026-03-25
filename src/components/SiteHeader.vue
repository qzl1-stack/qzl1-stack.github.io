<script setup lang="ts">
import { theme_mode, set_theme_mode, type ThemeMode } from '../lib/theme'

const nav_items = [
  { label: '首页', to: '/' },
  { label: '手记', to: '/notes' },
  { label: '动态', to: '/moments' },
  { label: '简历', to: '/resume' },
]

const theme_items: { mode: ThemeMode; label: string; icon: string }[] = [
  { mode: 'light', label: '浅色', icon: 'sun' },
  { mode: 'system', label: '系统', icon: 'monitor' },
  { mode: 'dark', label: '深色', icon: 'moon' },
]
</script>

<template>
  <header class="site_header">
    <div class="header_inner">
      <nav class="main_nav">
        <RouterLink
          v-for="item in nav_items"
          :key="item.to"
          class="nav_link"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
  <div class="theme_dock" role="group" aria-label="主题模式切换">
    <button
      v-for="item in theme_items"
      :key="item.mode"
      class="theme_icon_btn"
      :class="{ is_active: theme_mode === item.mode }"
      :aria-label="`切换到${item.label}模式`"
      @click="set_theme_mode(item.mode)"
    >
      <svg v-if="item.icon === 'sun'" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm0 12.6a4.6 4.6 0 1 0 0-9.2 4.6 4.6 0 0 0 0 9.2zm8-5.6a1 1 0 0 1 0 2h-1.2a1 1 0 1 1 0-2H20zM6.4 12a1 1 0 0 1-1 1H4.2a1 1 0 1 1 0-2h1.2a1 1 0 0 1 1 1zm10.14-5.14a1 1 0 0 1 1.42 0l.84.84a1 1 0 0 1-1.42 1.42l-.84-.84a1 1 0 0 1 0-1.42zM6.62 16.54a1 1 0 0 1 1.42 0l.84.84a1 1 0 1 1-1.42 1.42l-.84-.84a1 1 0 0 1 0-1.42zm11.38 0a1 1 0 0 1 0 1.42l-.84.84a1 1 0 1 1-1.42-1.42l.84-.84a1 1 0 0 1 1.42 0zM8.04 6.86a1 1 0 0 1 0 1.42l-.84.84A1 1 0 0 1 5.78 7.7l.84-.84a1 1 0 0 1 1.42 0z"
        />
      </svg>
      <svg v-else-if="item.icon === 'monitor'" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 4a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h5v2H8.5a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H14v-2h5a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H5zm0 2h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M14.4 3.2A9.4 9.4 0 1 0 20.8 17a1 1 0 0 0-1.14-1.46 7.4 7.4 0 0 1-9.2-9.2A1 1 0 0 0 9 5.18a9.35 9.35 0 0 0 5.4-1.98z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.site_header {
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.header_inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--border) 74%, transparent);
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(10px);
  pointer-events: auto;
}

.brand {
  color: var(--text_head);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.12em;
  font-size: 12px;
}

.main_nav {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
}

.nav_link {
  color: var(--text_body);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background 0.2s ease;
  font-size: 13px;
}

.nav_link.router-link-active {
  color: var(--text_head);
  border-color: color-mix(in srgb, var(--border_strong) 82%, transparent);
  background: color-mix(in srgb, var(--panel_active) 82%, transparent);
}

.nav_link:hover {
  color: var(--text_head);
  border-color: color-mix(in srgb, var(--border_strong) 82%, transparent);
  background: color-mix(in srgb, var(--panel_active) 74%, transparent);
}

.theme_dock {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 30;
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.theme_icon_btn {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--text_muted);
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.theme_icon_btn svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.theme_icon_btn:hover {
  color: var(--text_head);
}

.theme_icon_btn.is_active {
  color: var(--text_head);
  border-color: color-mix(in srgb, var(--border_strong) 82%, transparent);
  background: color-mix(in srgb, var(--panel_active) 84%, transparent);
}

@media (max-width: 860px) {
  .header_inner {
    padding: 6px 8px;
    max-width: calc(100vw - 20px);
  }

  .main_nav {
    overflow-x: auto;
    max-width: calc(100vw - 44px);
    scrollbar-width: none;
  }

  .main_nav::-webkit-scrollbar {
    display: none;
  }

  .nav_link {
    white-space: nowrap;
    padding: 6px 9px;
  }

  .theme_dock {
    right: 12px;
    bottom: 14px;
  }
}
</style>

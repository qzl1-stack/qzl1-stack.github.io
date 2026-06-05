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
      <RouterLink class="brand" to="/">
        <span class="brand_zh">全志凌</span>
        <span class="brand_sep" aria-hidden="true"></span>
        <span class="brand_en">QZL</span>
      </RouterLink>

      <nav class="main_nav" aria-label="主导航">
        <RouterLink
          v-for="item in nav_items"
          :key="item.to"
          class="nav_link"
          :to="item.to"
          exact-active-class="nav_active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="theme_dock" role="group" aria-label="主题模式">
        <button
          v-for="item in theme_items"
          :key="item.mode"
          class="theme_btn"
          :class="{ is_active: theme_mode === item.mode }"
          :aria-label="`切换到${item.label}模式`"
          @click="set_theme_mode(item.mode)"
        >
          <svg v-if="item.icon === 'sun'" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm0 12.6a4.6 4.6 0 1 0 0-9.2 4.6 4.6 0 0 0 0 9.2zm8-5.6a1 1 0 0 1 0 2h-1.2a1 1 0 1 1 0-2H20zM6.4 12a1 1 0 0 1-1 1H4.2a1 1 0 1 1 0-2h1.2a1 1 0 0 1 1 1zm10.14-5.14a1 1 0 0 1 1.42 0l.84.84a1 1 0 0 1-1.42 1.42l-.84-.84a1 1 0 0 1 0-1.42zM6.62 16.54a1 1 0 0 1 1.42 0l.84.84a1 1 0 1 1-1.42 1.42l-.84-.84a1 1 0 0 1 0-1.42zm11.38 0a1 1 0 0 1 0 1.42l-.84.84a1 1 0 1 1-1.42-1.42l.84-.84a1 1 0 0 1 1.42 0zM8.04 6.86a1 1 0 0 1 0 1.42l-.84.84A1 1 0 0 1 5.78 7.7l.84-.84a1 1 0 0 1 1.42 0z"/>
          </svg>
          <svg v-else-if="item.icon === 'monitor'" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 4a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h5v2H8.5a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H14v-2h5a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H5zm0 2h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.4 3.2A9.4 9.4 0 1 0 20.8 17a1 1 0 0 0-1.14-1.46 7.4 7.4 0 0 1-9.2-9.2A1 1 0 0 0 9 5.18a9.35 9.35 0 0 0 5.4-1.98z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site_header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header_h);
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(16px) saturate(1.4);
  border-bottom: 1px solid var(--border);
}

.header_inner {
  max-width: calc(var(--content_w) + 64px);
  margin: 0 auto;
  padding: 0 32px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}

/* ── Brand ── */
.brand {
  display: flex;
  align-items: baseline;
  gap: 7px;
  text-decoration: none;
  flex-shrink: 0;
  margin-right: 8px;
}

.brand_zh {
  font-family: var(--font_serif);
  font-size: 15px;
  font-weight: 600;
  color: var(--text_head);
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.brand:hover .brand_zh { color: var(--brand); }

.brand_sep {
  width: 1px;
  height: 12px;
  background: var(--border_strong);
  display: block;
  flex-shrink: 0;
}

.brand_en {
  font-family: var(--font_sans);
  font-size: 11px;
  font-weight: 500;
  color: var(--text_muted);
  letter-spacing: 0.12em;
  transition: color 0.2s;
}

.brand:hover .brand_en { color: var(--brand); }

/* ── Nav ── */
.main_nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
}

.nav_link {
  position: relative;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--text_muted);
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;
}

.nav_link:hover {
  color: var(--text_head);
  background: var(--panel_active);
}

.nav_link.router-link-active {
  color: var(--brand);
}

.nav_link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 1.5px;
  background: var(--brand);
  border-radius: 999px;
}

/* ── Theme toggle ── */
.theme_dock {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--panel_active);
}

.theme_btn {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text_muted);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.theme_btn svg {
  width: 13px;
  height: 13px;
  fill: currentColor;
}

.theme_btn:hover { color: var(--text_head); }

.theme_btn.is_active {
  background: var(--bg);
  color: var(--brand);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

/* ── Mobile ── */
@media (max-width: 860px) {
  .header_inner {
    padding: 0 20px;
    gap: 12px;
  }

  .brand_en { display: none; }
  .brand_sep { display: none; }

  .main_nav { gap: 0; }

  .nav_link {
    padding: 5px 9px;
    font-size: 12px;
  }

  .nav_link.router-link-active::after { display: none; }

  .theme_dock { margin-left: auto; }
}

@media (max-width: 480px) {
  .brand_zh { font-size: 14px; }
  .nav_link { padding: 5px 7px; }
}
</style>

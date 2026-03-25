import { ref } from 'vue'

export type ThemeMode = 'system' | 'light' | 'dark'

const THEME_STORAGE_KEY = 'qzl_theme_mode'

export const theme_mode = ref<ThemeMode>('system')

function resolve_system_theme(): 'light' | 'dark' {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function apply_theme(mode: ThemeMode): void {
  const root = document.documentElement
  if (mode === 'system') {
    root.setAttribute('data-theme', resolve_system_theme())
    return
  }
  root.setAttribute('data-theme', mode)
}

function get_next_mode(mode: ThemeMode): ThemeMode {
  if (mode === 'system') return 'light'
  if (mode === 'light') return 'dark'
  return 'system'
}

export function init_theme_mode(): void {
  const stored_mode = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
  if (stored_mode === 'light' || stored_mode === 'dark' || stored_mode === 'system') {
    theme_mode.value = stored_mode
  } else {
    theme_mode.value = 'system'
  }
  apply_theme(theme_mode.value)
  const media_query = window.matchMedia('(prefers-color-scheme: dark)')
  media_query.addEventListener('change', () => {
    if (theme_mode.value === 'system') {
      apply_theme('system')
    }
  })
}

export function cycle_theme_mode(): void {
  const next_mode = get_next_mode(theme_mode.value)
  theme_mode.value = next_mode
  window.localStorage.setItem(THEME_STORAGE_KEY, next_mode)
  apply_theme(next_mode)
}

export function set_theme_mode(mode: ThemeMode): void {
  theme_mode.value = mode
  window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  apply_theme(mode)
}

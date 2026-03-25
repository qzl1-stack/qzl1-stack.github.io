<script setup lang="ts">
import Giscus from '@giscus/vue'
import type { Repo, Theme } from '@giscus/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { theme_mode } from '../lib/theme'

const route = useRoute()

const env = import.meta.env

const giscus_theme = computed((): Theme => {
  if (theme_mode.value === 'system') {
    return 'preferred_color_scheme'
  }
  return theme_mode.value
})

/** 在 config_ready 为 true 时四项均存在，供模板类型收窄 */
const giscus_props = computed(() => {
  if (
    !env.VITE_GISCUS_REPO ||
    !env.VITE_GISCUS_REPO_ID ||
    !env.VITE_GISCUS_CATEGORY ||
    !env.VITE_GISCUS_CATEGORY_ID
  ) {
    return null
  }
  return {
    repo: env.VITE_GISCUS_REPO as Repo,
    repo_id: env.VITE_GISCUS_REPO_ID,
    category: env.VITE_GISCUS_CATEGORY,
    category_id: env.VITE_GISCUS_CATEGORY_ID,
  }
})
</script>

<template>
  <div v-if="giscus_props" class="giscus_block">
    <p class="giscus_heading">评论</p>
    <p class="giscus_hint">
      使用 GitHub 登录后即可留言（由
      <a
        href="https://github.com/giscus/giscus"
        target="_blank"
        rel="noopener noreferrer"
      >giscus</a
      >
      提供）
    </p>
    <Giscus
      :key="route.fullPath"
      id="giscus_thread"
      :repo="giscus_props.repo"
      :repo-id="giscus_props.repo_id"
      :category="giscus_props.category"
      :category-id="giscus_props.category_id"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      :theme="giscus_theme"
      lang="zh-CN"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.giscus_block {
  margin-top: 8px;
}

.giscus_heading {
  margin: 0 0 6px;
  font-size: 18px;
  color: var(--text_head);
}

.giscus_hint {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--text_muted);
}

.giscus_hint a {
  text-decoration: underline;
}
</style>

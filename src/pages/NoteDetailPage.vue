<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { find_note_by_slug } from '../lib/content'

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

const route = useRoute()
const note = computed(() => find_note_by_slug(String(route.params.slug)))
const read_progress = ref(0)
const toc_items = ref<TocItem[]>([])
const active_toc_id = ref('')
const processed_html = ref('')

useHead(() => ({
  title: note.value ? `${note.value.title} | QZL Blog` : '内容未找到 | QZL Blog',
}))

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function build_html_and_toc(html: string): void {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const headings = Array.from(doc.querySelectorAll('h2, h3'))
  const next_toc: TocItem[] = []
  headings.forEach((heading, index) => {
    const text = heading.textContent?.trim() ?? ''
    if (!text) {
      return
    }
    const id = `${slugify(text)}-${index}`
    heading.id = id
    next_toc.push({
      id,
      text,
      level: heading.tagName === 'H2' ? 2 : 3,
    })
  })
  toc_items.value = next_toc
  processed_html.value = doc.body.innerHTML
}

function update_read_progress(): void {
  const article = document.querySelector<HTMLElement>('.note_detail_layout')
  if (!article) {
    return
  }
  const rect = article.getBoundingClientRect()
  const total = rect.height - window.innerHeight * 0.6
  if (total <= 0) {
    read_progress.value = 1
    return
  }
  const done = -rect.top + window.innerHeight * 0.2
  read_progress.value = Math.max(0, Math.min(done / total, 1))
}

function update_active_heading(): void {
  let current_id = ''
  toc_items.value.forEach((item) => {
    const element = document.getElementById(item.id)
    if (!element) {
      return
    }
    const rect = element.getBoundingClientRect()
    if (rect.top <= 120) {
      current_id = item.id
    }
  })
  active_toc_id.value = current_id
}

function handle_scroll(): void {
  update_read_progress()
  update_active_heading()
}

watch(
  () => note.value?.html,
  async (html) => {
    if (!html) {
      processed_html.value = ''
      toc_items.value = []
      return
    }
    build_html_and_toc(html)
    await nextTick()
    handle_scroll()
  },
  { immediate: true },
)

watch(
  () => route.params.slug,
  () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

onMounted(() => {
  window.addEventListener('scroll', handle_scroll, { passive: true })
  handle_scroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handle_scroll)
})
</script>

<template>
  <div class="read_progress_bar">
    <span class="read_progress_fill" :style="{ width: `${read_progress * 100}%` }"></span>
  </div>
  <section class="panel article" v-if="note">
    <div class="note_detail_layout">
      <aside class="toc_panel" v-if="toc_items.length > 0">
        <p class="toc_title">目录</p>
        <a
          v-for="item in toc_items"
          :key="item.id"
          class="toc_link"
          :class="{
            toc_h3: item.level === 3,
            toc_active: active_toc_id === item.id,
          }"
          :href="`#${item.id}`"
        >
          {{ item.text }}
        </a>
      </aside>
      <div class="article_main">
        <p class="article_meta">{{ note.date }} · {{ note.tags.join(' / ') }}</p>
        <h1>{{ note.title }}</h1>
        <p class="article_summary">{{ note.summary }}</p>
        <article class="markdown_body animate_heading" v-html="processed_html" />
      </div>
    </div>
  </section>
  <section v-else class="panel">
    <h1>内容不存在</h1>
    <RouterLink to="/notes" class="back_link">返回手记列表</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import PostCard from '../components/PostCard.vue'
import { get_notes } from '../lib/content'

const notes = get_notes()

useHead({ title: '手记 | QZL Blog' })
</script>

<template>
  <div class="list_page">
    <header class="list_header">
      <p class="list_eyebrow">NOTES</p>
      <h1 class="list_title">技术手记</h1>
      <p class="list_desc">记录项目复盘、架构拆解和工程经验。</p>
    </header>

    <div class="list_count">共 {{ notes.length }} 篇</div>

    <section class="list_body">
      <PostCard
        v-for="post in notes"
        :key="post.slug"
        :post="post"
        link_base="/notes"
      />
      <p v-if="notes.length === 0" class="list_empty">暂无内容。</p>
    </section>
  </div>
</template>

<style scoped>
.list_page {
  max-width: calc(var(--content_w) + 64px);
  margin: 0 auto;
  padding: 0 32px 80px;
}

.list_header {
  padding: 56px 0 40px;
  border-bottom: 1px solid var(--border);
  max-width: 640px;
}

.list_eyebrow {
  font-family: var(--font_sans);
  font-size: 11px;
  letter-spacing: 0.22em;
  color: var(--brand);
  margin: 0 0 14px;
}

.list_title {
  font-family: var(--font_serif);
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: var(--text_head);
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}

.list_desc {
  font-size: 15px;
  color: var(--text_muted);
  margin: 0;
  line-height: 1.7;
}

.list_count {
  padding: 16px 0 4px;
  font-size: 12px;
  color: var(--text_muted);
  letter-spacing: 0.06em;
}

.list_body { padding-top: 4px; }

.list_empty {
  padding: 48px 0;
  color: var(--text_muted);
  font-size: 14px;
}

@media (max-width: 640px) {
  .list_page { padding: 0 16px 60px; }
  .list_header { padding: 36px 0 28px; }
}
</style>

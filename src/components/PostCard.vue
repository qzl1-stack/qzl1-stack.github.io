<script setup lang="ts">
import type { RenderedPost } from '../types/content'

defineProps<{
  post: RenderedPost
  link_base: '/notes' | '/moments'
}>()
</script>

<template>
  <article class="post_card">
    <p class="post_meta">{{ post.date }}</p>
    <h3 class="post_title">{{ post.title }}</h3>
    <p class="post_summary">{{ post.summary }}</p>
    <div class="post_tags">
      <span class="post_tag" v-for="tag in post.tags" :key="tag">{{ tag }}</span>
    </div>
    <RouterLink class="post_link" :to="`${link_base}/${post.slug}`">
      阅读全文
    </RouterLink>
  </article>
</template>

<style scoped>
.post_card {
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
  background: transparent;
  transition: border-color 0.2s ease;
}

.post_card:hover {
  border-color: var(--text_head);
}

.post_meta {
  color: var(--text_muted);
  font-size: 12px;
  letter-spacing: 0.06em;
  margin: 0;
}

.post_title {
  margin: 10px 0 10px;
  font-size: 18px;
  line-height: 1.45;
  color: var(--text_head);
}

.post_summary {
  margin: 0 0 14px;
  color: var(--text_body);
  font-size: 14px;
}

.post_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.post_tag {
  border-bottom: 1px solid var(--border);
  padding: 2px 0;
  font-size: 12px;
  color: var(--text_muted);
}

.post_link {
  color: var(--brand);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.post_link:hover {
  text-decoration: underline;
}
</style>

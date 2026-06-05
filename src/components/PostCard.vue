<script setup lang="ts">
import type { RenderedPost } from '../types/content'

defineProps<{
  post: RenderedPost
  link_base: '/notes' | '/moments'
}>()
</script>

<template>
  <article class="post_card">
    <RouterLink class="card_link" :to="`${link_base}/${post.slug}`" tabindex="-1" aria-hidden="true"></RouterLink>
    <div class="card_date">
      <span>{{ post.date }}</span>
    </div>
    <div class="card_body">
      <h3 class="card_title">{{ post.title }}</h3>
      <p class="card_summary">{{ post.summary }}</p>
      <div class="card_footer">
        <div class="card_tags">
          <span class="card_tag" v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
        <RouterLink class="card_read" :to="`${link_base}/${post.slug}`">
          阅读 →
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.post_card {
  position: relative;
  display: grid;
  grid-template-columns: 68px 1fr;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--border);
  transition: border-color 0.22s;
}

.post_card:hover { border-color: var(--border_strong); }

/* invisible overlay for whole-card hover */
.card_link {
  position: absolute;
  inset: 0;
}

.card_date {
  padding-top: 3px;
  flex-shrink: 0;
}

.card_date span {
  font-size: 11px;
  color: var(--text_muted);
  letter-spacing: 0.05em;
  line-height: 1.5;
  word-break: break-all;
}

.card_body { min-width: 0; }

.card_title {
  font-family: var(--font_serif);
  font-size: 16px;
  font-weight: 600;
  color: var(--text_head);
  margin: 0 0 7px;
  line-height: 1.4;
  transition: color 0.2s;
}

.post_card:hover .card_title { color: var(--brand); }

.card_summary {
  font-size: 13px;
  color: var(--text_muted);
  line-height: 1.7;
  margin: 0 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card_footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.card_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  min-width: 0;
}

.card_tag {
  font-size: 11px;
  color: var(--text_muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 1px 8px;
  background: color-mix(in srgb, var(--panel_active) 50%, transparent);
  white-space: nowrap;
  transition: color 0.2s, border-color 0.2s;
}

.post_card:hover .card_tag {
  color: var(--brand);
  border-color: color-mix(in srgb, var(--brand) 35%, transparent);
}

.card_read {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--text_muted);
  text-decoration: none;
  transition: color 0.2s;
  white-space: nowrap;
}

.card_read:hover,
.post_card:hover .card_read { color: var(--brand); }

@media (max-width: 480px) {
  .post_card { grid-template-columns: 1fr; gap: 6px; }
  .card_date { padding-top: 0; }
}
</style>

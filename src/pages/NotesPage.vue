<script setup lang="ts">
import { useHead } from '@vueuse/head'
import PostCard from '../components/PostCard.vue'
import { get_notes } from '../lib/content'

const notes = get_notes()

useHead({
  title: '手记 | QZL Blog',
})
</script>

<template>
  <section class="page_intro panel">
    <p class="page_intro_tag">NOTES</p>
    <h1>技术手记</h1>
    <p class="sub">记录项目复盘、架构拆解和工程经验。</p>
  </section>

  <section class="panel">
    <div class="grid list_grid">
      <PostCard v-for="post in notes" :key="post.slug" :post="post" link_base="/notes" />
    </div>
  </section>
</template>

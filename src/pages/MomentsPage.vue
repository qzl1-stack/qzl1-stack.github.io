<script setup lang="ts">
import { useHead } from '@vueuse/head'
import PostCard from '../components/PostCard.vue'
import { get_moments } from '../lib/content'

const moments = get_moments()

useHead({
  title: '动态 | QZL Blog',
})
</script>

<template>
  <section class="page_intro panel">
    <p class="page_intro_tag">MOMENTS</p>
    <h1>动态</h1>
    <p class="sub">发布近期状态、学习节奏和项目进展。</p>
  </section>

  <section class="panel">
    <div class="grid list_grid">
      <PostCard
        v-for="post in moments"
        :key="post.slug"
        :post="post"
        link_base="/moments"
      />
    </div>
  </section>
</template>

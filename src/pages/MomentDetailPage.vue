<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { find_moment_by_slug } from '../lib/content'

const route = useRoute()
const moment = computed(() => find_moment_by_slug(String(route.params.slug)))

useHead(() => ({
  title: moment.value ? `${moment.value.title} | QZL Blog` : '内容未找到 | QZL Blog',
}))
</script>

<template>
  <section class="panel article" v-if="moment">
    <p class="article_meta">{{ moment.date }} · {{ moment.tags.join(' / ') }}</p>
    <h1>{{ moment.title }}</h1>
    <p class="article_summary">{{ moment.summary }}</p>
    <article class="markdown_body" v-html="moment.html" />
  </section>
  <section v-else class="panel">
    <h1>内容不存在</h1>
    <RouterLink to="/moments" class="back_link">返回动态列表</RouterLink>
  </section>
</template>

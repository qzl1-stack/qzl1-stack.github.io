<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useHead } from '@vueuse/head'
import HeroCanvas from '../components/HeroCanvas.vue'
import PostCard from '../components/PostCard.vue'
import { get_notes, get_moments } from '../lib/content'
import { resume_data } from '../data/resume_data'

const latest_notes = get_notes().slice(0, 2)
const latest_moments = get_moments().slice(0, 2)
const story_steps = [
  {
    title: '01 Capture',
    text: '把项目中的关键决策沉淀为可复盘的手记。',
  },
  {
    title: '02 Abstract',
    text: '将一次性问题抽象成可复用的方法与模板。',
  },
  {
    title: '03 Publish',
    text: '持续发布动态与文章，形成可持续增长的个人站点。',
  },
]
const story_progress = ref(0)
const active_story_index = ref(0)
const github_link = resume_data.github
const github_avatar = `${github_link.replace('https://github.com/', 'https://github.com/')}.png?size=160`

useHead({
  title: 'QZL Blog | 创作与工程手记',
  meta: [
    {
      name: 'description',
      content: '全志凌的个人博客，发布手记、动态与工程简历。',
    },
  ],
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is_visible')
        }
      })
    },
    { threshold: 0.25 },
  )
  document.querySelectorAll('.reveal_item').forEach((element) => observer.observe(element))

  const story_section = document.querySelector<HTMLElement>('.story_timeline')
  const scroll_handler = (): void => {
    if (!story_section) return
    const rect = story_section.getBoundingClientRect()
    const start = window.innerHeight * 0.2
    const end = window.innerHeight * 0.8
    const raw_progress = (start - rect.top) / (rect.height + end)
    const normalized = Math.min(Math.max(raw_progress, 0), 1)
    story_progress.value = normalized
    const next_index = Math.min(
      story_steps.length - 1,
      Math.floor(normalized * story_steps.length),
    )
    active_story_index.value = next_index
  }
  window.addEventListener('scroll', scroll_handler, { passive: true })
  scroll_handler()

  onUnmounted(() => {
    window.removeEventListener('scroll', scroll_handler)
    observer.disconnect()
  })
})
</script>

<template>
  <section class="hero hero_fullscreen reveal_item">
    <div class="hero_shader_layer" aria-hidden="true">
      <HeroCanvas />
    </div>
    <div class="hero_content hero_content_right">
      <div class="hero_text hero_text_right hero_avatar_only">
        <a class="hero_profile hero_profile_only" :href="github_link" target="_blank" rel="noreferrer">
          <img class="hero_avatar hero_avatar_large" :src="github_avatar" alt="GitHub avatar" loading="lazy" />
        </a>
      </div>
    </div>
  </section>

  <section class="panel reveal_item story_timeline">
    <h2>滚动叙事</h2>
    <div class="timeline_track">
      <div class="timeline_fill" :style="{ width: `${story_progress * 100}%` }"></div>
    </div>
    <div class="story_grid">
      <article
        class="story_card"
        :class="{ is_active: active_story_index === index }"
        v-for="(step, index) in story_steps"
        :key="step.title"
      >
        <p class="story_tag">{{ step.title }}</p>
        <h3>{{ step.text }}</h3>
      </article>
    </div>
  </section>

  <section class="panel reveal_item">
    <h2>最新手记</h2>
    <div class="grid">
      <PostCard
        v-for="post in latest_notes"
        :key="post.slug"
        :post="post"
        link_base="/notes"
      />
    </div>
  </section>

  <section class="panel reveal_item">
    <h2>最新动态</h2>
    <div class="grid">
      <PostCard
        v-for="post in latest_moments"
        :key="post.slug"
        :post="post"
        link_base="/moments"
      />
    </div>
  </section>
</template>

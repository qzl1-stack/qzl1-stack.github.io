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

const story_dot_radius = 12
const story_dot_stroke_width = 2
const story_dot_circumference = 2 * Math.PI * story_dot_radius

const progress_left = ref(0)

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

let observer: IntersectionObserver | null = null
let story_section: HTMLElement | null = null
let home_frame: HTMLElement | null = null
let scroll_handler: (() => void) | null = null
let resize_handler: (() => void) | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is_visible')
        }
      })
    },
    { threshold: 0.25 },
  )
  document.querySelectorAll('.reveal_item').forEach((element) => observer?.observe(element))

  story_section = document.querySelector<HTMLElement>('.story_timeline')
  home_frame = document.querySelector<HTMLElement>('.home_content_frame')

  const update_progress_left = (): void => {
    if (!home_frame) return
    const rect = home_frame.getBoundingClientRect()
    progress_left.value = rect.left
  }
  resize_handler = () => update_progress_left()
  update_progress_left()

  scroll_handler = (): void => {
    if (!home_frame) return
    const rect = home_frame.getBoundingClientRect()
    const start = window.innerHeight * 0.2
    const end = window.innerHeight * 0.8
    const raw_progress = (start - rect.top) / (rect.height + end)
    const normalized = Math.min(Math.max(raw_progress, 0), 1)
    story_progress.value = normalized
    if (!story_section) return

    const story_rect = story_section.getBoundingClientRect()
    const raw_story_progress = (start - story_rect.top) / (story_rect.height + end)
    const normalized_story_progress = Math.min(Math.max(raw_story_progress, 0), 1)
    active_story_index.value = Math.min(
      story_steps.length - 1,
      Math.floor(normalized_story_progress * story_steps.length),
    )
  }

  if (scroll_handler) {
    window.addEventListener('scroll', scroll_handler, { passive: true })
    scroll_handler()
  }

  if (resize_handler) {
    window.addEventListener('resize', resize_handler)
  }
})

onUnmounted(() => {
  if (scroll_handler) {
    window.removeEventListener('scroll', scroll_handler)
  }
  if (resize_handler) {
    window.removeEventListener('resize', resize_handler)
  }
  observer?.disconnect()
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

  <main class="home_content_frame">
    <aside class="home_story_progress" aria-hidden="true" :style="{ left: `${progress_left}px` }">
      <div class="story_progress_dot">
        <svg
          class="story_progress_svg"
          width="100%"
          height="100%"
          viewBox="0 0 30 30"
          role="presentation"
        >
          <defs>
            <linearGradient id="story_progress_gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--brand)" />
              <stop offset="100%" stop-color="var(--brand_2)" />
            </linearGradient>
          </defs>
          <circle
            class="story_progress_bg"
            cx="15"
            cy="15"
            :r="story_dot_radius"
            :stroke-width="story_dot_stroke_width"
          />
          <circle
            class="story_progress_fg"
            cx="15"
            cy="15"
            :r="story_dot_radius"
            :stroke-width="story_dot_stroke_width"
            :stroke-dasharray="story_dot_circumference"
            :stroke-dashoffset="story_dot_circumference * (1 - story_progress)"
            transform="rotate(-90 15 15)"
          />
        </svg>
      </div>
    </aside>

    <div class="home_panels">
      <section class="panel reveal_item story_timeline home_panel" aria-label="滚动叙事">
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

      <section class="panel reveal_item home_panel">
        <div class="home_panel_head">
          <h2>最新手记</h2>
        </div>
        <div class="grid home_grid">
          <PostCard
            v-for="post in latest_notes"
            :key="post.slug"
            :post="post"
            link_base="/notes"
          />
        </div>
      </section>

      <section class="panel reveal_item home_panel">
        <div class="home_panel_head">
          <h2>最新动态</h2>
        </div>
        <div class="grid home_grid">
          <PostCard
            v-for="post in latest_moments"
            :key="post.slug"
            :post="post"
            link_base="/moments"
          />
        </div>
      </section>
    </div>
  </main>
</template>

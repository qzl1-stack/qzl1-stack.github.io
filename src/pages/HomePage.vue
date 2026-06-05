<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useHead } from '@vueuse/head'
import HeroCanvas from '../components/HeroCanvas.vue'
import PostCard from '../components/PostCard.vue'
import { get_notes, get_moments } from '../lib/content'
import { resume_data } from '../data/resume_data'

const latest_notes = get_notes().slice(0, 3)
const latest_moments = get_moments().slice(0, 3)

const story_steps = [
  { num: '01', title: 'Capture', text: '把项目中的关键决策沉淀为可复盘的手记。' },
  { num: '02', title: 'Abstract', text: '将一次性问题抽象成可复用的方法与模板。' },
  { num: '03', title: 'Publish', text: '持续发布动态与文章，形成可持续增长的个人站点。' },
]

const story_progress = ref(0)
const active_story_index = ref(0)
const progress_left = ref(0)

const story_dot_radius = 12
const story_dot_stroke_width = 2
const story_dot_circumference = 2 * Math.PI * story_dot_radius

const github_link = resume_data.github
const github_avatar = `${github_link}.png?size=160`

useHead({
  title: 'QZL Blog | 创作与工程手记',
  meta: [{ name: 'description', content: '全志凌的个人博客，发布手记、动态与工程简历。' }],
})

let observer: IntersectionObserver | null = null
let story_section: HTMLElement | null = null
let home_frame: HTMLElement | null = null
let scroll_handler: (() => void) | null = null
let resize_handler: (() => void) | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is_visible') }),
    { threshold: 0.15 },
  )
  document.querySelectorAll('.reveal_item').forEach((el) => observer?.observe(el))

  story_section = document.querySelector<HTMLElement>('.story_section')
  home_frame = document.querySelector<HTMLElement>('.home_page')

  const update_left = () => {
    if (!home_frame) return
    progress_left.value = home_frame.getBoundingClientRect().left
  }
  resize_handler = update_left
  update_left()

  scroll_handler = () => {
    if (!home_frame) return
    const rect = home_frame.getBoundingClientRect()
    const start = window.innerHeight * 0.2
    const end = window.innerHeight * 0.8
    story_progress.value = Math.min(Math.max((start - rect.top) / (rect.height + end), 0), 1)

    if (!story_section) return
    const sr = story_section.getBoundingClientRect()
    const sp = Math.min(Math.max((start - sr.top) / (sr.height + end), 0), 1)
    active_story_index.value = Math.min(story_steps.length - 1, Math.floor(sp * story_steps.length))
  }

  window.addEventListener('scroll', scroll_handler, { passive: true })
  window.addEventListener('resize', resize_handler)
  scroll_handler()
})

onUnmounted(() => {
  if (scroll_handler) window.removeEventListener('scroll', scroll_handler)
  if (resize_handler) window.removeEventListener('resize', resize_handler)
  observer?.disconnect()
})
</script>

<template>
  <div class="home_page">

    <!-- ── Hero ── -->
    <section class="home_hero reveal_item">
      <div class="hero_text">
        <p class="hero_eyebrow">C++ · Qt 工程师</p>
        <h1 class="hero_name">全志凌</h1>
        <p class="hero_desc">
          专注 C++ 与 Qt 工程实践，擅长构建高性能桌面 GUI 应用。<br>
          把项目中的关键决策沉淀为可复盘的手记，持续输出。
        </p>
        <div class="hero_actions">
          <a :href="github_link" target="_blank" rel="noreferrer" class="hero_btn hero_btn_dark">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </a>
          <RouterLink to="/resume" class="hero_btn hero_btn_ghost">查看简历 →</RouterLink>
        </div>
      </div>

      <div class="hero_visual">
        <div class="canvas_frame">
          <HeroCanvas />
          <div class="canvas_overlay" aria-hidden="true"></div>
        </div>
        <a class="avatar_badge" :href="github_link" target="_blank" rel="noreferrer">
          <img :src="github_avatar" alt="GitHub avatar" />
        </a>
      </div>
    </section>

    <!-- ── Story ── -->
    <section class="story_section reveal_item" aria-label="站点理念">
      <div
        class="story_step"
        v-for="(step, index) in story_steps"
        :key="step.num"
        :class="{ is_active: active_story_index === index }"
      >
        <span class="step_num" aria-hidden="true">{{ step.num }}</span>
        <p class="step_title">{{ step.title }}</p>
        <p class="step_text">{{ step.text }}</p>
      </div>
    </section>

    <!-- ── Recent ── -->
    <section class="recent_section">
      <div class="recent_col reveal_item">
        <div class="col_header">
          <h2 class="col_title">手记</h2>
          <RouterLink to="/notes" class="col_more">全部 →</RouterLink>
        </div>
        <PostCard
          v-for="post in latest_notes"
          :key="post.slug"
          :post="post"
          link_base="/notes"
        />
      </div>

      <div class="recent_col reveal_item">
        <div class="col_header">
          <h2 class="col_title">动态</h2>
          <RouterLink to="/moments" class="col_more">全部 →</RouterLink>
        </div>
        <PostCard
          v-for="post in latest_moments"
          :key="post.slug"
          :post="post"
          link_base="/moments"
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
.home_page {
  max-width: calc(var(--content_w) + 64px);
  margin: 0 auto;
  padding: 0 32px 80px;
}

/* ── Hero ── */
.home_hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 48px;
  padding: 80px 0 72px;
  border-bottom: 1px solid var(--border);
}

.hero_eyebrow {
  font-family: var(--font_sans);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--brand);
  margin: 0 0 18px;
}

.hero_name {
  font-family: var(--font_serif);
  font-size: clamp(52px, 7vw, 84px);
  font-weight: 700;
  color: var(--text_head);
  line-height: 1.0;
  letter-spacing: -0.02em;
  margin: 0 0 22px;
}

.hero_desc {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text_muted);
  margin: 0 0 32px;
  max-width: 400px;
}

.hero_actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hero_btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  border-radius: var(--radius);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.hero_btn svg { width: 15px; height: 15px; flex-shrink: 0; }

.hero_btn_dark {
  background: var(--text_head);
  color: var(--bg);
}

.hero_btn_dark:hover { background: var(--brand); }

.hero_btn_ghost {
  border: 1px solid var(--border);
  color: var(--text_body);
  background: transparent;
}

.hero_btn_ghost:hover {
  border-color: var(--brand);
  color: var(--brand);
}

/* ── Hero visual ── */
.hero_visual {
  position: relative;
  flex-shrink: 0;
}

.canvas_frame {
  width: min(360px, 36vw);
  height: min(360px, 36vw);
  border-radius: var(--radius_lg);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  position: relative;
}

.canvas_overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 0% 100%,
    color-mix(in srgb, var(--bg) 40%, transparent) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.avatar_badge {
  position: absolute;
  bottom: -14px;
  right: -14px;
  width: 70px;
  height: 70px;
  border-radius: 999px;
  overflow: hidden;
  border: 3px solid var(--bg);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
  display: block;
  transition: transform 0.2s;
}

.avatar_badge:hover { transform: scale(1.05); }
.avatar_badge img { width: 100%; height: 100%; object-fit: cover; }

/* ── Story ── */
.story_section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 48px 0;
  border-bottom: 1px solid var(--border);
}

.story_step {
  padding: 24px 32px 24px 0;
  border-top: 2px solid var(--border);
  transition: border-color 0.3s;
}

.story_step + .story_step {
  padding-left: 32px;
  border-left: 1px solid var(--border);
}

.story_step.is_active,
.story_step:hover {
  border-top-color: var(--brand);
}

.step_num {
  display: block;
  font-family: var(--font_serif);
  font-size: 52px;
  font-weight: 700;
  color: var(--brand);
  opacity: 0.22;
  line-height: 1;
  margin-bottom: 12px;
  transition: opacity 0.3s;
}

.story_step.is_active .step_num,
.story_step:hover .step_num {
  opacity: 0.55;
}

.step_title {
  font-family: var(--font_serif);
  font-size: 17px;
  font-weight: 600;
  color: var(--text_head);
  margin: 0 0 8px;
}

.step_text {
  font-size: 13px;
  color: var(--text_muted);
  line-height: 1.75;
  margin: 0;
}

/* ── Recent ── */
.recent_section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding-top: 48px;
}

.recent_col + .recent_col {
  padding-left: 48px;
  border-left: 1px solid var(--border);
}

.col_header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 4px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.col_title {
  font-family: var(--font_serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--text_head);
  margin: 0;
}

.col_more {
  font-size: 12px;
  color: var(--text_muted);
  text-decoration: none;
  transition: color 0.2s;
  letter-spacing: 0.04em;
}

.col_more:hover { color: var(--brand); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .home_hero {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 56px 0 48px;
  }

  .canvas_frame {
    width: min(280px, 70vw);
    height: min(280px, 70vw);
  }

  .hero_visual { justify-self: center; }

  .story_section { grid-template-columns: 1fr; }

  .story_step + .story_step {
    padding-left: 0;
    border-left: none;
  }

  .recent_section { grid-template-columns: 1fr; gap: 40px; }

  .recent_col + .recent_col {
    padding-left: 0;
    border-left: none;
    border-top: 1px solid var(--border);
    padding-top: 40px;
  }
}

@media (max-width: 640px) {
  .home_page { padding: 0 16px 60px; }

  .home_hero { padding: 40px 0 36px; gap: 32px; }

  .hero_name { font-size: clamp(40px, 12vw, 60px); }

  .canvas_frame {
    width: min(240px, 80vw);
    height: min(240px, 80vw);
  }

  .step_num { font-size: 40px; }
}
</style>

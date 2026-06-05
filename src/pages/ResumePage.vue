<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'

interface SkillGroup {
  label: string
  items: string[]
}

interface ProjectItem {
  key: string
  name: string
  subtitle: string
  link: string
  description: string
  tags: string[]
  demos: { label: string; src: string; alt: string }[]
}

const skill_groups: SkillGroup[] = [
  { label: '核心语言', items: ['C++ 17', 'QML', 'CMake'] },
  { label: 'Qt 框架', items: ['Qt6 / Qt5', 'Qt Quick', 'QtConcurrent', 'QtNetwork'] },
  { label: '架构 / 设计模式', items: ['策略模式', '工厂模式', '依赖注入', '插件化架构'] },
  { label: 'IPC / 网络', items: ['LocalSocket', 'TCP/IP', 'SSH/SFTP', 'GStreamer'] },
  { label: '图形 / 多媒体', items: ['OpenGL', 'OpenCV', 'H.264 解码'] },
  { label: '其他', items: ['Git', '智能指针', '多线程', 'Vue.js'] },
]

const about_list = [
  '熟练掌握 C++ 17 / Qt6 / QML，具备从需求分析到产品上线的完整 Qt GUI 应用开发经验，擅长构建现代化、高性能的桌面界面。',
  '具备多进程、多线程及 IPC 通信设计经验，善用智能指针、设计模式等手段提升代码可维护性与可扩展性。',
  '有工业设备通信（SSH / SFTP / TCP / GStreamer）及图形渲染（OpenGL）开发经验，能快速上手嵌入式/工控 GUI 项目。',
  '具备一定前端开发能力（Vue.js / Three.js），拥有跨端技术视野，能与产品、前后端团队高效协作。',
]

const projects: ProjectItem[] = [
  {
    key: 'master',
    name: 'Master',
    subtitle: 'Qt 多进程桌面平台',
    link: 'https://github.com/qzl1-stack/Master',
    description:
      '基于 Qt6 / QML 的多进程管理平台，实现插件化进程管理、IPC 路由、窗口嵌入与工作区管理。IPC 层以策略模式 + 工厂模式设计，运行时可切换 LocalSocket / TCP / NamedPipe / RabbitMQ；全程使用智能指针 + 依赖注入管理模块生命周期，显著降低耦合度。',
    tags: ['C++ 17', 'Qt6', 'QML', 'IPC', '插件系统', '多进程'],
    demos: [
      { label: '插件下载 · Plugin Download', src: '/GIF/plugins_download.gif?v=2', alt: '插件下载演示' },
      { label: '插件卸载 · Plugin Uninstall', src: '/GIF/plugins_uninstall.gif?v=1', alt: '插件卸载演示' },
    ],
  },
  {
    key: 'vta',
    name: 'VTA',
    subtitle: '设备 IP 管理与文件传输工具',
    link: 'https://github.com/qzl1-stack/--VTA',
    description:
      '基于 Qt6 的工业设备管理工具，支持批量 IP 添加（拖拽文件导入）、实时在线状态检测，及通过 SSH / SFTP 向多设备并发上传文件、下载日志。提供中英文双语界面，无需重启即时切换。',
    tags: ['C++ 17', 'Qt6', 'QML', 'SSH/SFTP', 'IPv4 管理', '国际化'],
    demos: [
      { label: '设备管理与文件传输 · Device & File Transfer', src: '/GIF/plugins_VTA.gif?v=1', alt: 'VTA 演示' },
    ],
  },
  {
    key: 'log',
    name: 'jts-log_analyze',
    subtitle: '日志可视化分析工具',
    link: 'https://github.com/qzl1-stack/jts-log_analyze',
    description:
      '面向 JTS 系统日志的桌面分析工具，采用 C++ 后端解析 + QML 前端呈现的分层架构，支持日志文件导入、结构化解析与数据可视化展示，辅助快速定位系统异常。',
    tags: ['C++', 'QML', '日志解析', '数据可视化'],
    demos: [{ label: '日志分析 · Log Analysis', src: '/GIF/plugins_Log_analyzer.gif?v=1', alt: '日志分析演示' }],
  },
  {
    key: 'dmcode',
    name: 'DMcode_Video_Desplay',
    subtitle: '视频流显示与二维码识别',
    link: 'https://github.com/qzl1-stack/DMcode_Video_Desplay',
    description:
      '基于 Qt6 + GStreamer + OpenGL 的高性能视频流显示系统。支持 UDP H.264 实时解码与 OpenGL 硬件加速渲染，集成 DM 二维码智能识别（OpenCV + ZXing-C++）与摄像头参数 TCP 远程控制。采用多线程异步处理，含异常自动恢复与实时性能监控模块。',
    tags: ['C++ 17', 'Qt6', 'QML', 'GStreamer', 'OpenGL', 'OpenCV', '二维码识别', '多线程'],
    demos: [
      { label: '视频播放与二维码识别 (1)', src: '/GIF/detect1.gif?v=1', alt: '视频识别演示 1' },
      { label: '视频播放与二维码识别 (2)', src: '/GIF/detect2.gif?v=1', alt: '视频识别演示 2' },
    ],
  },
  {
    key: 'model',
    name: '3D_Model',
    subtitle: '在线三维模型查看器',
    link: 'https://github.com/qzl1-stack/3D_Model',
    description:
      '基于 Vue.js + Three.js 的 Web 端三维模型展示平台，支持模型加载与鼠标交互操作，展示了跨技术栈的全栈开发能力。',
    tags: ['Vue.js', 'Three.js', 'JavaScript', '3D 渲染'],
    demos: [{ label: '三维模型查看 · 3D Model Viewer', src: '/GIF/plugins_3D_model.gif?v=1', alt: '3D 模型演示' }],
  },
]

const open_project_keys = ref<Record<string, boolean>>({})

function ToggleProjectDemo(key: string): void {
  open_project_keys.value[key] = !open_project_keys.value[key]
}

useHead({ title: '简历 | QZL Blog' })
</script>

<template>
  <div class="resume_page">

    <!-- ── Hero banner ── -->
    <div class="resume_hero">
      <div class="hero_glow" aria-hidden="true"></div>
      <div class="hero_body">
        <span class="hero_badge">C++ · Qt GUI Engineer</span>
        <h1 class="hero_name">全<em>志凌</em></h1>
        <p class="hero_sub">湖南农业大学 · 专注 Qt6 / QML / C++17 桌面应用开发</p>
        <div class="hero_links">
          <a class="hero_link primary" href="https://github.com/qzl1-stack" target="_blank" rel="noreferrer">
            github.com/qzl1-stack ↗
          </a>
          <span class="hero_link ghost">湖南农业大学</span>
        </div>
      </div>
    </div>

    <!-- ── Body ── -->
    <div class="resume_body">

      <!-- Sidebar -->
      <aside class="resume_sidebar">
        <section class="side_card">
          <h2 class="side_label">教育背景</h2>
          <h3 class="side_school">湖南农业大学</h3>
          <p class="side_meta">本科 · 软件工程</p>
        </section>

        <section class="side_card">
          <h2 class="side_label">专业技能</h2>
          <div class="skill_list">
            <div class="skill_group" v-for="group in skill_groups" :key="group.label">
              <p class="skill_group_label">{{ group.label }}</p>
              <div class="chips">
                <span class="chip" v-for="item in group.items" :key="item">{{ item }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="side_card">
          <h2 class="side_label">自我评价</h2>
          <ul class="about_list">
            <li v-for="item in about_list" :key="item">{{ item }}</li>
          </ul>
        </section>
      </aside>

      <!-- Projects -->
      <div class="resume_projects">
        <div class="projects_header">
          <h2 class="projects_title">项目经历</h2>
        </div>

        <article class="proj_card" v-for="project in projects" :key="project.key">
          <div class="proj_head">
            <div>
              <h3 class="proj_name">
                <code>{{ project.name }}</code>
                <span class="proj_sep">—</span>
                {{ project.subtitle }}
              </h3>
            </div>
            <a class="proj_link" :href="project.link" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
          <p class="proj_desc">{{ project.description }}</p>
          <div class="proj_tags">
            <span class="proj_tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <button
            class="demo_toggle"
            :class="{ is_open: open_project_keys[project.key] }"
            @click="ToggleProjectDemo(project.key)"
          >
            <span>查看功能演示</span>
            <span class="demo_count">{{ project.demos.length }} 个 GIF</span>
            <svg class="toggle_icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 10.5 3 5.5h10z"/>
            </svg>
          </button>
          <div class="demo_panel" v-show="open_project_keys[project.key]">
            <figure class="demo_item" v-for="demo in project.demos" :key="demo.src">
              <figcaption>{{ demo.label }}</figcaption>
              <img :src="demo.src" :alt="demo.alt" loading="lazy" />
            </figure>
          </div>
        </article>
      </div>
    </div>

  </div>
</template>

<style scoped>
.resume_page {
  max-width: calc(var(--content_w) + 64px);
  margin: 0 auto;
  padding: 0 32px 80px;
}

/* ── Hero ── */
.resume_hero {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius_lg);
  background: var(--text_head);
  margin: 28px 0 28px;
  padding: 60px 40px;
  text-align: center;
}

.hero_glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 65% 85% at 20% 50%, color-mix(in srgb, var(--brand) 28%, transparent) 0%, transparent 70%),
    radial-gradient(ellipse 45% 55% at 80% 20%, color-mix(in srgb, var(--brand_2) 18%, transparent) 0%, transparent 70%);
  pointer-events: none;
}

.hero_body { position: relative; z-index: 1; }

.hero_badge {
  display: inline-block;
  margin: 0 0 18px;
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--brand) 45%, transparent);
  background: color-mix(in srgb, var(--brand) 14%, transparent);
  color: var(--brand_2);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: var(--font_sans);
}

.hero_name {
  font-family: var(--font_serif);
  color: #f2ede3;
  font-size: clamp(48px, 9vw, 80px);
  line-height: 1.05;
  margin: 0 0 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.hero_name em {
  font-style: normal;
  color: var(--brand_2);
}

.hero_sub {
  color: rgba(242, 237, 227, 0.55);
  margin: 0 0 24px;
  font-size: 14px;
}

.hero_links {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero_link {
  display: inline-flex;
  align-items: center;
  padding: 9px 18px;
  border-radius: var(--radius);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.hero_link.primary {
  background: var(--brand);
  color: #f2ede3;
}

.hero_link.primary:hover { background: var(--brand_2); }

.hero_link.ghost {
  color: rgba(242, 237, 227, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* ── Body grid ── */
.resume_body {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}

/* ── Sidebar ── */
.resume_sidebar { display: grid; gap: 16px; }

.side_card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius_lg);
  padding: 20px;
}

.side_label {
  font-family: var(--font_sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--brand);
  margin: 0 0 14px;
}

.side_school {
  font-family: var(--font_serif);
  font-size: 16px;
  font-weight: 600;
  color: var(--text_head);
  margin: 0 0 4px;
}

.side_meta {
  font-size: 13px;
  color: var(--text_muted);
  margin: 0;
}

.skill_list { display: grid; gap: 14px; }

.skill_group {
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.skill_group:first-child { padding-top: 0; border-top: none; }

.skill_group_label {
  font-size: 11px;
  color: var(--text_muted);
  margin: 0 0 8px;
  letter-spacing: 0.04em;
}

.chips { display: flex; flex-wrap: wrap; gap: 5px; }

.chip {
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--panel_active);
  color: var(--text_body);
}

.about_list {
  margin: 0;
  padding-left: 16px;
  display: grid;
  gap: 10px;
}

.about_list li {
  font-size: 13px;
  color: var(--text_body);
  line-height: 1.7;
}

/* ── Projects ── */
.resume_projects { display: grid; gap: 16px; }

.projects_header {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.projects_title {
  font-family: var(--font_serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--text_head);
  margin: 0;
}

.proj_card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius_lg);
  padding: 22px 22px 18px;
  transition: border-color 0.2s;
}

.proj_card:hover { border-color: var(--border_strong); }

.proj_head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.proj_name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text_head);
  margin: 0;
  line-height: 1.45;
}

.proj_name code {
  font-family: var(--font_mono);
  font-size: 0.9em;
  color: var(--brand);
  background: var(--brand_light);
  border: 1px solid color-mix(in srgb, var(--brand) 25%, transparent);
  border-radius: 4px;
  padding: 1px 6px;
}

.proj_sep {
  color: var(--text_muted);
  font-weight: 400;
  padding: 0 4px;
}

.proj_link {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--text_muted);
  text-decoration: none;
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 4px 10px;
  transition: color 0.2s, border-color 0.2s;
  white-space: nowrap;
}

.proj_link:hover {
  color: var(--brand);
  border-color: color-mix(in srgb, var(--brand) 40%, transparent);
}

.proj_desc {
  font-size: 13.5px;
  color: var(--text_body);
  line-height: 1.75;
  margin: 0 0 14px;
}

.proj_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 14px;
}

.proj_tag {
  font-size: 11px;
  color: var(--text_muted);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2px 8px;
  background: color-mix(in srgb, var(--panel_active) 60%, transparent);
}

.demo_toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 9px 14px;
  background: color-mix(in srgb, var(--panel_active) 60%, transparent);
  color: var(--text_muted);
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  text-align: left;
}

.demo_toggle:hover {
  color: var(--text_head);
  border-color: var(--border_strong);
}

.demo_toggle.is_open {
  color: var(--brand);
  border-color: color-mix(in srgb, var(--brand) 40%, transparent);
  background: var(--brand_light);
}

.demo_count {
  margin-left: auto;
  font-size: 11px;
  opacity: 0.7;
}

.toggle_icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.demo_toggle.is_open .toggle_icon { transform: rotate(180deg); }

.demo_panel {
  margin-top: 10px;
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  background: var(--bg2);
}

.demo_item { margin: 0; }

.demo_item + .demo_item { border-top: 1px solid var(--border); }

.demo_item figcaption {
  padding: 8px 14px;
  font-size: 12px;
  color: var(--text_muted);
  background: var(--panel_active);
  border-bottom: 1px solid var(--border);
  font-family: var(--font_sans);
}

.demo_item img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 440px;
  object-fit: contain;
  background: var(--bg2);
}

/* ── Responsive ── */
@media (max-width: 980px) {
  .resume_body { grid-template-columns: 1fr; }
  .resume_sidebar { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
}

@media (max-width: 640px) {
  .resume_page { padding: 0 16px 60px; }

  .resume_hero {
    border-radius: var(--radius);
    padding: 44px 20px;
    margin: 16px 0 20px;
  }

  .resume_sidebar { grid-template-columns: 1fr; }

  .proj_head { flex-direction: column; gap: 8px; }
}
</style>

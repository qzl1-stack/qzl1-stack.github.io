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
      {
        label: '设备管理与文件传输 · Device & File Transfer',
        src: '/GIF/plugins_VTA.gif?v=1',
        alt: 'VTA 演示',
      },
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
      { label: '视频播放与二维码识别 (1) · Video & QR Detection', src: '/GIF/detect1.gif?v=1', alt: '视频识别演示 1' },
      { label: '视频播放与二维码识别 (2) · Video & QR Detection', src: '/GIF/detect2.gif?v=1', alt: '视频识别演示 2' },
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

function ToggleProjectDemo(project_key: string): void {
  open_project_keys.value[project_key] = !open_project_keys.value[project_key]
}

useHead({
  title: '简历 | QZL Blog',
})
</script>

<template>
  <div class="resume_page">
    <section class="resume_hero">
      <div class="hero_overlay"></div>
      <div class="hero_content">
        <p class="hero_badge">C++ · Qt GUI Engineer</p>
        <h1>全<span>志凌</span></h1>
        <p class="hero_sub">湖南农业大学 · 专注 Qt6 / QML / C++17 桌面应用开发</p>
        <div class="hero_links">
          <a class="hero_link primary" href="https://github.com/qzl1-stack" target="_blank" rel="noreferrer">
            github.com/qzl1-stack
          </a>
          <span class="hero_link ghost">湖南农业大学</span>
        </div>
      </div>
    </section>

    <section class="resume_layout">
      <aside class="left_column">
        <article class="info_card">
          <h2>教育背景</h2>
          <h3>湖南农业大学</h3>
          <p>本科</p>
        </article>
        <article class="info_card">
          <h2>专业技能</h2>
          <div class="skill_groups">
            <div class="skill_group" v-for="group in skill_groups" :key="group.label">
              <p class="skill_label">{{ group.label }}</p>
              <div class="chips">
                <span class="chip" v-for="item in group.items" :key="item">{{ item }}</span>
              </div>
            </div>
          </div>
        </article>
        <article class="info_card">
          <h2>自我评价</h2>
          <ul class="about_list">
            <li v-for="item in about_list" :key="item">{{ item }}</li>
          </ul>
        </article>
      </aside>

      <div class="right_column">
        <article class="project_card" v-for="project in projects" :key="project.key">
          <div class="project_head">
            <h3><span>{{ project.name }}</span> — {{ project.subtitle }}</h3>
            <a :href="project.link" target="_blank" rel="noreferrer">↗ GitHub</a>
          </div>
          <p class="project_desc">{{ project.description }}</p>
          <div class="project_tags">
            <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <button class="demo_toggle" @click="ToggleProjectDemo(project.key)">
            <span>查看功能演示</span>
            <span>{{ project.demos.length }} 个 GIF</span>
          </button>
          <div class="demo_panel" v-show="open_project_keys[project.key]">
            <figure class="demo_item" v-for="demo in project.demos" :key="demo.src">
              <figcaption>{{ demo.label }}</figcaption>
              <img :src="demo.src" :alt="demo.alt" loading="lazy" />
            </figure>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.resume_page {
  width: min(1220px, 96vw);
  margin: 0 auto 36px;
}

.resume_hero {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(135deg, #101729 0%, #09111e 52%, #0d1624 100%);
  margin: 24px 0 20px;
  padding: 58px 28px;
}

.hero_overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 22% 48%, rgba(37, 99, 235, 0.28) 0%, transparent 72%),
    radial-gradient(ellipse 48% 62% at 78% 28%, rgba(14, 165, 233, 0.22) 0%, transparent 72%);
}

.hero_content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.hero_badge {
  display: inline-block;
  margin: 0 0 14px;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(111, 170, 255, 0.38);
  background: rgba(37, 99, 235, 0.22);
  color: #a7ccff;
  font-size: 12px;
  letter-spacing: 0.12em;
}

.hero_content h1 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(42px, 8vw, 72px);
  line-height: 1.08;
}

.hero_content h1 span {
  color: #5fb8ff;
}

.hero_sub {
  margin: 12px 0 22px;
  color: #94a8c6;
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
  padding: 9px 16px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 13px;
}

.hero_link.primary {
  color: #ffffff;
  background: #2563eb;
}

.hero_link.ghost {
  color: #d2e3ff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

.resume_layout {
  display: grid;
  grid-template-columns: 0.95fr 1.45fr;
  gap: 18px;
}

.left_column,
.right_column {
  display: grid;
  gap: 18px;
  align-self: start;
}

.info_card,
.project_card {
  background: var(--panel);
  border: 1px solid color-mix(in srgb, var(--border) 84%, transparent);
  border-radius: 18px;
  padding: 20px 20px 18px;
}

.info_card h2 {
  margin: 0 0 14px;
  font-size: 14px;
  color: var(--text_muted);
  letter-spacing: 0.08em;
}

.info_card h3 {
  margin: 0 0 2px;
}

.skill_groups {
  display: grid;
  gap: 12px;
}

.skill_group {
  padding-top: 8px;
  border-top: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
}

.skill_label {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--text_muted);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--border) 78%, transparent);
  background: color-mix(in srgb, var(--panel_active) 74%, transparent);
}

.about_list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
}

.about_list li {
  color: var(--text_body);
}

.project_head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.project_head h3 {
  margin: 0;
  font-size: 18px;
  line-height: 1.35;
}

.project_head h3 span {
  color: #2563eb;
  font-family: 'Consolas', 'Cascadia Mono', monospace;
  font-size: 0.93em;
}

.project_head a {
  flex-shrink: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 4px 10px;
  font-size: 12px;
  text-decoration: none;
  color: var(--text_muted);
}

.project_desc {
  margin: 0 0 12px;
  color: var(--text_body);
}

.project_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 12px;
  color: var(--text_muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 3px 9px;
}

.demo_toggle {
  margin-top: 14px;
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
  border-radius: 12px;
  padding: 10px 12px;
  background: color-mix(in srgb, var(--panel_active) 65%, transparent);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.demo_panel {
  margin-top: 10px;
  border-radius: 12px;
  border: 1px solid #2a3447;
  overflow: hidden;
  background: #0f1624;
}

.demo_item {
  margin: 0;
}

.demo_item + .demo_item {
  border-top: 1px solid #2a3447;
}

.demo_item figcaption {
  padding: 8px 10px;
  color: #8ba0bf;
  font-size: 12px;
  background: #161f31;
}

.demo_item img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 430px;
  object-fit: contain;
  background: #0f1624;
}

@media (max-width: 980px) {
  .resume_layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .resume_hero {
    border-radius: 18px;
    padding: 42px 16px;
  }

  .project_head {
    flex-direction: column;
  }
}
</style>

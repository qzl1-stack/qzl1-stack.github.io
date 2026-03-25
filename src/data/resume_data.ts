export interface ResumeProject {
  name: string
  role: string
  description: string
  highlights: string[]
  stack: string[]
  link: string
  demos?: string[]
}

export interface ResumeSkillGroup {
  label: string
  items: string[]
}

export interface ResumeData {
  name: string
  role: string
  intent: string
  city: string
  email: string
  github: string
  education: string
  summary: string
  strengths: string[]
  self_review: string[]
  skill_groups: ResumeSkillGroup[]
  projects: ResumeProject[]
}

export const resume_data: ResumeData = {
  name: '全志凌',
  role: 'C++ / Qt 工程师',
  intent: '求职意向：Qt 桌面应用 / 音视频图形系统 / 工业软件开发',
  city: '中国',
  email: 'qzl1stack@outlook.com',
  github: 'https://github.com/qzl1-stack',
  education: '武汉东湖学院 · 软件工程',
  summary:
    '专注 C++ 与 Qt 工程实践，擅长从需求分析、架构设计到上线维护的全流程交付，能够在性能、可维护性和产品体验之间做平衡。',
  strengths: [
    '熟练掌握 C++17 / Qt6 / QML，具备现代桌面 GUI 应用的完整开发经验。',
    '具备多进程、多线程与 IPC 通信设计经验，重视系统稳定性与可扩展性。',
    '具备工业设备通信（SSH / SFTP / TCP / GStreamer）与图形渲染（OpenGL）经验。',
    '具备前端开发能力（Vue.js / Three.js），可推进跨技术栈协作。',
  ],
  self_review: [
    '善于将复杂需求拆分为可迭代模块，保持持续交付节奏。',
    '重视代码质量，倾向使用智能指针、设计模式与自动化工具降低维护成本。',
    '在高并发和多线程场景中关注锁粒度、资源回收与异常恢复策略。',
  ],
  skill_groups: [
    {
      label: '语言与框架',
      items: ['C++17', 'Qt6', 'QML', 'STL', 'Boost'],
    },
    {
      label: '音视频与图形',
      items: ['GStreamer', 'OpenGL', 'OpenCV', 'ZXing-C++'],
    },
    {
      label: '系统与通信',
      items: ['Linux', 'TCP/UDP', 'SSH/SFTP', '多线程/IPC'],
    },
    {
      label: '前端与工具',
      items: ['Vue.js', 'Three.js', 'TypeScript', 'Git'],
    },
  ],
  projects: [
    {
      name: 'DMcode_Video_Desplay',
      role: '核心开发',
      description:
        '基于 Qt6 + GStreamer + OpenGL 的高性能视频流显示系统，支持二维码识别和 TCP 远程控制。',
      highlights: [
        '实现 UDP H.264 实时解码与 OpenGL 硬件加速渲染，提升高帧率流畅度。',
        '集成 OpenCV + ZXing-C++ 识别链路，实现二维码检测与解析。',
        '设计多线程异步模型，加入异常自动恢复与运行监控。',
      ],
      stack: ['C++17', 'Qt6', 'QML', 'GStreamer', 'OpenGL', 'OpenCV'],
      link: 'https://github.com/qzl1-stack/DMcode_Video_Desplay',
      demos: ['/GIF/detect1.gif', '/GIF/detect2.gif'],
    },
    {
      name: 'Plugins_Download',
      role: '独立开发',
      description: '桌面端插件下载与管理工具，支持包下载、校验与安装流程。',
      highlights: [
        '构建插件列表与下载流程，优化失败重试与状态可视化。',
        '封装任务队列，避免 UI 主线程阻塞并提升交互响应。',
      ],
      stack: ['C++17', 'Qt6', 'Network'],
      link: 'https://github.com/qzl1-stack',
      demos: ['/GIF/plugins_download.gif', '/GIF/plugins_uninstall.gif'],
    },
    {
      name: 'Plugins_Log_Analyzer',
      role: '独立开发',
      description: '日志分析与可视化工具，支持快速检索、过滤和异常定位。',
      highlights: [
        '实现结构化日志解析与多维筛选，提高排障效率。',
        '通过分页与增量加载提升大文件场景性能。',
      ],
      stack: ['C++17', 'Qt6', 'Regex'],
      link: 'https://github.com/qzl1-stack',
      demos: ['/GIF/plugins_Log_analyzer.gif', '/GIF/plugins_VTA.gif'],
    },
    {
      name: '3D_Model',
      role: '前端开发',
      description:
        '基于 Vue.js + Three.js 的在线三维模型查看器，支持模型加载与交互。',
      highlights: [
        '实现模型加载、镜头控制与基础交互系统。',
        '构建轻量渲染场景，兼顾视觉效果与性能。',
      ],
      stack: ['Vue.js', 'Three.js', 'JavaScript'],
      link: 'https://github.com/qzl1-stack/3D_Model',
      demos: ['/GIF/plugins_3D_model.gif'],
    },
  ],
}

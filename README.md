# QZL Blog

基于 `Vue 3 + TypeScript + Vite` 的个人博客站点，支持：

- 手记（Markdown）
- 动态（Markdown）
- 简历内容展示
- 创意风格首页（轻量 3D Hero）

## 本地运行

```bash
npm install
npm run dev
```

默认访问地址：

- [http://localhost:5173](http://localhost:5173)

## 生产构建

```bash
npm run build
npm run preview
```

## 内容发布方式

### 1) 发布手记

在 `src/content/notes/` 新建 `*.md` 文件，frontmatter 示例：

```yaml
---
title: "文章标题"
slug: "article-slug"
date: "2026-03-23"
tags: ["Qt", "C++"]
summary: "一句话摘要"
type: "note"
draft: false
---
```

### 2) 发布动态

在 `src/content/moments/` 新建 `*.md` 文件，`type` 使用 `moment`。

## 路由说明

- `/` 首页
- `/notes` 手记列表
- `/notes/:slug` 手记详情
- `/moments` 动态列表
- `/moments/:slug` 动态详情
- `/resume` 简历页

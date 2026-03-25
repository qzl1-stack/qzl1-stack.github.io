---
title: "低耦合模块设计笔记"
slug: "designing-low-coupling-modules"
date: "2026-03-22"
tags: ["Architecture", "C++", "Design"]
summary: "用接口隔离与策略对象，让复杂系统更容易扩展与测试。"
type: "note"
draft: false
---

一个系统能否长期演进，通常取决于模块边界是否清晰。

## 我常用的做法

1. 先定义稳定抽象，再落地实现。
2. 业务规则和框架调用分层。
3. 错误处理统一出口，避免散落在各处。

## 一个小结论

抽象并不意味着层级越多越好，而是让变化点有明确归属。

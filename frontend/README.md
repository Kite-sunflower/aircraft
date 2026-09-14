# 企业内部协同管理系统（Frontend）

## 项目简介

本项目是一个企业内部协同管理平台，主要用于：

- 任务调度与协作
- 工具借还管理
- 物料库存管理
- 用户权限控制
- 企业内部工作流管理

项目定位：

```text
企业后台 / 中后台系统
```

系统风格：

- 企业级后台
- 高信息密度
- 状态驱动
- 快速操作
- 权限控制

---

# 技术栈

## 前端

- Vue3
- Vite
- Vue Router
- Pinia
- Axios
- Element Plus
- ECharts

---

# UI 风格

推荐风格：

- 企业后台风
- ERP 风格
- OA 风格
- 工厂 MES 风格

UI 特点：

- 深色侧边栏
- 浅色内容区
- 高信息密度
- 强表格布局
- 强状态展示

---

# 项目模块

## 1. Dashboard 工作台

用于展示：

- 今日任务
- 待完成任务
- 借出工具
- 库存预警
- 最近操作
- 数据趋势图

---

## 2. 任务中心

包含：

- 任务列表
- 我的任务
- 待处理任务
- 已完成任务

任务状态：

```text
pending -> doing -> finish
```

---

## 3. 工具中心

包含：

- 工具库存
- 借用记录
- 待归还工具
- 维修工具

工具状态：

```text
available
borrowed
repair
```

---

## 4. 物料中心

包含：

- 物料库存
- 领用记录

支持：

- 库存管理
- 领取记录
- 库存预警

---

## 5. 用户权限

包含：

- 用户管理
- 角色权限

角色：

```text
admin
worker
toolDist
materialsDist
```

---

# 页面结构

```text
登录页 Login

Layout 主框架
├── Dashboard 工作台
│
├── 任务中心 Task
│   ├── 任务列表
│   ├── 我的任务
│   ├── 待处理任务
│   └── 已完成任务
│
├── 工具中心 Tool
│   ├── 工具库存
│   ├── 借用记录
│   ├── 待归还工具
│   └── 维修工具
│
├── 物料中心 Material
│   ├── 物料库存
│   └── 领用记录
│
├── 用户权限 User
│   ├── 用户管理
│   └── 角色权限
│
└── 系统设置 System
    ├── 个人中心
    └── 修改密码
```

---

# 项目目录结构

```bash
src
├── api
│   ├── auth.js
│   ├── user.js
│   ├── task.js
│   ├── tool.js
│   └── material.js
│
├── layouts
│   └── index.vue
│
├── router
│   └── index.js
│
├── stores
│   ├── user.js
│   ├── permission.js
│   └── app.js
│
├── views
│   ├── login
│   │   └── index.vue
│   │
│   ├── dashboard
│   │   └── index.vue
│   │
│   ├── task
│   │   ├── list.vue
│   │   ├── mine.vue
│   │   └── finish.vue
│   │
│   ├── tool
│   │   ├── list.vue
│   │   ├── repair.vue
│   │   └── borrow.vue
│   │
│   ├── material
│   │   ├── list.vue
│   │   └── receive.vue
│   │
│   ├── user
│   │   ├── list.vue
│   │   └── role.vue
│   │
│   └── system
│       ├── profile.vue
│       └── password.vue
│
├── components
│   ├── PageContainer
│   ├── SearchBar
│   ├── StatusTag
│   ├── CommonTable
│   └── EmptyState
│
├── composables
├── utils
└── styles
```

---

# Layout 设计

整体布局：

```text
┌────────────────────────┐
│ Header                 │
├──────────┬─────────────┤
│ Sidebar  │ Main        │
│          │             │
└──────────┴─────────────┘
```

---

# 页面开发规范

## 页面统一结构

```text
PageContainer
搜索栏
Table
分页
```

---

## 页面标题规范

```text
左侧：页面标题
右侧：新增按钮
```

例如：

```text
任务列表               [+ 新建任务]
```

---

# UI 交互规范

| 场景     | 推荐组件     |
| -------- | ------------ |
| 新建     | Dialog       |
| 编辑     | Drawer       |
| 删除     | Popconfirm   |
| 查看详情 | Descriptions |
| 状态显示 | Tag          |
| 搜索     | Inline Form  |
| 分页     | Pagination   |

---

# 状态颜色规范

## 任务状态

| 状态    | 类型    |
| ------- | ------- |
| pending | warning |
| doing   | primary |
| finish  | success |

---

## 工具状态

| 状态      | 类型    |
| --------- | ------- |
| available | success |
| borrowed  | primary |
| repair    | danger  |

---

# Dashboard 设计

Dashboard 用于：

- 数据总览
- 工作台
- 待办事项
- 趋势分析

推荐模块：

```text
统计卡片
趋势图
最近任务
库存预警
最近操作
```

---

# 推荐开发顺序

## 第一阶段（核心骨架）

```text
1. 初始化项目
2. Layout
3. Sidebar
4. Header
5. Router
6. 权限控制
7. Dashboard
```

---

## 第二阶段（核心业务）

```text
任务模块
```

包括：

- 任务列表
- 创建任务
- 分配任务
- 完成任务

---

## 第三阶段

```text
工具模块
物料模块
```

---

## 第四阶段

```text
用户权限
系统设置
```

---

# 当前开发原则

## 先做系统骨架

不要一开始直接写 CRUD。

优先：

```text
Layout
菜单
路由
Dashboard
统一 UI
```

---

# 企业后台开发核心思想

```text
先搭系统
再写业务
```

不要：

- 每个页面单独设计
- 每个页面单独写风格
- 一开始疯狂接接口

应该：

- 统一布局
- 统一组件
- 统一交互
- 统一页面规范

---

# 后续建议

## 推荐后续扩展

### 第一优先级

- 操作日志
- 通知系统
- 文件上传
- Excel 导出

---

### 第二优先级

- Dashboard 实时统计
- 消息中心
- 数据大屏

---

# 最终目标

最终系统效果应接近：

- ERP
- OA
- 工厂 MES
- 仓储管理系统
- 企业内部协同平台

关键词：

```text
稳定
专业
高效
清晰
信息密度高
```

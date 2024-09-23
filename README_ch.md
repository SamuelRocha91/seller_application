# <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTchGHKMA3VyA1ySh2ITWb0CIm_cnhF1cGvlQ&s" alt="Full Stack Projects" width="52" height="40" /> 卖家项目 - 配送应用 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTchGHKMA3VyA1ySh2ITWb0CIm_cnhF1cGvlQ&s" alt="Java Projects Logo" width="52" height="40" /> 

## 🌐 [![Português](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/seller_application/blob/main/README.md) [![Español](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/seller_application/blob/main/README_es.md) [![English](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/seller_application/blob/main/README_en.md) [![Русский](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/seller_application/blob/main/README_ru.md) [![中文](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/seller_application/blob/main/README_ch.md) [![العربية](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/seller_application/blob/main/README_ar.md)


这个仓库包含了为配送平台开发的卖家应用，使用 Vue.js 开发。该应用提供了一个界面，用于卖家管理订单和产品。

![用户注册示意图](./assets/internal.gif)

## 相关仓库

- 💎 [配送应用](https://github.com/SamuelRocha91/delivery_back) - 用于配送应用的 Rails 后端。
- 🛒 [消费者应用](https://github.com/SamuelRocha91/consumy) - 消费者应用。
- 💲 [Paymenty API](https://github.com/SamuelRocha91/paymenty)

![内部功能示意图](./assets/registerseller.gif)

**项目链接：**

- [Figma 设计](https://www.figma.com/file/tS8r4eROXBknYixtDcijXd/Meu-portf%C3%B3lio?type=design&node-id=0-1&mode=design&t=pL6yJYx6lOSWBGdw-0)

## 依赖与功能

### 主要依赖

- **Vue.js:** 用于构建用户界面的渐进式 JavaScript 框架。
- **Vue Router:** Vue.js 的页面路由。
- **Vite:** 用于快速优化开发的构建工具。
- **Vitest:** 用于 Vue.js 的单元测试框架。
- **ESLint & Prettier:** 用于代码质量控制的静态分析和格式化工具。
- **TypeScript:** 提供 TypeScript 支持，以实现更安全和可扩展的开发。
- **Pinia:** 受 Vuex 启发的状态管理库。

### 实现功能

- **Fetch Event Source:** 用于与后端进行实时通信。
- **SweetAlert2:** 用于显示美观且可自定义的警报和对话框。
- **Vuedraggable:** 用于界面的拖放操作。

### 其他工具和插件

- **@rails/actioncable:** 用于在 Rails 后端集成 WebSockets。
- **lodash.debounce:** 用于简化 debounce 操作的函数工具。
- **@types/rails__actioncable:** ActionCable 的 TypeScript 类型定义。

## 项目设置

要进行集成使用，请参见以下步骤：

- [配送后端](https://github.com/SamuelRocha91/delivery_back) - 用于配送平台的 Rails 后端。

要单独配置和运行该仓库，请遵循以下步骤：

### 前提条件

确保您已在计算机上安装了 [Node.js](https://nodejs.org/) 和 [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)。

### 安装依赖

```sh
npm install
```

### 启动开发服务器

要启动开发服务器，请运行：

```sh
npm run dev
```

### 运行测试

要运行单元测试，请使用：

```sh
npm run test:unit
```
## 其他项目

- 📏 [React 精准应用程序](https://github.com/SamuelRocha91/precisionReactApplication/blob/main/README_ch.md) - 燃气和水的测量登记界面
- 🤖 [Node API](https://github.com/SamuelRocha91/apiMeasureWaterAndGas/blob/main/README_ch.md) - 用于测量和登记水和燃气消耗的 API

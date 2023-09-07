# cloud-filling-new

- node:
  node: 16.14.0
- package manager:
  pnpm: 8.6.12, 必须使用pnpm
- commit msg 必须符合commitlint规范，否则无法提交

- git workflow
  遵守工作流进行开发
  ![](./git-workflow.png)

- css  
  预处理器sass

- 目录结构

```bash
├─ .husky                 # husky 配置文件
├─ .vscode                # VSCode 推荐配置
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ enums               # 项目常用枚举
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ layouts             # 框架布局模块
│  ├─ router              # 路由管理
│  ├─ stores              # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目根组件
│  └─ main.ts             # 项目入口文件
├─ .editorconfig           # 统一不同编辑器的编码风格
├─ .eslintignore           # 忽略 Eslint 校验
├─ .eslintrc.cjs           # Eslint 校验配置文件
├─ .gitignore              # 忽略 git 提交
├─ .lintstagedrc           # lint-staged 配置文件
├─ .prettierignore         # 忽略 Prettier 格式化
├─ .prettierrc.json        # Prettier 格式化配置
├─ commitlint.config.cjs   # git 提交规范配置
├─ env.d.ts
├─ git-workflow.png
├─ index.html
├─ package.json
├─ pnpm-lock.yaml          # 依赖包包版本锁
├─ postcss.config.js        # postcss 配置
├─ README.md
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ tsconfig.vitest.json
├─ vite.config.ts
└─ vitest.config.ts
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

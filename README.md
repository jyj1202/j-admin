# cloud-filling-new

## 核心模块版本

- node: 16.14.0
- vue: 3.3.4
- vite: 4.4.9
- ts: 5.1.6

- package manager:  
  pnpm: 8.6.12, 必须使用pnpm

- commit msg

  必须符合commitlint规范，否则无法提交

  commit 建议使用`pnpm commit`命令

- git workflow
  遵守git工作流进行开发  
  ![](./git-workflow.png)

- css  
  预处理器sass

- 注意，**不建议**忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。

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
pnpm lint:eslint
```

### Lint with [prettier](https://www.prettier.cn/)

```sh
pnpm lint:prettier
```

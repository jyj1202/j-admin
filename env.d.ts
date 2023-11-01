/*
https://cn.vitejs.dev/guide/features.html#client-types
Vite 默认的类型定义是写给它的 Node.js API 的。
要将其补充到一个 Vite 应用的客户端代码环境中，请添加一个 d.ts 声明文件。
或者，你也可以将 vite/client 添加到 tsconfig.json 中的 compilerOptions.types 下

这将会提供以下类型定义补充：
资源导入 (例如：导入一个 .svg 文件)
import.meta.env 上 Vite 注入的环境变量的类型定义
import.meta.hot 上的 HMR API 类型定义
*/
/// <reference types="vite/client" />

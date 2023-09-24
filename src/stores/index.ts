/**
 * pinia小知识
 * 
 * 推荐使用箭头函数
 * 
 * 1.defineStore
 * defineStore(id, Setup/Option)
 * id是必须传入的， Pinia 将用它来连接 store 和 devtools。
 * defineStore() 的第二个参数可接受两类值：Setup 函数或 Option 对象。
 * Setup store 比 Option Store 带来了更多的灵活性，因为你可以在一个 store 内创建侦听器，并自由地使用任何组合式函数。
 * 不过，请记住，使用组合式函数会让 SSR 变得更加复杂。
 * 
 * 虽然我们前面定义了一个 store，但在我们使用 <script setup>
 * 调用 useStore()(或者使用 setup() 函数，像所有的组件那样) 之前，store 实例是不会被创建的。
 * 
 * 你可以定义任意多的 store，
 * 但为了让使用 pinia 的益处最大化(比如允许构建工具自动进行代码分割以及 TypeScript 推断)，
 * 你应该在不同的文件中去定义 store。
 * 
 * 请注意，store 是一个用 reactive 包装的对象，这意味着不需要在 getters 后面写 .value，
 * 就像 setup 中的 props 一样，如果你写了，我们也不能解构它。
 * 为了从 store 中提取属性时保持其响应性，你需要使用 storeToRefs()。https://pinia.vuejs.org/zh/core-concepts/
 * import { storeToRefs } from 'pinia'
 * 它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。
 * 请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上。
 * 
 * 
 * 2.state
 * 默认情况下，你可以通过 store 实例访问 state，直接对其进行读写。
 * 重置 state。使用选项式 API 时，你可以通过调用 store 的 $reset() 方法将 state 重置为初始值。
 * 变更 state。直接修改 state，$patch()的主要区别是，$patch() 允许你将多个变更归入 devtools 的同一个条目中。
 * 替换 state。你不能完全替换掉 store 的 state，因为那样会破坏其响应性。但是，你可以 patch 它。
 * 订阅 state。store.$subscribe()
 * 
 * 
 * 3.getter
 * 大多数时候，getter 仅依赖 state，不过，有时它们也可能会使用其他 getter。
 * 因此，即使在使用常规函数定义 getter 时，我们也可以通过 this 访问到整个 store 实例，但(在 TypeScript 中)必须定义返回类型。
 * 这是为了避免 TypeScript 的已知缺陷，不过这不影响用箭头函数定义的 getter，也不会影响不使用 this 的 getter。
 * 
 * 
 * 4.action
 * action 可以是异步的，你可以在它们里面 await 调用任何 API，以及其他 action
 * 订阅 action。store.$onAction()
 * 
 * 
 * 5.插件
 * 插件是通过 pinia.use() 添加到 pinia 实例的。
 * 插件只会应用于在 pinia 传递给应用后创建的 store，否则它们不会生效。
 * 任何由插件返回的属性都会被 devtools 自动追踪，所以如果你想在 devtools 中调试 hello 属性，
 * 为了使 devtools 能追踪到 hello，请确保在 dev 模式下将其添加到 store._customProperties 中。
 * 
 * 
 * 6.组件外的store
 * https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html
 * 如果你不做任何 SSR(服务器端渲染)，在用 app.use(pinia) 安装 pinia 插件后，对 useStore() 的任何调用都会正常执行。
 */

import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

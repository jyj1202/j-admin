/\*\*

- router小知识
-
- router功能:
- 嵌套路由映射; 动态路由选择; 模块化、基于组件的路由配置; 路由参数、查询、通配符;
- 展示由 Vue.js 的过渡系统提供的过渡效果; 细致的导航控制; 自动激活 CSS 类的链接
- HTML5 history 模式或 hash 模式; 可定制的滚动行为; URL 的正确编码
-
- 请记住，this.$router 与直接使用通过 createRouter 创建的 router 实例完全相同。
- 我们使用 this.$router的原因是，我们不想在每个需要操作路由的组件中都导入路由。
-
- 1.  动态路由匹配：
- 你可以在同一个路由中设置有多个 路径参数，它们会映射到 $route.params 上的相应字段。
- 通过$route.params获取。
- 使用带有参数的路由时需要注意的是，当用户从 /users/johnny 导航到 /users/jolyne 时，相同的组件实例将被重复使用。
- 因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。
- 可以使用watch对这种情况进行简单处理; 或者使用 beforeRouteUpdate 导航守卫，它也可以取消导航。
-
- 捕获所有路由或 404 Not found 路由
- https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
-
- 2.  嵌套路由
- 嵌套的命名路由 https://router.vuejs.org/zh/guide/essentials/nested-routes.html#%E5%B5%8C%E5%A5%97%E7%9A%84%E5%91%BD%E5%90%8D%E8%B7%AF%E7%94%B1
-
- 3.  编程时导航
- 我们可以手动建立 url，但我们必须自己处理编码。如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
- `params` 不能与 `path` 一起使用
- params 使用时的问题:
- https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
-
- 由于属性 to 与 router.push 接受的对象种类相同，所以两者的规则完全相同。
-
- 你可能已经注意到，router.push、router.replace 和 router.go 是
- window.history.pushState、window.history.replaceState 和 window.history.go 的翻版，
- 它们确实模仿了 window.history 的 API。
-
- 4.命名路由
-
- 5.  命名视图
-
- 6.  重定向和别名
-
- 7.  路由组件传参
- 将 props 传递给路由组件
- const routes = [{ path: '/user/:id', component: User, props: true }]
- 布尔模式。当 props 设置为 true 时，route.params 将被设置为组件的 props。
- 。。。
-
- 8.  不同的历史记录模式
- 不同的历史模式
- Hash 模式
-     它在内部传递的实际 URL 之前使用了一个哈希字符（#）。
-     **由于这部分 URL 从未被发送到服务器**，所以它不需要在服务器层面上进行任何特殊处理。
-     不过，它在 SEO 中确实有不好的影响。如果你担心这个问题，可以使用 HTML5 模式。
- HTML5 模式
-     由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，
-     用户在浏览器中直接访问 https://example.com/user/id，就会得到一个 404 错误。这就尴尬了。
-     不用担心：要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由。
-     **如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 index.html 相同的页面。**
- 服务器配置示例
- nginx
-      location / {
-        try_files $uri $uri/ /index.html;
-      }
- 这有一个注意事项。你的服务器将不再报告 404 错误，因为现在所有未找到的路径都会显示你的 index.html 文件。
- 为了解决这个问题，你应该在你的 Vue 应用程序中实现一个万能的路由来显示 404 页面。
- \*/

## 进阶

### 导航守卫

### 路由元信息

### 数据获取

### 组合式api

引入 setup 和 Vue 的组合式 API，开辟了新的可能性，但要想充分发挥 Vue Router 的潜力，我们需要使用一些新的函数来代替访问 this 和组件内导航守卫。

- route 对象是一个响应式对象，所以它的任何属性都可以被监听，但你应该避免监听整个 route 对象。在大多数情况下，你应该直接监听你期望改变的参数。

  请注意，在模板中我们仍然可以访问 $router 和 $route，所以不需要在 setup 中返回 router 或 route。

- 组合式 API 守卫也可以用在任何由 `<router-view>` 渲染的组件中，它们不必像组件内守卫那样直接用在路由组件上。

  ```ts
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
  ```

- useLink

### 过渡动效

想要在你的路径组件上使用转场，并对导航进行动画处理，你需要使用 v-slot API

- 强制在复用的视图之间进行过渡
  Vue 可能会自动复用看起来相似的组件，从而忽略了任何过渡。幸运的是，可以添加一个 key 属性来强制过渡。这也允许你在相同路由上使用不同的参数触发过渡：
  ```vue
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
  ```

### 滚动行为

### 路由懒加载

component (和 components) 配置接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise 。

```js
const UserDetails = () =>
  Promise.resolve({
    /* 组件定义 */
  })
```

一般来说，对所有的路由都使用动态导入是个好主意。

### 扩展 RouterLink

在大多数中型到大型应用程序中，值得创建一个（如果不是多个）自定义 RouterLink 组件，以在整个应用程序中重用它们。例如导航菜单中的链接，处理外部链接，添加 inactive-class 等。

### 导航故障

如果我们想在一个导航完成后做一些事情，我们需要一个在调用 router.push 后进行等待的方法。想象一下，我们有一个移动手机菜单，它允许我们进入不同的页面，而我们只想在导航到新页面后隐藏菜单，我们可能想这样做：

```js
router.push('/my-profile')
this.isMenuOpen = false
```

但是这样做会马上关闭菜单，因为 导航是异步的，我们需要 await router.push 返回的 promise ：

```js
await router.push('/my-profile')
this.isMenuOpen = false
```

现在，一旦导航完成，菜单就会关闭，但如果导航被阻止，它也会关闭。我们需要一种方法来检测我们是否真的改变了页面。

### 动态路由

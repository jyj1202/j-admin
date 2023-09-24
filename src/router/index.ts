/**
 * router小知识
 * 
 * router功能:
 *  嵌套路由映射; 动态路由选择; 模块化、基于组件的路由配置; 路由参数、查询、通配符;
 *  展示由 Vue.js 的过渡系统提供的过渡效果; 细致的导航控制; 自动激活 CSS 类的链接
 *  HTML5 history 模式或 hash 模式; 可定制的滚动行为; URL 的正确编码
 * 
 * 请记住，this.$router 与直接使用通过 createRouter 创建的 router 实例完全相同。
 * 我们使用 this.$router的原因是，我们不想在每个需要操作路由的组件中都导入路由。
 * 
 * 1. 动态路由匹配：
 * 你可以在同一个路由中设置有多个 路径参数，它们会映射到 $route.params 上的相应字段。
 * 通过$route.params获取。
 * 使用带有参数的路由时需要注意的是，当用户从 /users/johnny 导航到 /users/jolyne 时，相同的组件实例将被重复使用。
 * 因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。
 * 可以使用watch对这种情况进行简单处理; 或者使用 beforeRouteUpdate 导航守卫，它也可以取消导航。
 * 
 * 捕获所有路由或 404 Not found 路由
 * https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
 * 
 * 2. 嵌套路由
 * 嵌套的命名路由 https://router.vuejs.org/zh/guide/essentials/nested-routes.html#%E5%B5%8C%E5%A5%97%E7%9A%84%E5%91%BD%E5%90%8D%E8%B7%AF%E7%94%B1
 * 
 * 3. 编程时导航
 * 我们可以手动建立 url，但我们必须自己处理编码。如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
 * `params` 不能与 `path` 一起使用
 * params 使用时的问题:
 *  https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
 * 
 * 由于属性 to 与 router.push 接受的对象种类相同，所以两者的规则完全相同。
 * 
 * 你可能已经注意到，router.push、router.replace 和 router.go 是
 * window.history.pushState、window.history.replaceState 和 window.history.go 的翻版，
 * 它们确实模仿了 window.history 的 API。
 * 
 * 4.命名路由
 * 
 * 5. 命名视图
 * 
 * 6. 重定向和别名
 * 
 * 7. 路由组件传参
 *  将 props 传递给路由组件
 *  const routes = [{ path: '/user/:id', component: User, props: true }]
 *    布尔模式。当 props 设置为 true 时，route.params 将被设置为组件的 props。
 *  。。。
 * 
 * 8. 不同的历史记录模式
 *  不同的历史模式
 *   Hash 模式
 *     它在内部传递的实际 URL 之前使用了一个哈希字符（#）。
 *     **由于这部分 URL 从未被发送到服务器**，所以它不需要在服务器层面上进行任何特殊处理。
 *     不过，它在 SEO 中确实有不好的影响。如果你担心这个问题，可以使用 HTML5 模式。
 *   HTML5 模式
 *     由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，
 *     用户在浏览器中直接访问 https://example.com/user/id，就会得到一个 404 错误。这就尴尬了。
 *     不用担心：要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由。
 *     **如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 index.html 相同的页面。**
 *  服务器配置示例
 *    nginx
 *      location / {
 *        try_files $uri $uri/ /index.html;
 *      }
 *  这有一个注意事项。你的服务器将不再报告 404 错误，因为现在所有未找到的路径都会显示你的 index.html 文件。
 *  为了解决这个问题，你应该在你的 Vue 应用程序中实现一个万能的路由来显示 404 页面。
 * 
 */

import { createRouter, createWebHistory } from 'vue-router'
import { staticRouter, errorRouter } from "./staticRouter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouter, ...errorRouter],
  // scrollBehavior() {
  //   return { top: 50 }
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({ behavior: 'smooth', top: 50 })
  //     }, 400)
  //   })
  // }
})

export default router

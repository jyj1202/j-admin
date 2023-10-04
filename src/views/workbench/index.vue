<template>
  <div class="flex flex-col justify-center items-center h-full">
    <div class="grid grid-cols-3 justify-items-center md:gap-10 sm:gap-4 xl:pr-40 pb-20">
      <SvgIcon
        class="xl:w-60 md:w-40 sm:w-20"
        v-for="item in logos"
        :key="item"
        :name="item"
      />
    </div>
    <!-- 如果 Vite 使用了 Vue 插件，Vue SFC 模板中的资源引用都将自动转换为导入 -->
    <!-- 常见的图像、媒体和字体文件类型被自动检测为资源。你可以使用 assetsInclude 选项 扩展内部列表 -->
    <!-- <img src="@/assets/images/vue/svg" alt=""> -->
    <!-- <p>
      目标：<br/>
      前端常见问题解决方案；<br/>
      标准的vue项目配置；<br/>
      集成常见插件，便于项目开发；<br/>
      封装或组织常见组件；<br/>
        表单；<br/>
          多步骤表单；<br/>
        表格；<br/>
        引导页；<br/>
      针对常见业务需求给出解决方案；<br/>
        大屏；<br/>
      低代码方案；<br/>
      打包优化，各种优化；<br/>
      <br/>
      代码：
      尽量完整的注释；尽量简单的实现思路；复用、封装。
    </p> -->
  </div>
</template>

<script setup lang="ts" name="workbench">
import { reactive } from "vue";
/* 将资源引入为 URL
服务时引入一个静态资源会返回解析后的公共路径 */
// import vueUrl from "@/assets/images/vue.svg"; /* /src/assets/images/vue.svg */

const logos = reactive(['vue', 'vite', 'viteconf', 'pinia', 'element-ui', 'tailwindcss'])
</script>

<style scoped>

</style>

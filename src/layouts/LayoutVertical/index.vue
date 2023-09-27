<template>
  <el-container class="h-screen">
    <el-aside class="flex flex-col border-r h-full" width="220px">
      <div class="logo flex items-center justify-center space-x-2">
        <img class="logo-img w-7" src="@/assets/images/logo.png" alt="logo" />
        <span class="logo-text text-2xl font-semibold">J Admin</span>
      </div>
      <Menu class="flex-1" />
    </el-aside>
    <el-container>
      <el-header class="flex justify-between border-b">
        <Header />
      </el-header>
      <el-main class=" bg-gray-100">
        <Main/>
      </el-main>
      <el-footer class="flex justify-center items-center border-t">
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="LayoutVertical">
import Footer from "../components/Footer.vue";
import Menu from "../components/Menu/index.vue";
import Header from "../components/Header.vue";
import Main from "../components/Main.vue";

</script>

<style scoped lang="scss">
.el-header, .logo {
  height: 55px;
}
.el-header {
  padding: 0 10px;
}
.el-footer {
  height: auto;
  padding: 0.25rem 0;
}
</style>

<template>
  <el-container class="page-card h-full border">
    <el-aside class="border-r p-4" width="300px">
      <LeftFormComponents/>
    </el-aside>
    <el-container>
      <el-header class="border-b">
        <Header/>
      </el-header>
      <el-main>
        <MainForm/>
      </el-main>
    </el-container>
    <el-aside class="border-l" width="350px">
      <RightSetting/>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import LeftFormComponents from "./leftFormComponents/index.vue";
import MainForm from "./middle/MainForm.vue";
import RightSetting from "./rightSetting/index.vue";
import Header from "./middle/Header.vue";

</script>

<style scoped>
.el-main {
  padding: 0;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px
}
</style>

<template>
  <el-container class="h-screen overflow-hidden">
    <el-aside class="flex flex-col border-r h-full" :class="[settingStore.isCollapse ? 'w-64' : 'w-250']">
      <div class="flex flex-col h-full">
        <div class="logo flex items-center justify-center space-x-2 border-b">
          <img class="logo-img w-7" src="@/assets/images/logo.png" alt="logo" />
          <Transition>
            <span v-show="!settingStore.isCollapse" class="logo-text text-2xl font-semibold">J Admin</span>
          </Transition>
        </div>
        <Menu class="flex-1" />
      </div>
    </el-aside>
    <el-container>
      <el-header class="flex justify-between border-b">
        <Header />
      </el-header>
      <el-main>
        <HeaderTab class="border-b"/>
        <Main class="main flex-1" id="pageBody"/>
      </el-main>
      <el-footer class="flex justify-center items-center border-t">
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="LayoutVertical">
import {useSettingStore} from "@/stores/modules/setting";
import Footer from "../components/Footer.vue";
import Menu from "../components/Menu/index.vue";
import Header from "../components/Header.vue";
import Main from "../components/Main.vue";
import HeaderTab from "../components/HeaderTab.vue";

const settingStore = useSettingStore()

</script>

<style scoped lang="scss">
.el-container {
  background-color: var(--el-bg-color);
}
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
.el-main {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  .main {
    padding: var(--el-main-padding);
  }
}

/** el-aside collapse transition */
.el-aside {
  transition: width .1s ease;
}
.w-64 {
  width: 64px;
}
.w-250 {
  width: 250px;
}

/** logo transition */
.v-enter-active,
.v-leave-active {
  transition: transform 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-999px);
}
</style>

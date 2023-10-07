<template>
  <div class="flex flex-col items-center">
    <el-alert
      title="🤖 基于 driver.js@1.3.0 的一个引导页demo。文档：https://driverjs.com/docs/basic-usage"
      type="warning"
      :closable="false"
    />
    <el-button
      class="mt-2"
      type="primary"
      @click.prevent.stop="handleOpenGuide"
    >打开引导页</el-button>
  </div>
</template>

<script setup lang="ts">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const steps = [
  {
    element: "#collapseIcon",
    popover: {
      title: "Collapse Icon",
      description: "Open or Close sidebar",
    }
  },
  {
    element: "#refreshIcon",
    popover: {
      title: "Refresh Icon",
      description: "Click Me to refresh page body",
    }
  },
  {
    element: "#pageBody",
    popover: {
      title: "Page Body",
      description: "This is the page body",
    }
  },
  {
    element: "#breadcrumb",
    popover: {
      title: "Breadcrumb",
      description: "Breadcrumb tell you where you are",
    }
  },
  {
    element: "#fullScreenIcon",
    popover: {
      title: "FullScreen Icon",
      description: "Click to toggle fullScreen",
    }
  },
  {
    element: "#personalSetting",
    popover: {
      title: "Personal Setting",
      description: "Hover on me",
    }
  },
  {
    element: "#settingDrawer",
    popover: {
      title: "Setting Drawer",
      description: "Click Me to open style setting drawer",
    }
  },
];
const driverObj = driver({
  showProgress: true,
  steps,
});
const handleOpenGuide = () => {
  driverObj.drive();
}

</script>

<style scoped lang="scss">
</style>

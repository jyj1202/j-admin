<template>
  <div>
    <el-icon
      class="h-full"
      @click="showDrawer"
    >
      <Setting />
    </el-icon>
    <el-drawer
      v-model="isDrawerShow"
      title="Style Setting"
      size="300"
    >
      <div class="setting-item">
        <span>Theme Color</span>
        <el-color-picker v-model="settingStore.themeColor" :predefine="predefineColors" @change="handleThemeColorChange"/>
      </div>
      <div class="setting-item">
        <span>Dark Mode</span>
        <el-switch
          v-model="settingStore.isDark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="handelToggleDark"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSettingStore } from "@/stores/modules/setting";
import { getDarkColor, getLightColor } from "@/utils/color";


const isDrawerShow = ref(false)
const showDrawer = () => {
  isDrawerShow.value = true
}

const settingStore = useSettingStore()
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#c7158577',
])

/** change theme color */
const handleThemeColorChange = (newColor: string) => {
  document.documentElement.style.setProperty("--el-color-primary", newColor);
  // document.documentElement.style.setProperty(
  //   "--el-color-primary-dark-2",
  //   isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
  // );
  for (let i = 1; i <= 9; i++) {
    // const primaryColor = isDark.value ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`;
    const primaryColor = settingStore.isDark ? `${getDarkColor(newColor, i / 10)}` : `${getLightColor(newColor, i / 10)}`
    
    document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
  }
}
handleThemeColorChange(settingStore.themeColor)

/** dark mode */
const handelToggleDark = () => {
  handleThemeColorChange(settingStore.themeColor)
  document.documentElement.className = settingStore.isDark ? 'dark' : ''
}
handelToggleDark()


</script>

<style scoped lang="scss">
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>

/**
 * @description 系统样式设置
 */

import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
import type { SettingStateType } from './settingType'

export const useSettingStore = defineStore('setting', {
  persist: true,
  state: (): SettingStateType => ({
    isCollapse: false,
    themeColor: '#1E90FF',
    isDark: false,
  }),

  getters: {
    
  },

  actions: {}
})

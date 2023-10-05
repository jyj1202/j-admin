/**
 * @description 权限
 */

import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
import type { SettingStateType } from './settingType'

export const useSettingStore = defineStore('setting', {
  state: (): SettingStateType => ({
    isCollapse: false
  }),

  getters: {
    
  },

  actions: {}
})

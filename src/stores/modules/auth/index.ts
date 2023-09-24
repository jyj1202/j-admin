/**
 * @description 权限
 */

import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
import type { AuthStateType } from './authType'

export const useAuthStore = defineStore('auth', {
  state: (): AuthStateType => ({
    authMenuList: [
      {
        path: '/j-form',
        name: 'home',
        component: '/j-form',
        meta: {
          icon: 'HomeFilled',
          title: '首页',
          link: '',
          hide: false,
          full: false,
          affix: true,
          keepAlive: true
        }
      },
      {
        path: '/j-crud',
        name: 'dataScreen',
        component: '/dataScreen/index',
        meta: {
          icon: 'Histogram',
          title: '数据大屏',
          link: '',
          hide: false,
          full: true,
          affix: false,
          keepAlive: true
        }
      }
    ], // 菜单权限
    authButtonList: {} // 按钮权限
  }),

  getters: {
    // value: state => {
    //   return state.value;
    // }
  },

  actions: {}
})

/**
 * @description 表单设计
 */

import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
import type { State, FormItemMeta } from './state.d'

export const useFormGeneratorStore = defineStore('formGenerator', {
  // persist: true,
  state: (): State => ({
    currentFormItem: undefined,
    formItemList: []
  }),

  getters: {
    
  },

  actions: {
    setCurrentFormItem(currentFormItem: FormItemMeta) {
      this.currentFormItem = currentFormItem
    },
    /** add or update */
    setFormItem(formItem: FormItemMeta, index: number) {
      this.formItemList[index] = formItem
    },
    /** use splice method */
    deleteFormItem(id: string) {
      const index = this.formItemList.findIndex(item => item.id==id)
      this.formItemList.splice(index, 1)
    },

    clearFormItemList() {
      this.formItemList = []
    },
  }
})

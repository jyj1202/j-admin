/**
 * @description 表单设计store(form item相关) 
 */

import { defineStore } from 'pinia'
import { deepClone } from "@/utils";
import type { FormItemMeta, FormOption } from '@/views/j-form-generator/src/typings'
import { defaultConfig } from "@/views/j-form/components/config";

interface State {
  /** currentFormItem and currentFormOption.column.item should use same object */
  currentFormItem: FormItemMeta|undefined;
  currentFormOption: FormOption;
  
  currentFormOptionIndex: number; /** pointer */
  /** historyFormOptions and currentFormOption should be isolate with each other. */
  historyFormOptions: FormOption[];
}

export const useFormGeneratorStore = defineStore('formGenerator', {
  // persist: true,
  state: (): State => ({
    currentFormItem: undefined,
    currentFormOption: {...defaultConfig, span: 24, column: []},
    currentFormOptionIndex: -1,
    historyFormOptions: [],
    // {
    //   labelWidth: 100,
    //   labelPosition: 'left',
    //   labelSuffix: '',
    //   size: 'default',
    //   menuBtn: true,
    //   submitBtn: true,
    //   submitText: 'Submit',

    //   // disable: false,
    //   column: [],
    // }
  }),

  actions: {
    /** formItem */
    setCurrentFormItem(currentFormItem: FormItemMeta|undefined) {
      this.currentFormItem = currentFormItem
    },
    /** add or update */
    setFormItem(formItem: FormItemMeta, index: number) {
      this.currentFormOption.column[index] = formItem
      this.pushHistory()
    },
    /** use splice method */
    deleteFormItem(id: string) {
      const index = this.currentFormOption.column.findIndex(item => item.id==id)
      this.currentFormOption.column.splice(index, 1)
      this.pushHistory()
    },

    clearFormItemList() {
      this.currentFormOption.column = []
      this.pushHistory()
    },


    /** formOption */
    setCurrentFormOption(formOption: FormOption) {
      this.currentFormOption = formOption
    },
    resetCurrentFormOption() {
      this.currentFormOption = {
        ...defaultConfig,
        column: []
      }
    }, 


    /** historyFormOptions */
    /** set(include move) or delete formItem, setting(all setting) need to do this */
    pushHistory() {
      /** delete formOptionItems which index > currentFormOptionIndex */
      /** splice: 如果省略了 deleteCount，或者其值大于或等于由 start 指定的位置到数组末尾的元素数量，
       * 那么从 start 到数组末尾的所有元素将被删除
      */
      this.historyFormOptions.splice(this.currentFormOptionIndex+1)
      this.historyFormOptions.push(deepClone<FormOption>(this.currentFormOption))
      this.backwardCurrentFormOptionIndex()
    },
    forwardCurrentFormOptionIndex() {
      this.currentFormOptionIndex>0 && (this.currentFormOptionIndex-=1)
    },
    backwardCurrentFormOptionIndex() {
      this.currentFormOptionIndex+=1
    },
    redo() {
      this.forwardCurrentFormOptionIndex()
      this.setCurrentFormOption(deepClone(this.historyFormOptions[this.currentFormOptionIndex]))
      this.setCurrentFormItem(undefined)
    },
    undo() {
      (this.currentFormOptionIndex<this.historyFormOptions.length) && this.backwardCurrentFormOptionIndex()
      this.setCurrentFormOption(deepClone(this.historyFormOptions[this.currentFormOptionIndex]))
      this.setCurrentFormItem(undefined)
    }
  }
})

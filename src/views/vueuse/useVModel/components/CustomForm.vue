<template>
    <div class="space-y-5">
      <h3>useVModel:</h3>
      <el-input v-model="hobby"></el-input>

      <!-- <h3>useVModels:</h3> -->
      <el-form :model="form" label-width="80px" label-position="left">
        <el-form-item label="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleChangeFormData">change custom form's name</el-button>

      <ElDivider/>

      <h3>custom useVModel:</h3>
      <el-input v-model="customHobby"></el-input>

      <!-- <h3>custom useVModels:</h3> -->
      <el-form :model="customForm" label-width="80px" label-position="left">
        <el-form-item label="name">
          <el-input v-model="customForm.name" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleChangeCustomFormData">change custom form's name</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useVModel, useVModels } from '@vueuse/core'

interface FormType {
  name: string;
}
interface PropsType {
  hobby: string;
  customHobby: string;
  form: FormType;
  customForm: FormType;
}
const props = defineProps<PropsType>()

const emit = defineEmits<{
  (e: 'update:hobby', hobby: string): void;
  (e: 'update:customHobby', hobby: string): void;
  (e: 'update:form', form: FormType): void;
  (e: 'update:customForm', form: FormType): void;
}>()
const hobby = useVModel(props, 'hobby', emit)
const form = useVModel(props, 'form', emit, {
  passive: true, deep: true
})
const handleChangeFormData = () => {
  form.value.name = 'xxx'
}



const customHobby = useCustomModel(props, 'customHobby', emit)
const customForm = useCustomModel(props, 'customForm', emit)
const handleChangeCustomFormData = () => customForm.value = {name: 'zhangsan'}


/**
 * 自定义proxy没有递归代理，无法实现深度监听
 * @param props 
 * @param key 
 * @param emit 
 */
function useCustomModel<P extends object, K extends keyof P>(
  props: P, key: K, emit: (e: string, ...args: any[]) => void
) {
  const eName = `update:${key.toString()}`
  return computed({
    get() {
      if (typeof props[key] != 'object' || props[key] == null) {
        return props[key]
      } else {
        const p = new Proxy(props[key] as object, {
          get(t, p) {
            return t[p]
          },
          set(t, p, newV) {
            emit(eName, {...t, [p]: newV})
            return true
          }
        })
        return p
      }
    },
    set(v) {
      console.log('computed set');
      emit(eName, v)
    }
  })
}

</script>

<style scoped>

</style>

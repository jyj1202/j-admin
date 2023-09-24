<!-- 注意vue3动态组件易错点
  https://cn.vuejs.org/api/sfc-script-setup.html#using-components
-->
<template>
  <el-form :model="formData" :label-width="option.labelWidth ?? '120px'">
    <el-form-item v-for="{prop, label, type} in option.column" :key="prop" :label="label">
      <component :is="`el-${type}`">
        
      </component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="JForm">
import { reactive, ref } from "vue";
import type { OptionType } from "./type.d";

interface PropsType {
  option: OptionType
}
const props = defineProps<PropsType>()

const formData = reactive({
  name: ''
})
console.log(formData);
const name = ref(1)
console.log(name);


</script>

<style scoped>

</style>

<template>
  <div class="p-5 rounded-md shadow">
    <el-alert
      title="👺 二次封装el-table组件，实现传入配置生成表格，配合JForm组件完成增删查改业务。"
      description="功能：
        crud；
        多级表头；表头、单元格插槽；单元格支持格式化、v-html、数组处理、字典映射；
        自定义指令进行按钮权限控制；
      "
      type="success"
      :closable="false"
    />
    <JCrud
      class="mt-5"
      v-model:page="page"
      :data="tableData"
      :option="tableOption"
      :table-loading="false"
      @row-del="handleRowDel"
      @refresh-change="handleRefreshChange"
    >
      <template #name="{row, column, size}">
        <el-tag :size="size">{{ row[column.prop] }}</el-tag>
      </template>
      <template #state="{row, column, size}">
        <el-tag :size="size">{{ row[column.prop] }}</el-tag>
      </template>
      <template #city="{row, column}">
        <span class="text-red-200">{{ row[column.prop] }}</span>
      </template>
    </JCrud>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import type { JCrudOptionType } from "./components/jCrud";
import JCrud from "./components/JCrud.vue";


const tableData = reactive([
  {
    date: 1695880394836,
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
    sex: 0,
    hobby: ['sing', 'jump', 'rap']
  },
  {
    date: 1695880390000,
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
    sex: 1,
  },
  {
    date: 1695880000000,
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
    sex: 0,
  },
  {
    date: 1695880311111,
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
    sex: 0,
  },
])
const page = reactive({
  total: 100,
  currentPage: 1,
  pageSize: 20
})
interface Row {
  date: number;
  name: string;
  state: string;
  city: string;
  address: string;
  hobby: [];
  // zip: string;
  tag: string;
  sex: number;
}
const tableOption = reactive<JCrudOptionType<Row>>({
  header: true,
  index: true,
  selection: true,
  column: [{
    label: 'Date(use format)',
    prop: 'date',
    width: 180,
    formatter: (row, value, label, col) => {
      return new Date(value).toLocaleString('en-US')
    }
  }, {
    label: 'Name(use slot)',
    prop: 'name',
    search: true
  }, {
    label: 'Sex(use v-html)',
    prop: 'sex',
    html: true,
    search: true,
    type: 'select',
    dicData: [{
      label: 'female',
      value: 0
    }, {
      label: 'male',
      value: 1
    }, ],
    formatter: (row, value, label)=>{
      let htmlStr
      htmlStr = value === 0 ? `<b style="color:red">${label}</b>` : label
      return htmlStr
    }
  }, {
    label: 'location',
    prop: 'location',
    children: [{
      label: 'State(use slot)',
      prop: 'state',
      search: true
    }, {
      label: 'City(use slot)',
      prop: 'city',
      search: true
    }, {
      label: 'Address',
      prop: 'address',
      width: 150,
      search: true
    }]
  }, {
    label: 'Hobby(handle value is array)',
    prop: 'hobby'
  }, ]
})

const handleRowDel = (row: any) => {
  ElMessageBox.confirm('Confirm to delete?', 'Tip', {
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    type: 'warning'
  }).then(() => {
    ElMessage({
      type: 'success',
      message: `delete success: ${JSON.stringify(row)}!`
    });
  }).catch(() => { });
}

const handleRefreshChange = () => {
  ElMessage({
    type: 'success',
    message: 'refresh success'
  });
}

</script>

<style scoped>

</style>

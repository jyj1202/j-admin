<template>
  <div>
    <!-- header -->
    <HeaderSearch v-show="isHeaderSearchShow"></HeaderSearch>
    <div v-if="getProp('header')" class="flex justify-between items-center mb-2">
      <div class="menu-left">
        <ElButton icon="Plus" type="primary" @click="showAddDialogForm">Add</ElButton>

      </div>
      <div class="menu-right">
        <ElButton  icon="Search" @click="isHeaderSearchShow=!isHeaderSearchShow"/>
        <ElButton  icon="Refresh" @click="$emit('refreshChange')"/>
        
      </div>
    </div>

    <el-table
      v-loading="loading"
      style="width: 100%"
      :data="data"
      :border="getProp('border')"
      :stripe="getProp('stripe')"
      :size="getProp('size')"
      :fit="true"
      highlight-current-row
      :header-cell-style="{'fontWeight': 700}"
    >
      <!-- defaultColumn -->
      <template v-if="defaultColumn.length">
        <el-table-column
          v-for="col in defaultColumn"
          :key="col.type"
          v-bind="col"
          align="center"
          fixed="left"
        >
        </el-table-column>
      </template>
      
      <!-- main -->
      <Column :columns="option.column">
        <template v-for="(val, key) in getColumnSlots" :key="key" #[key]="scope">
          <slot :name="key" v-bind="scope"></slot>
        </template>
      </Column>

      <!-- menu -->
      <el-table-column
        label="Menu"
        :width="getProp('menuWidth')"
        fixed="right"
        align="center"
      >
        <template #default="{row}">
          <slot name="menu">
            <el-button
              type="primary"
              text
              :icon="getProp('editBtnIcon')"
              @click="showEditDialogForm(row)"
              >{{ getProp('editBtnText') }}
            </el-button>
            <el-button
              type="danger"
              text
              :icon="getProp('delBtnIcon')"
              @click="handleDelete(row)"
              >{{ getProp('delBtnText') }}
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- pagination -->
    <div v-if="page.total" ref="pagination" class="flex justify-end py-5">
      <el-pagination
        :background="true"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="page.pageSizes ?? getProp('pageSizes')"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <DialogForm ref="dialogFormRef"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, useSlots } from 'vue';
import { defaultConfig } from "./config";
import { JCrudOptionKey, getPropKey, getColumnSlotsKey } from "@/views/j-crud/components/utils/keys";
import type { JCrudOptionType, PageOption, JCrudColumn } from "./jCrud.d.ts";
import DialogForm from "./dialogForm/index.vue";
import HeaderSearch from "./header/HeaderSearch.vue";
import Column from "./column/JColumn.vue";


/** prop and emit */
interface JCrudProps {
  data: Array<{}>;
  option: JCrudOptionType;
  tableLoading: boolean;
  page?: PageOption;
}
const props = withDefaults(defineProps<JCrudProps>(), {
  tableLoading: false,
  page: () => ({
    pageSizes: [20, 50, 100, 200, 500]
  })
})
const emit = defineEmits<{
  (e: 'rowDel', row: object): void;
  (e: 'rowUpdate', row: object): void;
  (e: 'refreshChange'): void;
  (e: 'update:page'): void;
}>()
/** provide */
// const key = Symbol() as InjectionKey<string>
provide<JCrudOptionType>(JCrudOptionKey, props.option) // 若提供的是非字符串值会导致错误
provide(getPropKey, getProp)


/** table config */
const loading = props.tableLoading

/** table column */
const defaultColumn = computed(() => {
  const columns = []
  const { selection, index, indexLabel} = props.option

  selection && columns.push({ type: 'selection' })

  index && columns.push({
    type: 'index',
    label: indexLabel ?? 'Index',
    width: 70,
  })

  return columns
})

/** column slots */
const getColumnSlots = computed<Record<string, Function>>(() => {
  const columnSlots: Record<string, any> = {}
  const slots = useSlots()
  const propNames = getOptionPropNames(props.option.column)
  Object.keys(slots).forEach(key => {
    if (propNames[key]) {
      columnSlots[key] = slots[key]
    }
  })
  return columnSlots
})
provide(getColumnSlotsKey, getColumnSlots)


/** pagination */
const handleSizeChange = () => {}
const handleCurrentChange = () => {}


/** crud */
/** https://cn.vuejs.org/guide/typescript/composition-api.html#typing-ref */
const dialogFormRef = ref<InstanceType<typeof DialogForm> | null>(null)
/** add */
const showAddDialogForm = () => {
  dialogFormRef.value?._show('Add Row')
}
/** edit */
const showEditDialogForm = (row: object) => {
  dialogFormRef.value?._show('Edit Row', row)
  emit('rowUpdate', row)
}
/** delete */
const handleDelete = (row: object) => {
  emit('rowDel', row)
}

/** header search */
const isHeaderSearchShow = ref(false)


/**
 * get vue component prop.
 * match param's option first, then props.option, last defaultConfig.
 * Exclude null and undefined from T: type NonNullable<T> = T & {}.
 * @param propName
 * @param option
 */
function getProp(propName: string, option: Record<string, any>={}):NonNullable<any> {
  let propValue
  propValue = option[propName] ?? props.option[propName as keyof JCrudOptionType] ?? defaultConfig[propName]
  return propValue
}

/**
 * 获取所有传递过来的col.prop
 * @param cols
 * @param propNames
 */
function getOptionPropNames(cols: JCrudColumn[], propNames:Record<string, boolean>={}) {
  cols.forEach(col=> {
    if (col.children) {
      getOptionPropNames(col.children, propNames)
    } else {
      propNames[col.prop] = true
    }
  })
  return propNames
}
</script>

<style scoped>

</style>

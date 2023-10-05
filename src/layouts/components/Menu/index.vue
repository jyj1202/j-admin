<template>
  <el-scrollbar>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <MenuTree :menu-list="menuList"/>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from 'vue-router'
import MenuTree from "./MenuTree.vue";

const router = useRouter()

const menuList: Menu.MenuOption[] = reactive([{
  path: '/workbench',
  meta: {
    title: 'workbench'
  }
}, {
  path: '/j-form',
  meta: {
    title: 'j form'
  }
}, {
  path: '/j-crud',
  meta: {
    title: 'j crud'
  }
}, {
  path: '/j-components',
  meta: {
    title: 'j components'
  },
  children: [{
    path: '/j-components/guide',
    meta: {
      title: 'guide'
    }
  }, {
    path: '/j-components/waterfall',
    meta: {
      title: 'waterfall'
    }
  }]
}, {
  path: '/j-form-generator',
  meta: {
    title: 'j form generator'
  }
}, {
  path: '/screen',
  meta: {
    title: 'screen'
  }
}, {
  path: '',
  meta: { title: 'multi menu' },
  children: [{
    path: '',
    meta: {title: 'menu 1'},
    children: [{
      path: '',
      meta: {title: 'menu 1-1'}
    }, {
      path: '',
      meta: {title: 'menu 1-2'}
    }]
  }, {
    path: '',
    meta: {title: 'menu 2'}
  }]
}, {
  path: '',
  meta: {
    title: 'system manage'
  },
  children: [{
    path: '/system-manage/account-manage',
    meta: {
      title: 'account manage'
    }
  }, {
    path: '',
    meta: {
      title: 'role manage'
    }
  }, {
    path: '',
    meta: {
      title: 'menu manage'
    }
  }]
}])

const handleSelect = (index: string) => {
  if (typeof index === 'string' && index.startsWith('http')) return window.open(index, '_blank')
  if (/^\//.test(index)) {
    router.push(index)
  }
}



</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;
}
</style>

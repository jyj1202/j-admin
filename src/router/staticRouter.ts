import type { RouteRecordRaw } from "vue-router";
// import { HOME_URL, LOGIN_URL } from "@/config";
// import LayoutVertical from "@/layouts/LayoutVertical/index.vue";

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: '/workbench',
    component: () => import("@/layouts/LayoutVertical/index.vue"),
    children: [
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import("@/views/workbench/index.vue"),
        meta: {
          title: 'workbench',
          menu: true,
        }
      },
      {
        path: '/j-form/test',
        name: 'test',
        component: () => import("@/views/j-form/test.vue"),
        meta: {

        }
      },
      {
        path: '/avue',
        name: 'avue',
        component: () => import("@/views/avue/index.vue"),
        meta: {

        }
      },
      {
        path: '/j-form',
        name: 'j-form',
        component: () => import("@/views/j-form/index.vue"),
        meta: {
          title: 'j form',
          menu: true,
        }
      },
      {
        path: '/j-form-generator',
        name: 'j-form-generator',
        component: () => import("@/views/j-form-generator/index.vue"),
        meta: {
          title: 'j form generator',
          menu: true,
        }
      },
      {
        path: '/j-crud',
        name: 'j-crud',
        component: () => import("@/views/j-crud/index.vue"),
        meta: {
          title: 'j crud',
          menu: true,
        }
      },
      {
        path: '/j-virtualized-list',
        name: 'j-virtualized-list',
        component: () => import("@/views/j-virtualized-list/index.vue"),
        meta: {
          title: 'virtualized list',
          menu: true,
        }
      },
      {
        path: '/j-components',
        meta: {
          title: 'j components',
          menu: true,
        },
        children: [{
          path: '/j-components/waterfall',
          name: 'waterfall',
          component: () => import("@/views/j-components/waterfall/index.vue"),
          meta: {
            title: 'waterfall',
            menu: true,
          }
        }, {
          path: '/j-components/guide',
          name: 'guide',
          component: () => import("@/views/j-components/guide/index.vue"),
          meta: {
            title: 'guide',
            menu: true,
          }
        }, 
        {
          path: '/j-components/monaca-editor',
          name: 'monaca-editor',
          component: () => import("@/views/j-components/monaca-editor/index.vue"),
          meta: {
            title: 'monaca-editor',
            menu: true,
        }
        },
        {
          path: '/j-components/dialog',
          name: 'dialog',
          component: () => import("@/views/j-components/dialog/index.vue"),
          meta: {
            title: 'dialog',
            menu: true,
          }
        },
        {
          path: '/j-components/select-tree',
          name: 'select-tree',
          component: () => import("@/views/j-components/select-tree/index.vue"),
          meta: {
            title: 'select tree',
            menu: true,
          }
        },
        ]
      },
      {
        path: '/sortable',
        name: 'sortable.js',
        component: () => import("@/views/sortable/index.vue"),
        meta: {
          title: 'sortable.js',
          menu: true,
        }
      },
      {
        path: '/screen',
        name: 'screen',
        component: () => import("@/views/screen/index.vue"),
        meta: {
          title: 'screen',
          menu: true,
        }
      },
      {
        path: '/d3',
        name: 'd3.js',
        meta: {
          title: 'd3',
          menu: true,
        },
        children: [{
          path: '/d3/getting-started',
          name: 'd3-getting-started',
          component: () => import("@/views/d3/getting-started.vue"),
          meta: {
            title: 'd3 getting-started',
            menu: true,
          }
        }, {
          path: '/d3/knowledge-network',
          name: 'd3-knowledge-network',
          component: () => import("@/views/d3/knowledge-network/index.vue"),
          meta: {
            title: 'd3 knowledge-network',
            menu: true,
          }
        }, {
          path: '/d3/knowledge-network2',
          name: 'd3-knowledge-network2',
          component: () => import("@/views/d3/knowledge-network2/index.vue"),
          meta: {
            title: 'd3 knowledge-network2',
            menu: true,
          }
        }]
      },
      {
        path: '/vueuse',
        name: 'vueuse',
        meta: {
          title: 'vueuse',
          menu: true,
        },
        children: [{
          path: '/vueuse/useVModel',
          name: 'vueuse-useVModel',
          meta: {
            title: 'useVModel',
            menu: true,
          },
          component: () => import("@/views/vueuse/useVModel/index.vue")
        }]
      },
      {
        path: '/test',
        name: 'test',
        component: () => import("@/views/test/index"),
        meta: {
          title: 'test'
        }
      },
    ]
  },
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter: RouteRecordRaw[] = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/exception/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/exception/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/exception/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/exception/404.vue")
  }
];

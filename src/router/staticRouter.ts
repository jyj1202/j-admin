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
          title: 'workbench'
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
          title: 'j form'
        }
      },
      {
        path: '/j-crud',
        name: 'j-crud',
        component: () => import("@/views/j-crud/index.vue"),
        meta: {
          title: 'j crud'
        }
      },
      {
        path: '/j-components',
        meta: {
          title: 'j components'
        },
        children: [{
          path: '/j-components/waterfall',
          name: 'waterfall',
          component: () => import("@/views/j-components/waterfall/index.vue"),
          meta: {
            title: 'waterfall'
          }
        }, {
          path: '/j-components/guide',
          name: 'guide',
          component: () => import("@/views/j-components/guide/index.vue"),
          meta: {
            title: 'guide'
          }
        }]
      },
      {
        path: '/j-form-generator',
        name: 'j-form-generator',
        component: () => import("@/views/j-form-generator/index.vue"),
        meta: {
          title: 'j form generator'
        }
      },
      {
        path: '/screen',
        name: 'screen',
        component: () => import("@/views/screen/index.vue"),
        meta: {
          title: 'screen'
        }
      },
    ]
  },
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
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

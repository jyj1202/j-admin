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
        {
          path: '/j-components/snake-graph',
          name: 'snake-graph',
          component: () => import("@/views/j-components/snake-graph/index.vue"),
          meta: {
            title: 'snake graph',
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
        path: '/utility-functions',
        name: 'utility-functions',
        meta: {
          title: 'utility functions',
          menu: true,
        },
        children: [{
          path: '/utility-functions/useLock',
          name: 'utility-functions-useLock',
          component: () => import("@/views/utility-functions/useLock.vue"),
          meta: {
            title: 'useLock',
            menu: true,
          }
        }]
      },
      {
        path: '/video.js',
        name: 'video.js',
        meta: {
          title: 'video.js',
          menu: true,
        },
        children: [{
          path: '/video.js/player-list',
          name: 'video.js-player-list',
          component: () => import("@/views/video.js/player-list.vue"),
          meta: {
            title: 'player list',
            menu: true,
          }
        }]
      },
      {
        path: '/xgplayer',
        name: 'xgplayer',
        meta: {
          title: 'xgplayer',
          menu: true,
        },
        children: [{
          path: '/xgplayer/player-list',
          name: 'xgplayer-player-list',
          component: () => import("@/views/xgplayer/player-list.vue"),
          meta: {
            title: 'player list',
            menu: true,
          }
        }, {
          path: '/xgplayer/progress-dot',
          name: 'xgplayer-progress-dot',
          component: () => import("@/views/xgplayer/progress-dot.vue"),
          meta: {
            title: 'progress-dot',
            menu: true,
          }
        }]
      },
      {
        path: '/html2canvas',
        name: 'html2canvas',
        meta: {
          title: 'html2canvas',
          menu: true,
        },
        component: () => import("@/views/html2canvas.vue"),
      },
      {
        path: '/dom-to-image',
        name: 'dom-to-image',
        component: () => import("@/views/dom-to-image.vue"),
        meta: {
          title: 'dom-to-image',
          menu: true,
        }
      },
      {
        path: '/animation',
        name: 'animation',
        meta: {
          title: 'animation',
          menu: true,
        },
        children: [{
          path: '/animation/fragment',
          name: 'animation-fragment',
          component: () => import("@/views/animation/fragment/index.vue"),
          meta: {
            title: 'fragment',
            menu: true,
          }
        }, {
          path: '/animation/gpt2',
          name: 'animation-gpt2',
          component: () => import("@/views/animation/gpt2/index.vue"),
          meta: {
            title: 'gpt2',
            menu: true,
          }
        }]
      },
      {
        path: '/optimization',
        name: 'optimization',
        meta: {
          title: 'optimization',
          menu: true,
        },
        children: [{
          path: '/optimization/img-lazy-load',
          name: 'optimization-img-lazy-load',
          component: () => import("@/views/optimization/img-lazy-load/index.vue"),
          meta: {
            title: 'img lazy load',
            menu: true,
          }
        },]
      },
      {
        path: '/mini-package',
        name: 'mini-package',
        meta: {
          title: 'mini-package',
          menu: true,
        },
        children: [{
          path: '/mini-package/mitt',
          name: 'mini-package-mitt',
          component: () => import("@/views/mini-package/mitt/index.vue"),
          meta: {
            title: 'mitt',
            menu: true,
          }
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

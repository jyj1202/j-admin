/**
 * 全局组件
 */
import type { App, Component } from "vue";
// import { getFilenameFromPath } from "@/utils/file";

// const globComponents: Record<string, Component> = import.meta.glob('./*.{vue,tsx}',
//   { import: 'default', eager: true }
// )


// const installGlobComponents = {
//   install(app: App<Element>) {
//     for (const path in globComponents) {
//       app.component(getFilenameFromPath(path), globComponents[path])
//     }
//   }
// }

import SvgIcon from "./SvgIcon.vue";
import JUpload from "./JUpload";

const globComponents: Record<string, Component> = {
  SvgIcon,
  JUpload
}

const installGlobComponents = {
  install(app: App<Element>) {
    for (const name in globComponents) {
      app.component(name, globComponents[name])
    }
  }
}

export default installGlobComponents

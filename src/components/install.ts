/**
 * 全局组件
 */
import type { App, Component } from "vue";
import { getFilenameFromPath } from "@/utils/file";

const globComponents: Record<string, Component> = import.meta.glob('./*.{vue,tsx}',
  { import: 'default', eager: true }
)


const installGlobComponents = {
  install(app: App<Element>) {
    for (const path in globComponents) {
      app.component(getFilenameFromPath(path), globComponents[path])
    }
  }
}

export default installGlobComponents

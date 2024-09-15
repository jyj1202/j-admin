/**
 * 图片懒加载
 */
import { type App } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export const vLazyImg = {
  install(app: App<Element>) {
    app.directive("lazyImg", (el: HTMLImageElement, { value }: { value: string }) => {
      const src = value
      el.style.backgroundColor = '#ccc'
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }], observerElement) => {
        console.log(isIntersecting, 'isIntersecting');
        if (isIntersecting) {
          el.src = src
          stop()
        }
      },)
    })
  }
}

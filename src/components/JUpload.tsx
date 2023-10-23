// 当全局自定义组件和第三方组件同名时，以谁为标准取决于组件全局注册的先后时机，后注册的优先级高
import { defineComponent, ref, toRaw } from 'vue'
import type { UploadProps, UploadInstance } from "element-plus";

interface JUploadProps extends UploadProps {
  /** formItem props */
  prop: string;
  customSlots: Record<string, Function>;
}
/**
 * setup 函数的第一个参数是组件的 props。
 * 和标准的组件一致，一个 setup 函数的 props 是响应式的，并且会在传入新的 props 时同步更新。
 */
export default defineComponent((props: JUploadProps, {expose}) => {
    const elUploadRef = ref<UploadInstance>()

    /** 用户传入的插槽 */
    let defaultSlot = `${props.prop}Default`
    const customSlotsName: Record<string, string> = {
      triggerSlot: `${props.prop}Trigger`,
      tipSlot: `${props.prop}Tip`,
      fileSlot: `${props.prop}File`,
    }
    
    /** 获取el-upload插槽内容 */
    const uploadSlots: Record<string, Function> = {
      default() {
        return props.customSlots && props.customSlots[defaultSlot] instanceof Function ?
        props.customSlots[defaultSlot]() :
        <el-button type="primary">Click to upload</el-button>
      },
    };
    Object.keys(customSlotsName).forEach(key => {
      const customSlotName = customSlotsName[key] // 用户使用的插槽名称
      const customSlotFn = (props.customSlots && props.customSlots[customSlotName]) ?? undefined  // 用户传入的插槽函数
      if (customSlotFn instanceof Function) {
        const elUploadSlotName = key.replace(/Slot$/, '')  // el-upload组件插槽名称
        uploadSlots[elUploadSlotName] = () => {
          return customSlotFn()
        }
      }
    })
    
    expose({
      elUploadRef,
    })

    return () => (
      <el-upload
        ref={elUploadRef}
        { ...props }
        v-slots={uploadSlots}
      >
    
      </el-upload>
    )
  },
  // 目前仍然需要手动声明运行时的 props
  {
    props: [
      'prop', 'customSlots', 'action', 'headers', 'method', 'multiple', 'data', 'name', 'withCredentials',
      'showFileList', 'drag', 'accept', 'onPreview', 'onRemove', 'onSuccess', 'onError',
      'onProgress', 'onChange', 'onExceed', 'beforeUpload', 'beforeRemove', 'fileList', 'listType',
      'autoUpload', 'httpRequest', 'disabled', 'limit',
    ],
  }
)


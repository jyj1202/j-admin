import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const size = 'large'
    const count = ref(1)
    const onClick = () => {count.value++}

    return () => (
      <div class="border p-5">
        <div class="mb-2">This page use TSX</div>
        <el-button
          size={size}
          onClick={onClick}
        >count: {count.value}
        </el-button>
      </div>
    )
  }
})

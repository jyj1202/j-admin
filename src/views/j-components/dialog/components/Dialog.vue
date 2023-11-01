<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-show="dialogVisible" class="modal-mask">
        <div ref="dialogRef" class="modal-container">
          <div class="modal-header flex justify-between items-center">
            <slot name="header"><h3>default header</h3></slot>
            <el-button text icon="Close" @click="$emit('update:visible', false)"></el-button>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button
                class="modal-default-button"
                @click="$emit('close')"
              >OK</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const props = defineProps<{ visible: boolean; }>()
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update:visible', visible: boolean): void;
}>()
const dialogRef = ref<HTMLElement>()
const dialogVisible = ref(false)

const onClick = (e: MouseEvent) => {
  console.log(e);
  const {clientX, clientY} = e
  let screenWidth = document.documentElement.clientWidth;
  let screenHeight = document.documentElement.clientHeight;
  console.log(screenWidth, screenHeight);
  
  dialogRef.value!.style.transformOrigin = `${clientX-screenWidth/2}px ${clientY-screenHeight/2}px`
}
document.documentElement.addEventListener("click", onClick);

watch(() => props.visible, (visible) => {
  setTimeout(() => {
    dialogVisible.value = visible
    if (visible) {
      // const rect = dialogRef.value!.getBoundingClientRect()
      // console.log(rect);
      document.documentElement.removeEventListener("click", onClick);
    } else {
      document.documentElement.addEventListener("click", onClick);
    }
  });
})

onUnmounted(() => {
  document.documentElement.removeEventListener("click", onClick);
})

</script>


<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  .modal-container {
    width: 50%;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    .modal-header h3 {
      margin-top: 0;
      color: var(--el-color-primary);
    }
    .modal-body {
      margin: 20px 0;
    }
    .modal-default-button {
      float: right;
    }
  }
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(0.3);
  transform: scale(0.3);
}
</style>

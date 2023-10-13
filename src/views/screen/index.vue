<template>
  <div class="flex justify-center">
    <div class="container-box flex items-center overflow-hidden h-20 p-4">
      <svg class="svg h-10 w-10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="10" y="10" viewBox="0 0 400 400" xml:space="preserve">
        <g>
          <path class="path" d="M150.383,18.301c-7.13-3.928-15.308-6.187-24.033-6.187c-15.394,0-29.18,7.015-38.283,18.015    c-9.146-11-22.919-18.015-38.334-18.015c-8.704,0-16.867,2.259-24.013,6.187C10.388,26.792,0,43.117,0,61.878    C0,67.249,0.874,72.4,2.457,77.219c8.537,38.374,85.61,86.771,85.61,86.771s77.022-48.396,85.571-86.771    c1.583-4.819,2.466-9.977,2.466-15.341C176.104,43.124,165.716,26.804,150.383,18.301z"></path>
        </g>
      </svg>
      <div class="text">Please enter your account number</div>
      <el-icon class="arrow"><Right /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.container-box {
  position: relative;
  flex-grow: 0; /* 项目自动拉伸以填充剩余空间 */
  flex-shrink: 0; /* 项目不会缩小 */
  flex-basis: auto; /* 项目的宽度或高度根据内容自动调整 */
  width: 28rem;
  font-size: large;
  color: var(--el-color-primary);
  .el-icon svg {
    height: 2rem;
    width: 2rem;
  }
}
.container-box:before,.container-box:after{
  content:"";
  display:block;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height:100%;
  border:1px solid var(--el-color-primary);
  border-radius: 0.2rem;
}
 
.container-box:before{
  top: 0;
  left: 0;
  transition: border-color 0s ease-in 0.8s,width 0.2s ease-in 0.6s,height 0.2s ease-in 0.4s;
  border-right-color: var(--el-color-primary);
}
.container-box:after{
  right: 0;
  bottom: 0;
  transition: border-color 0s ease-in 0.4s,width 0.2s ease-in 0.2s,height 0.2s ease-in;
  border-bottom-color: var(--el-color-primary);
  border-left-color:var(--el-color-primary);
}
 
.container-box:hover:before{
  width: 0;
  height: 0;
  transition: width 0.2s ease-in ,height 0.2s ease-in 0.2s;
  border-top-color:transparent;
  border-right-color: transparent;
}
.container-box:hover:after{
  width: 0;
  height: 0;
  transition: border-color 0s ease-in 0.4s,width 0.2s ease-in 0.4s,height 0.3s ease-in 0.6s;
  border-bottom-color: transparent;
  border-left-color:transparent;
}

.text, .arrow {
  position: absolute;
  transition: right 0.4s ease-in, color 0.4s ease-in;
}
.text {
  right: 7rem;
}
.arrow {
  right: 2rem;
  width: 2rem;
  height: 2rem;
}
.svg {
  fill: none;
  stroke: var(--el-color-primary);
  stroke-width: 8px
}
.path {
  stroke-dashoffset: 0;
  stroke-dasharray: 523.105;
  // stroke-dasharray: 0;
  transition: stroke-dashoffset 0.4s ease-in-out;
}
.container-box:hover {
  .text,.arrow {
    color: transparent;
  }
}
.container-box:hover {
  .text {
    right: 4rem;
  }
  .arrow {
   right: 1rem;
  }
  .path {
    stroke-dashoffset: 523.105;
  }
}

g {
  transform-origin: top left;
  transform: scale(2);
}

</style>

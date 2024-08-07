<template>
  <div class="h-full root relative" :style="{backgroundColor: currentData.bgc}">
    <!-- <el-button @click="changeAnimal">切换</el-button> -->
    <el-icon class="arrow-left cursor-pointer" size="30px" @click="changeAnimal(0)"><ArrowLeftBold /></el-icon>
    <div class="animal-container">
      <template v-for="(item, index) in currentData.styleArr" :key="index">
        <div
          class="clip-item"
          :style="{
            backgroundColor: item.backgroundColor,
            clipPath: item.clipPath,
            transitionDelay: `${index * 15}ms`,
          }"
        ></div>
      </template>
    </div>
    <el-icon class="arrow-right cursor-pointer" @click="changeAnimal(1)" size="30px"><ArrowRightBold /></el-icon>
    <h2 v-show="toggled" class="animal-name text-center animate__animated animate__fadeInUp text-4xl">{{ currentData.name }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import data from './data.json';

const currentIndex = ref(0);
const currentData = ref(data[0]);
const toggled = ref(true)
const length = data.length;
const changeAnimal = (type: 0|1) => {
  toggled.value = false
  if (type == 0 && currentIndex.value == 0) {
    currentIndex.value = length - 1;
  } else if (type == 1 && currentIndex.value >= length - 1) {
    currentIndex.value = 0;
  } else {
    type == 0 ? currentIndex.value-- : currentIndex.value++;
  }
  currentData.value = data[currentIndex.value];
  requestAnimationFrame(() => {
    toggled.value = true
  })
};
</script>

<style scoped lang="scss">
.root {
  transition: background-color 1s;
  .animal-name {
    background: url("@/assets/images/repeat-white.png") center center repeat;
    background-size: 100% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: scratchy 0.253s linear forwards infinite;
    -moz-animation: scratchy 0.253s linear forwards infinite;
    animation: scratchy 0.253s linear forwards infinite;
    color: #fff;
  }
  .arrow-left {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    z-index: 9;
  }
  .arrow-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    z-index: 9;
  }
}
.animal-container {
  height: 600px;
  position: relative;

  .clip-item {
    position: absolute;
    width: 100%;
    height: 100%;

    // 动画过渡效果
    transition-property: all;
    transition-duration: 1000ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@keyframes scratchy {
  0% {
    background-position: 0 0; }
  25% {
    background-position: 0 0; }
  26% {
    background-position: 20px -20px; }
  50% {
    background-position: 20px -20px; }
  51% {
    background-position: 40px -40px; }
  75% {
    background-position: 40px -40px; }
  76% {
    background-position: 60px -60px; }
  99% {
    background-position: 60px -60px; }
  100% {
    background-position: 0 0; }
}
</style>

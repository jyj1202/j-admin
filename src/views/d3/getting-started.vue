<template>
  <div id="container">

  </div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { nextTick } from "vue";

const dataset: number[] = [1, 2, 3, 4, 5];

nextTick(() => {
  const svg = d3.select('#container')
  .append('svg')
  .attr('width', 400)
  .attr('height', 200);

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * 80)
  .attr('y', d => 200 - d * 10)
  .attr('width', 80)
  .attr('height', d => d * 10)
  .attr('fill', 'blue');
})

</script>

<style scoped>

</style>

<template>
  <div class="container h-full"></div>
</template>

<script setup lang="ts">
import data from "./flare-2.json";
import * as d3 from "d3";
import { onMounted } from "vue";
//挂载完成阶段进行初始化，否则找不到当前页面的容器
onMounted(() => {
  init();
});
function init() {
  // Specify the chart’s dimensions.
  const width = document.querySelector('.container')!.clientWidth;
  const height = document.querySelector('.container')!.clientHeight;

  // Compute the graph and start the force simulation.
  const root = d3.hierarchy(data);
  const links = root.links();
  const nodes = root.descendants();

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

  // Create the container SVG.
  const svg = d3.select('.container').append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Append links.
  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line");

  // Append nodes.
  const node = svg.append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("fill", d => d.children ? null : "#000")
      .attr("stroke", d => d.children ? null : "#fff")
      .attr("r", 3.5)
      .call(drag(simulation));

  node.append("title")
      .text(d => d.data.name);

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });

  return svg.node();
}
//增加拖拽功能
function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};
</script>

<style>
.classA {
  display: block;
  padding: 2px;
  /*background-color: aquamarine;*/
}
.style-text {
  display: block;
  padding: 2px;
  background-color: aquamarine;
}
</style>

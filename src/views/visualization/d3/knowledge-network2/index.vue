<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted } from "vue";

onMounted(() => {
  // init()
})

const workerScript = `
importScripts(${await require.import("d3@7").then(JSON.stringify)});

onmessage = function(event) {
  const nodes = event.data.nodes,
        links = event.data.links;

  const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink(links).strength(1))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .stop();

  for (let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
    postMessage({type: "tick", progress: i});
    simulation.tick();
  }

  postMessage({type: "end", nodes: nodes, links: links});

  // terminate itself
  self.close();
};
`

function init() {
  const width = 928;
  const height = Math.floor(width * 0.9);

  const N = 1000;
  const nodes = Array.from({ length: N }, (_, i) => ({index: i}));
  const links = Array.from({ length: N - 1}, (_, i) => ({source: Math.floor(Math.sqrt(i)), target: i + 1}));

  const worker = createWorkerFrom(workerScript);
  worker.addEventListener("message", messaged);
  worker.postMessage({ nodes, links });
  // invalidation.then(() => worker.terminate()); // terminate if cell re-run

  // const canvas = document.createElement('canvas');
  // canvas.width = width;
  // canvas.height = height;
  // const context = canvas.getContext('2d');
  const context = document.context2d(width, height);
  context.canvas.style = `width:${width}px;max-width: 100%; height: auto;`;
  return context.canvas;

  function messaged(event) {
    context.clearRect(0, 0, width, height);
    switch (event.data.type) {
      case "tick":
        progress(event.data.progress);
        break;
      case "end":
        ticked(event.data);
        break;
    }
  }

  function progress(progress) {
    context.fillStyle = "red";
    context.fillRect(0, 0, 2 * progress, 2);
    context.fillStyle = "black";
    context.fillText(`${progress} ticks`, 2, 14);
  }

  function ticked(data) {
    context.save();
    context.translate(width / 2, height / 2);

    context.beginPath();
    for (const c of data.links) {
      context.moveTo(c.source.x, c.source.y);
      context.lineTo(c.target.x, c.target.y);
    }
    context.lineWidth = 0.5;
    context.stroke();

    context.beginPath();
    for (const c of data.nodes) {
      context.moveTo(c.x, c.y);
      context.arc(c.x, c.y, 2, 0, 2 * Math.PI);
    }
    context.fillStyle = "#000";
    context.fill();

    context.restore();
  }
}

function createWorkerFrom(workerScript) {
  const b = new Blob([workerScript], { type: "text/javascript" });
  const url = URL.createObjectURL(b);
  return new Worker(url);
}

</script>

<style scoped>

</style>

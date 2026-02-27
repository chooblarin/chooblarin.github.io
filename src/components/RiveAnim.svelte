<script lang="ts">
import * as rive from "@rive-app/canvas";
import { onMount } from "svelte";

type Props = {
  src: string;
  width?: number;
  height?: number;
  maxWidth?: number;
};

let { src, width = 500, height = 500, maxWidth = 640 }: Props = $props();

let canvas: HTMLCanvasElement;
let root: HTMLDivElement;

onMount(() => {
  const syncCanvasSize = (r?: rive.Rive) => {
    if (!root || !canvas) {
      return;
    }

    const rect = root.getBoundingClientRect();
    const cssWidth = Math.max(1, Math.round(rect.width));
    const cssHeight = Math.max(1, Math.round(rect.height));
    const dpr = window.devicePixelRatio || 1;
    const nextWidth = Math.max(1, Math.round(cssWidth * dpr));
    const nextHeight = Math.max(1, Math.round(cssHeight * dpr));

    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      r?.resizeDrawingSurfaceToCanvas();
    }
  };

  const r = new rive.Rive({
    src,
    canvas,
    autoplay: true,
    onLoad: () => {
      syncCanvasSize(r);
    },
  });

  const resizeObserver = new ResizeObserver(() => {
    syncCanvasSize(r);
  });

  syncCanvasSize(r);
  root.style.setProperty("--rive-max-width", `${maxWidth}px`);
  root.style.setProperty("--rive-aspect-ratio", `${width} / ${height}`);
  resizeObserver.observe(root);

  return () => {
    resizeObserver.disconnect();
    r.cleanup();
  };
});
</script>

<div class="rive-root" bind:this={root}>
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .rive-root {
    width: min(100%, var(--rive-max-width));
    max-width: 100%;
    aspect-ratio: var(--rive-aspect-ratio);
  }

  .rive-root canvas {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
  }
</style>

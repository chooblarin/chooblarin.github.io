<script lang="ts">
  import * as rive from "@rive-app/canvas";
  import { onMount } from "svelte";

  type Props = {
    src: string;
    width?: number;
    height?: number;
  };

  let { src, width = 500, height = 500 }: Props = $props();

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const r = new rive.Rive({
      src,
      canvas,
      autoplay: true,
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
      },
    });
    return () => r.cleanup();
  });
</script>

<canvas {width} {height} bind:this={canvas}></canvas>

<style>
  canvas {
    width: 100%;
    max-width: 640px;
    height: auto;
  }
</style>

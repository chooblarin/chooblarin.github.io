import * as rive from "@rive-app/canvas";
import { type CSSProperties, useEffect, useRef } from "react";

export type RiveAnimProps = {
  src: string;
  width?: number;
  height?: number;
  maxWidth?: number;
};

export default function RiveAnim({
  src,
  width = 500,
  height = 500,
  maxWidth = 640,
}: RiveAnimProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;

    if (!canvas || !root || typeof window === "undefined") {
      return;
    }

    const syncCanvasSize = (instance?: rive.Rive) => {
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
        instance?.resizeDrawingSurfaceToCanvas();
      }
    };

    let instance: rive.Rive | undefined;

    instance = new rive.Rive({
      src,
      canvas,
      autoplay: true,
      onLoad: () => {
        syncCanvasSize(instance);
      },
    });

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize(instance);
    });

    syncCanvasSize(instance);
    resizeObserver.observe(root);

    return () => {
      resizeObserver.disconnect();
      instance?.cleanup();
    };
  }, [src]);

  const rootStyle = {
    width: `min(100%, ${maxWidth}px)`,
    maxWidth: "100%",
    aspectRatio: `${width} / ${height}`,
  } satisfies CSSProperties;

  const canvasStyle = {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    height: "100%",
  } satisfies CSSProperties;

  return (
    <div ref={rootRef} style={rootStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
}

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

const styles = css`
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const debounce = (callback, time = 250, interval) => (...args) =>
  clearTimeout(interval, (interval = setTimeout(callback, time, ...args)));

const drawLine = (ctx, x, y, width, height) => {
  ctx.beginPath();
  if (Math.random() <= 0.5) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + height);
  } else {
    ctx.moveTo(x + width, y);
    ctx.lineTo(x, y + height);
  }
  ctx.stroke();
};

export default class extends React.Component {
  canvasElementRef = null;
  canvasContext = null;

  canvasRefCallback = el => {
    if (!el) {
      return;
    }
    this.canvasElementRef = el;
    el.style.display = "block";
    this.resizeCanvas(el);
    this.setupCanvas(el);
  };

  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: null,
      canvasHeight: null
    };
  }

  onWindowResize = debounce(() => {
    if (!this.canvasElementRef) {
      return;
    }
    this.resizeCanvas(this.canvasElementRef);
    this.drawTiles();
  });

  setupCanvas(canvas) {
    this.canvasContext = canvas.getContext("2d");
    this.drawTiles();
  }

  resizeCanvas(canvas) {
    const dpr = window.devicePixelRatio;
    const displayWidth = canvas.clientWidth * dpr;
    const displayHeight = canvas.clientHeight * dpr;
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
  }

  drawTiles() {
    const canvas = this.canvasElementRef;
    const context = this.canvasContext;
    if (!canvas || !context) {
      return;
    }
    this.canvasContext.strokeStyle = "#434343";
    this.canvasContext.lineCap = "round";
    this.canvasContext.lineWidth = 4;
    const step = 50;
    for (let x = 0; x < canvas.width; x += step) {
      for (let y = 0; y < canvas.height; y += step) {
        const hue = 90 + (x + y) * 0.08;
        context.strokeStyle = `hsl(${hue}, 80%, 60%)`;
        drawLine(context, x, y, step, step);
      }
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  render() {
    const { canvasWidth, canvasHeight } = this.state;
    return (
      <canvas
        css={styles}
        width={canvasWidth || 0}
        height={canvasHeight || 0}
        ref={this.canvasRefCallback}
      />
    );
  }
}

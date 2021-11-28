import { css } from "@emotion/react";
import Link from "next/link";
import * as React from "react";

export const NotFoundPage: React.FC = () => {
  return (
    <div
      css={css`
        --glitch-hgap: 10px;
        --glitch-vgap: 5px;
        --time-anim: 4s;
        --delay-anim: 2s;
        --blend-color-1: transparent;
        --blend-color-2: transparent;
        --blend-color-3: transparent;
        --blend-color-4: transparent;
        --blend-color-5: white;
        --blend-mode-1: none;
        --blend-mode-2: none;
        --blend-mode-3: none;
        --blend-mode-4: none;
        --blend-mode-5: overlay;
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 740px;
          margin: 0 auto;
          padding: 0 20px;
        }
        h1 {
          font-family: monospace;
          font-size: calc(50px + calc(1vw * 0.2));
          text-align: center;
        }
        .glitch {
          width: 240px;
          height: 240px;
          position: relative;
          z-index: 2;
        }
        .glitch__img {
          background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM2NzY3NjciIHN0cm9rZS13aWR0aD0iOCIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMjAgMjUwYzAgODIuMTcxIDQzLjgzOCAxNTguMSAxMTUgMTk5LjE4NiA3MS4xNjIgNDEuMDg1IDE1OC44MzggNDEuMDg1IDIzMCAwQzQzNi4xNjIgNDA4LjEgNDgwIDMzMi4xNyA0ODAgMjUwUzQzNi4xNjIgOTEuOSAzNjUgNTAuODE0Yy03MS4xNjItNDEuMDg1LTE1OC44MzgtNDEuMDg1LTIzMCAwQzYzLjgzOCA5MS45IDIwIDE2Ny44MyAyMCAyNTAiIGZpbGw9IiNGRkYiLz48ZyBmaWxsPSIjRkZGIj48cGF0aCBkPSJNNjkuOTE1IDMyNi4zMTdoMzYwLjE3TTc4LjUzNiAzMjYuMzE3YzMwLjE4OCA3MS42MiA5Ny4zNiAxMTcuNzUgMTcxLjQ2NCAxMTcuNzUgNzQuMTA1IDAgMTQxLjI3Ni00Ni4xMyAxNzEuNDY0LTExNy43NUg3OC41MzZ6TTExNi44NTIgMzY1LjQ4MmgyNjcuMjU0TTE0NC42MzEgMzQwLjY0NXY0OS42NzNNMTk2LjM1OCAzNDAuNjQ1djc2LjQyTTI1MCAzNDAuNjQ1djgyLjE1TTMwMy42NDIgMzQwLjY0NXY3Ni40Mk0zNTUuMzY5IDM0MC42NDV2NDkuNjczIi8+PC9nPjxnIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiPjxwYXRoIGQ9Ik0zMTcuNTMyIDIxNS4zOTNsNzAuMzkyIDcwLjExN00zODggMjE1LjM5M2wtNzAuMzkyIDcwLjExNyIvPjwvZz48ZyBzdHJva2UtbGluZWNhcD0ic3F1YXJlIj48cGF0aCBkPSJNMTEyIDIxNy4zNWw3MC4zOTIgNzAuMTE4TTE4Mi40NjggMjE3LjM1bC03MC4zOTIgNzAuMTE4Ii8+PC9nPjwvZz48L3N2Zz4K")
            no-repeat 50% 0;
          background-size: cover;
          background-color: var(--blend-color-1);
          background-blend-mode: var(--blend-mode-1);
          transform: translate3d(0, 0, 0);
          position: absolute;
          top: calc(-1 * var(--glitch-vgap));
          left: calc(-1 * var(--glitch-hgap));
          width: calc(100% + var(--glitch-hgap) * 1.4);
          height: calc(100% + var(--glitch-vgap) * 1.4);
        }
        a {
          display: inline-block;
          font-size: 2rem;
          margin: 4rem 0 8rem;
          padding: 0.7rem 2rem;
          background: #983bc9;
          border-radius: 4px;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
          transition: all 0.2s linear;
          color: white;
        }
        a:hover {
          background: #7209a9;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.6);
        }
        .glitch__img:nth-of-type(1) {
          filter: grayscale(80%);
        }
        .glitch__img:nth-of-type(n + 2) {
          opacity: 0;
          animation-duration: var(--time-anim);
          animation-delay: var(--delay-anim);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .glitch:hover .glitch__img:nth-of-type(n + 2) {
          opacity: 1;
        }
        .glitch__img:nth-of-type(2) {
          background-color: var(--blend-color-2);
          background-blend-mode: var(--blend-mode-2);
          animation-name: glitch-anim-1;
        }
        .glitch__img:nth-of-type(3) {
          background-color: var(--blend-color-3);
          background-blend-mode: var(--blend-mode-3);
          animation-name: glitch-anim-2;
        }
        .glitch__img:nth-of-type(4) {
          background-color: var(--blend-color-4);
          background-blend-mode: var(--blend-mode-4);
          animation-name: glitch-anim-3;
        }
        .glitch__img:nth-of-type(5) {
          background-color: var(--blend-color-5);
          background-blend-mode: var(--blend-mode-5);
          animation-name: glitch-anim-flash;
        }
        @keyframes glitch-anim-1 {
          0% {
            opacity: 1;
            transform: translate3d(var(--glitch-hgap), 0, 0);
            clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
          }
          2% {
            clip-path: polygon(0 55%, 100% 55%, 100% 55%, 0 55%);
          }
          4% {
            clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
          }
          6% {
            clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
          }
          8% {
            clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
          }
          10% {
            clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
          }
          12% {
            clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
          }
          14% {
            clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
          }
          16% {
            clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
          }
          18% {
            clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
          }
          20% {
            clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
          }
          21.9% {
            opacity: 1;
            transform: translate3d(var(--glitch-hgap), 0, 0);
          }
          22%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          }
        }
        @keyframes glitch-anim-2 {
          0% {
            opacity: 1;
            transform: translate3d(calc(-1 * var(--glitch-hgap)), 0, 0);
            clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
          }
          3% {
            clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
          }
          5% {
            clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
          }
          7% {
            clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
          }
          9% {
            clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
          }
          11% {
            clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
          }
          13% {
            clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
          }
          15% {
            clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
          }
          17% {
            clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
          }
          19% {
            clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
          }
          20% {
            clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
          }
          21.9% {
            opacity: 1;
            transform: translate3d(calc(-1 * var(--glitch-hgap)), 0, 0);
          }
          22%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          }
        }
        @keyframes glitch-anim-3 {
          0% {
            opacity: 1;
            transform: translate3d(0, calc(-1 * var(--glitch-vgap)), 0)
              scale3d(-1, -1, 1);
            clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
          }
          1.5% {
            clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
          }
          2% {
            clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
          }
          2.5% {
            clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
          }
          3% {
            clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
          }
          5% {
            clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
          }
          5.5% {
            clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
          }
          7% {
            clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
          }
          8% {
            clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
          }
          9% {
            clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
          }
          10.5% {
            clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
          }
          11% {
            clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
          }
          13% {
            clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
          }
          14% {
            clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
          }
          14.5% {
            clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
          }
          15% {
            clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
          }
          16% {
            clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
          }
          18% {
            clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
          }
          20% {
            clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
          }
          21.9% {
            opacity: 1;
            transform: translate3d(0, calc(-1 * var(--glitch-vgap)), 0)
              scale3d(-1, -1, 1);
          }
          22%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          }
        }
        @keyframes glitch-anim-flash {
          0% {
            opacity: 0.2;
            transform: translate3d(var(--glitch-hgap), var(--glitch-vgap), 0);
          }
          33%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
        }
      `}
    >
      <main>
        <h1>PAGE NOT FOUND</h1>
        <div className="glitch">
          <div className="glitch__img" />
          <div className="glitch__img" />
          <div className="glitch__img" />
          <div className="glitch__img" />
          <div className="glitch__img" />
        </div>
        <Link href="/">Back to Home</Link>
      </main>
    </div>
  );
};

export default NotFoundPage;

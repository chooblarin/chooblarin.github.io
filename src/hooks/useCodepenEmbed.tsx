import React from "react";

export function useCodepenEmbed() {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cpwebassets.codepen.io/assets/embed/ei.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
}

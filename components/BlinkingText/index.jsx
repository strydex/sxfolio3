"use client";

import React, { useMemo } from "react";

const BlinkingText = ({
  children,
  style,
  className = "",
  color = "var(--color-text)",
}) => {
  return (
    <div
      className={`select-none font-bold tracking-wider ${className}`}
      style={{
        color: "#fff",
        textShadow: `
          0 0 5px #fff,
          0 0 10px #fff,
          0 0 20px #fff,
          0 0 40px ${color},
          0 0 80px ${color}
        `,
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default BlinkingText;

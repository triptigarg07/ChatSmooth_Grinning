"use client";
import type React from "react";

export const ChatBackground: React.FC = () => {
  const cloudsBg: React.CSSProperties = {
    background: "linear-gradient(to bottom, #e0f2fe 0%, #f8fafc 100%)",
    position: "absolute",
    inset: 0,
    zIndex: 0,
    overflow: "hidden",
  };

  return (
    <div style={cloudsBg}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 300"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      >
        <g opacity="0.8">
          <circle cx="100" cy="70" r="28" fill="#fff" />
          <circle cx="130" cy="65" r="35" fill="#fff" />
          <circle cx="160" cy="75" r="25" fill="#fff" />
        </g>

        <g opacity="0.7">
          <circle cx="300" cy="90" r="22" fill="#fff" />
          <circle cx="330" cy="85" r="28" fill="#fff" />
          <circle cx="360" cy="95" r="20" fill="#fff" />
        </g>

        <g opacity="0.5">
          <circle cx="220" cy="40" r="12" fill="#fff" />
          <circle cx="240" cy="45" r="15" fill="#fff" />
        </g>

        <g opacity="0.6">
          <circle cx="440" cy="120" r="18" fill="#fff" />
          <circle cx="460" cy="125" r="22" fill="#fff" />
        </g>
      </svg>
    </div>
  );
};

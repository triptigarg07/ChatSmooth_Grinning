"use client";
import React from "react";

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
        <ellipse cx="120" cy="60" rx="60" ry="18" fill="#fff" opacity="0.7" />
        <ellipse cx="200" cy="80" rx="40" ry="12" fill="#fff" opacity="0.6" />
        <ellipse cx="400" cy="50" rx="70" ry="20" fill="#fff" opacity="0.7" />
        <ellipse cx="500" cy="90" rx="50" ry="15" fill="#fff" opacity="0.5" />
      </svg>
    </div>
  );
};

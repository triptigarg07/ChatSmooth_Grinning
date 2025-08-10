"use client";
import Head from "next/head";
import React from "react";

const cloudsBg: React.CSSProperties = {
  background: "linear-gradient(to bottom, #e0f2fe 0%, #f8fafc 100%)",
  position: "absolute" as React.CSSProperties["position"],
  inset: 0,
  zIndex: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

export default function Secondary() {
  return (
    <main className="min-h-[120vh] relative overflow-hidden">
      <Head>
        <title>Secondary Page – SmoothChat</title>
        <meta
          name="description"
          content="Wider content layout with a docked, persistent chatbox."
        />
        <link rel="canonical" href="/secondary" />
      </Head>
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
      <h1 className="sr-only">Secondary Page – SmoothChat</h1>
    </main>
  );
}

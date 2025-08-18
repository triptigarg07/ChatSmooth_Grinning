"use client";
import Head from "next/head";
import React from "react";
import { ChatBackground } from "@/components/ui/background";

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
      <ChatBackground />
      <h1 className="sr-only">Secondary Page – SmoothChat</h1>
    </main>
  );
}

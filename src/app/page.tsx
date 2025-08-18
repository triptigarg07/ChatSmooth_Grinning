"use client";
import Head from "next/head";
import React from "react";
import { ChatBackground } from "@/components/ui/background";

export default function Home() {
  return (
    <main className="min-h-[120vh] relative overflow-hidden">
      <Head>
        <title>Home – SmoothChat</title>
        <meta
          name="description"
          content="Home page with a prominent bottom chat input and visible chat history."
        />
        <link rel="canonical" href="/" />
      </Head>
      <ChatBackground />
      <h1 className="sr-only">Home – SmoothChat</h1>
    </main>
  );
}

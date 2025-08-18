"use client";
import Head from "next/head";
import React from "react";
import { ChatBackground } from "@/components/ui/background";
import { useChat } from "@/components/chat/ChatProvider";
import { dummyMessages } from "@/components/chat/dummymessage";

export default function Home() {
  const { messages, input, setInput, send } = useChat();
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
      <div className="space-y-3 max-w-xl mx-auto mb-20">
        {(messages.length === 0 ? dummyMessages : messages).map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm border shadow-sm ${
              m.sender === "user"
                ? "ml-auto bg-white text-gray-800"
                : "mr-auto bg-[#e0f2fe] text-gray-800"
            }`}
            style={{ whiteSpace: "pre-line" }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <ChatBackground />
      <h1 className="sr-only">Home – SmoothChat</h1>
    </main>
  );
}

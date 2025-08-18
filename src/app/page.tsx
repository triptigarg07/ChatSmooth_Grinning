"use client";

import { ChatInput } from "@/components/chat/input/input";
import { ChatBackground } from "@/components/ui/background";
import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    console.log("Sending message:", input);
    setInput("");
  };

  const dummyMessages = [
    {
      id: "1",
      sender: "system",
      text: `Here are your matches for the day!
      
As you can see, all of these were posted just over a few days ago and they fit your strengths perfectly.`,
    },
    {
      id: "2",
      sender: "user",
      text: `Hey Felix, thank you so much for getting me these matches. I have a few questions about them.`,
    },
    {
      id: "3",
      sender: "system",
      text: `Definitely! Your resume mentions Python and Matlab for GNC systems.`,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <ChatBackground />

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 relative z-10">
        {dummyMessages.map((message) => (
          <div
            key={message.id}
            className={`rounded-xl px-4 py-3 text-sm border shadow-sm break-words 
              ${
                message.sender === "user"
                  ? "ml-auto mr-5 bg-white text-gray-800 border-gray-300 max-w-[70%] sm:max-w-[50%]"
                  : "mr-auto ml-10 bg-blue-100 text-gray-800 border-blue-200 max-w-[70%] sm:max-w-[50%]"
              }`}
            style={{ whiteSpace: "pre-line" }}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-chat-border bg-chat-input/80 backdrop-blur-md z-30">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ChatInput input={input} setInput={setInput} send={send} />
        </div>
      </div>
    </main>
  );
}

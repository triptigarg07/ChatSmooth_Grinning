"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dummyMessages } from "./dummymessage";

export type ChatMessage = {
  id: string;
  sender: "system" | "user";
  text: string;
  createdAt: number;
};

type ChatContextType = {
  messages: ChatMessage[];
  input: string;
  setInput: (val: string) => void;
  send: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  // 🔹 Load from localStorage or fallback to dummyMessages
  useEffect(() => {
    try {
      const raw = localStorage.getItem("chat-state");
      if (raw) {
        const parsed = JSON.parse(raw) as {
          messages: ChatMessage[];
          input: string;
        };

        // only set messages if storage has non-empty, otherwise use dummy
        setMessages(
          parsed.messages && parsed.messages.length > 0
            ? parsed.messages
            : dummyMessages
        );
        setInput(parsed.input ?? "");
      } else {
        setMessages(dummyMessages);
      }
    } catch {
      setMessages(dummyMessages);
    }
  }, []);

  // 🔹 Save to localStorage when messages/input change
  useEffect(() => {
    localStorage.setItem("chat-state", JSON.stringify({ messages, input }));
  }, [messages, input]);

  // 🔹 Send a new user message
  const send = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Example: echo system reply (replace with API later)
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "system",
        text: "Got it! I’ll process your request 👍",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  return (
    <ChatContext.Provider value={{ messages, input, setInput, send }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChat must be used inside a ChatProvider");
  }
  return ctx;
}

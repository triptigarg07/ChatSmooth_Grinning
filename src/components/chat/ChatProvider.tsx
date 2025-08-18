"use client";
import type React from "react";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";

export type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "system";
  createdAt: number;
};

export type ChatContextType = {
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  send: () => void;
  clear: () => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

function genId() {
  return Math.random().toString(36).slice(2);
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  // optional: persist across reloads for a nicer demo
  useEffect(() => {
    try {
      const raw = localStorage.getItem("chat-state");
      if (raw) {
        const parsed = JSON.parse(raw) as {
          messages: ChatMessage[];
          input: string;
        };
        setMessages(parsed.messages ?? []);
        setInput(parsed.input ?? "");
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("chat-state", JSON.stringify({ messages, input }));
    } catch {}
  }, [messages, input]);

  const send = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = {
      id: genId(),
      text: trimmed,
      sender: "user",
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // playful echo assistant
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: genId(),
          text: `Echo: ${trimmed}`,
          sender: "system",
          createdAt: Date.now(),
        },
      ]);
    }, 400);
  }, [input]);

  const clear = useCallback(() => setMessages([]), []);

  const value = useMemo(
    () => ({ messages, input, setInput, send, clear }),
    [messages, input, send, clear]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
};

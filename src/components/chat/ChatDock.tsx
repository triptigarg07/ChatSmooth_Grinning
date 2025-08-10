"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChat } from "./ChatProvider";
import {
  X,
  Smile,
  Paperclip,
  Mic,
  SendIcon,
  MessageCircle,
} from "lucide-react";

const fadeVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
};

export const ChatDock: React.FC = () => {
  const dummyMessages = [
    {
      id: 1,
      sender: "system",
      text: "Here are your matches for the day!\n\nAs you can see, all of these were posted just over a few days ago and they fit your strengths perfectly. SpaceX has been hiring pretty frequently so do be on the look out for their new opportunities.\n\nLet me know if you'd like me to do anything else for you, or would you like to direct you to your assigned career counselor if you need any further help!",
    },
    {
      id: 2,
      sender: "user",
      text: "Hey Felix, thank you so much for getting me these matches. I have a few questions about them. From my resume, can you please tell me which of these matches really fit the skills that I have, particularly when it comes to developing software for GNC controllers? I'd also really appreciate it if you could break down those descriptions for me and summarize them!",
    },
    {
      id: 3,
      sender: "system",
      text: "Definitely!\n\nYour resume mentions you using Python and Matlab to design control systems for GNC and suitable controls for launch vehicles. You have also mentioned doing projects where you used Monte-Carlo simulation methods to generate random wind data and conducting course correction.\n\nFrom these particular skills, jobs posted by SpaceX fit the most. They have also been hiring quite actively for multiple ongoing projects.\n\nThere are also roles from Protingent that fit your skills very well. Let me break these down for you:",
    },
  ];

  const { input, setInput, send } = useChat();
  const messages = dummyMessages;

  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const targetIsHome = pathname === "/";
  const isSecondary = pathname === "/secondary";

  const [minimized, setMinimized] = useState(false);

  const [isHomeVisual, setIsHomeVisual] = useState<boolean>(targetIsHome);
  const [contentVisible, setContentVisible] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isSecondary) {
      setMinimized(false);
    }
  }, [isSecondary]);

  useEffect(() => {
    if (targetIsHome) {
      setMinimized(false);

      if (!isHomeVisual) {
        setIsTransitioning(true);
        if (!prefersReducedMotion) {
          setContentVisible(false);
          const fadeOutTimer = setTimeout(() => {
            setIsHomeVisual(true);
          }, 50);
          return () => clearTimeout(fadeOutTimer);
        } else {
          setIsHomeVisual(true);
          setContentVisible(true);
          setIsTransitioning(false);
        }
      } else {
        if (!contentVisible) setContentVisible(true);
        setIsTransitioning(false);
      }
      return;
    }

    if (targetIsHome === isHomeVisual) {
      if (!contentVisible) setContentVisible(true);
      setIsTransitioning(false);
      return;
    }

    if (prefersReducedMotion) {
      setIsHomeVisual(targetIsHome);
      setContentVisible(true);
      setIsTransitioning(false);
      return;
    }

    setIsTransitioning(true);
    setContentVisible(false);

    const fadeOutTimer = setTimeout(() => {
      setIsHomeVisual(targetIsHome);
    }, 50);

    return () => clearTimeout(fadeOutTimer);
  }, [targetIsHome, isHomeVisual, prefersReducedMotion, contentVisible]);

  const layoutDoneRef = useRef(false);

  useEffect(() => {
    layoutDoneRef.current = false;
  }, [isHomeVisual]);

  const onLayoutComplete = () => {
    if (layoutDoneRef.current) return;
    layoutDoneRef.current = true;

    setTimeout(() => {
      setContentVisible(true);
      setIsTransitioning(false);
    }, 50);
  };

  const containerClasses = useMemo(() => {
    if (minimized && isSecondary) {
      return "fixed right-4 bottom-4 z-50";
    }
    return isHomeVisual
      ? "fixed left-1/2 -translate-x-1/2 bottom-4 w-[min(92vw,64rem)] h-[80vh] z-50"
      : "fixed right-4 bottom-4 w-[22rem] h-[68vh] md:right-6 md:bottom-6 z-50";
  }, [isHomeVisual, minimized, isSecondary]);

  const cloudsBg: React.CSSProperties = {
    background: "linear-gradient(to bottom, #e0f2fe 0%, #f8fafc 100%)",
    position: "absolute" as React.CSSProperties["position"],
    inset: 0,
    zIndex: 0,
    borderRadius: isHomeVisual ? 24 : 18,
    overflow: "hidden",
  };

  if (minimized && isSecondary) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        className={containerClasses}
        style={{
          background: "rgba(255,255,255,0.85)",
          borderRadius: 9999,
          boxShadow: "0 2px 16px 0 #0001",
          padding: 12,
          border: "1px solid #e5e7eb",
        }}
        aria-label="Expand chat dock"
        onClick={() => setMinimized(false)}
      >
        <MessageCircle size={32} color="#64748b" />
      </motion.button>
    );
  }

  return (
    <motion.div
      layout
      onLayoutAnimationComplete={onLayoutComplete}
      className={containerClasses}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      aria-label="Chat dock container"
      style={{ background: "transparent" }}
      key={`chat-dock-${isHomeVisual ? "home" : "secondary"}`}
    >
      <div style={cloudsBg}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 300"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        >
          <ellipse cx="120" cy="60" rx="60" ry="18" fill="#fff" />
          <ellipse cx="200" cy="80" rx="40" ry="12" fill="#fff" />
          <ellipse cx="400" cy="50" rx="70" ry="20" fill="#fff" />
          <ellipse cx="500" cy="90" rx="50" ry="15" fill="#fff" />
        </svg>
      </div>
      <Card
        className="h-full bg-transparent border-none shadow-xl relative"
        style={{ zIndex: 2 }}
      >
        <AnimatePresence mode="wait">
          {(contentVisible || !isTransitioning) && (
            <motion.div
              key={`content-${isHomeVisual ? "home" : "secondary"}`}
              initial={isTransitioning ? "hidden" : "visible"}
              animate="visible"
              exit="exit"
              variants={fadeVariants}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="flex flex-col h-full"
            >
              {!isHomeVisual && (
                <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                  <div className="font-medium text-sm text-gray-800">Chat</div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-600">
                      {messages.length} messages
                    </div>
                    <button
                      aria-label={isSecondary ? "Minimize chat" : "Close chat"}
                      className="text-gray-800 hover:opacity-80"
                      style={{ marginLeft: 2 }}
                      onClick={
                        isSecondary ? () => setMinimized(true) : undefined
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              <div
                className="flex-1 overflow-y-auto p-4 space-y-3"
                style={{ zIndex: 2 }}
              >
                <div className="space-y-3">
                  {(messages.length === 0 ? dummyMessages : messages).map(
                    (m) => (
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
                    )
                  )}
                </div>
              </div>

              <div className="p-3 bg-[#e0f2fe] rounded-b-xl">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex flex-col gap-3"
                >
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Please type your message"
                    aria-label="Chat message input"
                    className="min-h-[120px] resize-none bg-white text-gray-800 placeholder:text-gray-500"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <button
                        type="button"
                        aria-label="Add attachment"
                        className="hover:opacity-80 text-gray-600"
                      >
                        <Paperclip size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Add emoji"
                        className="hover:opacity-80 text-gray-600"
                      >
                        <Smile size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Record voice"
                        className="hover:opacity-80 text-gray-600"
                      >
                        <Mic size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-1 max-w-[60%]">
                      <Select>
                        <SelectTrigger className="h-8 text-xs bg-white text-gray-800 [&>span]:text-gray-800 [&>svg]:text-gray-800">
                          <SelectValue placeholder="Option 1" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-800">
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="b">B</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="h-8 text-xs bg-white text-gray-800 [&>span]:text-gray-800 [&>svg]:text-gray-800">
                          <SelectValue placeholder="Option 2" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-800">
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="b">B</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="h-8 text-xs bg-white text-gray-800 [&>span]:text-gray-800 [&>svg]:text-gray-800">
                          <SelectValue placeholder="Option 3" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-800">
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="b">B</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="h-8 text-xs bg-white text-gray-800 [&>span]:text-gray-800 [&>svg]:text-gray-800">
                          <SelectValue placeholder="Option 4" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-800">
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="b">B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      className="shrink-0 bg-[#ffcc80] text-gray-800 hover:bg-[#ffbb66]"
                    >
                      <SendIcon size={16} className="mr-1" /> Send
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default ChatDock;

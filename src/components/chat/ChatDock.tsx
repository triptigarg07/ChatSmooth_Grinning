"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChatInput } from "./input/input";
import { useChat } from "./ChatProvider";
import { dummyMessages } from "./dummymessage";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatToggleButton } from "./ChatToggleButton";

const fadeVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
};

export const ChatDock: React.FC = () => {
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
      : "fixed right-4 bottom-4 w-[45rem] h-[68vh] md:right-6 md:bottom-6 z-50";
  }, [isHomeVisual, minimized, isSecondary]);

  if (isHomeVisual) {
    return null;
  }

  if (minimized && isSecondary) {
    return (
      <ChatToggleButton
        className={containerClasses}
        onExpand={() => setMinimized(false)}
      />
    );
  }

  return (
    <motion.div
      layout
      onLayoutAnimationComplete={onLayoutComplete}
      className={`${containerClasses} chatdock-bg-transparent`}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      aria-label="Chat dock container"
      key={`chat-dock-${isHomeVisual ? "home" : "secondary"}`}
    >
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
                <ChatHeader
                  isSecondary={isSecondary}
                  count={messages.length}
                  onMinimize={() => setMinimized(true)}
                />
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
                            : "mr-auto bg-blue-100 text-gray-800"
                        }`}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {m.text}
                      </div>
                    )
                  )}
                </div>
              </div>
              <ChatInput input={input} setInput={setInput} send={send} />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default ChatDock;

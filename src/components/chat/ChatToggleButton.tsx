// ChatToggleButton.tsx
"use client";

import type React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ChatToggleButtonProps {
  onExpand: () => void;
  className: string;
}

export const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  onExpand,
  className,
}) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
      className={`${className} chatdock-bg`}
      aria-label="Expand chat dock"
      onClick={onExpand}
    >
      <MessageCircle size={32} color="#64748b" />
    </motion.button>
  );
};

"use client";
import {
  Home,
  MessageCircle,
  HelpCircle,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { ReactElement } from "react";

const Tooltip = ({
  children,
  position,
}: {
  children: string;
  position: DOMRect;
}) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      style={{
        top: position.top + position.height / 2,
        left: position.right + 8,
        transform: "translateY(-50%)",
        position: "fixed",
        zIndex: 99999,
      }}
      className="px-3 py-1 rounded-md bg-black text-white text-sm whitespace-nowrap pointer-events-none"
    >
      {children}
    </motion.div>,
    document.body
  );
};

const SidebarRail = () => {
  const pathname = usePathname();
  const isActive = (p: string) => pathname === p;

  const item = (to: string, icon: ReactElement, label: string) => {
    const [hovered, setHovered] = useState(false);
    const [rect, setRect] = useState<DOMRect | null>(null);

    return (
      <div
        key={label}
        className="relative flex items-center justify-center"
        onMouseEnter={(e) => {
          setRect(e.currentTarget.getBoundingClientRect());
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          href={to}
          aria-label={label}
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-card transition-colors hover:bg-accent/60 ${
            isActive(to) ? "text-black" : "text-gray-500"
          }`}
        >
          {icon}
        </Link>

        {hovered && rect && <Tooltip position={rect}>{label}</Tooltip>}
      </div>
    );
  };

  return (
    <aside className="fixed left-0 inset-y-0 z-40 flex flex-col items-center justify-between pt-4 pb-4 bg-white shadow-md overflow-visible">
      <div className="flex flex-col items-center gap-3">
        {item("/", <Home size={20} />, "Home")}
        {item("/secondary", <Search size={20} />, "Secondary")}
      </div>
      <div className="flex flex-col items-center gap-3 mb-2">
        {item("#", <Settings size={20} />, "Settings")}
        {item("#", <HelpCircle size={20} />, "Help")}
        {item("#", <MessageCircle size={20} />, "Messages")}
        <div className="w-8 border-t border-muted my-2" />
        {item("#", <LogOut size={20} />, "Exit")}
      </div>
    </aside>
  );
};

export default SidebarRail;

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

const SidebarRail = () => {
  const pathname = usePathname();
  const isActive = (p: string) => pathname === p;

  const item = (to: string, icon: JSX.Element, label: string) => (
    <Link
      key={label}
      href={to}
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-lg border bg-card/70 backdrop-blur transition-colors hover:bg-accent/60 ${
        isActive(to) ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {icon}
    </Link>
  );

  return (
    <aside className="fixed left-3 top-0 bottom-0 z-40 flex flex-col items-center justify-between pt-4 pb-4 bg-white/90 border-r border-gray-200 shadow-lg" style={{backdropFilter: 'blur(8px)'}}>
      {/* Top icons */}
      <div className="flex flex-col items-center gap-3">
        {item("/", <Home size={20} color="#2563eb" />, "Home")}
        {item("/secondary", <Search size={20} color="#2563eb" />, "Secondary")}
      </div>
      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-3 mb-2">
          {item("#", <Settings size={20} color="#64748b" />, "Settings")}
          {item("#", <HelpCircle size={20} color="#64748b" />, "Help")}
          {item("#", <MessageCircle size={20} color="#64748b" />, "Messages")}
        <div className="w-8 border-t border-muted my-2" />
          {item("#", <LogOut size={20} color="#ef4444" />, "Exit")}
      </div>
    </aside>
  );
};

export default SidebarRail;

"use client";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "@/components/chat/ChatProvider";
import SidebarRail from "@/components/layout/SidebarRail";
import ChatDock from "@/components/chat/ChatDock";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ChatProvider>
              <SidebarRail />
              {children}
              <ChatDock />
            </ChatProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

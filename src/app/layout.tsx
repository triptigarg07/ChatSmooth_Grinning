"use client";
import "./globals.css";

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
          <ChatProvider>
            <SidebarRail />
            {children}
            <ChatDock />
          </ChatProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

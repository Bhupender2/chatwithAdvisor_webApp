"use client";

import { AppHeader } from "@/components/dashboard/app-header";
import ChatArea from "@/components/dashboard/chat-area";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { disconnectSocket, getSocket } from "@/services/socket-service";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

export default function Dashboard() {
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    if (!token) return;

    const socket = getSocket(token);

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.log("Socket error:", error.message);
    });

    return () => {
      disconnectSocket();
    };
  }, [token]);
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full">
        <AppHeader />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-auto">
            <ChatArea />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

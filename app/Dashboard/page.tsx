import { AppHeader } from "@/components/dashboard/app-header";
import ChatArea from "@/components/dashboard/chat-area";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
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

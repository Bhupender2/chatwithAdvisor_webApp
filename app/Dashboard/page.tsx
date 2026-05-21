import DashboardSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1">Chat Area</div>
      </div>
    </SidebarProvider>
  );
}

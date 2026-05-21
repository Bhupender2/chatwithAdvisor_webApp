import { AppHeader } from "@/components/app-header";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppHeader />
      {/* <DashboardSidebar /> */}
    </SidebarProvider>
  );
}

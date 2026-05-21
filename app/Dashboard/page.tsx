import { AppHeader } from "@/components/dashboard/app-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppHeader />
      {/* <DashboardSidebar /> */}
    </SidebarProvider>
  );
}

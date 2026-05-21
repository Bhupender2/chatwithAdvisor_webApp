import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Database, BookOpen, Users, BarChart3 } from "lucide-react";

const chatGroups = [
  { id: 1, name: "PG", icon: Database },
  { id: 2, name: "PG OD", icon: BookOpen },
  { id: 3, name: "UG", icon: Users },
  { id: 4, name: "UG 0D", icon: BarChart3 },
];

export default function DashboardSidebar() {
  return (
    <Sidebar className="relative h-full" variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-lg">Chat Groups</SidebarGroupLabel> */}
          <SidebarMenu>
            {chatGroups.map((group) => {
              const IconComponent = group.icon;
              return (
                <SidebarMenuItem key={group.id} className="py-2">
                  <SidebarMenuButton>
                    <IconComponent className="w-4 h-4" />
                    <span>{group.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// by default sidebar is position fixed so wo window screen k hisab se align hota h naaki tumhare shadcn's <Sidebar> defaults to position: fixed — meaning it anchors itself to the viewport (the browser window), completely ignoring its parent elements in the DOM tree. That's why it was overlapping the header instead of sitting below it.

"use client";

import { useFetchGroups } from "@/hooks/queries/use-default-groups";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Database, BookOpen, Users, BarChart3 } from "lucide-react";

export default function DashboardSidebar() {
  const { data: defaultGroups = [], isLoading } = useFetchGroups();

  const iconMap: Record<string, React.ElementType> = {
    "NEET PG": Database,
    "NEET PG OD": BookOpen,
    "NEET UG": Users,
    "NEET UG OD": BarChart3, // Add more if needed
  };

  console.log("default groups", defaultGroups);
  return (
    <Sidebar className="relative h-full" variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-lg">Chat Groups</SidebarGroupLabel> */}
          <SidebarMenu>
            {defaultGroups.map((group: any) => {
              const IconComponent = iconMap[group.name] || BarChart3;
              return (
                <SidebarMenuItem key={group.conversationId} className="py-2">
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

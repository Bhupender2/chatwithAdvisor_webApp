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
import { Skeleton } from "../ui/skeleton";
import { useChatStore } from "@/store/chat-store";

export default function DashboardSidebar() {
  const { data: defaultGroups = [], isLoading } = useFetchGroups();
  const setConversationId = useChatStore((state) => state.setConversationId);

  const converationId = useChatStore((state) => state.conversationId);

  const iconMap: Record<string, React.ElementType> = {
    "NEET PG": Database,
    "NEET PG OD": BookOpen,
    "NEET UG": Users,
    "NEET UG OD": BarChart3, // Add more if needed
  }; // Yani iconMap ek object hai jisme keys string hain aur values React components hain. Record ek object type h

  console.log("default groups", defaultGroups);
  return (
    <Sidebar
      className="relative h-full pt-0.5"
      variant="floating"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-lg">Chat Groups</SidebarGroupLabel> */}
          {isLoading ? (
            <>
              <div className="flex flex-col w-full space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-10  bg-gray-200 rounded-4xl" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-10  bg-gray-200 rounded-4xl" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-10  bg-gray-200 rounded-4xl" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-10  bg-gray-200 rounded-4xl" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <SidebarMenu>
              {defaultGroups.map((group: any) => {
                const IconComponent = iconMap[group.name] || BarChart3;
                return (
                  <SidebarMenuItem
                    key={group.conversationId}
                    className={`py-2 ${converationId === group.conversationId ? "bg-[#d6f3cf] hover:bg-[#d6f3cf]" : ""}`}
                    onClick={() => {
                      setConversationId(group.conversationId);
                    }}
                  >
                    <SidebarMenuButton>
                      <IconComponent className="w-4 h-4" />
                      <span>{group.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// by default sidebar is position fixed so wo window screen k hisab se align hota h naaki tumhare shadcn's <Sidebar> defaults to position: fixed — meaning it anchors itself to the viewport (the browser window), completely ignoring its parent elements in the DOM tree. That's why it was overlapping the header instead of sitting below it.

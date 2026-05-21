import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";

export default function DashboardSidebar() {
  return (
    <Sidebar className="relative h-full">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

// by default sidebar is position fixed so wo window screen k hisab se align hota h naaki tumhare shadcn's <Sidebar> defaults to position: fixed — meaning it anchors itself to the viewport (the browser window), completely ignoring its parent elements in the DOM tree. That's why it was overlapping the header instead of sitting below it.

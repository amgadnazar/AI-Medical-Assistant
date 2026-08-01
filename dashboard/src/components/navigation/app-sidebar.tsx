import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import SidebarLogo from "./SidebarLogo";
import NavMain from "./NavMain";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
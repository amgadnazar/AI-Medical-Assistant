import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import SidebarLogo from "./SidebarLogo";
import NavMain from "./NavMain";

export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-800 bg-slate-950 text-white"
    >
      <SidebarHeader className="border-b border-slate-800 p-5">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="py-4">
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
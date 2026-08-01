import { NavLink } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { navigation } from "./navigation";

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2 px-2">

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.url}>
                <NavLink to={item.url}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      className={
                        isActive
                          ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm rounded-xl"
                          : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors"
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            );
          })}

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
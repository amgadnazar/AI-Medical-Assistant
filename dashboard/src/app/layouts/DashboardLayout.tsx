import { Outlet } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import AppSidebar from "@/components/navigation/app-sidebar";
import AppHeader from "@/components/navigation/AppHeader";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
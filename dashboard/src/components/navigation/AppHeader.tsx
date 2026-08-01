import { Bell, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import AppBreadcrumb from "./AppBreadcrumb";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">

      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <div className="hidden md:block h-6 w-px bg-slate-200" />

        <AppBreadcrumb />
      </div>

      <div className="flex items-center gap-4">

        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            placeholder="Search..."
            className="w-72 rounded-xl border-slate-200 pl-10 focus-visible:ring-emerald-500"
          />
        </div>

        <button
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            transition
            hover:bg-emerald-50
          "
        >
          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
            A
          </div>

          <div className="hidden md:block leading-tight">
            <p className="text-sm font-semibold text-slate-800">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              AI Medical Assistant
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}
import { HeartPulse } from "lucide-react";

export default function SidebarLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/5">
        <HeartPulse
          className="h-6 w-6 text-emerald-500"
          strokeWidth={2.3}
        />
      </div>

      <div className="min-w-0">
        <h1 className="truncate text-[15px] font-semibold tracking-tight text-white">
          AI Medical Assistant
        </h1>

        <p className="mt-0.5 text-[11px] font-medium text-slate-400">
          Hospital Admin Dashboard
        </p>
      </div>
    </div>
  );
}
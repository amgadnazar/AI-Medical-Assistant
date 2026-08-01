import { CalendarDays, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AppointmentToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        className="rounded-xl border-slate-200"
      >
        <Filter className="mr-2 h-4 w-4" />
        Status
      </Button>

      <Button
        variant="outline"
        className="rounded-xl border-slate-200"
      >
        Doctor
      </Button>

      <Button
        variant="outline"
        className="rounded-xl border-slate-200"
      >
        <CalendarDays className="mr-2 h-4 w-4" />
        Date
      </Button>
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  ClipboardCheck,
} from "lucide-react";

import StatCard from "@/components/charts/StatCard";

import { getAppointments } from "../api/appointments.api";

export default function AppointmentStats() {
  const { data = [] } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const total = data.length;

  const pending = data.filter(
    (a: any) => a.status === "pending"
  ).length;

  const confirmed = data.filter(
    (a: any) => a.status === "confirmed"
  ).length;

  const completed = data.filter(
    (a: any) => a.status === "completed"
  ).length;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Appointments"
        value={total}
        icon={<CalendarDays size={22} />}
        color="emerald"
      />

      <StatCard
        title="Pending"
        value={pending}
        icon={<Clock3 size={22} />}
        color="amber"
      />

      <StatCard
        title="Confirmed"
        value={confirmed}
        icon={<CheckCircle2 size={22} />}
        color="blue"
      />

      <StatCard
        title="Completed"
        value={completed}
        icon={<ClipboardCheck size={22} />}
        color="green"
      />
    </div>
  );
}
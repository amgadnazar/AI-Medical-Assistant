import {
  CalendarDays,
  MessageSquare,
  Stethoscope,
  Users,
} from "lucide-react";

import KPICard from "./KPICard";
import { useDashboard } from "../hooks/useDashboard";
import LoadingCard from "@/components/common/LoadingCard";


export default function OverviewCards() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <KPICard
    title="Patients"
    value={data.patients}
    description="Registered patients"
    icon={Users}
    growth="+12.4%"
/>

<KPICard
    title="Doctors"
    value={data.doctors}
    description="Active doctors"
    icon={Stethoscope}
    growth="+2"
/>

<KPICard
    title="Appointments"
    value={data.todayAppointments}
    description="Today's appointments"
    icon={CalendarDays}
    growth="+8.7%"
/>

<KPICard
    title="Conversations"
    value={data.messages}
    description="WhatsApp messages"
    icon={MessageSquare}
    growth="+23%"
/>
    </div>
  );
}
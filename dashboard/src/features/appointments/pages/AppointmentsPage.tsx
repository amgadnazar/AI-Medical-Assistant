import { useState } from "react";
import { CalendarPlus } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import SectionCard from "@/components/common/SectionCard";
import SearchInput from "@/components/common/SearchInput";

import { Button } from "@/components/ui/button";

import AppointmentStats from "../components/AppointmentStats";
import AppointmentToolbar from "../components/AppointmentToolbar";
import AppointmentsTable from "../components/AppointmentsTable";

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Manage appointments, confirmations and schedules."
      />

      <AppointmentStats />

      <SectionCard>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            placeholder="Search appointments..."
            value={search}
            onChange={setSearch}
          />

          <div className="flex items-center gap-3">
            <AppointmentToolbar />

            <Button className="gap-2 rounded-xl">
              <CalendarPlus size={18} />
              New Appointment
            </Button>
          </div>
        </div>
      </SectionCard>

      <AppointmentsTable search={search} />
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  User,
} from "lucide-react";

import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import {
  getTodayAppointments,
  type TodayAppointment,
} from "../services/dashboard.api";

export default function TodayAppointments() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todayAppointments"],
    queryFn: getTodayAppointments,
  });

  if (isLoading) {
    return (
      <SectionCard title="Today's Appointments">
        <div className="py-8 text-center">
          Loading...
        </div>
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Today's Appointments">
        <div className="py-8 text-center text-red-500">
          Failed to load appointments.
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Today's Appointments">
      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed py-10 text-center text-muted-foreground">
          No appointments scheduled for today.
        </div>
      ) : (
        <div className="space-y-4">
          {data.map(
            (appointment: TodayAppointment) => (
              <div
                key={appointment.id}
                className="rounded-xl border bg-card p-5 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User size={16} />

                      <span className="font-semibold">
                        {appointment.patient_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={15} />

                      <span>
                        {appointment.doctor_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={15} />

                      <span>
                        {appointment.appointment_time}
                      </span>
                    </div>
                  </div>

                  <StatusBadge
                    status={appointment.status}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </SectionCard>
  );
}
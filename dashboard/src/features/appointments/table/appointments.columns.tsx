import type { ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  Clock,
  Stethoscope,
} from "lucide-react";

import AppointmentRowActions from "../components/AppointmentRowActions";
import AppointmentStatusBadge from "../components/AppointmentStatusBadge";

interface Props {
  onView: (appointment: any) => void;
  onConfirm: (appointment: any) => void;
  onComplete: (appointment: any) => void;
  onCancel: (appointment: any) => void;
}

export function createAppointmentColumns({
  onView,
  onConfirm,
  onComplete,
  onCancel,
}: Props): ColumnDef<any>[] {
  return [
    {
      accessorKey: "patient_name",
      header: "Patient",

      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="font-semibold text-slate-900 dark:text-white">
            {row.original.patient_name}
          </div>

          <div className="text-xs text-slate-500">
            {row.original.patient_phone}
          </div>
        </div>
      ),
    },

    {
      id: "doctor",
      header: "Doctor",

      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Stethoscope size={17} />
          </div>

          <span className="font-medium">
            {row.original.doctors?.full_name ?? "-"}
          </span>
        </div>
      ),
    },

    {
      accessorKey: "appointment_date",
      header: "Date",

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar
            size={15}
            className="text-slate-500"
          />

          <span>
            {new Date(
              row.original.appointment_date
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      ),
    },

    {
      accessorKey: "appointment_time",
      header: "Time",

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Clock
            size={15}
            className="text-slate-500"
          />

          <span className="font-medium">
            {row.original.appointment_time.slice(0, 5)}
          </span>
        </div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => (
        <AppointmentStatusBadge
          status={row.original.status}
        />
      ),
    },

    {
      id: "actions",
      header: "",
      enableSorting: false,

      cell: ({ row }) => (
        <AppointmentRowActions
          onView={() => onView(row.original)}
          onConfirm={() => onConfirm(row.original)}
          onComplete={() => onComplete(row.original)}
          onCancel={() => onCancel(row.original)}
        />
      ),
    },
  ];
}
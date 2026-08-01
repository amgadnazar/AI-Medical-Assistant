import type { ColumnDef } from "@tanstack/react-table";

import UserAvatar from "@/components/common/UserAvatar";
import StatusBadge from "@/components/common/StatusBadge";
import RowActions from "@/components/common/RowActions";
import BloodTypeBadge from "@/components/common/BloodTypeBadge";

export function createPatientColumns(
  onView: (patient: any) => void
): ColumnDef<any>[] {
  return [
    {
      accessorKey: "name",
      header: "Patient",

      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          
            <UserAvatar />

          <div>
            <div className="font-medium">
              {row.original.name || "-"}
            </div>

            <div className="text-xs text-muted-foreground">
              {row.original.phone_number}
            </div>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "gender",
      header: "Gender",

      cell: ({ row }) =>
        row.original.gender || "-",
    },

    {
      accessorKey: "age",
      header: "Age",

      cell: ({ row }) =>
        row.original.age ?? "-",
    },

    {
  accessorKey: "blood_type",
  header: "Blood",

  cell: ({ row }) => (
    <BloodTypeBadge
      bloodType={row.original.blood_type}
    />
  ),
},

    {
      id: "status",
      header: "Status",

      cell: () => (
        <StatusBadge status="active" />
      ),
    },

    {
      id: "actions",
      header: "",

      enableSorting: false,

      cell: ({ row }) => (
        <RowActions
          onView={() => onView(row.original)}

          onEdit={() =>
            console.log("Edit", row.original)
          }

          onAppointments={() =>
            console.log("Appointments", row.original)
          }

          onConversations={() =>
            console.log("Conversations", row.original)
          }

          onDelete={() =>
            console.log("Delete", row.original)
          }
        />
      ),
    },
  ];
}
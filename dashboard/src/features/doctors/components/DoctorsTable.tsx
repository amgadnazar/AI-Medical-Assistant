import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";

import SectionCard from "@/components/common/SectionCard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

import { getDoctors } from "../api/doctors.api";

interface Doctor {
  id: number;
  full_name: string;
  title: string;
  department_id: number;
  start_time: string;
  end_time: string;
}

export default function DoctorsTable() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const columns = useMemo<ColumnDef<Doctor>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: "Doctor",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "department_id",
        header: "Department",
      },
      {
        accessorKey: "start_time",
        header: "Start",
      },
      {
        accessorKey: "end_time",
        header: "End",
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <SectionCard title="Doctors">
        <LoadingState title="Loading doctors..." />
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Doctors">
        <ErrorState title="Failed to load doctors." />
      </SectionCard>
    );
  }

  if (data.length === 0) {
    return (
      <SectionCard title="Doctors">
        <EmptyState
          title="No doctors found"
          description="There are no doctors in the system yet."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Doctors">
      <DataTable
        columns={columns}
        data={data}
      />
    </SectionCard>
  );
}
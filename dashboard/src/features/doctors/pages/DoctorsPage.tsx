import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";

import SectionCard from "@/components/common/SectionCard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";
import SearchInput from "@/components/common/SearchInput";

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
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const filteredDoctors = useMemo(() => {
    if (!search.trim()) return data;

    const keyword = search.toLowerCase();

    return data.filter((doctor) => {
      return (
        doctor.full_name.toLowerCase().includes(keyword) ||
        doctor.title.toLowerCase().includes(keyword) ||
        doctor.department_id.toString().includes(keyword)
      );
    });
  }, [data, search]);

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
        header: "Start Time",
      },
      {
        accessorKey: "end_time",
        header: "End Time",
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <SectionCard>
        <LoadingState
          title="Loading doctors..."
        />
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard>
        <ErrorState
          title="Failed to load doctors"
          description="Please try again later."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard>

      <div className="mb-6">
        <SearchInput
          value={search}
            onChange={setSearch}
          placeholder="Search doctors..."
        />
      </div>

      {filteredDoctors.length === 0 ? (
        <EmptyState
          title="No doctors found"
          description="Try another search keyword."
        />
      ) : (
        <DataTable
          columns={columns}
          data={filteredDoctors}
        />
      )}

    </SectionCard>
  );
}
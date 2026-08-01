import { useMemo } from "react";

import { DataTable } from "@/components/data-table/DataTable";
import { createPatientColumns } from "../table/patients.columns";

import SectionCard from "@/components/common/SectionCard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

interface Props {
  patients: any[];
  isLoading: boolean;
  error: Error | null;
  search: string;
  onView: (patient: any) => void;
}

export default function PatientsTable({
  patients,
  isLoading,
  error,
  search,
  onView,
}: Props) {
  const filteredPatients = useMemo(() => {
    if (!search.trim()) {
      return patients;
    }

    const keyword = search.toLowerCase();

    return patients.filter((patient: any) => {
      return (
        patient.name?.toLowerCase().includes(keyword) ||
        patient.phone_number?.includes(keyword)
      );
    });
  }, [patients, search]);

  const columns = useMemo(
    () => createPatientColumns(onView),
    [onView]
  );

  if (isLoading) {
  return (
    <SectionCard title="Patients">
      <LoadingState title="Loading patients..." />
    </SectionCard>
  );
}

if (error) {
  return (
    <SectionCard title="Patients">
      <ErrorState
        title="Failed to load patients"
        description="Please try again later."
      />
    </SectionCard>
  );
}

if (filteredPatients.length === 0) {
  return (
    <SectionCard title="Patients">
      <EmptyState
        title="No Patients Found"
        description="There are no patients matching your search."
      />
    </SectionCard>
  );
}

  if (filteredPatients.length === 0) {
    return (
      <SectionCard title="Patients">
        <EmptyState message="No patients found." />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Patients">
      <DataTable
        columns={columns}
        data={filteredPatients}
      />
    </SectionCard>
  );
}
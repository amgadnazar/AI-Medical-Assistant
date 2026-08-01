import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import PatientsToolbar from "../components/PatientsToolbar";
import PatientsTable from "../components/PatientsTable";
import PatientDrawer from "../drawer/PatientDrawer";
import AddPatientDialog from "../components/AddPatientDialog";

import { usePatients } from "../hooks/usePatients";

export default function PatientsPage() {
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState<any>(null);

  const {
    data = [],
    isLoading,
    error,
  } = usePatients();

  return (
    <>
      <PageContainer className="space-y-6">
        <PageHeader
          title="Patients"
          description="Manage patient profiles, medical history and appointments."
        />

        <div className="flex items-center justify-between">
          <PatientsToolbar
            search={search}
            onSearchChange={setSearch}
            onAdd={() => setAddOpen(true)}
          />

          <Button
            className="bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => setAddOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        <PatientsTable
          patients={data}
          isLoading={isLoading}
          error={error}
          search={search}
          onView={(patient) => {
            setSelectedPatient(patient);
            setDrawerOpen(true);
          }}
        />
      </PageContainer>

      <PatientDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        patient={selectedPatient}
      />

      <AddPatientDialog
        open={addOpen}
        onOpenChange={setAddOpen}
      />
    </>
  );
}
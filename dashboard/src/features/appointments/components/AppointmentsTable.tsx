import { useMemo } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAppointments,
  confirmAppointment,
  completeAppointment,
  cancelAppointment,
} from "../api/appointments.api";

import { createAppointmentColumns } from "../table/appointments.columns";

import { DataTable } from "@/components/data-table/DataTable";

import SectionCard from "@/components/common/SectionCard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

interface Props {
  search?: string;
}

export default function AppointmentsTable({
  search = "",
}: Props) {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const confirmMutation = useMutation({
    mutationFn: confirmAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });

  const filteredAppointments = useMemo(() => {
    if (!search.trim()) {
      return data;
    }

    const keyword = search.toLowerCase();

    return data.filter((appointment: any) => {
      return (
        appointment.patient_name
          ?.toLowerCase()
          .includes(keyword) ||
        appointment.patient_phone?.includes(keyword) ||
        appointment.doctors?.full_name
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [data, search]);

  const columns = useMemo(
    () =>
      createAppointmentColumns({
        onView: (appointment) => {
          console.log("View", appointment);
        },

        onConfirm: (appointment) => {
          confirmMutation.mutate(appointment.id);
        },

        onComplete: (appointment) => {
          completeMutation.mutate(appointment.id);
        },

        onCancel: (appointment) => {
          cancelMutation.mutate(appointment.id);
        },
      }),
    [confirmMutation, completeMutation, cancelMutation]
  );

  if (isLoading) {
    return (
      <SectionCard title="Appointments">
        <LoadingState title="Loading appointments..." />
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Appointments">
        <ErrorState
          title="Failed to load appointments"
          description="Please try again."
        />
      </SectionCard>
    );
  }

  if (filteredAppointments.length === 0) {
    return (
      <SectionCard title="Appointments">
        <EmptyState
          title="No appointments found"
          description="There are no appointments matching your search."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Appointments">
      <DataTable
        columns={columns}
        data={filteredAppointments}
      />
    </SectionCard>
  );
}
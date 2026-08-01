import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPatientDetails } from "../api/patientDetails.api";

import ProfileCard from "../components/ProfileCard";
import AppointmentsCard from "../components/AppointmentsCard";
import ConversationCard from "../components/ConversationCard";

export default function PatientDetailsPage() {
  const { phone } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["patient-details", phone],
    queryFn: () => getPatientDetails(phone!),
    enabled: !!phone,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <ProfileCard profile={data.profile} />

      <AppointmentsCard
        appointments={data.appointments}
      />

      <ConversationCard
        conversations={data.conversations}
      />
    </div>
  );
}
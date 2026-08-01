import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "@/app/layouts/DashboardLayout";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import DoctorsPage from "@/features/doctors/pages/DoctorsPage";
import PatientsPage from "@/features/patients/pages/PatientsPage";
import AppointmentsPage from "@/features/appointments/pages/AppointmentsPage";
import ConversationsPage from "@/features/conversations/pages/ConversationsPage";
import AnalyticsPage from "@/features/analytics/pages/AnalyticsPage";
import MedicalKnowledgePage from "@/features/medical-knowledge/pages/MedicalKnowledgePage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import PatientDetailsPage from "@/features/patient-details/pages/PatientDetailsPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "doctors",
        element: <DoctorsPage />,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "appointments",
        element: <AppointmentsPage />,
      },
      {
        path: "conversations",
        element: <ConversationsPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "medical-knowledge",
        element: <MedicalKnowledgePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "patients/:phone",
        element: <PatientDetailsPage />,
      },
    ],
  },
]);
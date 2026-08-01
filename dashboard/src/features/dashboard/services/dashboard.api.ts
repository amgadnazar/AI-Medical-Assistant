import api from "@/lib/api";

export interface DashboardStats {
  patients: number;
  doctors: number;
  appointments: number;
  todayAppointments: number;
  messages: number;
}

export interface Conversation {
  phone_number: string;
  role: string;
  message: string;
  created_at: string;
}

export interface PatientGrowth {
  month: string;
  patients: number;
}

export interface TodayAppointment {
  id: string;
  patient_name: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

// ======================================
// Dashboard Statistics
// ======================================

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};

// ======================================
// Recent Conversations
// ======================================

export const getRecentConversations = async (): Promise<
  Conversation[]
> => {
  const { data } = await api.get(
    "/dashboard/recent-conversations"
  );

  return data;
};

// ======================================
// Patients Growth
// ======================================

export const getPatientsGrowth = async (): Promise<
  PatientGrowth[]
> => {
  const { data } = await api.get(
    "/dashboard/patients-growth"
  );

  return data;
};

// ======================================
// Today's Appointments
// ======================================

export const getTodayAppointments = async (): Promise<
  TodayAppointment[]
> => {
  const { data } = await api.get(
    "/dashboard/today-appointments"
  );

  return data;
};
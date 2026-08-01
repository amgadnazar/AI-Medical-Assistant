import api from "@/lib/api";

// ======================================
// Dashboard
// ======================================

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};

// ======================================
// Appointment Status
// ======================================

export const getAppointmentStatus = async () => {
  const { data } = await api.get(
    "/analytics/appointment-status"
  );

  return data;
};

// ======================================
// Doctor Bookings
// ======================================

export const getDoctorBookings = async () => {
  const { data } = await api.get(
    "/analytics/doctor-bookings"
  );

  return data;
};

// ======================================
// Appointments Trend
// ======================================

export const getAppointmentsTrend = async () => {
  const { data } = await api.get(
    "/analytics/appointments-trend"
  );

  return data;
};
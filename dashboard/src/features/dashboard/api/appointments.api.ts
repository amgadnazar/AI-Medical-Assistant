import api from "@/lib/api";

export const getTodayAppointments = async () => {
  const { data } = await api.get(
    "/dashboard/today-appointments"
  );

  return data;
};
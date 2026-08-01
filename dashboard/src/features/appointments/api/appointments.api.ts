import api from "@/lib/api";

export const getAppointments = async () => {
  const { data } = await api.get("/appointments");
  return data;
};

export const confirmAppointment = async (id: number) => {
  await api.put(`/appointments/${id}/confirm`);
};

export const completeAppointment = async (id: number) => {
  await api.put(`/appointments/${id}/complete`);
};

export const cancelAppointment = async (id: number) => {
  await api.put(`/appointments/${id}/cancel`);
};
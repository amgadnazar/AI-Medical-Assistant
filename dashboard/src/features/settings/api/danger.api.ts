import api from "@/lib/api";

export const clearConversations = async () => {
  return (await api.delete("/settings/danger/conversations")).data;
};

export const clearPatients = async () => {
  return (await api.delete("/settings/danger/patients")).data;
};

export const clearAppointments = async () => {
  return (await api.delete("/settings/danger/appointments")).data;
};

export const clearMemory = async () => {
  return (await api.delete("/settings/danger/memory")).data;
};

export const resetSystem = async () => {
  return (await api.delete("/settings/danger/reset")).data;
};
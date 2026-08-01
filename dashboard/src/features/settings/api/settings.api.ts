import api from "@/lib/api";

// ===============================
// General Settings
// ===============================

export const getSettings = async () => {
  const { data } = await api.get("/settings/");
  return data;
};

export const updateSettings = async (payload: any) => {
  const { data } = await api.put("/settings/", payload);
  return data;
};

// ===============================
// Clinic Settings
// ===============================

export const getClinicSettings = async () => {
  const { data } = await api.get("/clinic/");
  return data;
};

export const updateClinicSettings = async (payload: any) => {
  const { data } = await api.put("/clinic/", payload);
  return data;
};

// ===============================
// WhatsApp
// ===============================

export const testWhatsAppConnection = async () => {
  const { data } = await api.get("/health/");
  return {
    connected: true,
    message: data,
  };
};
import api from "@/lib/api";

export const getPatientDetails = async (
  phone: string,
) => {
  const { data } = await api.get(
    `/patient-details/${phone}`,
  );

  return data;
};
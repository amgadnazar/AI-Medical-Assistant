import api from "@/lib/api";

export const getDoctors = async () => {
  const { data } = await api.get(
    "/dashboard/doctors"
  );

  return data;
};
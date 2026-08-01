import api from "@/lib/api";

export const getDatabaseInfo = async () => {
  const { data } = await api.get("/database/");
  return data;
};
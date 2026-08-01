import { api } from "@/lib/api/axios";

export async function getDashboardStats() {
  const { data } = await api.get("/dashboard/stats");

  return data;
}
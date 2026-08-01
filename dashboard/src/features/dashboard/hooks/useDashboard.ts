import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getRecentConversations,
  getPatientsGrowth,
} from "../services/dashboard.api";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}


export function useRecentConversations() {
  return useQuery({
    queryKey: ["recent-conversations"],
    queryFn: getRecentConversations,
  });
}

export function usePatientsGrowth() {
  return useQuery({
    queryKey: ["patients-growth"],
    queryFn: getPatientsGrowth,
  });
}
import { useQuery } from "@tanstack/react-query";
import { getDatabaseInfo } from "../api/database.api";

export function useDatabase() {
  return useQuery({
    queryKey: ["database"],
    queryFn: getDatabaseInfo,
  });
}
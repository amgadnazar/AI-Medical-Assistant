import { useQuery } from "@tanstack/react-query";
import { getClinicSettings } from "../api/settings.api";

export function useClinicSettings() {
  return useQuery({
    queryKey: ["clinicSettings"],
    queryFn: getClinicSettings,
  });
}
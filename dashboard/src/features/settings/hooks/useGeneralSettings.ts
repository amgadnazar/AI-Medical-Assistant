import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api/settings.api";

export function useGeneralSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
}
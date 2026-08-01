import { useQuery } from "@tanstack/react-query";
import { getAISettings } from "../api/ai.api";

export function useAISettings() {
  return useQuery({
    queryKey: ["aiSettings"],
    queryFn: getAISettings,
  });
}
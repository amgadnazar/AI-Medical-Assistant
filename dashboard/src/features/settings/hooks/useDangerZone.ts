import { useMutation } from "@tanstack/react-query";

import {
  clearAppointments,
  clearConversations,
  clearMemory,
  clearPatients,
  resetSystem,
} from "../api/danger.api";

export function useDangerZone() {
  return {
    clearConversations: useMutation({
      mutationFn: clearConversations,
    }),

    clearPatients: useMutation({
      mutationFn: clearPatients,
    }),

    clearAppointments: useMutation({
      mutationFn: clearAppointments,
    }),

    clearMemory: useMutation({
      mutationFn: clearMemory,
    }),

    resetSystem: useMutation({
      mutationFn: resetSystem,
    }),
  };
}
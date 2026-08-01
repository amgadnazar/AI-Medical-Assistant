import {
  AlertTriangle,
  Trash2,
  MessageCircle,
  Users,
  CalendarX,
  BrainCircuit,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { useDangerZone } from "../hooks/useDangerZone";

export default function DangerZoneCard() {
  const danger = useDangerZone();

  const actions = [
    {
      title: "Delete Conversations",
      description:
        "Remove all WhatsApp conversations from the database.",
      icon: MessageCircle,
      button: "Delete",
      action: () => {
        if (confirm("Delete all conversations?")) {
          danger.clearConversations.mutate();
        }
      },
    },

    {
      title: "Delete Patients",
      description:
        "Delete every patient profile permanently.",
      icon: Users,
      button: "Delete",
      action: () => {
        if (confirm("Delete all patients?")) {
          danger.clearPatients.mutate();
        }
      },
    },

    {
      title: "Delete Appointments",
      description:
        "Remove every appointment from the system.",
      icon: CalendarX,
      button: "Delete",
      action: () => {
        if (confirm("Delete all appointments?")) {
          danger.clearAppointments.mutate();
        }
      },
    },

    {
      title: "Clear AI Memory",
      description:
        "Delete AI conversation memory and cached context.",
      icon: BrainCircuit,
      button: "Clear",
      action: () => {
        if (confirm("Clear AI memory?")) {
          danger.clearMemory.mutate();
        }
      },
    },
  ];

  return (
    <Card className="rounded-2xl border-red-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-xl border border-red-100 p-5 transition-all duration-200 hover:border-red-300 hover:bg-red-50/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                  <Icon className="h-6 w-6 text-red-600" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={item.action}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {item.button}
              </Button>
            </div>
          );
        })}

        <div className="rounded-xl border-2 border-red-500 bg-red-50 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-red-700">
                Factory Reset
              </h3>

              <p className="mt-2 max-w-2xl text-sm text-red-600">
                Permanently deletes all patients, appointments,
                conversations, AI memory, and clinic data.
                This operation cannot be undone.
              </p>
            </div>

            <Button
              variant="destructive"
              size="lg"
              onClick={() => {
                if (
                  confirm(
                    "This will permanently erase the entire system. Continue?"
                  )
                ) {
                  danger.resetSystem.mutate();
                }
              }}
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Factory Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
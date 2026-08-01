import {
  Building2,
  Building,
  Stethoscope,
  BriefcaseMedical,
  BadgePercent,
  CalendarDays,
  CalendarClock,
  Users,
  MessageCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDatabase } from "@/features/database/hooks/useDatabase";

export default function DatabaseSettingsCard() {
  const { data, isLoading } = useDatabase();

  if (isLoading) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="p-8">
          Loading database statistics...
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      title: "Clinics",
      value: data.clinic,
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Branches",
      value: data.branches,
      icon: Building,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Departments",
      value: data.departments,
      icon: BriefcaseMedical,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Doctors",
      value: data.doctors,
      icon: Stethoscope,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Services",
      value: data.services,
      icon: BadgePercent,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Offers",
      value: data.offers,
      icon: BadgePercent,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Appointments",
      value: data.appointments,
      icon: CalendarDays,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Available Slots",
      value: data.appointment_slots,
      icon: CalendarClock,
      color: "bg-sky-100 text-sky-600",
    },
    {
      title: "Patients",
      value: data.patients,
      icon: Users,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Messages",
      value: data.conversations,
      icon: MessageCircle,
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Database Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-3xl font-bold">
                    {item.value}
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-muted-foreground">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
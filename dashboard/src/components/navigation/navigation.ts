import {
  Activity,
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Doctors",
    url: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Patients",
    url: "/patients",
    icon: Users,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: Activity,
  },
  {
    title: "Medical Knowledge",
    url: "/medical-knowledge",
    icon: BookOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
] as const;
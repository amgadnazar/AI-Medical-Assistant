import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import LoadingCard from "@/components/common/LoadingCard";
import { getAppointmentStatus } from "../api/analytics.api";

const COLORS = [
  "#f59e0b", // Pending
  "#3b82f6", // Confirmed
  "#22c55e", // Completed
  "#ef4444", // Cancelled
];

interface AppointmentStatus {
  status: string;
  count: number;
}

export default function AppointmentStatusChart() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<AppointmentStatus[]>({
    queryKey: ["appointment-status"],
    queryFn: getAppointmentStatus,
  });

  if (isLoading) {
    return <LoadingCard />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex h-[360px] items-center justify-center text-red-500">
          Failed to load appointment status.
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-[360px] items-center justify-center text-muted-foreground">
          No data available.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Appointment Status</CardTitle>
      </CardHeader>

      <CardContent className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.status}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
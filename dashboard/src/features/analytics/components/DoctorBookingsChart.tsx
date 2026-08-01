import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import LoadingCard from "@/components/common/LoadingCard";
import { getDoctorBookings } from "../api/analytics.api";

interface DoctorBookings {
  doctor: string;
  appointments: number;
}

export default function DoctorBookingsChart() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<DoctorBookings[]>({
    queryKey: ["doctor-bookings"],
    queryFn: getDoctorBookings,
  });

  if (isLoading) {
    return <LoadingCard />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex h-[360px] items-center justify-center text-red-500">
          Failed to load doctor bookings.
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
        <CardTitle>Most Booked Doctors</CardTitle>
      </CardHeader>

      <CardContent className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="doctor"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="appointments"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
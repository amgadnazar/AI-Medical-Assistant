import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  LineChart,
  Line,
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
import { getAppointmentsTrend } from "../api/analytics.api";

interface AppointmentTrend {
  date: string;
  appointments: number;
}

export default function AppointmentsTrendChart() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<AppointmentTrend[]>({
    queryKey: ["appointments-trend"],
    queryFn: getAppointmentsTrend,
  });

  if (isLoading) {
    return <LoadingCard />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex h-[360px] items-center justify-center text-red-500">
          Failed to load appointments trend.
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
        <CardTitle>Appointments Trend</CardTitle>
      </CardHeader>

      <CardContent className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              dataKey="date"
              tickFormatter={(value) => value.slice(5)}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              domain={[0, "dataMax + 1"]}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
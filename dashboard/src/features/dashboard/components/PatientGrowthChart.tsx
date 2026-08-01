import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePatientsGrowth } from "../hooks/useDashboard";

export default function PatientGrowthChart() {
  const { data, isLoading, isError } = usePatientsGrowth();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Growth</CardTitle>
        </CardHeader>

        <CardContent className="h-[320px] flex items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Growth</CardTitle>
        </CardHeader>

        <CardContent className="h-[320px] flex items-center justify-center">
          Failed to load chart.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Growth</CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickFormatter={(value) => value.slice(5)}
            />

            <YAxis
              allowDecimals={false}
              domain={[0, "dataMax + 1"]}
            />

            <Tooltip />

            <Line
              type="linear"
              dataKey="patients"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import AppointmentStatusChart from "../components/AppointmentStatusChart";
import DoctorBookingsChart from "../components/DoctorBookingsChart";
import AppointmentsTrendChart from "../components/AppointmentsTrendChart";

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <PageHeader
          title="Analytics"
          description="Monitor appointments, doctors performance and booking trends."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <AppointmentStatusChart />

          <DoctorBookingsChart />
        </div>

        <AppointmentsTrendChart />
      </div>
    </PageContainer>
  );
}
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import OverviewCards from "../components/OverviewCards";
import PatientGrowthChart from "../components/PatientGrowthChart";
import TodayAppointments from "../components/TodayAppointments";
import RecentConversations from "../components/RecentConversations";

export default function DashboardPage() {
  return (
    <PageContainer>
      <div className="space-y-6">

        <PageHeader
          title="Dashboard"
          description="Welcome back. Here's what's happening in your clinic today."
        />

        <OverviewCards />

        
          <div className="xl:col-span-2">
            <PatientGrowthChart />
          
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <RecentConversations />

          <TodayAppointments />
        </div>

      </div>
    </PageContainer>
  );
}
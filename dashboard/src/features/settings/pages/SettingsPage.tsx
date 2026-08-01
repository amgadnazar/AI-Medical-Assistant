import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import GeneralSettingsCard from "../components/GeneralSettingsCard";
import ClinicSettingsCard from "../components/ClinicSettingsCard";
import WhatsAppSettingsCard from "../components/WhatsAppSettingsCard";
import DatabaseSettingsCard from "../components/DatabaseSettingsCard";
import BackupSettingsCard from "../components/BackupSettingsCard";
import DangerZoneCard from "../components/DangerZoneCard";


export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Configure your AI Medical Assistant platform."
      />

      <Tabs
        defaultValue="general"
        className="w-full"
      >
        <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-2 h-auto bg-transparent p-0">

          <TabsTrigger value="general">
            General
          </TabsTrigger>

          <TabsTrigger value="clinic">
            Clinic
          </TabsTrigger>

          <TabsTrigger value="whatsapp">
            WhatsApp
          </TabsTrigger>

          <TabsTrigger value="database">
            Database
          </TabsTrigger>

          <TabsTrigger value="backup">
            Backup
          </TabsTrigger>

          <TabsTrigger value="danger">
            Danger Zone
          </TabsTrigger>

        </TabsList>

        <TabsContent value="general">
          <GeneralSettingsCard />
        </TabsContent>

        <TabsContent value="clinic">
          <ClinicSettingsCard />
        </TabsContent>

        <TabsContent value="whatsapp">
          <WhatsAppSettingsCard />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseSettingsCard />
        </TabsContent>

        <TabsContent value="backup">
          <BackupSettingsCard />
        </TabsContent>

        <TabsContent value="danger">
          <DangerZoneCard />
        </TabsContent>

      </Tabs>
    </PageContainer>
  );
}
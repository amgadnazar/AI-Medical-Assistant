import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Globe,
  Building2,
  KeyRound,
  Activity,
  ExternalLink,
} from "lucide-react";

import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { testWhatsAppConnection } from "../api/settings.api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WhatsAppSettingsCard() {
  const { data, isLoading } = useGeneralSettings();

  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const [form, setForm] = useState({
    whatsapp_phone_number_id: "",
    whatsapp_business_account_id: "",
    whatsapp_verify_token: "",
    whatsapp_access_token: "",
    whatsapp_webhook_url: "",
  });

  useEffect(() => {
    if (!data) return;

    setForm({
      whatsapp_phone_number_id:
        data.whatsapp_phone_number_id ?? "",

      whatsapp_business_account_id:
        data.whatsapp_business_account_id ?? "",

      whatsapp_verify_token:
        data.whatsapp_verify_token ?? "",

      whatsapp_access_token:
        data.whatsapp_access_token ?? "",

      whatsapp_webhook_url:
        data.whatsapp_webhook_url ?? "",
    });
  }, [data]);

  async function handleTestConnection() {
    setLoading(true);

    try {
      const result = await testWhatsAppConnection();
      setConnected(result.connected);
    } catch {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-52 items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <Card className="rounded-2xl shadow-sm">

        <CardHeader>

          <div className="flex items-center justify-between">

            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Smartphone className="h-6 w-6 text-emerald-600" />
                WhatsApp Business Cloud API
              </CardTitle>

              <CardDescription className="mt-2">
                Current Meta Cloud API configuration and connection status.
              </CardDescription>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                connected
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {connected ? "Connected" : "Not Tested"}
            </div>

          </div>

        </CardHeader>

      </Card>

      {/* Status */}

      <div className="grid gap-4 md:grid-cols-4">

        <StatusCard
          title="API"
          value={connected ? "Online" : "--"}
        />

        <StatusCard
          title="Webhook"
          value={connected ? "Healthy" : "--"}
        />

        <StatusCard
          title="Verify Token"
          value={form.whatsapp_verify_token ? "Configured" : "--"}
        />

        <StatusCard
          title="Access Token"
          value={form.whatsapp_access_token ? "Configured" : "--"}
        />

      </div>

      {/* Configuration */}

      <Card className="rounded-2xl">

        <CardHeader>

          <CardTitle>
            Configuration
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-5">

          <Field
            icon={<Smartphone className="h-4 w-4" />}
            label="Phone Number ID"
            value={form.whatsapp_phone_number_id}
          />

          <Field
            icon={<Building2 className="h-4 w-4" />}
            label="Business Account ID"
            value={form.whatsapp_business_account_id}
          />

          <Field
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Verify Token"
            value={form.whatsapp_verify_token}
          />

          <Field
            icon={<KeyRound className="h-4 w-4" />}
            label="Access Token"
            value="••••••••••••••••••••••••••••••"
          />

          <Field
            icon={<Globe className="h-4 w-4" />}
            label="Webhook URL"
            value={form.whatsapp_webhook_url}
          />

        </CardContent>

      </Card>

      {/* Actions */}

      <Card className="rounded-2xl">

        <CardHeader>

          <CardTitle>
            Actions
          </CardTitle>

        </CardHeader>

        <CardContent className="flex flex-wrap gap-3">

          <Button
            onClick={handleTestConnection}
            disabled={loading}
          >
            <Activity className="mr-2 h-4 w-4" />

            {loading
              ? "Testing..."
              : "Test Connection"}
          </Button>

          <a
            href="https://business.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Meta Dashboard
            </Button>
          </a>

        </CardContent>

      </Card>

    </div>
  );
}

function StatusCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card className="rounded-xl">

      <CardContent className="flex items-center gap-4 p-5">

        <div className="rounded-full bg-emerald-100 p-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <p className="font-semibold">
            {value}
          </p>
        </div>

      </CardContent>

    </Card>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">

      <label className="flex items-center gap-2 text-sm font-medium">

        {icon}

        {label}

      </label>

      <Input
        readOnly
        value={value}
      />

    </div>
  );
}
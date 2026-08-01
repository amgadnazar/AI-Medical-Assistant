import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Languages,
  Clock3,
  CalendarDays,
  Save,
} from "lucide-react";

import { useSettings } from "../hooks/useSettings";
import { updateSettings } from "../api/settings.api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GeneralSettingsCard() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useSettings();

  const [form, setForm] = useState({
    hospital_name: "",
    hospital_address: "",
    hospital_phone: "",
    hospital_email: "",
    hospital_website: "",
    language: "",
    timezone: "",
    working_days: "",
    working_hours: "",
  });

  useEffect(() => {
    if (!data) return;

    setForm({
      hospital_name: data.hospital_name ?? "",
      hospital_address: data.hospital_address ?? "",
      hospital_phone: data.hospital_phone ?? "",
      hospital_email: data.hospital_email ?? "",
      hospital_website: data.hospital_website ?? "",
      language: data.language ?? "",
      timezone: data.timezone ?? "",
      working_days: data.working_days ?? "",
      working_hours: data.working_hours ?? "",
    });
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      alert("Settings updated successfully.");
    },
  });

  if (isLoading) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="flex h-64 items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b pb-6">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Building2 className="h-6 w-6 text-emerald-600" />
          General Settings
        </CardTitle>

        <CardDescription>
          Configure your hospital information and localization.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">

        {/* Hospital */}

        <div className="space-y-6">

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Hospital Name
            </label>

            <Input
              value={form.hospital_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  hospital_name: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Address
            </label>

            <Input
              value={form.hospital_address}
              onChange={(e) =>
                setForm({
                  ...form,
                  hospital_address: e.target.value,
                })
              }
            />
          </div>

        </div>

        {/* Contact */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone
            </label>

            <Input
              value={form.hospital_phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  hospital_phone: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email
            </label>

            <Input
              value={form.hospital_email}
              onChange={(e) =>
                setForm({
                  ...form,
                  hospital_email: e.target.value,
                })
              }
            />
          </div>

        </div>

        {/* Website */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4 text-muted-foreground" />
            Website
          </label>

          <Input
            value={form.hospital_website}
            onChange={(e) =>
              setForm({
                ...form,
                hospital_website: e.target.value,
              })
            }
          />
        </div>

        {/* Locale */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Languages className="h-4 w-4 text-muted-foreground" />
              Language
            </label>

            <Input
              value={form.language}
              onChange={(e) =>
                setForm({
                  ...form,
                  language: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Clock3 className="h-4 w-4 text-muted-foreground" />
              Timezone
            </label>

            <Input
              value={form.timezone}
              onChange={(e) =>
                setForm({
                  ...form,
                  timezone: e.target.value,
                })
              }
            />
          </div>

        </div>

        {/* Working */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              Working Days
            </label>

            <Input
              value={form.working_days}
              onChange={(e) =>
                setForm({
                  ...form,
                  working_days: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Clock3 className="h-4 w-4 text-muted-foreground" />
              Working Hours
            </label>

            <Input
              value={form.working_hours}
              onChange={(e) =>
                setForm({
                  ...form,
                  working_hours: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="flex justify-end border-t pt-6">
          <Button
            size="lg"
            className="min-w-44"
            onClick={() => mutation.mutate(form)}
            disabled={mutation.isPending}
          >
            <Save className="mr-2 h-4 w-4" />

            {mutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
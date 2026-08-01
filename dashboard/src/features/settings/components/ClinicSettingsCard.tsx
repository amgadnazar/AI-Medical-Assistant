import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Building2,
  FileText,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  MapPin,
  Clock3,
  Image as ImageIcon,
  Save,
} from "lucide-react";

import {
  updateClinicSettings,
} from "../api/settings.api";

import { useClinicSettings } from "../hooks/useClinicSettings";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ClinicSettingsCard() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useClinicSettings();

  const [form, setForm] = useState({
    name: "",
    description: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    address: "",
    working_hours: "",
    logo: "",
  });

  useEffect(() => {
    if (!data) return;

    setForm({
      name: data.name ?? "",
      description: data.description ?? "",
      phone: data.phone ?? "",
      whatsapp: data.whatsapp ?? "",
      email: data.email ?? "",
      website: data.website ?? "",
      address: data.address ?? "",
      working_hours: data.working_hours ?? "",
      logo: data.logo ?? "",
    });
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateClinicSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clinicSettings"],
      });

      alert("Clinic information updated successfully.");
    },
  });

  if (isLoading) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="flex h-64 items-center justify-center">
          Loading clinic information...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b pb-6">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Building2 className="h-6 w-6 text-emerald-600" />
          Clinic Information
        </CardTitle>

        <CardDescription>
          Configure your clinic public profile and contact
          information.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">

        {/* Basic */}

        <section className="space-y-5">

          <h3 className="text-lg font-semibold">
            Basic Information
          </h3>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Clinic Name
            </label>

            <Input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Description
            </label>

            <Input
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

        </section>

        {/* Contact */}

        <section className="space-y-5">

          <h3 className="text-lg font-semibold">
            Contact Information
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Phone
              </label>

              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                WhatsApp
              </label>

              <Input
                value={form.whatsapp}
                onChange={(e) =>
                  setForm({
                    ...form,
                    whatsapp: e.target.value,
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
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Website
              </label>

              <Input
                value={form.website}
                onChange={(e) =>
                  setForm({
                    ...form,
                    website: e.target.value,
                  })
                }
              />
            </div>

          </div>

        </section>

        {/* Location */}

        <section className="space-y-5">

          <h3 className="text-lg font-semibold">
            Location
          </h3>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Address
            </label>

            <Input
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
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

        </section>

        {/* Branding */}

        <section className="space-y-5">

          <h3 className="text-lg font-semibold">
            Clinic Branding
          </h3>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              Logo URL
            </label>

            <Input
              value={form.logo}
              placeholder="https://..."
              onChange={(e) =>
                setForm({
                  ...form,
                  logo: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-center rounded-xl border border-dashed p-8">

            {form.logo ? (
              <img
                src={form.logo}
                alt="Clinic Logo"
                className="h-28 w-28 rounded-xl object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageIcon className="mx-auto mb-2 h-10 w-10 opacity-50" />
                No logo selected
              </div>
            )}

          </div>

        </section>

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
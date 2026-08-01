import {
  Database,
  Download,
  RotateCcw,
  Clock,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function BackupSettingsCard() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-emerald-600" />
          Backup & Restore
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Manual Backup */}

        <div className="flex items-center justify-between rounded-xl border p-6 transition hover:shadow-md">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <Download className="h-6 w-6 text-emerald-600" />
            </div>

            <div>
              <h3 className="font-semibold">
                Manual Backup
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Create a full backup of your database.
              </p>
            </div>
          </div>

          <Button>
            Create Backup
          </Button>
        </div>

        {/* Restore */}

        <div className="flex items-center justify-between rounded-xl border p-6 transition hover:shadow-md">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <RotateCcw className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold">
                Restore Backup
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Restore your system from a previous backup.
              </p>
            </div>
          </div>

          <Button variant="outline">
            Restore
          </Button>
        </div>

        {/* Automatic Backup */}

        <div className="rounded-xl border p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Automatic Backup
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your database is automatically backed up every day.
                </p>
              </div>
            </div>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Enabled
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs uppercase text-muted-foreground">
                Schedule
              </p>

              <p className="mt-2 font-semibold">
                Daily
              </p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs uppercase text-muted-foreground">
                Time
              </p>

              <p className="mt-2 font-semibold">
                02:00 AM
              </p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs uppercase text-muted-foreground">
                Protection
              </p>

              <div className="mt-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />

                <span className="font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
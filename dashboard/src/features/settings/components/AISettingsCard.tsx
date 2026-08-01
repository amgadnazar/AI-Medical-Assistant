import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClinicSettingsCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Clinic</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">
          Coming soon...
        </p>
      </CardContent>
    </Card>
  );
}
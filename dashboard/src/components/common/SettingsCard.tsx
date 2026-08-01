import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function SettingsCard({
  title,
  description,
  icon,
  children,
}: Props) {
  return (
    <Card className="rounded-2xl border shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div>
          <CardTitle>{title}</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
}
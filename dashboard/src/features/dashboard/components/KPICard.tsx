import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/common/AnimatedCounter";

interface Props {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  growth?: string;
}

export default function KPICard({
  title,
  value,
  description,
  icon: Icon,
  growth,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-slate-200 shadow-sm transition-all hover:shadow-lg">
        <CardContent className="p-6">

          <div className="mb-6 flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                {title}
              </p>

              <div className="mt-2 text-3xl font-bold text-slate-900">
                <AnimatedCounter value={value} />
              </div>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <Icon className="h-6 w-6 text-emerald-600" />
            </div>

          </div>

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              {description}
            </p>

            {growth && (
              <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                <TrendingUp className="h-3 w-3" />
                {growth}
              </div>
            )}

          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
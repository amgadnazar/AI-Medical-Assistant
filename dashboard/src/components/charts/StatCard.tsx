import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "emerald" | "blue" | "amber" | "green" | "red";
}

const colors = {
  emerald:
    "bg-emerald-50 text-emerald-600 border-emerald-100",

  blue:
    "bg-sky-50 text-sky-600 border-sky-100",

  amber:
    "bg-amber-50 text-amber-600 border-amber-100",

  green:
    "bg-green-50 text-green-600 border-green-100",

  red:
    "bg-red-50 text-red-600 border-red-100",
};

export default function StatCard({
  title,
  value,
  icon,
  color = "emerald",
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            ${colors[color]}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
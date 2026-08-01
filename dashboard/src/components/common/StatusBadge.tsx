import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

const variants: Record<string, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 border-yellow-200",

  confirmed:
    "bg-blue-100 text-blue-800 border-blue-200",

  completed:
    "bg-green-100 text-green-800 border-green-200",

  cancelled:
    "bg-red-100 text-red-800 border-red-200",

  user:
    "bg-gray-100 text-gray-800 border-gray-200",

  assistant:
    "bg-purple-100 text-purple-800 border-purple-200",
};

export default function StatusBadge({
  status,
}: Props) {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        border
        border-sky-200
        bg-sky-50
        px-3
        py-1
        text-xs
        font-semibold
        capitalize
        text-sky-700
        dark:border-sky-900/40
        dark:bg-sky-950/30
        dark:text-sky-400
      "
    >
      {status}
    </span>
  );
}
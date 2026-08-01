interface Props {
  bloodType?: string | null;
}

export default function BloodTypeBadge({
  bloodType,
}: Props) {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        border
        border-red-200
        bg-red-50
        px-3
        py-1
        text-xs
        font-semibold
        text-red-600
        dark:border-red-900/40
        dark:bg-red-950/30
        dark:text-red-400
      "
    >
      {bloodType || "-"}
    </span>
  );
}
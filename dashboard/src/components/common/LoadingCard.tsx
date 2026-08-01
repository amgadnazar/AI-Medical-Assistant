import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCard() {
  return (
    <div className="space-y-3 rounded-2xl border p-6">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-4 w-44" />
    </div>
  );
}
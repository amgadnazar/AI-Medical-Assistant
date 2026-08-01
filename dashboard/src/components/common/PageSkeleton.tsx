import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />

      <Skeleton className="h-40 w-full rounded-2xl" />

      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  );
}
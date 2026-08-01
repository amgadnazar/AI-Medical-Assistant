import { TriangleAlert } from "lucide-react";

interface Props {
  message: string;
}

export default function ErrorState({
  message,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 py-20">
      <TriangleAlert className="mb-5 h-12 w-12 text-red-500" />

      <h3 className="text-xl font-semibold">
        Something went wrong
      </h3>

      <p className="mt-2 text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
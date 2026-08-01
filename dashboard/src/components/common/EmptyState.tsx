import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20">
      <div className="mb-5 rounded-full bg-slate-100 p-5">
        <Inbox className="h-10 w-10 text-slate-500" />
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-center text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
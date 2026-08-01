import { Loader2 } from "lucide-react";

interface Props {
  title?: string;
}

export default function LoadingState({
  title = "Loading...",
}: Props) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>{title}</span>
      </div>
    </div>
  );
}
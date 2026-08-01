import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {
  const value = status.toLowerCase();

  switch (value) {
    case "confirmed":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          Confirmed
        </Badge>
      );

    case "completed":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Completed
        </Badge>
      );

    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          Pending
        </Badge>
      );

    case "cancelled":
      return (
        <Badge variant="destructive">
          Cancelled
        </Badge>
      );

    case "active":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          Active
        </Badge>
      );

    case "inactive":
      return (
        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
          Inactive
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}
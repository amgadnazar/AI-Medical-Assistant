import {
  CheckCircle2,
  ClipboardCheck,
  Eye,
  MoreHorizontal,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  onView: () => void;
  onConfirm: () => void;
  onComplete: () => void;
  onCancel: () => void;
}

export default function AppointmentRowActions({
  onView,
  onConfirm,
  onComplete,
  onCancel,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl hover:bg-emerald-50 hover:text-emerald-600"
        >
          <MoreHorizontal size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border p-2 shadow-xl"
      >
        <DropdownMenuItem
          onClick={onView}
          className="cursor-pointer rounded-lg py-3"
        >
          <Eye className="mr-3 h-4 w-4" />
          View Appointment
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onConfirm}
          className="cursor-pointer rounded-lg py-3"
        >
          <CheckCircle2 className="mr-3 h-4 w-4 text-blue-600" />
          Confirm Appointment
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onComplete}
          className="cursor-pointer rounded-lg py-3"
        >
          <ClipboardCheck className="mr-3 h-4 w-4 text-emerald-600" />
          Mark as Completed
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onCancel}
          className="cursor-pointer rounded-lg py-3 text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <XCircle className="mr-3 h-4 w-4" />
          Cancel Appointment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
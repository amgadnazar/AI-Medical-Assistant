import {
  MoreHorizontal,
  Eye,
  Pencil,
  CalendarDays,
  MessageSquare,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Props {
  onView: () => void;
  onEdit: () => void;
  onAppointments: () => void;
  onConversations: () => void;
  onDelete: () => void;
}

export default function RowActions({
  onView,
  onEdit,
  onAppointments,
  onConversations,
  onDelete,
}: Props) {
  return (
    <DropdownMenu>

        <DropdownMenuTrigger>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-emerald-50 hover:text-emerald-600"
          >
            <MoreHorizontal size={18} />
          </Button>

        </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-60
          rounded-xl
          border
          p-2
          shadow-xl
        "
      >

        <DropdownMenuItem
          onClick={onView}
          className="rounded-lg py-3 cursor-pointer"
        >
          <Eye className="mr-3 h-4 w-4" />
          View Patient
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onEdit}
          className="rounded-lg py-3 cursor-pointer"
        >
          <Pencil className="mr-3 h-4 w-4" />
          Edit Patient
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onAppointments}
          className="rounded-lg py-3 cursor-pointer"
        >
          <CalendarDays className="mr-3 h-4 w-4" />
          Appointments
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onConversations}
          className="rounded-lg py-3 cursor-pointer"
        >
          <MessageSquare className="mr-3 h-4 w-4" />
          Conversations
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onDelete}
          className="
            rounded-lg
            py-3
            cursor-pointer
            text-red-600
            focus:bg-red-50
            focus:text-red-600
          "
        >
          <Trash2 className="mr-3 h-4 w-4" />
          Delete Patient
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}
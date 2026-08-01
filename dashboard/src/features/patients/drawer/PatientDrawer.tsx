import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import UserAvatar from "@/components/common/UserAvatar";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: any;
}

export default function PatientDrawer({
  open,
  onOpenChange,
  patient,
}: Props) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-[420px] sm:w-[520px]">

        <SheetHeader>
          <SheetTitle>
            Patient Details
          </SheetTitle>
        </SheetHeader>

        {!patient ? (
          <div className="mt-8 text-center text-muted-foreground">
            No patient selected.
          </div>
        ) : (
          <div className="mt-8 space-y-8">

            <div className="flex items-center gap-4">

              <UserAvatar
                name={patient.name}
              />

              <div>

                <h2 className="text-xl font-semibold">
                  {patient.name}
                </h2>

                <p className="text-muted-foreground">
                  {patient.phone_number}
                </p>

              </div>

            </div>

            <StatusBadge status="active" />

            <div className="space-y-4">

              <div>
                <div className="text-sm text-muted-foreground">
                  Gender
                </div>

                <div className="font-medium">
                  {patient.gender || "-"}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">
                  Age
                </div>

                <div className="font-medium">
                  {patient.age ?? "-"}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">
                  Blood Type
                </div>

                <div className="font-medium">
                  {patient.blood_type || "-"}
                </div>
              </div>

            </div>

          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
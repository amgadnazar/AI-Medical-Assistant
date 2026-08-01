import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  createPatient,
  type CreatePatientPayload,
} from "../api/patients.api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialForm: CreatePatientPayload = {
  phone_number: "",
  name: "",
  age: undefined,
  gender: "",
  blood_type: "",
};

export default function AddPatientDialog({
  open,
  onOpenChange,
}: Props) {
  const queryClient = useQueryClient();

  const [form, setForm] =
    useState<CreatePatientPayload>(initialForm);

  const mutation = useMutation({
    mutationFn: createPatient,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      setForm(initialForm);
      onOpenChange(false);
    },
  });

  function update(
    key: keyof CreatePatientPayload,
    value: any
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl rounded-2xl">

        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add Patient
          </DialogTitle>

          <DialogDescription>
            Create a new patient profile.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 md:grid-cols-2">

          <Input
            placeholder="Patient Name"
            value={form.name}
            onChange={(e) =>
              update("name", e.target.value)
            }
          />

          <Input
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={(e) =>
              update(
                "phone_number",
                e.target.value
              )
            }
          />

          <Input
            type="number"
            placeholder="Age"
            value={form.age ?? ""}
            onChange={(e) =>
              update(
                "age",
                e.target.value
                  ? Number(e.target.value)
                  : undefined
              )
            }
          />

          <Input
            placeholder="Gender"
            value={form.gender ?? ""}
            onChange={(e) =>
              update(
                "gender",
                e.target.value
              )
            }
          />

          <Input
            placeholder="Blood Type"
            value={form.blood_type ?? ""}
            onChange={(e) =>
              update(
                "blood_type",
                e.target.value
              )
            }
            className="md:col-span-2"
          />

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            className="bg-emerald-600 text-white hover:bg-emerald-700"
            disabled={mutation.isPending}
            onClick={() =>
              mutation.mutate(form)
            }
          >
            {mutation.isPending
              ? "Saving..."
              : "Add Patient"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
import { Search, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
}

export default function PatientsToolbar({
  search,
  onSearchChange,
  onAdd,
}: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search patients..."
          className="pl-10"
        />
      </div>

      
    </div>
  );
}
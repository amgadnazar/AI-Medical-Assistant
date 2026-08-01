import { User } from "lucide-react";

export default function UserAvatar() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
      <User
        size={18}
        className="text-primary"
      />
    </div>
  );
}
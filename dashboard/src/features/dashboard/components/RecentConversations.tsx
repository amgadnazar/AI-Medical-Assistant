import { useRecentConversations } from "../hooks/useDashboard";
import type { Conversation } from "../services/dashboard.api";

import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function RecentConversations() {
  const { data, isLoading, isError } =
    useRecentConversations();

  if (isLoading) {
    return (
      <SectionCard title="Recent Conversations">
        <div className="py-8 text-center">
          Loading conversations...
        </div>
      </SectionCard>
    );
  }

  if (isError || !data) {
    return (
      <SectionCard title="Recent Conversations">
        <div className="py-8 text-center text-red-500">
          Failed to load conversations.
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Recent Conversations">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left">
                Phone
              </th>

              <th className="px-4 py-3 text-left">
                Role
              </th>

              <th className="px-4 py-3 text-left">
                Message
              </th>

              <th className="px-4 py-3 text-left">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (
                row: Conversation,
                index: number,
              ) => (
                <tr
                  key={index}
                  className="border-t hover:bg-muted/40"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {row.phone_number.slice(-2)}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium">
                        {row.phone_number}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={row.role} />
                  </td>

                  <td className="max-w-sm truncate px-4 py-3 text-muted-foreground">
                    {row.message}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(
                      row.created_at,
                    ).toLocaleString()}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
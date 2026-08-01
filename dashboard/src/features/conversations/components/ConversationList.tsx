import { useMemo } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  MessageCircle,
  Trash2,
  UserX,
} from "lucide-react";

import {
  getConversations,
  deleteConversation,
  deletePatient,
} from "../api/conversations.api";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

interface Props {
  search: string;
  selected: string | null;
  onSelect: (phone: string) => void;
}

export default function ConversationList({
  search,
  selected,
  onSelect,
}: Props) {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  const deleteConversationMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });

  const deletePatientMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });

  const conversations = useMemo(() => {
    if (!search.trim()) return data;

    const keyword = search.toLowerCase();

    return data.filter((conversation: any) => {
      return (
        conversation.phone_number
          ?.toLowerCase()
          .includes(keyword) ||
        conversation.message
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border bg-background">
        Loading conversations...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border text-red-500">
        Failed to load conversations.
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border bg-background text-muted-foreground">
        <MessageCircle className="mb-4 h-12 w-12 opacity-40" />
        <p>No conversations found.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="text-lg font-semibold">
          Conversations
        </h2>

        <p className="text-sm text-muted-foreground">
          Recent WhatsApp conversations
        </p>
      </div>

      <div className="h-[calc(100%-72px)] overflow-y-auto">
        {conversations.map((conversation: any) => (
          <div
            key={conversation.phone_number}
            onClick={() =>
              onSelect(conversation.phone_number)
            }
            className={`mx-2 my-2 cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
              selected === conversation.phone_number
                ? "border-primary bg-muted/40"
                : "hover:bg-muted/30"
            }`}
          >
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback>
                  {conversation.phone_number.slice(-2)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {conversation.phone_number}
                  </p>

                  {conversation.created_at && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(
                        conversation.created_at,
                      ).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {conversation.message}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      if (
                        confirm(
                          "Delete this conversation?"
                        )
                      ) {
                        deleteConversationMutation.mutate(
                          conversation.phone_number,
                        );
                      }
                    }}
                    className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition hover:bg-muted hover:text-red-600"
                  >
                    <Trash2 size={14} />
                    Conversation
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      if (
                        confirm(
                          "Delete this patient and ALL related data?"
                        )
                      ) {
                        deletePatientMutation.mutate(
                          conversation.phone_number,
                        );
                      }
                    }}
                    className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition hover:bg-muted hover:text-red-600"
                  >
                    <UserX size={14} />
                    Delete Patient
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
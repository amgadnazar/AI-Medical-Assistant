import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";

import { getMessages } from "../api/conversations.api";

type Props = {
  phone: string | null;
};

export default function ChatWindow({
  phone,
}: Props) {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["messages", phone],
    queryFn: () => getMessages(phone!),
    enabled: !!phone,
  });

  if (!phone) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border bg-background text-muted-foreground">
        <MessageCircle className="mb-4 h-14 w-14 opacity-40" />
        <h3 className="text-lg font-semibold">
          No Conversation Selected
        </h3>
        <p className="mt-2 text-sm">
          Select a conversation to view messages.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border bg-background">
        Loading messages...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border bg-background text-red-500">
        Failed to load messages.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="border-b bg-card px-6 py-5">
        <h2 className="font-semibold">{phone}</h2>
        <p className="text-sm text-muted-foreground">
          WhatsApp Conversation
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-950">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No messages found.
          </div>
        ) : (
          data.map((message: any) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex ${
                  isUser
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                    isUser
                      ? "rounded-bl-md bg-white text-slate-900 shadow"
                      : "rounded-br-md bg-emerald-600 text-white shadow"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {message.message}
                  </p>

                  <p
                    className={`mt-2 text-right text-xs ${
                      isUser
                        ? "text-slate-500"
                        : "text-emerald-100"
                    }`}
                  >
                    {new Date(
                      message.created_at
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div className="border-t bg-card p-4">
  <input
    disabled
    placeholder="Messaging is coming soon..."
    className="w-full rounded-xl border bg-muted px-4 py-3 text-sm"
  />
</div>
      </div>
    </div>
  );
}
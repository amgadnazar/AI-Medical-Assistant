type Props = {
  conversations: any[];
};

export default function ConversationCard({
  conversations,
}: Props) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Conversations
      </h2>

      <div className="space-y-3">
        {conversations.map((c, index) => (
          <div
            key={index}
            className="border rounded p-3"
          >
            <div className="font-bold">
              {c.role}
            </div>

            <div>{c.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
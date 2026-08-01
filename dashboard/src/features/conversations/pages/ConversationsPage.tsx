import { useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";

import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";

export default function ConversationsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageHeader
          title="Conversations"
          description="Manage patient WhatsApp conversations and AI responses."
        />

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by phone number or message..."
        />

        <div className="grid h-[720px] gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ConversationList
              search={search}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          <div className="lg:col-span-8">
            <ChatWindow phone={selected} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
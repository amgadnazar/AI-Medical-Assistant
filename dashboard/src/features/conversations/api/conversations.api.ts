import api from "@/lib/api";

// ======================================
// Get All Conversations
// ======================================

export const getConversations = async () => {
  const { data } = await api.get("/conversations");
  return data;
};

// ======================================
// Get Conversation Messages
// ======================================

export const getMessages = async (
  phone: string,
) => {
  const { data } = await api.get(
    `/conversations/${phone}`,
  );

  return data;
};

// ======================================
// Delete Conversation
// ======================================

export const deleteConversation = async (
  phone: string,
) => {
  const { data } = await api.delete(
    `/conversations/${phone}`,
  );

  return data;
};

// ======================================
// Delete Patient
// ======================================

export const deletePatient = async (
  phone: string,
) => {
  const { data } = await api.delete(
    `/patients/${phone}`,
  );

  return data;
};
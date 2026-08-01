import api from "@/lib/api";

// ======================================
// Get Files
// ======================================

export const getKnowledgeFiles = async () => {
  const { data } = await api.get("/knowledge/files");
  return data;
};

// ======================================
// Upload File
// ======================================

export const uploadKnowledgeFile = async (
  file: File,
) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/knowledge/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

// ======================================
// Delete File
// ======================================

export const deleteKnowledgeFile = async (
  filename: string,
) => {
  const { data } = await api.delete(
    `/knowledge/files/${filename}`,
  );

  return data;
};

// ======================================
// Rebuild Knowledge
// ======================================

export const rebuildKnowledge = async () => {
  const { data } = await api.post(
    "/knowledge/rebuild",
  );

  return data;
};
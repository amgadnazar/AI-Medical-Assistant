import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getKnowledgeFiles,
  rebuildKnowledge,
  uploadKnowledgeFile,
  deleteKnowledgeFile,
} from "../api/knowledge.api";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import KnowledgeActions from "../components/KnowledgeActions";
import KnowledgeFilesTable from "../components/KnowledgeFilesTable";

export default function MedicalKnowledgePage() {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["knowledge-files"],
    queryFn: getKnowledgeFiles,
  });

  // ======================================
  // Upload
  // ======================================

  const upload = useMutation({
    mutationFn: uploadKnowledgeFile,

    onSuccess: () => {
      alert("File uploaded successfully.");

      queryClient.invalidateQueries({
        queryKey: ["knowledge-files"],
      });
    },

    onError: () => {
      alert("Upload failed.");
    },
  });

  // ======================================
  // Delete
  // ======================================

  const remove = useMutation({
    mutationFn: deleteKnowledgeFile,

    onSuccess: () => {
      alert("File deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["knowledge-files"],
      });
    },

    onError: () => {
      alert("Delete failed.");
    },
  });

  // ======================================
  // Rebuild
  // ======================================

  const rebuild = useMutation({
    mutationFn: rebuildKnowledge,

    onSuccess: () => {
      alert("Knowledge Base rebuilt successfully.");

      queryClient.invalidateQueries({
        queryKey: ["knowledge-files"],
      });
    },

    onError: () => {
      alert("Failed to rebuild Knowledge Base.");
    },
  });

  if (isLoading) {
    return (
      <PageContainer>
        <div>Loading...</div>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <div className="text-red-500">
          Failed to load Knowledge Base.
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageHeader
          title="Medical Knowledge"
          description="Manage the AI medical knowledge base."
        />

        <KnowledgeActions
          isLoading={rebuild.isPending}
          onRebuild={() => rebuild.mutate()}
          onUpload={(file) => upload.mutate(file)}
        />

        <KnowledgeFilesTable
          files={data}
          onDelete={(filename: string) => {
            if (
              confirm(`Delete "${filename}" permanently?`)
            ) {
              remove.mutate(filename);
            }
          }}
        />
      </div>
    </PageContainer>
  );
}
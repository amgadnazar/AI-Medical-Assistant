import {
  Brain,
  Loader2,
  RefreshCw,
  Upload,
} from "lucide-react";

interface Props {
  isLoading: boolean;
  onRebuild: () => void;
  onUpload: (file: File) => void;
}

export default function KnowledgeActions({
  isLoading,
  onRebuild,
  onUpload,
}: Props) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
          <Brain className="h-7 w-7 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            AI Knowledge Base
          </h2>

          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Rebuild the AI embeddings after adding or updating
            medical documents. This keeps the assistant's
            responses accurate and up to date.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">

        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-medium transition hover:bg-muted">
          <Upload className="h-5 w-5" />
          Upload PDF

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                onUpload(file);
              }

              e.currentTarget.value = "";
            }}
          />
        </label>

        <button
          onClick={onRebuild}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition-all hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Rebuilding...
            </>
          ) : (
            <>
              <RefreshCw className="h-5 w-5" />
              Rebuild Knowledge
            </>
          )}
        </button>

      </div>
    </div>
  );
}
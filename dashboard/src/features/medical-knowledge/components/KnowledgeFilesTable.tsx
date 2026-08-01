import {
  FileText,
  HardDrive,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface KnowledgeFile {
  name: string;
  size: number;
}

interface Props {
  files: KnowledgeFile[];
  onDelete: (filename: string) => void;
}

export default function KnowledgeFilesTable({
  files,
  onDelete,
}: Props) {
  const totalSize = files
    .reduce((sum, file) => sum + Number(file.size), 0)
    .toFixed(2);

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>
            Knowledge Files
          </CardTitle>

          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {files.length} Files
            </div>

            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              {totalSize} MB
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <FileText className="mb-4 h-10 w-10 opacity-40" />
            <p>No medical documents found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Document
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Size
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {files.map((file, index) => (
                  <tr
                    key={file.name}
                    className={`border-b transition-colors hover:bg-muted/40 ${
                      index % 2 === 0
                        ? "bg-background"
                        : "bg-muted/10"
                    }`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                          <FileText className="h-5 w-5 text-red-600" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {file.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            PDF Document
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                        {Number(file.size).toFixed(2)} MB
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            onDelete(file.name)
                          }
                          className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
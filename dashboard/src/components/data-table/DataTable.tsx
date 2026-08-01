import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData>({
  columns,
  data,
}: Props<TData>) {
  const [sorting, setSorting] =
    useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">


      <div className="overflow-hidden rounded-xl border bg-background">

        <table className="w-full">

          <thead className="bg-muted/40">

            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none px-5 py-4 text-left text-sm font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    {header.column.getIsSorted() === "asc" && " ▲"}
                    {header.column.getIsSorted() === "desc" && " ▼"}

                  </th>

                ))}

              </tr>
            ))}

          </thead>

          <tbody>

            {table.getRowModel().rows.length === 0 ? (

              <tr>

                <td
                  colSpan={columns.length}
                  className="py-16 text-center text-muted-foreground"
                >
                  No data found.
                </td>

              </tr>

            ) : (

              table.getRowModel().rows.map((row) => (

                    <tr
                      key={row.id}
                      className={`
                        border-t transition-colors
                        ${
                          row.index % 2 === 0
                            ? "bg-white hover:bg-slate-50 dark:bg-background dark:hover:bg-muted/40"
                            : "bg-slate-50 hover:bg-slate-100 dark:bg-muted/30 dark:hover:bg-muted/60"
                        }
                      `}
                    >
                  {row.getVisibleCells().map((cell) => (

                    <td
                      key={cell.id}
                      className="px-5 py-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>

                  ))}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <div className="flex items-center justify-between">

        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <strong>
            {table.getRowModel().rows.length}
          </strong>{" "}
          of{" "}
          <strong>
            {data.length}
          </strong>{" "}
          records
        </div>

        <div className="flex gap-2">

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>

        </div>

      </div>

    </div>
  );
}
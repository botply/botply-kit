import { Input } from "@botply-kit/ui"
import type { Table } from "@tanstack/react-table"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function TableSearchInput<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="请输入关键词搜索..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event: { target: { value: any } }) =>
            table.setGlobalFilter(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
    </div>
  )
}

import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { CommonBulkAction, CommonToolbarAction } from "./types"

interface TableToolbarProps<T> {
  table: Table<T>
  title: string
  toolbarActions?: CommonToolbarAction[]
  bulkActions?: CommonBulkAction<T>[]
}

export function TableToolbar<T>({
  table,
  title,
  toolbarActions = [],
  bulkActions = [],
}: TableToolbarProps<T>) {
  const selectedRows = table.getSelectedRowModel().rows
  const hasSelected = selectedRows.length > 0

  return (
    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="flex gap-2">
        {hasSelected && (
          <>
            {bulkActions.map((action) => (
              <Button
                key={action.key}
                variant="outline"
                onClick={() =>
                  action.onClick(selectedRows.map((row) => row.original))
                }
              >
                <span className="ml-2">{action.label}</span>
                {action.icon}
              </Button>
            ))}
          </>
        )}

        {/* 默认工具栏按钮 - 始终显示 */}
        {toolbarActions.map((action) => (
          <Button
            key={action.key}
            className="space-x-1"
            onClick={action.onClick}
          >
            <span>{action.label}</span>
            {action.icon}
          </Button>
        ))}
      </div>
    </div>
  )
}

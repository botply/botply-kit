import {
  Checkbox,
  HighlightText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@botply-kit/ui"
import { cn } from "@botply-kit/utils"
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type Table as TableInstance,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { CommonColumnHeader } from "./common-column-header"
import { CommonTablePagination } from "./common-table-pagination"
import { TableToolbar } from "./common-toolbar"
import { RowActionDropdown } from "./row-action-dropdown"
import { TableSearchInput } from "./table-search-input"
import {
  type CommonAction,
  type CommonBulkAction,
  type CommonColumn,
  type CommonToolbarAction,
} from "./types"

interface CommonDataTableProps<T> {
  data: T[]
  columns: CommonColumn<T>[]
  actions?: CommonAction<T>[]
  toolbarActions?: CommonToolbarAction[]
  bulkActions?: CommonBulkAction<T>[]
  searchableFields: (keyof T)[]
  title: string
}

export function CommonDataTable<T extends { id: number }>({
  data,
  columns,
  actions = [],
  searchableFields,
  toolbarActions,
  bulkActions,
  title,
}: CommonDataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const tableColumns: ColumnDef<T>[] = [
    {
      id: "id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      meta: {
        className: cn(
          "sticky md:table-cell left-0 z-10 rounded-tl",
          "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        ),
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns.map((col) => {
      return {
        accessorKey: col.key,
        header: ({ column }: { column: Column<T> }) => (
          <CommonColumnHeader column={column} title={col.title} />
        ),
        cell: ({ row, table }: { row: Row<T>; table: TableInstance<T> }) => {
          if (searchableFields.includes(col.key)) {
            const globalFilter = table.getState().globalFilter
            return (
              <HighlightText
                text={row.original[col.key] as string}
                highlight={globalFilter || ""}
              />
            )
          }

          if (col.render) {
            return col.render(row.original)
          }

          return row.original[col.key]
        },
        meta: {
          className: cn(
            "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
            "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
            "sticky left-6 md:table-cell",
          ),
        },
      }
    }),
    {
      id: "actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => <RowActionDropdown row={row} actions={actions} />,
    },
  ]

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase()
      return searchableFields.some((field) => {
        const value = row.original[field]
        return (
          value !== undefined &&
          String(value).toLowerCase().includes(searchValue)
        )
      })
    },
  })

  return (
    <>
      <TableToolbar
        table={table}
        title={title}
        toolbarActions={toolbarActions}
        bulkActions={bulkActions}
      />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="space-y-4">
          <TableSearchInput table={table} />
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <CommonTablePagination table={table} />
        </div>
      </div>
    </>
  )
}

import type { UseSuspenseQueryResult } from "@tanstack/react-query"
import { CommonDataTable } from "./common-data-table"
import {
  type APIResponsePage,
  type CommonAction,
  type CommonBulkAction,
  type CommonColumn,
  type CommonToolbarAction,
} from "./types"

interface CreateTableProps<T> {
  title: string
  columns: CommonColumn<T>[]
  query: () => UseSuspenseQueryResult<APIResponsePage<any>, Error>
  searchableFields?: (keyof T)[]
  actions?: CommonAction<T>[]
  toolbarActions?: CommonToolbarAction[]
  bulkActions?: CommonBulkAction<T>[]
}

export function createTable<T extends { id: number }>({
  title,
  columns,
  query,
  searchableFields = [],
  actions = [],
  toolbarActions = [],
  bulkActions = [],
}: CreateTableProps<T>) {
  return function ListPage() {
    const { data } = query()

    return (
      <CommonDataTable<T>
        data={data.list}
        columns={columns}
        actions={actions}
        searchableFields={searchableFields}
        title={title}
        toolbarActions={toolbarActions}
        bulkActions={bulkActions}
      />
    )
  }
}

import { TResponsePage } from "@/types"
import { UseSuspenseQueryResult } from "@tanstack/react-query"
import { CommonDataTable } from "./common-data-table"
import {
  CommonAction,
  CommonBulkAction,
  CommonColumn,
  CommonToolbarAction,
} from "./types"

// components/common/createListPage.ts
interface CreateListPageProps<T> {
  title: string
  columns: CommonColumn<T>[]
  query: () => UseSuspenseQueryResult<TResponsePage<any>, Error>
  searchableFields?: (keyof T)[]
  actions?: CommonAction<T>[]
  toolbarActions?: CommonToolbarAction[]
  bulkActions?: CommonBulkAction<T>[]
}

export function createListPage<T extends { id: number }>({
  title,
  columns,
  query,
  searchableFields = [],
  actions = [],
  toolbarActions = [],
  bulkActions = [],
}: CreateListPageProps<T>) {
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

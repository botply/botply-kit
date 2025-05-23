export interface CommonAction<T> {
  key: string
  label: string
  icon?: React.ReactNode
  onClick: (row: T) => void
  type?: "primary" | "danger" | "default"
  show?: (row: T) => boolean
}

export interface CommonColumn<T> {
  key: keyof T
  title: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
  width?: number
  align?: "left" | "center" | "right"
}

export interface CommonTableProps<T> {
  title: string
  columns: CommonColumn<T>[]
  actions?: CommonAction<T>[]
  query: () => { data: { list: T[] } }
  searchableFields?: (keyof T)[]
  defaultActions?: ("edit" | "delete")[]
  onEdit?: (row: T) => void
  onDelete?: (ids: number[]) => Promise<void>
}

export interface CommonToolbarAction {
  key: string
  label: string
  icon?: React.ReactNode
  onClick: () => void
}

export interface CommonBulkAction<T> {
  key: string
  label: string
  icon?: React.ReactNode
  onClick: (selectedRows: T[]) => void
}

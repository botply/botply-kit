import { dateTimeFormat } from "@/lib/time-utils"
import { CommonColumn } from "./types"

export const createCommonColumns = <
  T extends { id: number; createdAt: string; updatedAt: string; name?: string },
>() => ({
  id: (options?: Partial<CommonColumn<T>>): CommonColumn<T> => ({
    key: "id",
    title: "ID",
    width: 80,
    align: "center",
    ...options,
  }),

  name: (options?: Partial<CommonColumn<T>>): CommonColumn<T> => ({
    key: "name",
    title: "名称",
    sortable: true,
    render: (row: T) => row.name,
    ...options,
  }),

  createdAt: (options?: Partial<CommonColumn<T>>): CommonColumn<T> => ({
    key: "createdAt",
    title: "创建时间",
    render: (row: T) => dateTimeFormat(row.createdAt),
    sortable: true,
    ...options,
  }),

  updatedAt: (options?: Partial<CommonColumn<T>>): CommonColumn<T> => ({
    key: "updatedAt",
    title: "更新时间",
    render: (row: T) => dateTimeFormat(row.updatedAt),
    sortable: true,
    ...options,
  }),
})

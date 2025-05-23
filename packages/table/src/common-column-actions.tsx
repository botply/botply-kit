import { IconDetails, IconEdit, IconTrash } from "@tabler/icons-react"
import type { CommonAction } from "./types"

export const createCommonColumnActions = <T extends { id: number }>() => ({
  detail: (options?: Partial<CommonAction<T>>): CommonAction<T> => ({
    key: "detail",
    label: "详情",
    icon: <IconDetails size={16} />,
    type: "primary",
    onClick: (row: T) => options?.onClick?.(row),
    ...options,
  }),

  edit: (options?: Partial<CommonAction<T>>): CommonAction<T> => ({
    key: "edit",
    label: "编辑",
    icon: <IconEdit size={16} />,
    type: "primary",
    onClick: (row: T) => options?.onClick?.(row),
    ...options,
  }),

  delete: (options?: Partial<CommonAction<T>>): CommonAction<T> => ({
    key: "delete",
    label: "删除",
    icon: <IconTrash size={16} />,
    type: "danger",
    onClick: (row: T) => options?.onClick?.(row),
    ...options,
  }),
})

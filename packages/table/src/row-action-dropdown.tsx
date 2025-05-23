import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { CommonAction } from "./types"

interface DataTableRowActionsProps<T> {
  row: Row<T>
  actions: CommonAction<T>[]
}

export function RowActionDropdown<T>({
  row,
  actions,
}: DataTableRowActionsProps<T>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actions.map((action, index) => {
          // 如果action有show配置且返回false，则不显示该操作
          if (action.show && !action.show(row.original)) {
            return null
          }

          return (
            <>
              <DropdownMenuItem
                key={action.key}
                onClick={() => action.onClick?.(row.original)}
                className={action.type === "danger" ? "!text-red-500" : ""}
              >
                {action.label}
                {action.icon && (
                  <DropdownMenuShortcut>{action.icon}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
              {index < actions.length - 1 && <DropdownMenuSeparator />}
            </>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

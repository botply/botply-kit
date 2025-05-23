import dayjs from "dayjs"

export const dateTimeFormat = (dateStr: string) => {
  if (!dateStr) {
    return ""
  }
  return dayjs(dateStr).format("YYYY-MM-DD HH:mm:ss")
}

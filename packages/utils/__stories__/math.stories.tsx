import type { Meta } from "@storybook/react"
import { add } from "../src"

export default {
  title: "Utils / math",
  decorators: [
    () => {
      const result = add(1, 2)
      return <div>{result}</div>
    },
  ],
} satisfies Meta

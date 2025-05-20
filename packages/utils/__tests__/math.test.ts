import { add } from "../src"

describe("math", () => {
  test("it should be return 3 when 1 + 2", () => {
    const result = add(1, 2)
    expect(result).toBe(3)
  })
})

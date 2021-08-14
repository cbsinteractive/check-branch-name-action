require("@actions/core")

jest.mock("@actions/core")

test("Index file loads", () => {
  require("../src/index")
})

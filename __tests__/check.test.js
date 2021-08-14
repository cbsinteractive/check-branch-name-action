const check = require("../src/check")
const testConfigs = [
  {
    description: "Fail if both failIf and successIf are supplied",
    getInputCalls: [
      {
        arg: "failIf",
        returnValue: "foo fail",
      },
      {
        arg: "successIf",
        returnValue: "foo success",
      },
    ],
    setFailedMessage: "Only one of failIf or successIf should be specified",
  },
  {
    description: "Fail if neither failIf or successIf are supplied",
    getInputCalls: [
      {
        arg: "failIf",
        returnValue: "",
      },
      {
        arg: "successIf",
        returnValue: "",
      },
    ],
    setFailedMessage: "One of failIf or successIf should be specified",
  },
  {
    description: "Fail if branch name matches failIf argument",
    getInputCalls: [
      {
        arg: "failIf",
        returnValue: "foo fail",
      },
      {
        arg: "successIf",
        returnValue: "",
      },
      {
        arg: "branch",
        returnValue: "foo fail",
      },
      {
        arg: "failureMessage",
        returnValue: "some message",
      },
    ],
    setFailedMessage: "some message",
  },
  {
    description: "Fail if branch name doesn't match successIf argument",
    getInputCalls: [
      {
        arg: "failIf",
        returnValue: "",
      },
      {
        arg: "successIf",
        returnValue: "foo success",
      },
      {
        arg: "branch",
        returnValue: "blah",
      },
      {
        arg: "failureMessage",
        returnValue: "some message",
      },
    ],
    setFailedMessage: "some message",
  },
  {
    description: "Success if branch name matches successIf argument",
    getInputCalls: [
      {
        arg: "failIf",
        returnValue: "",
      },
      {
        arg: "successIf",
        returnValue: "foo success",
      },
      {
        arg: "branch",
        returnValue: "foo success",
      },
      {
        arg: "failureMessage",
        returnValue: "some message",
      },
    ],
  },
  {
    description: "Success if branch name doesn't match failIf argument",
    getInputCalls: [
      {
        arg: "failIf",
        returnValue: "foo fail",
      },
      {
        arg: "successIf",
        returnValue: "",
      },
      {
        arg: "branch",
        returnValue: "blah",
      },
      {
        arg: "failureMessage",
        returnValue: "some message",
      },
    ],
  },
  {
    description: "getInput throws an exception",
    getInputCalls: [
      {
        arg: "failIf",
        throws: new Error("Oh noes!!!"),
      },
    ],
    setFailedMessage: "Oh noes!!!",
  },
]

for (const testConfig of testConfigs) {
  test(testConfig.description, () => {
    const core = {
      getInput: jest.fn((arg) => {
        const found = testConfig.getInputCalls.find((i) => i.arg === arg)
        if (found.throws) {
          throw found.throws
        }
        return found.returnValue
      }),
      setFailed: jest.fn(),
    }
    // Code under test
    check(core)

    // Assertions
    expect(core.getInput.mock.calls.length).toBe(
      testConfig.getInputCalls.length
    )
    if (testConfig.setFailedMessage) {
      expect(core.setFailed.mock.calls).toEqual([[testConfig.setFailedMessage]])
    } else {
      expect(core.setFailed.mock.calls.length).toBe(0)
    }
  })
}

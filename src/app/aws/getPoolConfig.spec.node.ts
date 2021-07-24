import { getPoolConfig } from "./getPoolConfig"
import { mocked } from "ts-jest/utils"
import { getOutputs } from "./getOutputs"

jest.mock("./getOutputs")

describe("get pool config", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("throws an error if nothing is found", async () => {
    const outputs = {}
    mocked(getOutputs).mockResolvedValue(outputs)

    await expect(() => getPoolConfig()).rejects.toThrowError(
      new Error(
        "Tried to get user pool config but backend config was missing or invalid"
      )
    )
  })

  it("gets the only backend stack present in the outputs", async () => {
    const outputs = {
      "test-TnmV2BackendStack": {
        UserPoolId: "foo-id",
        AuthUrl: "a-url",
        ClientId: "a-id",
        RedirectUrl: "a-redirect-url",
      },
    }
    mocked(getOutputs).mockResolvedValue(outputs)

    const output = await getPoolConfig()

    expect(output.UserPoolId).toEqual("foo-id")
    expect(output.AuthUrl).toEqual("a-url")
    expect(output.ClientId).toEqual("a-id")
    expect(output.RedirectUrl).toEqual("a-redirect-url")
  })
})

import { getPoolConfig } from "./getPoolConfig"

describe("get pool config", () => {
  it("throws an error if nothing is found", () => {
    const outputs = {}
    expect(() => getPoolConfig(outputs)).toThrowError(
      new Error(
        "Tried to get user pool config but backend config was missing or invalid"
      )
    )
  })

  it("gets the only backend stack present in the outputs", () => {
    const outputs = {
      "test-TnmV2BackendStack": {
        UserPoolId: "foo-id",
        AuthUrl: "a-url",
        ClientId: "a-id",
        RedirectUrl: "a-redirect-url",
      },
    }

    const output = getPoolConfig(outputs)

    expect(output.UserPoolId).toEqual("foo-id")
    expect(output.AuthUrl).toEqual("a-url")
    expect(output.ClientId).toEqual("a-id")
    expect(output.RedirectUrl).toEqual("a-redirect-url")
  })
})

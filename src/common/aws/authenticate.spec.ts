import { Auth } from "aws-amplify"
import { when } from "jest-when"
import { mocked } from "ts-jest/utils"
import { getPoolConfig } from "./getPoolConfig"
import * as authenticate from "./authenticate"

jest.mock("aws-amplify")
jest.mock("aws-sdk")
jest.mock("./getPoolConfig")

describe("The authenticate module", () => {
  describe("login()", () => {
    it("returns the promise from Auth.signIn", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      })

      when(mocked(Auth.signIn))
        .calledWith("foo", "bar")
        .mockResolvedValue("loginResponse")

      const result = await authenticate.login("foo", "bar")

      expect(result).toEqual("loginResponse")
    })
  })

  describe("signOut()", () => {
    it("returns the promise from Auth.logout", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      })

      mocked(Auth.signOut).mockResolvedValue("logoutResponse")

      const result = await authenticate.signOut()

      expect(result).toEqual("logoutResponse")
    })
  })

  describe("newPasswordChallengeResponse", () => {
    it("returns the promise from completeNewPassword", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      })

      const usernameValue = "the-username"
      const passwordValue = "the-password"

      mocked(Auth.completeNewPassword).mockResolvedValue("completeResponse")

      const result = await authenticate.newPasswordChallengeResponse(
        usernameValue,
        passwordValue
      )

      expect(result).toEqual("completeResponse")
    })
  })

  describe("currentUser()", () => {
    it("returns the promise from Auth.currentAuthenticatedUser", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      })

      mocked(Auth.currentAuthenticatedUser).mockResolvedValue(
        "currentUserResponse"
      )

      const result = await authenticate.currentUser()

      expect(result).toEqual("currentUserResponse")
    })

    it("returns undefined if currentAuthenticatedUser throws", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      })

      mocked(Auth.currentAuthenticatedUser).mockRejectedValue(
        new Error("Whoops!")
      )

      const result = await authenticate.currentUser()

      expect(result).toBeUndefined()
    })
  })
})

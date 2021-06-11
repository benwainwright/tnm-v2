import { Auth } from "aws-amplify";
import { when } from "jest-when";
import { mocked } from "ts-jest/utils";
import { getPoolConfig } from "./getPoolConfig";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import * as authenticate from "./authenticate";

jest.mock("aws-amplify");
jest.mock("aws-sdk");
jest.mock("./getPoolConfig");

const mockParamsFunction = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    CognitoIdentityServiceProvider: class {
      respondToAuthChallenge(mockParams) {
        mockParamsFunction(mockParams);
        return this;
      }

      promise() {
        return Promise.resolve();
      }
    },
  };
});

describe("The authenticate module", () => {
  describe("login()", () => {
    it("returns the promise from Auth.signIn", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      });

      when(mocked(Auth.signIn))
        .calledWith("foo", "bar")
        .mockResolvedValue("loginResponse");

      const result = await authenticate.login("foo", "bar");

      expect(result).toEqual("loginResponse");
    });
  });

  describe("signOut()", () => {
    it("returns the promise from Auth.logout", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      });

      mocked(Auth.signOut).mockResolvedValue("logoutResponse");

      const result = await authenticate.signOut();

      expect(result).toEqual("logoutResponse");
    });
  });

  describe("newPasswordChallengeResponse", () => {
    it("calls the respondToAuthChallenge method with the correct params", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      });

      const sessionValue = "the-session";
      const usernameValue = "the-username";
      const passwordValue = "the-password";

      await authenticate.newPasswordChallengeResponse(
        usernameValue,
        passwordValue,
        sessionValue
      );

      expect(mockParamsFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          ClientId: "client-id",
          ChallengeName: "NEW_PASSWORD_REQUIRED",
          Session: sessionValue,
          ChallengeResponses: {
            USERNAME: usernameValue,
            NEW_PASSWORD: passwordValue,
          },
        })
      );
    });
  });

  describe("currentUser()", () => {
    it("returns the promise from Auth.currentAuthenticatedUser", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      });

      mocked(Auth.currentAuthenticatedUser).mockResolvedValue(
        "currentUserResponse"
      );

      const result = await authenticate.currentUser();

      expect(result).toEqual("currentUserResponse");
    });

    it("returns undefined if currentAuthenticatedUser throws", async () => {
      mocked(getPoolConfig).mockReturnValue({
        UserPoolId: "pool-id",
        ClientId: "client-id",
        RedirectUrl: "redirect-url",
        AuthUrl: "auth-url",
      });

      mocked(Auth.currentAuthenticatedUser).mockRejectedValue(
        new Error("Whoops!")
      );

      const result = await authenticate.currentUser();

      expect(result).toBeUndefined();
    });
  });
});

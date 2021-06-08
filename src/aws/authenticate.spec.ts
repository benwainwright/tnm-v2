import { Auth } from "aws-amplify";
import { when } from "jest-when";
import { mocked } from "ts-jest/utils";
import * as authenticate from "./authenticate";

jest.mock("aws-amplify");

describe("The authenticate module", () => {
  describe("login()", () => {
    it("returns the promise from Auth.signIn", async () => {
      when(mocked(Auth.signIn))
        .calledWith("foo", "bar")
        .mockResolvedValue("loginResponse");

      const result = await authenticate.login("foo", "bar");

      expect(result).toEqual("loginResponse");
    });
  });

  describe("signOut()", () => {
    it("returns the promise from Auth.logout", async () => {
      mocked(Auth.signOut).mockResolvedValue("logoutResponse");

      const result = await authenticate.signOut();

      expect(result).toEqual("logoutResponse");
    });
  });

  describe("currentUser()", () => {
    it("returns the promise from Auth.currentAuthenticatedUser", async () => {
      mocked(Auth.currentAuthenticatedUser).mockResolvedValue(
        "currentUserResponse"
      );

      const result = await authenticate.currentUser();

      expect(result).toEqual("currentUserResponse");
    });

    it("returns undefined if currentAuthenticatedUser throws", async () => {
      mocked(Auth.currentAuthenticatedUser).mockRejectedValue(
        new Error("Whoops!")
      );

      const result = await authenticate.currentUser();

      expect(result).toBeUndefined();
    });
  });
});

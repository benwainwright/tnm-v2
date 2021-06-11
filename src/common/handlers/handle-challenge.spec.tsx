import {
  handleChallenge,
  CHALLENGE_USERNAME_COOKIE_STRING,
  SESSION_COOKIE_STRING,
} from "./handle-challenge";

import { mock as mockExtended } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";
import { navigate } from "gatsby";
import Cookies from "universal-cookie";

jest.mock("gatsby");
jest.mock("universal-cookie");

describe("handle challenge", () => {
  it("sets TNMV2_CHALLENGE_USERNAME cookie if new password challenge is supplied and a user is supplied", async () => {
    const mockCookies = mockExtended<Cookies>();

    mocked(Cookies, true).mockImplementation(() => mockCookies);

    handleChallenge("foo-user", "NEW_PASSWORD_REQUIRED");

    expect(mockCookies.set).toBeCalledWith(
      CHALLENGE_USERNAME_COOKIE_STRING,
      "foo-user"
    );
  });

  it("sets TNMV2_CHALLENGE_USERNAME cookie if mfa challenge is supplied and a user is supplied", async () => {
    const mockCookies = mockExtended<Cookies>();

    mocked(Cookies, true).mockImplementation(() => mockCookies);

    handleChallenge("foo-user", "SMS_MFA");

    expect(mockCookies.set).toBeCalledWith(
      CHALLENGE_USERNAME_COOKIE_STRING,
      "foo-user"
    );
  });

  it("redirects to the new password page if the response is a new password challenge", async () => {
    handleChallenge("foo-user", "NEW_PASSWORD_REQUIRED");

    expect(mocked(navigate, true)).toHaveBeenCalledWith(`/change-password`);
  });

  it("redirects to the MFA password page if the response is a MFA challenge", async () => {
    handleChallenge("foo-user", "MFA_SMS");

    expect(mocked(navigate, true)).toHaveBeenCalledWith(`/mfa-login`);
  });
});

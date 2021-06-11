import { handleChangePassword } from "./handle-change-password";
import { newPasswordChallengeResponse } from "../aws/authenticate";
import { AWSError, Response, CognitoIdentityServiceProvider } from "aws-sdk";
import {
  CHALLENGE_USERNAME_COOKIE_STRING,
  SESSION_COOKIE_STRING,
} from "./handle-challenge";
import { mocked } from "ts-jest/utils";
import { when } from "jest-when";
import { mock as mockExtended } from "jest-mock-extended";
import { handleChallenge } from "./handle-challenge";
import Cookies from "universal-cookie";

jest.mock("gatsby");
jest.mock("../aws/authenticate");
jest.mock("./handle-challenge");
jest.mock("universal-cookie");

describe("the login handler", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("calls newPasswordChallengeResponse with the correct arguments", async () => {
    const setUser = jest.fn();
    const setErrorMessage = jest.fn();
    const mockCookies = mockExtended<Cookies>();

    mocked(Cookies).mockImplementation(() => mockCookies);

    when(mockCookies.get)
      .calledWith(CHALLENGE_USERNAME_COOKIE_STRING)
      .mockReturnValue("foo-user");

    when(mockCookies.get)
      .calledWith(SESSION_COOKIE_STRING)
      .mockReturnValue("foo-session");

    await handleChangePassword("foo-password", setUser, setErrorMessage);

    expect(newPasswordChallengeResponse).toBeCalledWith(
      "foo-user",
      "foo-password"
    );
  });

  it("calls handle challenge when a challenge is supplied", async () => {
    const setUser = jest.fn();
    const setErrorMessage = jest.fn();
    const mockCookies = mockExtended<Cookies>();

    mocked(Cookies).mockImplementation(() => mockCookies);

    const response = mockExtended<
      Response<
        CognitoIdentityServiceProvider.RespondToAuthChallengeResponse,
        AWSError
      >
    >();

    mocked(newPasswordChallengeResponse).mockResolvedValue({
      ChallengeName: "A-Challenge",
      Session: "The-Session",
      $response: response,
    });

    when(mockCookies.get)
      .calledWith(CHALLENGE_USERNAME_COOKIE_STRING)
      .mockReturnValue("foo-user");

    when(mockCookies.get)
      .calledWith(SESSION_COOKIE_STRING)
      .mockReturnValue("foo-session");

    await handleChangePassword("bar-password", setUser, setErrorMessage);

    expect(mocked(handleChallenge)).toBeCalledWith("foo-user", "A-Challenge");
  });

  it.todo("redirects to the account page if the response is successful");
});

import { handleLogin } from "./handle-login";
import { login } from "../aws/authenticate";
import { mocked } from "ts-jest/utils";
import { ApiError } from "../types/api-error";
import { handleChallenge } from "./handle-challenge";

jest.mock("gatsby");
jest.mock("../aws/authenticate");
jest.mock("./handle-challenge");
jest.mock("universal-cookie");

describe("the login handler", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("sets an appropriate error message if the user does not exist", async () => {
    const setUser = jest.fn();
    const setErrorMessage = jest.fn();

    const error: ApiError = {
      code: "UserNotFoundException",
      name: "UserNotFoundException",
      message: "User does not exist.",
    };

    error.code = "UserNotFoundException";

    mocked(login, true).mockRejectedValue(error);

    await handleLogin("foo", "bar", setUser, setErrorMessage);

    expect(setErrorMessage).toBeCalledWith({
      field: "email",
      message: "User does not exist",
    });
  });

  it("sets an appropriate error message if the password is wrong", async () => {
    const setUser = jest.fn();
    const setErrorMessage = jest.fn();

    const error: ApiError = {
      code: "NotAuthorizedException",
      name: "NotAuthorizedException",
      message: "Incorrect username or password",
    };

    error.code = "UserNotFoundException";

    mocked(login, true).mockRejectedValue(error);

    await handleLogin("foo", "bar", setUser, setErrorMessage);

    expect(setErrorMessage).toBeCalledWith({
      field: "email",
      message: "User does not exist",
    });
  });

  it("calls handle challenge when a challenge is supplied", async () => {
    const setUser = jest.fn();
    const setErrorMessage = jest.fn();
    mocked(login, true).mockResolvedValue({
      username: "foo-user",
      challengeName: "A-Challenge",
      Session: "The-Session",
    });

    await handleLogin("foo-user", "bar-password", setUser, setErrorMessage);

    expect(mocked(handleChallenge)).toBeCalledWith("foo-user", "A-Challenge");
  });

  it.todo("redirects to the account page if the response is successful");
});

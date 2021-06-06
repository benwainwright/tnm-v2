import { User } from "../user-context";
import { Dispatch, SetStateAction } from "react";
import { ErrorResponse } from "../components/molecules/login-box";
import { login } from "../aws/authenticate";
import { navigate } from "gatsby";
import { ApiError } from "../types/api-error";
import Cookies from "universal-cookie";

interface ErrorMap {
  [code: string]: ErrorResponse;
}

const CHALLENGE_USERNAME_COOKIE_STRING = "TNMV2_CHALLENGE_USERNAME";
const SESSION_COOKIE_STRING = "TNMV2_SESSION";

const isApiError = (error: Error): error is ApiError =>
  (error as ApiError).code !== undefined;

export const handleLogin = async (
  user: string,
  password: string,
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined,
  setErrorMessage: Dispatch<SetStateAction<ErrorResponse | undefined>>
): Promise<void> => {
  const cookies = new Cookies();
  try {
    const loginResponse = await login(user, password);

    if (loginResponse.Session) {
      cookies.set(SESSION_COOKIE_STRING, loginResponse.Session);
    }

    if (loginResponse.ChallengeName === "NEW_PASSWORD_REQUIRED") {
      cookies.set(CHALLENGE_USERNAME_COOKIE_STRING, user);
      navigate(`/new-password`);
    }

    if (loginResponse.ChallengeName === "SMS_MFA") {
      cookies.set(CHALLENGE_USERNAME_COOKIE_STRING, user);
      navigate(`/mfa-login`);
    }
  } catch (error) {
    if (isApiError(error)) {
      const errorMap: ErrorMap = {
        UserNotFoundException: {
          field: "email",
          message: "User does not exist",
        },
        NotAuthorizedException: {
          field: "password",
          message: "Incorrect password",
        },
      };

      if (errorMap.hasOwnProperty(error.code)) {
        setErrorMessage(errorMap[error.code]);
      }
      return;
    }

    throw error;
  }
};
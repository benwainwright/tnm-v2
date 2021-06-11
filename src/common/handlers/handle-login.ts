import { User } from "../user-context";
import { Dispatch, SetStateAction } from "react";
import { ErrorResponse } from "../types/error-response";
import { LoginData } from "../types/LoginData";
import { login } from "../aws/authenticate";
import { handleSrpResponse } from "./handle-srp-response";
import { ApiError } from "../types/api-error";

interface ErrorMap {
  [code: string]: ErrorResponse<LoginData>;
}

const isApiError = (error: Error): error is ApiError =>
  (error as ApiError).code !== undefined;

export const handleLogin = async (
  user: string,
  password: string,
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined,
  setErrorMessage: Dispatch<
    SetStateAction<ErrorResponse<LoginData> | undefined>
  >
): Promise<void> => {
  try {
    const loginResponse = await login(user, password);

    if (loginResponse.challengeName) {
      handleSrpResponse(loginResponse.username, loginResponse.challengeName);
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

      const code = error.code;

      if (errorMap.hasOwnProperty(code)) {
        setErrorMessage(errorMap[code]);
      }
      return;
    }

    throw error;
  }
};

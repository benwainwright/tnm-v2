import { Dispatch, SetStateAction } from "react";
import { User } from "../user-context";

import {
  CHALLENGE_USERNAME_COOKIE_STRING,
  handleSrpResponse,
} from "./handle-srp-response";
import { ErrorResponse } from "@common/types/error-response";
import { newPasswordChallengeResponse } from "../aws/authenticate";
import Cookies from "universal-cookie";

export const handleChangePassword = async (
  password: string,
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined,
  setErrorMessage: Dispatch<SetStateAction<ErrorResponse | undefined>>
) => {
  const cookies = new Cookies();

  const user = cookies.get(CHALLENGE_USERNAME_COOKIE_STRING);

  const response = await newPasswordChallengeResponse(user, password);
  if (response?.ChallengeName) {
    handleSrpResponse(user, response?.ChallengeName);
  }
};

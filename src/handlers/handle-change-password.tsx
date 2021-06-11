import { Dispatch, SetStateAction } from "react";
import { User } from "../user-context";

import {
  CHALLENGE_USERNAME_COOKIE_STRING,
  SESSION_COOKIE_STRING,
  handleChallenge,
} from "./handle-challenge";
import { ErrorResponse } from "../components/molecules/new-password-box";
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
    handleChallenge(user, response?.ChallengeName);
  }
};

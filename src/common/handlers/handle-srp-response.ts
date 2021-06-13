import { Dispatch, SetStateAction } from "react";
import Cookies from "universal-cookie";
import { navigate } from "gatsby";
import { LoginState } from "../pages/login";

export const CHALLENGE_USERNAME_COOKIE_STRING = "TNMV2_CHALLENGE_USERNAME";
export const SESSION_COOKIE_STRING = "TNMV2_SESSION";

export const handleSrpResponse = (
  user: string,
  challengeName: string,
  setLoginState: Dispatch<SetStateAction<LoginState>>
) => {
  const cookies = new Cookies();

  if (
    challengeName === "NEW_PASSWORD_REQUIRED" ||
    challengeName === "SMS_MFA"
  ) {
    cookies.set(CHALLENGE_USERNAME_COOKIE_STRING, user);
  }

  if (challengeName === "NEW_PASSWORD_REQUIRED") {
    navigate(`/change-password`);
  }

  if (challengeName === "SMS_MFA") {
    navigate(`/mfa-login`);
  }
};

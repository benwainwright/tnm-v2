import Cookies from "universal-cookie";
import { navigate } from "gatsby";

export const CHALLENGE_USERNAME_COOKIE_STRING = "TNMV2_CHALLENGE_USERNAME";
export const SESSION_COOKIE_STRING = "TNMV2_SESSION";

export const handleChallenge = (
  user: string,
  challengeName: string,
  session?: string
) => {
  const cookies = new Cookies();

  if (session) {
    cookies.set(SESSION_COOKIE_STRING, session);
  }

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

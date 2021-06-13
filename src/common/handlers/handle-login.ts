import { Dispatch, SetStateAction } from "react";
import { ErrorResponse } from "../types/error-response";
import {
  SrpData,
  LoginFormData,
  ChangePasswordFormData,
} from "@common/types/srp-data";
import { LoginState } from "../pages/login";
import { login, newPasswordChallengeResponse } from "../aws/authenticate";

const isLoginData = (
  formData: SrpData,
  loginState: LoginState
): formData is LoginFormData =>
  formData.hasOwnProperty("email") && loginState === LoginState.DoLogin;

const isChangePasswordData = (
  formData: SrpData,
  loginState: LoginState
): formData is ChangePasswordFormData =>
  formData.hasOwnProperty("password") &&
  loginState === LoginState.ChangePasswordChallenge;

export const handleLogin = async (
  srpFormData: SrpData,
  loginState: LoginState,
  setLoginState: Dispatch<SetStateAction<LoginState>>,
  setResponse: Dispatch<SetStateAction<any>>,
  setErrorMessage: Dispatch<SetStateAction<ErrorResponse | undefined>>,
  loginResponse: any
): Promise<void> => {
  if (isLoginData(srpFormData, loginState)) {
    const response = await login(srpFormData.email, srpFormData.password);

    setResponse(response);

    if (response.challengeName === "SMS_MFA") {
      setLoginState(LoginState.MfaChallenge);
    }

    if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
      setLoginState(LoginState.ChangePasswordChallenge);
    }
  }

  if (isChangePasswordData(srpFormData, loginState)) {
    const response = await newPasswordChallengeResponse(
      loginResponse,
      srpFormData.password
    );

    if (response.challengeName === "SMS_MFA") {
      setLoginState(LoginState.MfaChallenge);
    }
  }
};

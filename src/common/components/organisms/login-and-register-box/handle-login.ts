import { Dispatch, SetStateAction } from "react"
import { ErrorResponse } from "@common/types/error-response"
import {
  SrpData,
  LoginFormData,
  ChangePasswordFormData,
} from "@common/types/srp-data"
import { navigate } from "gatsby"
import { login, newPasswordChallengeResponse } from "@common/aws/authenticate"
import { LoginState } from "./login-box"

const isLoginData = (
  formData: SrpData,
  loginState: LoginState
): formData is LoginFormData =>
  formData.hasOwnProperty("email") && loginState === LoginState.DoLogin

const isChangePasswordData = (
  formData: SrpData,
  loginState: LoginState
): formData is ChangePasswordFormData =>
  formData.hasOwnProperty("password") &&
  loginState === LoginState.ChangePasswordChallenge

export const handleLogin = async (
  srpFormData: SrpData,
  loginState: LoginState,
  setLoginState: Dispatch<SetStateAction<LoginState>>,
  setResponse: Dispatch<SetStateAction<any>>,
  setErrorMessage: Dispatch<SetStateAction<ErrorResponse | undefined>>,
  loginResponse: any
): Promise<void> => {
  try {
    if (isLoginData(srpFormData, loginState)) {
      const response = await login(srpFormData.email, srpFormData.password)

      setResponse(response)

      if (response.challengeName === "SMS_MFA") {
        setLoginState(LoginState.MfaChallenge)
        return
      }

      if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
        setLoginState(LoginState.ChangePasswordChallenge)
        return
      }

      if (response.signInUserSession?.accessToken) {
        navigate("/account/")
        return
      }
    }

    if (isChangePasswordData(srpFormData, loginState)) {
      const response = await newPasswordChallengeResponse(
        loginResponse,
        srpFormData.password
      )

      if (response.challengeName === "SMS_MFA") {
        setLoginState(LoginState.MfaChallenge)
        return
      }

      if (response.signInUserSession?.accessToken) {
        navigate("/account/")
        return
      }
    }
  } catch (error) {
    setErrorMessage({ message: error.message })
  }
}

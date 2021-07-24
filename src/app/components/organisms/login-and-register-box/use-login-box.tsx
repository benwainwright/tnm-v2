import { login, newPasswordChallengeResponse } from "@app/aws/authenticate"
import { ErrorResponse } from "@app/types/error-response"
import {
  ChangePasswordFormData,
  LoginFormData,
  SrpData
} from "@app/types/srp-data"
import { navigate } from "gatsby"
import { useState } from "react"

export enum LoginState {
  DoLogin = "DoLogin",
  ChangePasswordChallenge = "ChangePasswordChallenge",
  MfaChallenge = "MfaChallenge"
}

const isChangePasswordData = (
  formData: SrpData,
  loginState: LoginState
): formData is ChangePasswordFormData =>
  formData.hasOwnProperty("password") &&
  loginState === LoginState.ChangePasswordChallenge

const isLoginData = (
  formData: SrpData,
  loginState: LoginState
): formData is LoginFormData =>
  formData.hasOwnProperty("email") && loginState === LoginState.DoLogin

export const useLoginBox = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>()
  const [loginState, setLoginState] = useState<LoginState>(LoginState.DoLogin)
  const [response, setResponse] = useState()
  const onSubmit = async (data: SrpData) => {
    try {
      if (isLoginData(data, loginState)) {
        const loginResponse = await login(data.email, data.password)
        setResponse(loginResponse)
        if (loginResponse.challengeName === "SMS_MFA") {
          setLoginState(LoginState.MfaChallenge)
          return
        }
        if (loginResponse.challengeName === "NEW_PASSWORD_REQUIRED") {
          setLoginState(LoginState.ChangePasswordChallenge)
          return
        }

        if (loginResponse.signInUserSession?.accessToken) {
          navigate("/account/")
        }
      }

      if (isChangePasswordData(data, loginState)) {
        const newPasswordResponse = await newPasswordChallengeResponse(
          response,
          data.password
        )

        if (newPasswordResponse.signInUserSession?.accessToken) {
          navigate("/account/")
        }
      }
    } catch (error) {
      setErrorMessage({ message: error.message })
    }
  }
  return { errorMessage, onSubmit, loginState }
}

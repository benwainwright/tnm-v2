import { FC, useState } from "react"
import { TabBox, Tab } from "@common/components/containers"
import { ErrorResponse } from "@common/types/error-response"
import LoginForm from "./login-form"
import NewPasswordForm from "./new-password-form"
import MfaForm from "./mfa-form"
import { handleLogin } from "./handle-login"

export enum LoginState {
  DoLogin = "DoLogin",
  ChangePasswordChallenge = "ChangePasswordChallenge",
  MfaChallenge = "MfaChallenge",
}

const getLoginBox = (state: LoginState) => {
  switch (state) {
    case LoginState.DoLogin:
      return LoginForm
    case LoginState.ChangePasswordChallenge:
      return NewPasswordForm
    case LoginState.MfaChallenge:
      return MfaForm
  }
}

const LoginAndRegisterBox: FC = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.DoLogin)
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>()
  const [response, setResponse] = useState<any>()
  const ChosenLoginForm = getLoginBox(loginState)
  return (
    <TabBox>
      <Tab tabTitle="Login">
        <ChosenLoginForm
          errors={errorMessage ? [errorMessage] : undefined}
          onSubmit={async (data) => {
            await handleLogin(
              data,
              loginState,
              setLoginState,
              setResponse,
              setErrorMessage,
              response
            )
          }}
        />
      </Tab>
      <Tab tabTitle="Register"></Tab>
    </TabBox>
  )
}

export default LoginAndRegisterBox

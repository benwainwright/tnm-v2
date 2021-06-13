import { FC, useState } from "react"
import Layout from "../components/layout"
import { ErrorResponse } from "../types/error-response"
import { LoginBox, MfaBox, NewPasswordBox } from "../components/molecules"
import { handleLogin } from "../handlers/handle-login"

export enum LoginState {
  DoLogin = "DoLogin",
  ChangePasswordChallenge = "ChangePasswordChallenge",
  MfaChallenge = "MfaChallenge",
}

const getLoginBox = (state: LoginState) => {
  switch (state) {
    case LoginState.DoLogin:
      return LoginBox
    case LoginState.ChangePasswordChallenge:
      return NewPasswordBox
    case LoginState.MfaChallenge:
      return MfaBox
  }
}

const Login: FC = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.DoLogin)
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>()
  const [response, setResponse] = useState<any>()

  const Box = getLoginBox(loginState)

  return (
    <Layout>
      <Box
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
    </Layout>
  )
}

export default Login

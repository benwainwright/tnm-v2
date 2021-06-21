import { FC, useState } from "react"
import { TabBox, Tab, Box } from "@common/components/containers"
import { ErrorResponse } from "@common/types/error-response"
import LoginForm from "./login-form"
import NewPasswordForm from "./new-password-form"
import RegisterForm from "./register-form"
import MfaForm from "./mfa-form"
import { handleLogin } from "./handle-login"
import styled from "@emotion/styled"

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

const Padding = styled.div`
  padding: 1.5rem 5rem 3rem 5rem;
`

const LoginAndRegisterBox: FC = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.DoLogin)
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>()
  const [response, setResponse] = useState<any>()
  const ChosenLoginForm = getLoginBox(loginState)
  return (
    <Box>
      <TabBox>
        <Tab tabTitle="Login">
          <Padding>
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
          </Padding>
        </Tab>
        <Tab tabTitle="Register">
          <Padding>
            <RegisterForm onSubmit={() => {}} />
          </Padding>
        </Tab>
      </TabBox>
    </Box>
  )
}

export default LoginAndRegisterBox
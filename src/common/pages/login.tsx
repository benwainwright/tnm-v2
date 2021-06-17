import { FC, useState } from "react"
import Layout from "../components/layout"
import { ErrorResponse } from "../types/error-response"
import { LoginBox, MfaBox, NewPasswordBox } from "../components/molecules"
import AccountIcon from "@common/assets/images/icons/TNM_Icons_Final_Account.png"
import Seo from "@common/components/seo"
import { Hero } from "@common/components/containers"
import { handleLogin } from "../handlers/handle-login"
import styled from "@emotion/styled"

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

const YourAccountHeaderBox = styled("div")`
  text-align: center;
  color: #3b7d7a;
  align-items: center;
  flex-direction: row;
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const YourAccountHeader = styled("h1")`
  font-size: 40px;
  display: auto;
  margin: 0.5rem 0 0 0;
`

const Login: FC = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.DoLogin)
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>()
  const [response, setResponse] = useState<any>()

  const Box = getLoginBox(loginState)

  return (
    <Layout>
      <Seo title="Login" />
      <Hero>
        <YourAccountHeaderBox>
          <img src={AccountIcon} alt="" height="80" width="80" />
          <YourAccountHeader>Your Account</YourAccountHeader>
        </YourAccountHeaderBox>
      </Hero>
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

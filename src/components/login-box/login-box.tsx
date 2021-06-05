import { FC } from "react"
import { Input } from "../input"
import { Button } from "../button"
import styled from "@emotion/styled"
import { BUTTON_BLACK } from "../../config"

interface LoginData {
  email: string
  password: string
}

interface ErrorResponse {
  field: keyof LoginData
  message: string
}

export interface LoginBoxProps {
  onLogin?: (data: LoginData) => void
  errors?: ErrorResponse[]
}

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 500px;
  border: 1px solid black;
  border-top: 0;
  padding: 1.5rem 5rem 3rem 5rem;
`

const StyledH2 = styled.h2`
  font-family: "Acumin Pro";
  margin: 0 0 1rem 0;
`

const StyledLink = styled.a`
  font-family: "Acumin Pro";
  color: ${BUTTON_BLACK};
  text-decoration: 0;
`

const LoginBox: FC<LoginBoxProps> = () => (
  <FlexForm>
    <StyledH2>Login</StyledH2>
    <Input label="Email" placeholder="a@b.com" name="email" type="email" />
    <Input label="Password" name="password" type="password" />
    <StyledLink href="#">Forgot your password?</StyledLink>
    <Button primary>Login</Button>
  </FlexForm>
)

export default LoginBox

import { FC, useState } from "react"
import { Button, Input } from "../../atoms"
import styled from "@emotion/styled"
import { BUTTON_BLACK } from "../../../config"

interface LoginData {
  email: string
  password: string
}

export interface ErrorResponse {
  field?: keyof LoginData
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
  padding: 1.5rem 5rem 3rem 5rem;
  margin-top: -1px;
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

const LoginBox: FC<LoginBoxProps> = props => {
  const [data, setData] = useState<LoginData>({ email: "", password: "" })

  return (
    <FlexForm>
      <StyledH2>Login</StyledH2>
      <Input
        label="Email"
        placeholder="a@b.com"
        name="email"
        type="email"
        value={data.email}
        onChange={event => setData({ ...data, email: event.target.value })}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={data.password}
        onChange={event => setData({ ...data, password: event.target.value })}
      />
      <StyledLink href="#">Forgot your password?</StyledLink>
      <Button
        onClick={event => {
          props.onLogin?.(data)
          event.preventDefault()
        }}
        primary
      >
        Login
      </Button>
    </FlexForm>
  )
}

export default LoginBox

import { FC } from "react"
import { ChallengeForm } from "@common/components/containers"
import { Input } from "@common/components/atoms"
import { ErrorResponse } from "@common/types/error-response"
import { LoginFormData } from "@common/types/srp-data"
import { BUTTON_BLACK } from "@common/config"
import styled from "@emotion/styled"

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void
  errors?: ErrorResponse[]
}

const StyledLink = styled.a`
  font-family: "Acumin Pro", Arial, sans-serif;
  color: ${BUTTON_BLACK};
  text-decoration: 0;
`

const LoginForm: FC<LoginFormProps> = (props) => (
  <ChallengeForm
    submitText="Login"
    onSubmit={props.onSubmit}
    errors={props.errors}
  >
    <Input label="Email" placeholder="a@b.com" name="email" type="email" />
    <Input label="Password" name="password" type="password" />
    <StyledLink href="#">Forgot your password?</StyledLink>
  </ChallengeForm>
)
export default LoginForm

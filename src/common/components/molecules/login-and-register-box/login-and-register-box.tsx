import { FC } from "react"
import { Input } from "../../atoms"
import styled from "@emotion/styled"
import { BUTTON_BLACK } from "@common/config"
import { ChallengeForm, TabBox, Tab } from "@common/components/containers"
import { ErrorResponse } from "@common/types/error-response"
import { LoginFormData } from "@common/types/srp-data"

export interface LoginAndRegisterBoxProps {
  onSubmit?: (data: LoginFormData) => void
  errors?: ErrorResponse[]
}

const StyledLink = styled.a`
  font-family: "Acumin Pro", Arial, sans-serif;
  color: ${BUTTON_BLACK};
  text-decoration: 0;
`

const LoginAndRegisterBox: FC<LoginAndRegisterBoxProps> = (props) => (
  <TabBox>
    <Tab tabTitle="Login">
      <ChallengeForm
        submitText="Login"
        onSubmit={props.onSubmit}
        errors={props.errors}
      >
        <Input label="Email" placeholder="a@b.com" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <StyledLink href="#">Forgot your password?</StyledLink>
      </ChallengeForm>
    </Tab>
    <Tab tabTitle="Register"></Tab>
  </TabBox>
)

export default LoginAndRegisterBox

import { FC } from "react"
import { Input } from "../../atoms"
import { ChallengeForm } from "../../containers"
import styled from "@emotion/styled"
import { ChangePasswordFormData } from "@app/types/srp-data"
import { ErrorResponse } from "@app/types/error-response"

export interface NewPasswordFormProps {
  onSubmit: (data: ChangePasswordFormData) => void
  errors?: ErrorResponse[]
}

const StyledP = styled.p`
  font-family: "Acumin Pro", Arial, sans-serif;
`

const NewPasswordForm: FC<NewPasswordFormProps> = props => (
  <ChallengeForm onSubmit={props.onSubmit} errors={props.errors}>
    <StyledP>
      You need to change your password. Enter a new one in the box below:
    </StyledP>
    <Input label="Password" name="password" />
  </ChallengeForm>
)

export default NewPasswordForm

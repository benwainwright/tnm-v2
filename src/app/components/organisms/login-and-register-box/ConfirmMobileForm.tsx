import { FC } from "react"
import { Input } from "../../atoms"
import { ChallengeForm } from "../../containers"
import styled from "@emotion/styled"
import { ErrorResponse } from "@app/types/error-response"
import { MfaFormData } from "@app/types/srp-data"

export interface ConfirmMobileFormProps {
  onSubmit: (data: MfaFormData) => void
  errors?: ErrorResponse[]
}

const StyledP = styled.p`
  font-family: "Acumin Pro", Arial, sans-serif;
`

const ConfirmMobileForm: FC<ConfirmMobileFormProps> = props => (
  <ChallengeForm onSubmit={props.onSubmit}>
    <StyledP>
      Signup was successful. To verify your phone number, please enter the code
      that was sent to your phone in the box below:
    </StyledP>
    <Input label="Code" name="code" />
  </ChallengeForm>
)

export default ConfirmMobileForm

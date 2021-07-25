import { FC } from "react"
import { Input } from "../../atoms"
import { ChallengeForm } from "../../containers"
import styled from "@emotion/styled"
import { ErrorResponse } from "@app/types/error-response"
import { MfaFormData } from "@app/types/srp-data"

export interface MfaFormProps {
  onSubmit: (data: MfaFormData) => void
  errors?: ErrorResponse[]
}

const StyledP = styled.p`
  font-family: "Acumin Pro", Arial, sans-serif;
`

const MfaForm: FC<MfaFormProps> = props => (
  <ChallengeForm onSubmit={props.onSubmit}>
    <StyledP>
      A code has been sent to your phone. Please enter it in the box below.
    </StyledP>
    <Input label="Code" name="code" />
  </ChallengeForm>
)

export default MfaForm

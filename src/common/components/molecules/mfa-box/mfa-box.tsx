import { FC } from "react"
import { Input } from "../../atoms"
import { ChallengeForm } from "../../containers"
import styled from "@emotion/styled"
import { ErrorResponse } from "@common/types/error-response"
import { MfaFormData } from "@common/types/srp-data"

export interface MfaBoxProps {
  onSubmit: (data: MfaFormData) => void
  errors?: ErrorResponse[]
}

const StyledP = styled.p`
  font-family: "Acumin Pro", Arial, sans-serif;
`

const MfaBox: FC<MfaBoxProps> = (props) => (
  <ChallengeForm onSubmit={props.onSubmit}>
    <StyledP>
      A code has been sent to your phone. Please enter it in the box below.
    </StyledP>
    <Input label="Code" name="code" />
  </ChallengeForm>
)

export default MfaBox

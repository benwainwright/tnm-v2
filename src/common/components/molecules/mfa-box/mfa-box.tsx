import { FC } from "react";
import { Input } from "../../atoms";
import { ChallengeForm } from "../../containers";
import styled from "@emotion/styled";

interface MfaData {
  code: string;
}

export interface ErrorResponse {
  field?: keyof MfaData;
  message: string;
}

export interface MfaBoxProps {
  onDoMfa?: (data: MfaData) => void;
  errors?: ErrorResponse;
}

const StyledP = styled.p`
  font-family: "Acumin Pro";
`;

const MfaBox: FC<MfaBoxProps> = (props) => (
  <ChallengeForm header="Two Factor Authentication" onSubmit={props.onDoMfa}>
    <StyledP>
      A code has been sent to your phone. Please enter it in the box below.
    </StyledP>
    <Input label="Code" name="code" />
  </ChallengeForm>
);

export default MfaBox;

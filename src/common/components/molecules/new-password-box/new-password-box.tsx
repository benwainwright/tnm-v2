import { FC } from "react";
import { Input } from "../../atoms";
import { ChallengeForm } from "../../containers";
import styled from "@emotion/styled";
import { NewPasswordData } from "@common/types/new-password-data";
import { ErrorResponse } from "@common/types/error-response";

export interface NewPasswordBoxProps {
  onNewPassword?: (data: NewPasswordData) => void;
  errors?: ErrorResponse[];
}

const StyledP = styled.p`
  font-family: "Acumin Pro";
`;

const NewPasswordBox: FC<NewPasswordBoxProps> = (props) => (
  <ChallengeForm
    header="Enter a new password"
    onSubmit={props.onNewPassword}
    errors={props.errors}
  >
    <StyledP>
      You need to change your password. Enter a new one in the box below:
    </StyledP>
    <Input label="Password" name="password" />
  </ChallengeForm>
);

export default NewPasswordBox;

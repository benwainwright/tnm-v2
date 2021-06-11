import { FC } from "react";
import { Input } from "../../atoms";
import { ChallengeForm } from "../../containers";
import styled from "@emotion/styled";

interface NewPasswordData {
  password: string;
}

export interface ErrorResponse {
  field?: keyof NewPasswordData;
  message: string;
}

export interface NewPasswordBoxProps {
  onNewPassword?: (data: NewPasswordData) => void;
  errors?: ErrorResponse;
}

const StyledP = styled.p`
  font-family: "Acumin Pro";
`;

const NewPasswordBox: FC<NewPasswordBoxProps> = (props) => (
  <ChallengeForm header="Enter a new password" onSubmit={props.onNewPassword}>
    <StyledP>
      You need to change your password. Enter a new one in the box below:
    </StyledP>
    <Input label="Password" name="password" />
  </ChallengeForm>
);

export default NewPasswordBox;

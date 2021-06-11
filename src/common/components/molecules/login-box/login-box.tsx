import { FC } from "react";
import { Input } from "../../atoms";
import styled from "@emotion/styled";
import { BUTTON_BLACK } from "../../../config";
import { ChallengeForm } from "../../containers";
import { ErrorResponse } from "../../../types/error-response";
import { LoginData } from "../../../types/LoginData";

export interface LoginBoxProps {
  onLogin?: (data: LoginData) => void;
  errors?: ErrorResponse<LoginData>[];
}

const StyledLink = styled.a`
  font-family: "Acumin Pro";
  color: ${BUTTON_BLACK};
  text-decoration: 0;
`;

const LoginBox: FC<LoginBoxProps> = (props) => (
  <ChallengeForm
    header="Login"
    submitText="Login"
    onSubmit={props.onLogin}
    errors={props.errors}
  >
    <Input label="Email" placeholder="a@b.com" name="email" type="email" />
    <Input label="Password" name="password" type="password" />
    <StyledLink href="#">Forgot your password?</StyledLink>
  </ChallengeForm>
);

export default LoginBox;

import { FC, useState } from "react";
import { Button, Input } from "../../atoms";
import styled from "@emotion/styled";
import { BUTTON_BLACK } from "../../../config";
import { ChallengeForm } from "../../containers";

interface LoginData {
  email: string;
  password: string;
}

export interface ErrorResponse {
  field?: keyof LoginData;
  message: string;
}

export interface LoginBoxProps {
  onLogin?: (data: LoginData) => void;
  errors?: ErrorResponse[];
}

const StyledLink = styled.a`
  font-family: "Acumin Pro";
  color: ${BUTTON_BLACK};
  text-decoration: 0;
`;

const LoginBox: FC<LoginBoxProps> = (props) => (
  <ChallengeForm header="Login" submitText="Login" onSubmit={props.onLogin}>
    <Input label="Email" placeholder="a@b.com" name="email" type="email" />
    <Input label="Password" name="password" type="password" />
    <StyledLink href="#">Forgot your password?</StyledLink>
  </ChallengeForm>
);

export default LoginBox;

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

const LoginBox: FC<LoginBoxProps> = (props) => {
  const [data, setData] = useState<LoginData>({ email: "", password: "" });

  return (
    <ChallengeForm header="Login">
      <Input
        label="Email"
        placeholder="a@b.com"
        name="email"
        type="email"
        value={data.email}
        onChange={(event) => setData({ ...data, email: event.target.value })}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={data.password}
        onChange={(event) => setData({ ...data, password: event.target.value })}
      />
      <StyledLink href="#">Forgot your password?</StyledLink>
      <Button
        onClick={(event) => {
          props.onLogin?.(data);
          event.preventDefault();
        }}
        primary
      >
        Login
      </Button>
    </ChallengeForm>
  );
};

export default LoginBox;

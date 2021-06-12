import { FC, useState, useContext } from "react";
import Layout from "../components/layout";
import { ErrorResponse } from "../types/error-response";
import { LoginBox, MfaBox, NewPasswordBox } from "../components/molecules";
import { handleLogin } from "../handlers/handle-login";
import { UserContext } from "../user-context";

enum LoginState {
  DoLogin = "DoLogin",
  ChangePasswordChallenge = "ChangePasswordChallenge",
  MfaChallenge = "MfaChallenge",
}

const getLoginBox = (state: LoginState) => {
  switch (state) {
    case LoginState.DoLogin:
      return LoginBox;
    case LoginState.ChangePasswordChallenge:
      return NewPasswordBox;
    case LoginState.MfaChallenge:
      return MfaBox;
  }
};

const Login: FC = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.DoLogin);
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>();

  const Box = getLoginBox(loginState);

  const user = useContext(UserContext);

  return (
    <Layout>
      <Box
        errors={errorMessage ? [errorMessage] : undefined}
        onLogin={async (data) => {
          await handleLogin(
            data.email,
            data.password,
            user.setUser,
            setErrorMessage
          );
        }}
      />
    </Layout>
  );
};

export default Login;

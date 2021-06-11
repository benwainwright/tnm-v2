import { FC, useState, useContext } from "react";
import Layout from "../components/layout";
import { ErrorResponse } from "../types/error-response";
import { LoginData } from "../types/LoginData";
import { LoginBox } from "../components/molecules";
import { handleLogin } from "../handlers/handle-login";
import { UserContext } from "../user-context";

const Login: FC = () => {
  const [errorMessage, setErrorMessage] = useState<
    ErrorResponse<LoginData> | undefined
  >();

  const user = useContext(UserContext);

  return (
    <Layout>
      <LoginBox
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

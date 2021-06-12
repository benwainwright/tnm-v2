import { FC, useState, useContext } from "react";
import Layout from "../components/layout";
import { NewPasswordBox } from "../components/molecules";
import { ErrorResponse } from "@common/types/error-response";
import { handleChangePassword } from "../handlers/handle-change-password";
import { UserContext } from "../user-context";

const ChangePassword: FC = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>();
  const user = useContext(UserContext);
  return (
    <Layout>
      <NewPasswordBox
        onNewPassword={(data) =>
          handleChangePassword(data.password, user.setUser, setErrorMessage)
        }
      />
    </Layout>
  );
};

export default ChangePassword;

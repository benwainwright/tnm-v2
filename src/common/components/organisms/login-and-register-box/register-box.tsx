import { FC, useState } from "react"
import { ErrorResponse } from "@common/types/error-response"
import RegisterForm from "./register-form"
import { handleRegister } from "./handle-register"

export enum RegisterState {
  DoRegister = "DoRegister",
  ConfirmMobile = "ConfirmMobile",
}

const RegisterBox: FC = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>()

  return (
    <RegisterForm
      onSubmit={(data) => handleRegister(data, setErrorMessage)}
      errors={errorMessage ? [errorMessage] : undefined}
    />
  )
}

export default RegisterBox

import { FC, useState } from "react"
import { ErrorResponse } from "@common/types/error-response"
import RegisterForm from "./register-form"
import { handleRegister } from "./handle-register"
import ConfirmMobileForm from "./ConfirmMobileForm"

export enum RegisterState {
  DoRegister = "DoRegister",
  ConfirmMobile = "ConfirmMobile",
}

const getRegisterBox = (_state: RegisterState) => {
  if (_state === RegisterState.DoRegister) {
    return RegisterForm
  }
  return ConfirmMobileForm
}

const RegisterBox: FC = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>()
  const [registerState, setRegisterState] = useState<RegisterState>(
    RegisterState.DoRegister
  )

  const ChosenRegisterForm = getRegisterBox(registerState)

  return (
    <ChosenRegisterForm
      onSubmit={(data) =>
        handleRegister(data, registerState, setErrorMessage, setRegisterState)
      }
      errors={errorMessage ? [errorMessage] : undefined}
    />
  )
}

export default RegisterBox

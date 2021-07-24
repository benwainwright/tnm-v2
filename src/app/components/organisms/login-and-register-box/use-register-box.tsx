import { confirmSignup, login, register } from "@app/aws/authenticate"
import { ErrorResponse } from "@app/types/error-response"
import { MfaFormData, RegisterFormData, SrpData } from "@app/types/srp-data"
import { navigate } from "gatsby"
import { useState } from "react"

export enum RegisterState {
  DoRegister = "DoRegister",
  ConfirmMobile = "ConfirmMobile"
}

const isRegister = (
  _data: SrpData,
  state: RegisterState
): _data is RegisterFormData => state === RegisterState.DoRegister

const isConfirm = (
  _data: SrpData,
  state: RegisterState
): _data is MfaFormData => state === RegisterState.ConfirmMobile

const callRegister = (data: RegisterFormData) => {
  const address = [
    data.addressLine1,
    data.addressLine2,
    data.county,
    data.townOrCity,
    data.postcode
  ]
    .filter(Boolean)
    .join("\n")

  return register(
    data.username,
    data.password,
    data.saluation,
    data.email,
    data.firstName,
    data.surname,
    address,
    data.telephone
  )
}

export const useRegisterBox = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | undefined>()

  const [registerState, setRegisterState] = useState<RegisterState>(
    RegisterState.DoRegister
  )

  const [registerData, setRegisterData] = useState<
    RegisterFormData | undefined
  >()

  const onSubmit = async (data: SrpData) => {
    try {
      if (isRegister(data, registerState)) {
        const result = await callRegister(data)
        if (!result.userConfirmed) {
          setRegisterState(RegisterState.ConfirmMobile)
        }
        setRegisterData(data)
      } else if (isConfirm(data, registerState)) {
        const result = await confirmSignup(
          registerData?.username ?? "",
          data.code
        )
        if (result === "SUCCESS") {
          await login(
            registerData?.username ?? "",
            registerData?.password ?? ""
          )
          navigate("/account/")
        }
      }
    } catch (error) {
      setErrorMessage({ message: error.message })
    }
  }

  return { errorMessage, registerState, onSubmit }
}

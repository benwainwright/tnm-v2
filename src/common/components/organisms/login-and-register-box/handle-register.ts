import { register } from "@common/aws/authenticate"
import { ErrorResponse } from "@common/types/error-response"
import { RegisterFormData, SrpData } from "@common/types/srp-data"
import { Dispatch, SetStateAction } from "react"
import { RegisterState } from "./register-box"

const isRegister = (
  _data: SrpData,
  state: RegisterState
): _data is RegisterFormData => state === RegisterState.DoRegister

export const handleRegister = async (
  data: SrpData,
  state: RegisterState,
  setErrorMessage: Dispatch<SetStateAction<ErrorResponse | undefined>>,
  setState: Dispatch<SetStateAction<RegisterState>>
) => {
  if (isRegister(data, state)) {
    const address = [
      data.addressLine1,
      data.addressLine2,
      data.county,
      data.townOrCity,
      data.postcode,
    ]
      .filter(Boolean)
      .join("\n")

    try {
      const result = await register(
        data.username,
        data.password,
        data.saluation,
        data.email,
        data.firstName,
        data.surname,
        address,
        data.telephone
      )

      if (!result.userConfirmed) {
        setState(RegisterState.ConfirmMobile)
      }
    } catch (error) {
      setErrorMessage({ message: error.message })
    }
  }
}

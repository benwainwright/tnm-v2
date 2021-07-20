import { register } from "@common/aws/authenticate"
import { ErrorResponse } from "@common/types/error-response"
import { RegisterFormData } from "@common/types/srp-data"
import { Dispatch, SetStateAction } from "react"

export const handleRegister = async (
  data: RegisterFormData,
  setErrorMessage: Dispatch<SetStateAction<ErrorResponse | undefined>>
) => {
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
    await register(
      data.username,
      data.password,
      data.saluation,
      data.email,
      data.firstName,
      data.surname,
      address,
      data.telephone
    )
  } catch (error) {
    setErrorMessage({message: error.message})
  }
}

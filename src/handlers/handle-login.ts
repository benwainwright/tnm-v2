import { User } from "../user-context"
import { Dispatch, SetStateAction } from "react"
import { ErrorResponse } from "../components/molecules/login-box"
import { login, currentUser } from "../aws/authenticate"
import { navigate } from "gatsby"
import { ApiError } from "../types/api-error"

interface ErrorMap {
  [code: string]: ErrorResponse
}

const isApiError = (error: Error): error is ApiError =>
  (error as ApiError).code !== undefined

export const handleLogin = async (
  user: string,
  password: string,
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined,
  setErrorMessage: Dispatch<SetStateAction<ErrorResponse | undefined>>
): Promise<void> => {
  try {
    const loginResponse = await login(user, password)

    if (loginResponse.challengeName === "NEW_PASSWORD_REQUIRED") {
      navigate(`/new-password?username=${user}`)
    }
  } catch (error) {
    if (isApiError(error)) {
      const errorMap: ErrorMap = {
        UserNotFoundException: {
          field: "email",
          message: "User does not exist",
        },
        NotAuthorizedException: {
          field: "password",
          message: "Incorrect password",
        },
      }

      if (errorMap.hasOwnProperty(error.code)) {
        setErrorMessage(errorMap[error.code])
      }
      return
    }

    throw error
  }
}

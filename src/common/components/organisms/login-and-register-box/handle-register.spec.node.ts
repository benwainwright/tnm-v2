import { register } from "@common/aws/authenticate"
import { mock } from "jest-mock-extended"
import { ISignUpResult } from "amazon-cognito-identity-js"
import { mocked } from "ts-jest/utils"
import { RegisterFormData } from "@common/types/srp-data"
import { handleRegister } from "./handle-register"
import { RegisterState } from "./register-box"

jest.mock("@aws-amplify/auth")
jest.mock("@common/aws/authenticate")

describe("handleRegister", () => {
  it("Calls auth.register and redirects to the account page of successful", () => {
    const mockRegisterResult = mock<ISignUpResult>()
    mocked(register).mockResolvedValue(mockRegisterResult)
    // expect(Auth).toHaveBeenCalledWith()
  })

  it("Fires the setErrorMessage handler if an error is thrown", async () => {
    mocked(register).mockRejectedValue(new Error("AN ERROR!"))

    const setErrorMessage = jest.fn()
    const setState = jest.fn()

    const mockData = mock<RegisterFormData>()

    await handleRegister(
      mockData,
      RegisterState.DoRegister,
      setErrorMessage,
      setState
    )

    expect(setErrorMessage).toBeCalledWith({ message: "AN ERROR!" })
  })

  it("Sets the state to confirmMobile if the response indicates a need to confirm", async () => {
    const result = mock<ISignUpResult>()
    result.userConfirmed = false
    mocked(register).mockResolvedValue(result)
    const mockData = mock<RegisterFormData>()
    const setErrorMessage = jest.fn()
    const setState = jest.fn()

    await handleRegister(
      mockData,
      RegisterState.DoRegister,
      setErrorMessage,
      setState
    )

    expect(setState).toHaveBeenCalledWith(RegisterState.ConfirmMobile)
  })
})

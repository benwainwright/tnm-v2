import { register } from "@common/aws/authenticate"
import { mock } from "jest-mock-extended"
import { ISignUpResult } from "amazon-cognito-identity-js"
import { mocked } from "ts-jest/utils"
import { RegisterFormData } from "@common/types/srp-data"
import { handleRegister } from "./handle-register";

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

    const mockData = mock<RegisterFormData>()

    await handleRegister(mockData, setErrorMessage)

    expect(setErrorMessage).toBeCalledWith({ message: "AN ERROR!" })
  })
})

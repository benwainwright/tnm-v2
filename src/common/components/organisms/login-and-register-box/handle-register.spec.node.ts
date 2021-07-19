import { register } from "@common/aws/authenticate"
import { mock } from "jest-mock-extended"
import { ISignUpResult } from "amazon-cognito-identity-js"
import { mocked } from "ts-jest/utils"

jest.mock("@common/aws/authenticate")

describe("handleRegister", () => {
  it("Calls auth.register and redirects to the account page of successful", () => {
    const mockRegisterResult = mock<ISignUpResult>()
    mocked(register).mockResolvedValue(mockRegisterResult)
  })
})

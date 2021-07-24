import { confirmSignup, login, register } from "@app/aws/authenticate"
import { RegisterFormData } from "@app/types/srp-data"
import { act, renderHook } from "@testing-library/react-hooks"
import { CognitoUser, ISignUpResult } from "amazon-cognito-identity-js"
import { navigate } from "gatsby"
import { mock } from "jest-mock-extended"
import { when } from "jest-when"
import { mocked } from "ts-jest/utils"
import { RegisterState, useRegisterBox } from "./use-register-box"

jest.mock("@app/aws/authenticate")
jest.mock("gatsby")

afterEach(() => jest.clearAllMocks())

test("Has a default registerState of DoRegister", () => {
  const { result } = renderHook(() => useRegisterBox())

  expect(result.current.registerState).toEqual(RegisterState.DoRegister)
})

test("Sets the registerState to confirmMobile when the response indicates the need to confirm", async () => {
  const signupResult = mock<ISignUpResult>()
  signupResult.userConfirmed = false
  signupResult.user = mock<CognitoUser>()
  mocked(register).mockResolvedValue(signupResult)
  const mockData = mock<RegisterFormData>()

  const { result } = renderHook(() => useRegisterBox())

  await act(() => result.current.onSubmit(mockData))

  expect(result.current.registerState).toEqual(RegisterState.ConfirmMobile)
})

test("Sets an error message if an error is thrown by register", async () => {
  mocked(register).mockRejectedValue(new Error("AN ERROR!"))

  const { result } = renderHook(() => useRegisterBox())

  const mockData = mock<RegisterFormData>()

  await act(() => result.current.onSubmit(mockData))

  expect(result.current.errorMessage).toEqual({ message: "AN ERROR!" })
})

test("Sets an error message if an error is thrown by confirmSignup", async () => {
  const signupResult = mock<ISignUpResult>()
  signupResult.userConfirmed = false
  signupResult.user = mock<CognitoUser>()

  mocked(register).mockResolvedValue(signupResult)
  const mockRegisterData = mock<RegisterFormData>()
  mockRegisterData.username = "foo-user"
  mockRegisterData.password = "foo-password"

  mocked(confirmSignup).mockRejectedValue(new Error("ANOTHER ERROR!"))

  const { result } = renderHook(() => useRegisterBox())

  await act(() => result.current.onSubmit(mockRegisterData))
  await act(() => result.current.onSubmit({ code: "no-code" }))

  expect(result.current.errorMessage).toEqual({ message: "ANOTHER ERROR!" })
})

test("If confirmMobile is successful, perform a login then redirects to homepage", async () => {
  const signupResult = mock<ISignUpResult>()
  signupResult.userConfirmed = false
  signupResult.user = mock<CognitoUser>()
  mocked(register).mockResolvedValue(signupResult)
  mocked(login).mockReturnValue(Promise.resolve())

  const mockRegisterData = mock<RegisterFormData>()
  mockRegisterData.username = "foo-user"
  mockRegisterData.password = "foo-password"

  when(confirmSignup)
    .calledWith("foo-user", "bar-code")
    .mockResolvedValue("SUCCESS")

  const { result } = renderHook(() => useRegisterBox())

  await act(() => result.current.onSubmit(mockRegisterData))

  const mockConfirmData = { code: "bar-code" }

  await act(() => result.current.onSubmit(mockConfirmData))

  expect(login).toBeCalledWith("foo-user", "foo-password")
  expect(navigate).toBeCalledWith("/account/")
})

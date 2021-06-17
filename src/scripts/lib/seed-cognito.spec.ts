import AWSMock from "aws-sdk-mock"
import AWS from "aws-sdk"
import { seedCognito, TEST_USER } from "./seed-cognito"
import {
  AdminDeleteUserRequest,
  AdminCreateUserRequest,
} from "aws-sdk/clients/cognitoidentityserviceprovider"

describe("seed cognito", () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS)
  })

  afterEach(() => {
    AWSMock.restore()

    delete process.env.CYPRESS_POOL_ID
    delete process.env.CYPRESS_TEST_EMAIL
    delete process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD
  })

  it("deletes the test-user", async () => {
    process.env.CYPRESS_TEST_EMAIL = "foo@bar.com"
    process.env.CYPRESS_POOL_ID = "foo-id"
    process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD = "password-thing"
    const mockAdminDeleteUser = jest.fn(
      (params: AdminDeleteUserRequest, callback: Function) => {
        callback()
      }
    )

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "adminDeleteUser",
      mockAdminDeleteUser
    )

    const mockAdminCreateUser = jest.fn(
      (params: AdminCreateUserRequest, callback: Function) => {
        callback()
      }
    )

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "adminCreateUser",
      mockAdminCreateUser
    )

    await seedCognito()

    expect(mockAdminDeleteUser).toBeCalledWith(
      {
        UserPoolId: "foo-id",
        Username: TEST_USER,
      },
      expect.anything()
    )
  })

  it("recreates the test-user with the correct email and password", async () => {
    process.env.CYPRESS_POOL_ID = "foo-id"
    process.env.CYPRESS_TEST_EMAIL = "foo@bar.com"
    process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD = "password-thing"

    const mockAdminDeleteUser = jest.fn(
      (params: AdminDeleteUserRequest, callback: Function) => {
        callback()
      }
    )

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "adminDeleteUser",
      mockAdminDeleteUser
    )

    const mockAdminCreateUser = jest.fn(
      (params: AdminCreateUserRequest, callback: Function) => {
        callback()
      }
    )

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "adminCreateUser",
      mockAdminCreateUser
    )

    await seedCognito()

    expect(mockAdminCreateUser).toBeCalledWith(
      {
        UserPoolId: "foo-id",
        Username: TEST_USER,
        TemporaryPassword: "password-thing",
        MessageAction: "SUPPRESS",
        DesiredDeliveryMediums: ["EMAIL"],
        UserAttributes: [
          {
            Name: "email_verified",
            Value: "True",
          },
          {
            Name: "phone_number_verified",
            Value: "True",
          },
          {
            Name: "email",
            Value: "foo@bar.com",
          },
          {
            Name: "phone_number",
            Value: "+447732432435",
          },
        ],
      },
      expect.anything()
    )
  })

  it("Throws an error if there is no email", async () => {
    process.env.CYPRESS_POOL_ID = "foo-id"
    process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD = "password-thing"

    await expect(seedCognito()).rejects.toThrow()
  })

  it("Throws an error if there is no poolId", async () => {
    process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD = "password-thing"
    process.env.CYPRESS_TEST_EMAIL = "foo@bar.com"

    await expect(seedCognito()).rejects.toThrow()
  })

  it("Throws an error if there is no password", async () => {
    process.env.CYPRESS_TEST_EMAIL = "foo@bar.com"
    process.env.CYPRESS_POOL_ID = "foo-id"

    await expect(seedCognito()).rejects.toThrow()
  })
})

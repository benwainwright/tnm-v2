import AWSMock from "aws-sdk-mock"
import AWS from "aws-sdk"
import { seedCognito, TEST_USER } from "./seed-cognito"
import {
  AdminDeleteUserRequest,
  AdminCreateUserRequest
} from "aws-sdk/clients/cognitoidentityserviceprovider"
import { readJson } from "fs-extra"

jest.mock("fs-extra")

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
    process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD = "password-thing"

    const data = {
      "dev-TnmV2BackendStack": {
        UserPoolId: "foo-id",
        AuthUrl: "https://dev-tnmv2-auth.auth.eu-west-2.amazoncognito.com",
        ClientId: "5a4apnputbtdiso76mqgheu17d",
        RedirectUrl:
          "https://dev-tnmv2-auth.auth.eu-west-2.amazoncognito.com/login?client_id=5a4apnputbtdiso76mqgheu17d&response_type=code&redirect_uri=https://d2bnp0b9ah9f76.cloudfront.net/"
      }
    }

    ;(readJson as any).mockResolvedValue(data)
    const mockAdminDeleteUser = jest.fn(
      (_params: AdminDeleteUserRequest, callback: Function) => {
        callback()
      }
    )

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "adminDeleteUser",
      mockAdminDeleteUser
    )

    const mockAdminCreateUser = jest.fn(
      (_params: AdminCreateUserRequest, callback: Function) => {
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
        Username: TEST_USER
      },
      expect.anything()
    )
  })

  it("recreates the test-user with the correct email and password", async () => {
    const data = {
      "dev-TnmV2BackendStack": {
        UserPoolId: "foo-id",
        AuthUrl: "https://dev-tnmv2-auth.auth.eu-west-2.amazoncognito.com",
        ClientId: "5a4apnputbtdiso76mqgheu17d",
        RedirectUrl:
          "https://dev-tnmv2-auth.auth.eu-west-2.amazoncognito.com/login?client_id=5a4apnputbtdiso76mqgheu17d&response_type=code&redirect_uri=https://d2bnp0b9ah9f76.cloudfront.net/"
      }
    }

    ;(readJson as any).mockResolvedValue(data)
    process.env.CYPRESS_TEST_EMAIL = "foo@bar.com"
    process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD = "password-thing"

    const mockAdminDeleteUser = jest.fn(
      (_params: AdminDeleteUserRequest, callback: Function) => {
        callback()
      }
    )

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "adminDeleteUser",
      mockAdminDeleteUser
    )

    const mockAdminCreateUser = jest.fn(
      (_params: AdminCreateUserRequest, callback: Function) => {
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
            Value: "True"
          },
          {
            Name: "phone_number_verified",
            Value: "True"
          },
          {
            Name: "email",
            Value: "foo@bar.com"
          },
          {
            Name: "phone_number",
            Value: "+447732432435"
          }
        ]
      },
      expect.anything()
    )
  })

  it("throws an error if there is no cypress initial password", async () => {
    process.env.CYPRESS_POOL_ID = "foo-id"
    process.env.CYPRESS_TEST_EMAIL = "foo@bar.com"
    await expect(seedCognito()).rejects.toThrow()
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
})

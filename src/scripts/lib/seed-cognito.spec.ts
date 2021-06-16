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
  })

  it("deletes the test-user", async () => {
    process.env.CYPRESS_POOL_ID = "foo-id"
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

    delete process.env.CYPRESS_POOL_ID
  })

  it("recreates the test-user", async () => {
    process.env.CYPRESS_POOL_ID = "foo-id"

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
        TemporaryPassword: "520972vi123A.",
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
            Value: "testing@user.com",
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
})

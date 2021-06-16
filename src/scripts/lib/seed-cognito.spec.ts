import AWSMock from "aws-sdk-mock"
import AWS from "aws-sdk"
import { seedCognito, TEST_USER } from "./seed-cognito"
import { AdminDeleteUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider"

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
})

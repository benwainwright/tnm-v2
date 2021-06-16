import { CognitoIdentityServiceProvider } from "aws-sdk"

export const TEST_USER = "cypress-test-user"

export const seedCognito = async () => {
  const cognito = new CognitoIdentityServiceProvider()

  const poolId = process.env.CYPRESS_POOL_ID

  if (!poolId) {
    // eslint-disable-next-line fp/no-throw
    throw new Error("CYPRESS_POOL_ID not configured")
  }

  await cognito
    .adminDeleteUser({
      UserPoolId: poolId,
      Username: TEST_USER,
    })
    .promise()

  await cognito
    .adminCreateUser({
      UserPoolId: poolId,
      Username: TEST_USER,
      TemporaryPassword: "520972vi123A.",
      MessageAction: "Suppress",
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
    })
    .promise()
}

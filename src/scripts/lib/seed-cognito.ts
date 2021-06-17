import { CognitoIdentityServiceProvider } from "aws-sdk"

export const TEST_USER = "cypress-test-user"

export const seedCognito = async () => {
  const cognito = new CognitoIdentityServiceProvider({ region: "eu-west-2" })

  const poolId = process.env.CYPRESS_POOL_ID
  const email = process.env.CYPRESS_TEST_EMAIL
  const password = process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD

  if (!email) {
    // eslint-disable-next-line fp/no-throw
    throw new Error("CYPRESS_TEST_USER_NAME not configured")
  }

  if (!poolId) {
    // eslint-disable-next-line fp/no-throw
    throw new Error("CYPRESS_POOL_ID not configured")
  }

  if (!password) {
    // eslint-disable-next-line fp/no-throw
    throw new Error("CYPRESS_TEST_USER_INITIAL_PASSWORD not configured")
  }

  try {
    await cognito
      .adminDeleteUser({
        UserPoolId: poolId,
        Username: TEST_USER,
      })
      .promise()
  } catch {
    // eslint-disable-next-line no-console
    console.log(`'${TEST_USER}' doesn't exist`)
  }

  await cognito
    .adminCreateUser({
      UserPoolId: poolId,
      Username: TEST_USER,
      TemporaryPassword: password,
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
          Value: email,
        },
        {
          Name: "phone_number",
          Value: "+447732432435",
        },
      ],
    })
    .promise()
}

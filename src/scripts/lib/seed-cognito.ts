import { CognitoIdentityServiceProvider } from "aws-sdk"
import { readJson } from "fs-extra"

export const TEST_USER = "cypress-test-user"
export const TEST_USER_2 = "cypress-test-user-2"

export const seedCognito = async () => {
  const cognito = new CognitoIdentityServiceProvider({ region: "eu-west-2" })

  const config = await readJson("public/backend-config.json")

  const name = Object.keys(config)[0]

  if (name.startsWith("prod")) {
    // eslint-disable-next-line fp/no-throw
    throw new Error("You really don't want to run this script on prod!")
  }

  const poolId = (Object.values(config)[0] as any).UserPoolId
  const email = process.env.CYPRESS_TEST_EMAIL
  const password = process.env.CYPRESS_TEST_USER_INITIAL_PASSWORD
  const registerUser = process.env.CYPRESS_TEST_REGISTER_USER

  if (!email) {
    // eslint-disable-next-line fp/no-throw
    throw new Error("CYPRESS_TEST_USER_NAME not configured")
  }

  if (!password) {
    // eslint-disable-next-line fp/no-throw
    throw new Error("CYPRESS_TEST_USER_INITIAL_PASSWORD not configured")
  }

  if (!registerUser) {
    // eslint-disable-next-line fp/no-throw
    throw new Error("CYPRESS_TEST_REGISTER_USER not configured")
  }

  try {
    await cognito
      .adminDeleteUser({
        UserPoolId: poolId,
        Username: TEST_USER
      })
      .promise()

    await cognito
      .adminDeleteUser({
        UserPoolId: poolId,
        Username: registerUser
      })
      .promise()
  } catch {
    // NOop
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
          Value: "True"
        },
        {
          Name: "phone_number_verified",
          Value: "True"
        },
        {
          Name: "email",
          Value: email
        },
        {
          Name: "phone_number",
          Value: "+447732432435"
        }
      ]
    })
    .promise()
}

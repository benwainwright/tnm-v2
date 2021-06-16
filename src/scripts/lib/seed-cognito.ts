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
}

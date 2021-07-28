import { Plan, Query, QueryGetCustomerByUsernameArgs } from "./types"
import { CognitoIdentityServiceProvider } from "aws-sdk"
import { AdminGetUserResponse } from "aws-sdk/clients/cognitoidentityserviceprovider"

const getAttributeFromResponse = (
  response: AdminGetUserResponse,
  attribute: string
) =>
  response.UserAttributes?.find(
    foundAttribute => foundAttribute.Name === attribute
  )?.Value

export const getCustomerByUsername = async (
  _: unknown,
  args: QueryGetCustomerByUsernameArgs
): Promise<Query["getCustomerByUsername"]> => {
  const cognito = new CognitoIdentityServiceProvider({ region: "eu-west-2" })

  const response = await cognito
    .adminGetUser({
      Username: args.username,
      UserPoolId: process.env.COGNITO_POOL_ID ?? ""
    })
    .promise()

  return {
    requiredCustomisations: [],
    breakfast: Boolean(getAttributeFromResponse(response, "breakfast")),
    snack: getAttributeFromResponse(response, "snack") ?? "",
    plan: JSON.parse(
      getAttributeFromResponse(response, "plan") ?? "{}"
    ) as Plan,
    daysPerWeek: Number.parseInt(
      getAttributeFromResponse(response, "daysPerWeek") ?? "0",
      10
    ),
    firstName: getAttributeFromResponse(response, "given_name") ?? "",
    username: response.Username,
    surname: getAttributeFromResponse(response, "surname") ?? "",
    salutation: getAttributeFromResponse(response, "salutation") ?? "",
    address: getAttributeFromResponse(response, "address") ?? "",
    telephone: getAttributeFromResponse(response, "phone_number") ?? "",
    email: getAttributeFromResponse(response, "email") ?? ""
  }
}

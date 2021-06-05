import AmazonCognitoIdentity from "amazon-cognito-identity-js"
import backendOutputs from "../backend-outputs.json"

import { getPoolConfig } from "./getPoolConfig"

type AuthenticatedUserDetails = {
  accessToken: string
  idToken: string
  username: string
}

export const login = async (
  username: string,
  password: string
): Promise<AuthenticatedUserDetails> => {
  const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: username,
    Password: password,
  })

  const config = getPoolConfig(backendOutputs)

  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId,
  })

  const userData = {
    Username: username,
    Pool: userPool,
  }

  const user = new AmazonCognitoIdentity.CognitoUser(userData)

  return new Promise((accept, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: result => {
        accept({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          username,
        })
      },
      onFailure: error => {
        reject(error)
      },
    })
  })
}

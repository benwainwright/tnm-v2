import { Auth } from "@aws-amplify/auth"
import { getPoolConfig } from "../../src/common/aws/getPoolConfig"
import backendOutputs from "../../src/backend-outputs.json"

const outputs = getPoolConfig(backendOutputs)

const REGION = "eu-west-2"

Auth.configure({
  Auth: {
    region: REGION,
    userPoolId: outputs.UserPoolId,
    userPoolWebClientId: outputs.ClientId,
  },
})

declare global {
  namespace Cypress {
    interface Chainable {
      loginByCognitoApi(username: string, password: string): Chainable
    }
  }
}

// Taken from https://docs.cypress.io/guides/testing-strategies/amazon-cognito-authentication#Custom-Command-for-Amazon-Cognito-Authentication
// Amazon Cognito
Cypress.Commands.add("loginByCognitoApi", (username, password) => {
  const log = Cypress.log({
    displayName: "COGNITO LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    // @ts-ignore
    autoEnd: false,
  })

  log.snapshot("before")

  const signIn = Auth.signIn({ username, password })

  cy.wrap(signIn, { log: false }).then((cognitoResponse: any) => {
    const keyPrefixWithUsername = `${cognitoResponse.keyPrefix}.${cognitoResponse.username}`

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.idToken`,
      cognitoResponse.signInUserSession.idToken.jwtToken
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.accessToken`,
      cognitoResponse.signInUserSession.accessToken.jwtToken
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.refreshToken`,
      cognitoResponse.signInUserSession.refreshToken.token
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.clockDrift`,
      cognitoResponse.signInUserSession.clockDrift
    )

    window.localStorage.setItem(
      `${cognitoResponse.keyPrefix}.LastAuthUser`,
      cognitoResponse.username
    )

    window.localStorage.setItem("amplify-authenticator-authState", "signedIn")
    log.snapshot("after")
    log.end()
  })
})

import { Auth } from "@aws-amplify/auth"
import { getPoolConfig } from "../../src/common/aws/getPoolConfig"

const configureCognitoAndSignIn = async (
  username: string,
  password: string
) => {
  const outputs = await getPoolConfig()

  const REGION = "eu-west-2"

  Auth.configure({
    Auth: {
      region: REGION,
      userPoolId: outputs.UserPoolId,
      userPoolWebClientId: outputs.ClientId
    }
  })
  return Auth.signIn({ username, password })
}

declare global {
  namespace Cypress {
    interface Chainable {
      loginByCognitoApi(username: string, password: string): Chainable
      seed(): void
      addStubs(): void
    }
  }
}

Cypress.Commands.add("seed", () => {
  cy.exec("yarn ts-node src/scripts/seed-cognito.ts", {
    env: {
      CYPRESS_TEST_USER_INITIAL_PASSWORD: Cypress.env(
        "CYPRESS_TEST_USER_INITIAL_PASSWORD"
      ),
      CYPRESS_TEST_EMAIL: Cypress.env("CYPRESS_TEST_EMAIL"),
      CYPRESS_TEST_USER_FINAL_PASSWORD: Cypress.env(
        "CYPRESS_TEST_USER_FINAL_PASSWORD"
      ),
      CYPRESS_TEST_REGISTER_USER: Cypress.env("CYPRESS_TEST_REGISTER_USER")
    }
  })
})

// Taken from https://docs.cypress.io/guides/testing-strategies/amazon-cognito-authentication#Custom-Command-for-Amazon-Cognito-Authentication
// Amazon Cognito
Cypress.Commands.add("loginByCognitoApi", (username, password) => {
  const log = Cypress.log({
    displayName: "COGNITO LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    // @ts-ignore
    autoEnd: false
  })

  const signIn = configureCognitoAndSignIn(username, password)

  log.snapshot("before")

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

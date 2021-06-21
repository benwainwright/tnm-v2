import { Auth } from "@aws-amplify/auth"
import { getPoolConfig, AuthDetails } from "./getPoolConfig"

const REGION = "eu-west-2"

const getConfigurer = () => {
  // eslint-disable-next-line fp/no-let
  let outputs: undefined | AuthDetails
  return async () => {
    if (!outputs) {
      outputs = await getPoolConfig()
      Auth.configure({
        Auth: {
          region: REGION,
          userPoolId: outputs.UserPoolId,
          userPoolWebClientId: outputs.ClientId,
        },
      })
    }
    return outputs
  }
}

const configureAuth = getConfigurer()

export const login = async (username: string, password: string) => {
  await configureAuth()
  return Auth.signIn(username, password)
}

export const signOut = async () => {
  await configureAuth()
  return Auth.signOut()
}

export const currentUser = async () => {
  await configureAuth()
  try {
    return await Auth.currentAuthenticatedUser()
  } catch {
    return undefined
  }
}

export const newPasswordChallengeResponse = async (
  user: any,
  password: string
) => {
  await configureAuth()
  return Auth.completeNewPassword(user, password)
}

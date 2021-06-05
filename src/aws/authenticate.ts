import { Auth } from "aws-amplify"
import { getPoolConfig } from "./getPoolConfig"
import backendOutputs from "../backend-outputs.json"

const outputs = getPoolConfig(backendOutputs)

Auth.configure({
  Auth: {
    region: "eu-west-2",
    userPoolId: outputs.UserPoolId,
    userPoolWebClientId: outputs.ClientId,
  },
})

export const login = async (username: string, password: string) => {
  return Auth.signIn(username, password)
}

export const signout = async () => {
  return Auth.signOut()
}

export const currentUser = async () => {
  return Auth.currentAuthenticatedUser()
}

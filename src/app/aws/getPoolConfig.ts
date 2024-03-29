import { getOutputs } from "./getOutputs"

export type AuthDetails = {
  UserPoolId: string
  AuthUrl: string
  ClientId: string
  RedirectUrl: string
}

type BackendOutputs = {
  [stackName: string]: AuthDetails
}

export const getPoolConfig = async (): Promise<AuthDetails> => {
  const json: BackendOutputs = await getOutputs()
  const config = Object.entries(json).find(([key]) =>
    key.includes("BackendStack")
  )

  if (!config) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(
      "Tried to get user pool config but backend config was missing or invalid"
    )
  }

  return config[1]
}

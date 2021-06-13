import { Auth } from "aws-amplify";
import { getPoolConfig } from "./getPoolConfig";
import backendOutputs from "../../backend-outputs.json";

const REGION = "eu-west-2";

const getConfigurer = () => {
  // eslint-disable-next-line fp/no-let
  let configureDone = false;
  return () => {
    const outputs = getPoolConfig(backendOutputs);
    if (!configureDone) {
      Auth.configure({
        Auth: {
          region: REGION,
          userPoolId: outputs.UserPoolId,
          userPoolWebClientId: outputs.ClientId,
        },
      });
      // eslint-disable-next-line fp/no-mutation
      configureDone = true;
    }
    return outputs;
  };
};

const configureAuth = getConfigurer();

export const login = async (username: string, password: string) => {
  configureAuth();
  return Auth.signIn(username, password);
};

export const signOut = async () => {
  configureAuth();
  return Auth.signOut();
};

export const currentUser = async () => {
  configureAuth();
  try {
    return await Auth.currentAuthenticatedUser();
  } catch (error) {
    return undefined;
  }
};

export const newPasswordChallengeResponse = async (
  user: any,
  password: string
) => {
  configureAuth();
  return Auth.completeNewPassword(user, password);
};

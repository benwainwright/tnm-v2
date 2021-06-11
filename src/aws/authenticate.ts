import { Auth } from "aws-amplify";
import { getPoolConfig } from "./getPoolConfig";
import backendOutputs from "../backend-outputs.json";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const getConfigurer = () => {
  let configureDone = false;
  return () => {
    const outputs = getPoolConfig(backendOutputs);
    if (!configureDone) {
      Auth.configure({
        Auth: {
          region: "eu-west-2",
          userPoolId: outputs.UserPoolId,
          userPoolWebClientId: outputs.ClientId,
        },
      });
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
  username: string,
  password: string,
  session: string
) => {
  const cognito = new CognitoIdentityServiceProvider();
  const config = configureAuth();
  if (config) {
    return cognito
      .respondToAuthChallenge({
        ClientId: config.ClientId,
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        Session: session,
        ChallengeResponses: {
          USERNAME: username,
          NEW_PASSWORD: password,
        },
      })
      .promise();
  }
};

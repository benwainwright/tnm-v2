type AuthDetails = {
  UserPoolId: string;
  AuthUrl: string;
  ClientId: string;
  RedirectUrl: string;
};

type BackendOutputs = {
  [stackName: string]: AuthDetails;
};

export const getPoolConfig = (outputs: BackendOutputs): AuthDetails => {
  const config = Object.entries(outputs).find(([key]) =>
    key.includes("BackendStack")
  );

  if (!config) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(
      "Tried to get user pool config but backend config was missing or invalid"
    );
  }

  return config[1];
};

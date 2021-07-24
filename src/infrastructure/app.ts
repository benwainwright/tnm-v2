import * as cdk from "aws-cdk-lib"
import { AclStack } from "./acl-stack"
import { ApplicationStack } from "./application-stack"
import { BackendStack } from "./backend-stack"

const app = new cdk.App()

const env = {
  account: "426446031572",
  region: "eu-west-2"
}

new ApplicationStack(app, {
  environmentName: "test",
  env
})

const testBackend = new BackendStack(app, {
  environmentName: "test",
  callbackUrl: "https://d2bnp0b9ah9f76.cloudfront.net/",
  env
})

new ApplicationStack(app, {
  environmentName: "dev",
  env
})

const devBackend = new BackendStack(app, {
  environmentName: "dev",
  callbackUrl: "https://d2bnp0b9ah9f76.cloudfront.net/",
  env
})

new ApplicationStack(app, {
  environmentName: "prod",
  env
})

const prodBackend = new BackendStack(app, {
  environmentName: "prod",
  callbackUrl: "https://dw40nwmhtomz7.cloudfront.net",
  env
})

new AclStack(app, {
  env,
  userPools: [devBackend.userPool, testBackend.userPool, prodBackend.userPool],
  poolManagers: ["lawrence", "ryan"],
  developers: ["ben"],
  CIUser: "GithubActions"
})

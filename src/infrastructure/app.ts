import * as cdk from "aws-cdk-lib"
import { ApplicationStack } from "./application-stack"

const app = new cdk.App()

const environmentName =
  process.env.DEPLOY_ENVIRONMENT === "prod" ? "prod" : "test"

new ApplicationStack(app, {
  environmentName,
  env: {
    account: "426446031572",
    region: "eu-west-2",
  },
})

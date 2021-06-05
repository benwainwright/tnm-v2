import * as cdk from "aws-cdk-lib"
import { ApplicationStack } from "./application-stack"

import { PipelineStack } from "./pipeline-stack"

const app = new cdk.App()

const environmentName =
  process.env.DEPLOY_ENVIRONMENT === "prod" ? "prod" : "test"

const env = {
  account: "426446031572",
  region: "eu-west-2",
}

new ApplicationStack(app, {
  environmentName,
  env,
})

new PipelineStack(app, {
  env,
})

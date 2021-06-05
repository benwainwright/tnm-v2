import * as cdk from "aws-cdk-lib"
import { ApplicationStack } from "./application-stack"

import { ApplicationCiStack } from "./pipeline-stack"

const app = new cdk.App()

const env = {
  account: "426446031572",
  region: "eu-west-2",
}

new ApplicationStack(app, {
  environmentName: "test",
  env,
})

new ApplicationStack(app, {
  environmentName: "prod",
  env,
})

new ApplicationCiStack(app, {
  env,
})

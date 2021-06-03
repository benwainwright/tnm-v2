import * as cdk from "aws-cdk-lib"
import { ApplicationStack } from "./application-stack"

const app = new cdk.App()

new ApplicationStack(app, {
  env: {
    account: "426446031572",
    region: "eu-west-2",
  },
})

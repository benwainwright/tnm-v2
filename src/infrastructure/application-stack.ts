import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, props: cdk.StackProps) {
    super(scope, "TnmV2ApplicationStack", props)
  }
}

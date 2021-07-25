import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment"
import path from "path"
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"

import { Construct } from "constructs"
import { EnvironmentName } from "./environment-name"
import { RemovalPolicy } from "aws-cdk-lib"

interface ApplicationStackProps extends cdk.StackProps {
  environmentName: EnvironmentName
}

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, props: ApplicationStackProps) {
    super(scope, `${props.environmentName}-TnmV2AppStack`, { env: props.env })

    const removalPolicy =
      props.environmentName === "prod"
        ? RemovalPolicy.RETAIN
        : RemovalPolicy.DESTROY

    const deployBucket = new s3.Bucket(this, "TnmV2DeployBucket", {
      removalPolicy,
      bucketName: `${props.environmentName}-tnm-v2-app-deploy-bucket`,
      publicReadAccess: true,
      websiteIndexDocument: "index.html"
    })

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: { origin: new cloudfrontOrigins.S3Origin(deployBucket) }
    })

    new s3Deploy.BucketDeployment(this, "TnmV2Deploy", {
      sources: [
        // eslint-disable-next-line unicorn/prefer-module
        s3Deploy.Source.asset(path.join(__dirname, "..", "..", "public"))
      ],
      distribution,
      distributionPaths: ["/*"],
      destinationBucket: deployBucket
    })
  }
}

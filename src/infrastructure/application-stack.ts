import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment"
import * as path from "path"
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"

import { Construct } from "constructs"

interface ApplicationStackProps extends cdk.StackProps {
  environmentName: string
}

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, props: ApplicationStackProps) {
    super(scope, `${props.environmentName}-TnmV2ApplicationStack`, props)

    const deployBucket = new s3.Bucket(this, "TnmV2DeployBucket", {
      bucketName: `${props.environmentName}-tnm-v2-deploy-bucket`,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    })

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: { origin: new cloudfrontOrigins.S3Origin(deployBucket) },
    })

    new s3Deploy.BucketDeployment(this, "TnmV2Deploy", {
      sources: [
        s3Deploy.Source.asset(path.join(__dirname, "..", "..", "public")),
      ],
      distribution,
      distributionPaths: ["/*"],
      destinationBucket: deployBucket,
    })

    new s3Deploy.BucketDeployment(this, "TnmV2DeployStorybook", {
      sources: [
        s3Deploy.Source.asset(path.join(__dirname, "..", "..", "public")),
      ],
      distributionPaths: ["/storybook/*"],
      distribution,
      destinationBucket: deployBucket,
      destinationKeyPrefix: "storybook",
    })
  }
}

import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment"
import path from "path"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"

import { Construct } from "constructs"
import { EnvironmentName } from "./environment-name"
import { RemovalPolicy } from "aws-cdk-lib"
import { ARecord, IHostedZone, RecordTarget } from "aws-cdk-lib/lib/aws-route53"
import { Certificate } from "aws-cdk-lib/lib/aws-certificatemanager"
import { CloudFrontTarget } from "aws-cdk-lib/lib/aws-route53-targets"

interface ApplicationStackProps extends cdk.StackProps {
  environmentName: EnvironmentName
  dnsZone: IHostedZone
  certificateArn: string
  baseDomainName: string
}

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, props: ApplicationStackProps) {
    super(scope, `${props.environmentName}-TnmV2AppStack`, { env: props.env })

    const removalPolicy =
      props.environmentName === "prod"
        ? RemovalPolicy.RETAIN
        : RemovalPolicy.DESTROY

    const domainPrefix =
      props.environmentName !== "prod" ? `${props.environmentName}.` : ""

    const domainName = `${domainPrefix}${props.baseDomainName}`

    const deployBucket = new s3.Bucket(this, "TnmV2DeployBucket", {
      removalPolicy,
      bucketName: domainName,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html"
    })

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "TnmV2AppCloudfrontDistribution",
      {
        originConfigs: [
          {
            customOriginSource: {
              domainName: deployBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          Certificate.fromCertificateArn(
            this,
            "AppCertificate",
            props.certificateArn
          ),
          { aliases: [domainName] }
        )
      }
    )

    new ARecord(this, "BensWebsiteBucketRecord", {
      zone: props.dnsZone,
      recordName: domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
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

import { Stack, StackProps } from "aws-cdk-lib"
import {
  Certificate,
  CertificateValidation
} from "aws-cdk-lib/lib/aws-certificatemanager"
import { IHostedZone } from "aws-cdk-lib/lib/aws-route53"
import { Construct } from "constructs"
import { EnvironmentName } from "./environment-name"

interface CertificateStacProps {
  zone: IHostedZone
  environmentName: EnvironmentName
  baseDomainName: string
}

export class CertificateStack extends Stack {
  constructor(scope: Construct, props: StackProps & CertificateStacProps) {
    super(scope, `${props.environmentName}-TnmV2CertificateStack`, {
      env: { ...props.env, region: "us-east-1" }
    })

    const domainPrefix =
      props.environmentName !== "prod" ? `${props.environmentName}.` : ""

    const domainName = `${domainPrefix}${props.baseDomainName}`

    new Certificate(this, "BensWebsiteCertificate", {
      domainName: domainName,
      validation: CertificateValidation.fromDns()
    })
  }
}

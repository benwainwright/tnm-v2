import { Stack, StackProps } from "aws-cdk-lib"
import {
  Certificate,
  DnsValidatedCertificate
} from "aws-cdk-lib/lib/aws-certificatemanager"
import { IHostedZone } from "aws-cdk-lib/lib/aws-route53"
import { Construct } from "constructs"
import { EnvironmentName } from "./environment-name"

interface CertificateStacProps {
  zone: IHostedZone
  environmentName: EnvironmentName
  prefix: string
  baseDomainName: string
}

export class CertificateStack extends Stack {
  public readonly certificate: Certificate
  constructor(scope: Construct, props: StackProps & CertificateStacProps) {
    super(
      scope,
      `${props.environmentName}-TnmV2CertificateStack${
        props.prefix === "api" ? "-api" : ""
      }`,
      {
        env: { ...props.env, region: "us-east-1" }
      }
    )

    const domainPrefix =
      props.environmentName !== "prod" ? `${props.environmentName}.` : ""

    const domainName = `${domainPrefix}${props.prefix}.${props.baseDomainName}`

    this.certificate = new DnsValidatedCertificate(
      this,
      "BensWebsiteCertificate",
      {
        domainName: domainName,
        hostedZone: props.zone,
        region: "us-east-1"
      }
    )
  }
}

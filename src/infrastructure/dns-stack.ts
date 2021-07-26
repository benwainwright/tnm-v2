import { Stack, StackProps } from "aws-cdk-lib"
import { IHostedZone, PublicHostedZone } from "aws-cdk-lib/lib/aws-route53"
import { Construct } from "constructs"

export class DnsZoneStack extends Stack {
  public readonly domainName: string
  public readonly hostedZone: IHostedZone
  constructor(scope: Construct, props: StackProps) {
    super(scope, `TnmV2DnsStack`, { env: props.env })

    this.domainName = `thenutritionistmcr.com`

    this.hostedZone = new PublicHostedZone(this, "HostedZone", {
      zoneName: this.domainName
    })
  }
}

import * as cdk from "aws-cdk-lib"
import { AclStack } from "./acl-stack"
import { ApplicationStack } from "./application-stack"
import { BackendStack } from "./backend-stack"
import { CertificateStack } from "./certificate-stack"
import { DnsZoneStack } from "./dns-stack"

const app = new cdk.App()

const env = {
  account: "568693217207",
  region: "eu-west-2"
}

const BASE_DOMAIN_NAME = "app.thenutritionistmcr.com"

const dnsZone = new DnsZoneStack(app, { env })

const devCertificate = new CertificateStack(app, {
  zone: dnsZone.hostedZone,
  environmentName: "dev",
  baseDomainName: BASE_DOMAIN_NAME
})

new ApplicationStack(app, {
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
  environmentName: "dev",
  certificateArn:
    "arn:aws:acm:us-east-1:568693217207:certificate/dd2edad9-21ad-48e1-bea9-5a3df4655cf5",
  env
})

const devBackend = new BackendStack(app, {
  environmentName: "dev",
  callbackUrl: "https://d2bnp0b9ah9f76.cloudfront.net/",
  env
})

new CertificateStack(app, {
  zone: dnsZone.hostedZone,
  environmentName: "test",
  baseDomainName: "app.thenutritionistmcr.com"
})

new ApplicationStack(app, {
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
  certificateArn:
    "arn:aws:acm:us-east-1:568693217207:certificate/b30c0783-1879-4396-8b8d-bb444e8d1502",
  environmentName: "test",
  env
})

const testBackend = new BackendStack(app, {
  environmentName: "test",
  callbackUrl: "https://d2bnp0b9ah9f76.cloudfront.net/",
  env
})

new CertificateStack(app, {
  zone: dnsZone.hostedZone,
  environmentName: "prod",
  baseDomainName: "app.thenutritionistmcr.com"
})

new ApplicationStack(app, {
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
  environmentName: "prod",
  certificateArn:
    "arn:aws:acm:us-east-1:568693217207:certificate/a0647c72-985a-4343-86fa-2749cd632909",
  env
})

const prodBackend = new BackendStack(app, {
  environmentName: "prod",
  callbackUrl: "https://dw40nwmhtomz7.cloudfront.net",
  env
})

new AclStack(app, {
  env,
  userPools: [devBackend.userPool, testBackend.userPool, prodBackend.userPool],
  poolManagers: ["lawrence", "ryan"],
  developers: ["ben"],
  CIUser: "GithubActions"
})

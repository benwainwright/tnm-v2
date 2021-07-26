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

const BASE_DOMAIN_NAME = "thenutritionistmcr.com"

const dnsZone = new DnsZoneStack(app, { env })

////// Dev ////////

new ApplicationStack(app, {
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
  environmentName: "dev",
  env
})

const devBackend = new BackendStack(app, {
  environmentName: "dev",
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
  callbackUrl: "https://d2bnp0b9ah9f76.cloudfront.net/",
  env
})

////// Test /////

new ApplicationStack(app, {
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
  environmentName: "test",
  env
})

const testBackend = new BackendStack(app, {
  environmentName: "test",
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
  callbackUrl: "https://d2bnp0b9ah9f76.cloudfront.net/",
  env
})

////// Prod /////

new ApplicationStack(app, {
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
  environmentName: "prod",
  env
})

const prodBackend = new BackendStack(app, {
  environmentName: "prod",
  dnsZone: dnsZone.hostedZone,
  baseDomainName: BASE_DOMAIN_NAME,
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

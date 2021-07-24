import * as cdk from "aws-cdk-lib"
import * as cognito from "aws-cdk-lib/aws-cognito"
import { IUserPool } from "aws-cdk-lib/aws-cognito"
import { Construct } from "constructs"

interface BackendStackProps extends cdk.StackProps {
  environmentName: string
  callbackUrl: string
}

export class BackendStack extends cdk.Stack {
  public userPool: IUserPool
  constructor(scope: Construct, props: BackendStackProps) {
    super(scope, `${props.environmentName}-TnmV2BackendStack`, {
      env: props.env
    })

    const verificationString = `Hey {username}! Thanks for signing up to The Nutritionist Manchester. Your verification code is {####}`
    const invitationString = `Hey {username}! you have been invited to join The Nutritionist Manchester. Your temporary password is {####}`
    this.userPool = new cognito.UserPool(this, "Users", {
      userPoolName: `${props.environmentName}-tnm-users`,
      selfSignUpEnabled: true,

      userVerification: {
        emailBody: verificationString,
        emailSubject: `TNM signup`,
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: verificationString
      },

      userInvitation: {
        emailSubject: `TNM invite`,
        emailBody: invitationString,
        smsMessage: invitationString
      },

      signInAliases: {
        username: true,
        email: true,
        phone: true
      },
      customAttributes: {
        salutation: new cognito.StringAttribute({ mutable: true }),
        snack: new cognito.StringAttribute({ mutable: true }),
        startDate: new cognito.DateTimeAttribute({ mutable: true }),
        paymentDayOfMonth: new cognito.NumberAttribute({ mutable: true }),
        notes: new cognito.StringAttribute({ mutable: true }),
        pauseStart: new cognito.DateTimeAttribute({ mutable: true }),
        pauseEnd: new cognito.DateTimeAttribute({ mutable: true }),
        daysPerWeek: new cognito.NumberAttribute({ mutable: true }),
        legacyPrice: new cognito.NumberAttribute({ mutable: true }),
        breakfast: new cognito.BooleanAttribute({ mutable: true }),
        plan: new cognito.StringAttribute({ mutable: true }),
        exclusions: new cognito.StringAttribute({ mutable: true })
      }
    })

    new cdk.CfnOutput(this, "UserPoolId", {
      value: this.userPool.userPoolId
    })

    const client = this.userPool.addClient("Client", {
      oAuth: {
        callbackUrls: [props.callbackUrl]
      }
    })

    new cdk.CfnOutput(this, "ClientId", {
      value: client.userPoolClientId
    })

    const domain = this.userPool.addDomain("Domain", {
      cognitoDomain: {
        domainPrefix: `${props.environmentName}-tnmv2-auth`
      }
    })

    const signInUrl = domain.signInUrl(client, {
      redirectUri: props.callbackUrl
    })

    const url = domain.baseUrl()

    new cdk.CfnOutput(this, "Auth Url", {
      value: url
    })

    new cdk.CfnOutput(this, "Redirect Url", {
      value: signInUrl
    })
  }
}

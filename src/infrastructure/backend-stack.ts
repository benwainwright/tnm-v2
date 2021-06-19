import * as cdk from "aws-cdk-lib"
import * as cognito from "aws-cdk-lib/aws-cognito"
import { Construct } from "constructs"

interface BackendStackProps extends cdk.StackProps {
  environmentName: string
  callbackUrl: string
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, props: BackendStackProps) {
    super(scope, `${props.environmentName}-TnmV2BackendStack`)

    const verificationString = `Hey {username}! Thanks for signing up to The Nutritionist Manchester. Your verification code is {####}`
    const invitationString = `Hey {username}! you have been invited to join The Nutritionist Manchester. Your temporary password is {####}`
    const pool = new cognito.UserPool(this, "Users", {
      userPoolName: `${props.environmentName}-tnm-users`,
      selfSignUpEnabled: true,

      userVerification: {
        emailBody: verificationString,
        emailSubject: `TNM signup`,
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: verificationString,
      },

      userInvitation: {
        emailSubject: `TNM invite`,
        emailBody: invitationString,
        smsMessage: invitationString,
      },

      signInAliases: {
        username: true,
        email: true,
        phone: true,
      },
      customAttributes: {
        surname: new cognito.StringAttribute({ mutable: true }),
        salutation: new cognito.StringAttribute({ mutable: true }),
        address: new cognito.StringAttribute({ mutable: true }),
        telephone: new cognito.StringAttribute({ mutable: true }),
        startDate: new cognito.DateTimeAttribute({ mutable: true }),
        paymentDayOfMonth: new cognito.NumberAttribute({ mutable: true }),
        notes: new cognito.StringAttribute({ mutable: true }),
        email: new cognito.StringAttribute({ mutable: true }),
        pauseStart: new cognito.DateTimeAttribute({ mutable: true }),
        pauseEnd: new cognito.DateTimeAttribute({ mutable: true }),
        daysPerWeek: new cognito.NumberAttribute({ mutable: true }),
        legacyPrice: new cognito.NumberAttribute({ mutable: true }),
        breakfast: new cognito.BooleanAttribute({ mutable: true }),
        plan: new cognito.StringAttribute({ mutable: true }),
        exclusions: new cognito.StringAttribute({ mutable: true }),
      },
    })

    new cdk.CfnOutput(this, "UserPoolId", {
      value: pool.userPoolId,
    })

    const client = pool.addClient("Client", {
      oAuth: {
        callbackUrls: [props.callbackUrl],
      },
    })

    new cdk.CfnOutput(this, "ClientId", {
      value: client.userPoolClientId,
    })

    const domain = pool.addDomain("Domain", {
      cognitoDomain: {
        domainPrefix: `${props.environmentName}-tnmv2-auth`,
      },
    })

    const signInUrl = domain.signInUrl(client, {
      redirectUri: props.callbackUrl,
    })

    const url = domain.baseUrl()

    new cdk.CfnOutput(this, "Auth Url", {
      value: url,
    })

    new cdk.CfnOutput(this, "Redirect Url", {
      value: signInUrl,
    })
  }
}

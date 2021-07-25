/* eslint-disable unicorn/prefer-module */
import * as cdk from "aws-cdk-lib"
import { RemovalPolicy } from "aws-cdk-lib"
import * as cognito from "aws-cdk-lib/aws-cognito"
import { UserPool } from "aws-cdk-lib/aws-cognito"
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  RestApi
} from "aws-cdk-lib/lib/aws-apigateway"
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/lib/aws-dynamodb"
import { NodejsFunction } from "aws-cdk-lib/lib/aws-lambda-nodejs"
import { Construct } from "constructs"
import path from "path"
import { EnvironmentName } from "./environment-name"

interface BackendStackProps extends cdk.StackProps {
  environmentName: EnvironmentName
  callbackUrl: string
}

const HANDLER_FILE_NAME = "handler.ts"

export class BackendStack extends cdk.Stack {
  public userPool: UserPool
  constructor(scope: Construct, props: BackendStackProps) {
    super(scope, `${props.environmentName}-TnmV2BackendStack`, {
      env: props.env
    })

    const removalPolicy =
      props.environmentName === "prod"
        ? RemovalPolicy.RETAIN
        : RemovalPolicy.DESTROY

    const verificationString = `Hey {username}! Thanks for signing up to The Nutritionist Manchester. Your verification code is {####}`
    const invitationString = `Hey {username}! you have been invited to join The Nutritionist Manchester. Your temporary password is {####}`
    this.userPool = new cognito.UserPool(this, "Users", {
      removalPolicy,
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

    new Table(this, "CustomisationsTable", {
      removalPolicy,
      tableName: `${props.environmentName}-TnmV2-customisations-table`,
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      }
    })

    new Table(this, "RecipesTable", {
      removalPolicy,
      tableName: `${props.environmentName}-TnmV2-recipes-table`,
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      }
    })

    const appApi = new RestApi(this, "api", {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS
      },
      restApiName: `${props.environmentName}-api`
    })

    const apiFunction = new NodejsFunction(this, "ApiFunction", {
      functionName: `${props.environmentName}-tnmv2-api-function`,
      entry: path.resolve(__dirname, "..", "app", "api", HANDLER_FILE_NAME),
      bundling: {
        nodeModules: ["ts-tiny-invariant"],
        loader: {
          ".graphql": "text"
        }
      }
    })

    const auth = new CognitoUserPoolsAuthorizer(this, "ApiAuthoriser", {
      cognitoUserPools: [this.userPool]
    })

    const apiIntegration = new LambdaIntegration(apiFunction)

    appApi.root.addMethod("GET", apiIntegration, {
      authorizer: auth,
      authorizationType: AuthorizationType.COGNITO
    })
  }
}

/* eslint-disable unicorn/prefer-module */
import * as cdk from "aws-cdk-lib"
import * as cognito from "aws-cdk-lib/aws-cognito"
import { UserPool } from "aws-cdk-lib/aws-cognito"
import {
  Cors,
  LambdaIntegration,
  RestApi
} from "aws-cdk-lib/lib/aws-apigateway"
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/lib/aws-dynamodb"
import { NodejsFunction } from "aws-cdk-lib/lib/aws-lambda-nodejs"
import { Construct } from "constructs"
import path from "path"

interface BackendStackProps extends cdk.StackProps {
  environmentName: string
  callbackUrl: string
}

export class BackendStack extends cdk.Stack {
  public userPool: UserPool
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

    const customisationsTable = new Table(this, "CustomisationsTable", {
      tableName: `${props.environmentName}-TnmV2-customisations-table`,
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      }
    })

    new Table(this, "RecipesTable", {
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

    const customersFunction = new NodejsFunction(this, "CustomersApiFunction", {
      functionName: `${props.environmentName}-TnmV2-customers-api-function`,
      entry: path.resolve(
        __dirname,
        "..",
        "app",
        "api",
        "handlers",
        "customers.ts"
      )
    })
    const customersResource = appApi.root.addResource("customers")
    const customersIntegration = new LambdaIntegration(customersFunction)
    customersResource.addMethod("GET", customersIntegration)

    const recipesFunction = new NodejsFunction(this, "RecipesApiFunction", {
      functionName: `${props.environmentName}-TnmV2-recipes-api-function`,
      entry: path.resolve(
        __dirname,
        "..",
        "app",
        "api",
        "handlers",
        "recipes.ts"
      )
    })
    const recipesResource = appApi.root.addResource("recipes")
    const recipesIntegration = new LambdaIntegration(recipesFunction)
    recipesResource.addMethod("GET", recipesIntegration)

    const customisationsFunction = new NodejsFunction(
      this,
      "CustomisationsApiFunction",
      {
        functionName: `${props.environmentName}-TnmV2-customisations-api-function`,
        entry: path.resolve(
          __dirname,
          "..",
          "app",
          "api",
          "handlers",
          "customisations.ts"
        )
      }
    )
    const customisationsResource = appApi.root.addResource("customisations")
    const customisationsIntegration = new LambdaIntegration(
      customisationsFunction
    )
    customisationsResource.addMethod("GET", customisationsIntegration)
    customisationsTable.grantReadData(customisationsFunction)
  }
}

import { Stack, StackProps } from "aws-cdk-lib"
import { IUserPool } from "aws-cdk-lib/aws-cognito"
import {
  Effect,
  Group,
  IGroup,
  ManagedPolicy,
  PolicyStatement,
  User
} from "aws-cdk-lib/lib/aws-iam"
import { Construct } from "constructs"

interface AclStackProps {
  userPools: IUserPool[]
  poolManagers: string[]
  developers: string[]
  CIUser: string
}

const makeUsersWithGroups = (
  context: Construct,
  names: string[],
  groups: IGroup[]
) => {
  names.forEach(name => {
    new User(context, `AwsUser${name}`, {
      groups: groups,
      userName: name
    })
  })
}

export class AclStack extends Stack {
  constructor(scope: Construct, props: AclStackProps & StackProps) {
    super(scope, `TnmV2AppAclStack`, { env: props.env })

    const accountManagementPolicies = [
      ManagedPolicy.fromAwsManagedPolicyName("job-function/SupportUser"),
      ManagedPolicy.fromAwsManagedPolicyName("job-function/Billing"),
      ManagedPolicy.fromAwsManagedPolicyName("job-function/ViewOnlyAccess")
    ]

    const poolManagerPolicy = new ManagedPolicy(this, "managerPolicy", {
      managedPolicyName: "tnm-pool-manager-policy",
      statements: [
        new PolicyStatement({
          actions: [
            "cognito-idp:AdminAddUserToGroup",
            "cognito-idp:AdminConfirmSignUp",
            "cognito-idp:AdminCreateUser",
            "cognito-idp:RemoveUserFromGroup",
            "cognito-idp:AdminResetUserPassword",
            "cognito-idp:RespondToAuthChallenge",
            "cognito-idp:AdminSetUserMFAPreference",
            "cognito-idp:AdminSetUserPassword",
            "cognito-idp:AdminSetUserSettings",
            "cognito-idp:AdminUpdateUserAttributes",
            "cognito-idp:AdminUserGlobalSignOut",
            "cognito-idp:ChangePassword",
            "cognito-idp:ConfirmForgotPassword",
            "cognito-idp:ConfirmSignup",
            "cognito-idp:CreateUserImportJob",
            "cognito-idp:DeleteUserAttributes",
            "cognito-idp:ForgotPassword",
            "cognito-idp:Describe*",
            "cognito-idp:AdminList*",
            "cognito-idp:AdminGet*",
            "cognito-idp:Get*",
            "cognito-idp:ResendConfirmationCode",
            "cognito-idp:StartUserInputJob",
            "cognito-idp:StopUserImportJob"
          ],
          effect: Effect.ALLOW,
          resources: props.userPools.map(pool => pool.userPoolArn)
        })
      ]
    })

    const businessManagers = new Group(this, "CognitoManagersGroup", {
      groupName: "tnm-business-managers",
      managedPolicies: [poolManagerPolicy, ...accountManagementPolicies]
    })

    const appDevelopingPolicies = [
      ...accountManagementPolicies,
      ManagedPolicy.fromAwsManagedPolicyName("AWSCloudFormationFullAccess"),
      ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMFullAccess"),
      ManagedPolicy.fromAwsManagedPolicyName("AmazonCognitoPowerUser"),
      ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"),
      ManagedPolicy.fromAwsManagedPolicyName("CloudFrontFullAccess"),
      ManagedPolicy.fromAwsManagedPolicyName("IAMFullAccess")
    ]

    const appDevelopers = new Group(this, "AppDevelopersGroup", {
      managedPolicies: appDevelopingPolicies,
      groupName: "tnm-developers"
    })

    makeUsersWithGroups(this, props.poolManagers, [businessManagers])
    makeUsersWithGroups(this, props.developers, [appDevelopers])

    new User(this, "TnmAppCiUser", {
      managedPolicies: appDevelopingPolicies,
      userName: "tnm-app-ci-user"
    })
  }
}

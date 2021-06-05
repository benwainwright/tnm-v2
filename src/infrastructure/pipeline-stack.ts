import * as cdk from "aws-cdk-lib"
import * as codebuild from "aws-cdk-lib/aws-codebuild"
import * as codepipeline from "aws-cdk-lib/aws-codepipeline"
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions"
import * as secretsManager from "aws-cdk-lib/aws-secretsmanager"

interface ApplicationCiStackProps extends cdk.StackProps {}

export class ApplicationCiStack extends cdk.Stack {
  constructor(app: cdk.App, props: ApplicationCiStackProps) {
    super(app, "TnmV2CIStack", props)

    const buildOutput = new codepipeline.Artifact("AppBuildOutput")
    const testAndBuild = new codebuild.PipelineProject(this, "TnmV2Build", {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            commands: "yarn install",
          },
          build: {
            commands: ["yarn lint", "yarn test:coverage", "yarn build"],
          },
        },
        artifacts: {
          "base-directory": "public",
          files: ["**/*"],
        },
      }),
    })

    const deployToTest = new codebuild.PipelineProject(this, "TnmV2Deploy", {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            commands: "yarn install",
          },
          build: {
            commands: ["yarn cdk deploy --require-approval never"],
          },
        },
        artifacts: {
          "base-directory": "public",
          files: ["**/*"],
        },
      }),
    })

    const githubToken = new secretsManager.Secret(this, "TnmV2OauthToken", {
      secretName: "TNMV2/GITHUB_TOKEN",
    })

    const sourceOutput = new codepipeline.Artifact()

    new codepipeline.Pipeline(this, "TnmV2Pipeline", {
      stages: [
        {
          stageName: "Source",
          actions: [
            new codepipelineActions.GitHubSourceAction({
              actionName: "GithubSource",
              branch: "master",
              owner: "benwainwright",
              repo: "tnm-v2",
              oauthToken: githubToken.secretValue,
              output: sourceOutput,
            }),
          ],
        },
        {
          stageName: "Test and Build",
          actions: [
            new codepipelineActions.CodeBuildAction({
              actionName: "TestAndBuild",
              project: testAndBuild,
              input: sourceOutput,
              outputs: [buildOutput],
            }),
          ],
        },
        {
          stageName: "Deploy to test",
          actions: [
            new codepipelineActions.CodeBuildAction({
              actionName: "DeployToTest",
              project: deployToTest,
              input: buildOutput,
            }),
          ],
        },
      ],
    })
  }
}

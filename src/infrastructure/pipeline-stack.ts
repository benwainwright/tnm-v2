import * as cdk from "aws-cdk-lib"
import * as codebuild from "aws-cdk-lib/aws-codebuild"
import * as codepipeline from "aws-cdk-lib/aws-codepipeline"
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions"

interface ApplicationCiStackProps extends cdk.StackProps {}

const project = (
  commands: string[],
  outputFolder?: string
): codebuild.PipelineProjectProps => ({
  environment: {
    buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
  },
  buildSpec: codebuild.BuildSpec.fromObject({
    version: "0.2",
    phases: {
      install: {
        commands: "yarn install",
      },
      build: {
        commands,
      },
    },
    artifacts: outputFolder
      ? {
          "base-directory": outputFolder,
          files: ["**/*"],
        }
      : undefined,
  }),
})

export class ApplicationCiStack extends cdk.Stack {
  constructor(app: cdk.App, props: ApplicationCiStackProps) {
    super(app, "TnmV2CIStack", props)

    const buildOutput = new codepipeline.Artifact("AppBuildOutput")

    const testAndBuild = new codebuild.PipelineProject(
      this,
      "TnmV2Build",
      project(["yarn lint", "yarn test:coverage", "yarn build"], "public")
    )

    const deployToTest = new codebuild.PipelineProject(
      this,
      "TnmV2Deploy",
      project(["yarn cdk deploy --require-approval never"])
    )

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
              oauthToken: cdk.SecretValue.secretsManager("TNM_V2/GITHUB_TOKEN"),
              output: sourceOutput,
            }),
          ],
        },
        {
          stageName: "Test-and-build",
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
          stageName: "Deploy-to-test",
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

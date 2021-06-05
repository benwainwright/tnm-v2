import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as codebuild from "aws-cdk-lib/aws-codebuild"
import * as codepipeline from "aws-cdk-lib/aws-codepipeline"
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions"

interface ApplicationCiStackProps extends cdk.StackProps {}

const project = (
  commands: string[],
  cacheBucket: s3.IBucket,
  outputFolder?: string
): codebuild.PipelineProjectProps => ({
  cache: codebuild.Cache.bucket(cacheBucket),
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
    cache: {
      paths: ["node_modules/**/*", "package.json"],
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

    const pipelineCache = new s3.Bucket(this, "TnmV2PipelineCache", {
      bucketName: "tnm-v2-pipeline-cache",
    })

    const testAndBuild = new codebuild.PipelineProject(
      this,
      "TnmV2Build",
      project(
        ["yarn lint", "yarn test:coverage", "yarn build"],
        pipelineCache,
        "public"
      )
    )

    const deployToTest = new codebuild.PipelineProject(
      this,
      "TnmV2Deploy",
      project(["yarn cdk deploy --require-approval never"], pipelineCache)
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

import type { Config } from "@jest/types"

const commonConfig: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/src/testSetup.ts"],
  transform: {
    "^.+\\.(svg|css|png)$": "jest-transform-stub",
    "^.+\\.[jt]sx?$": "<rootDir>/config/jest-preprocess.js"
  },
  moduleNameMapper: {
    "^@common(.*)$": "<rootDir>/src/common$1"
  },

  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `cypress`
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: [`<rootDir>/config/loadershim.js`]
}

const config: Config.InitialOptions = {
  reporters: ["default", "jest-skipped-reporter"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/**/*.spec.{ts,tsx}",
    "!<rootDir>/src/**/*.spec.node.{ts,tsx}",
    "!<rootDir>/src/scripts/*.{ts,tsx}",
    "!<rootDir>/src/infrastructure/**",
    "!<rootDir>/src/**/*.stories.{ts,tsx}"
  ],
  coverageThreshold: {
    global: {
      statements: 96,
      lines: 90,
      branches: 86,
      functions: 90
    }
  },
  projects: [
    {
      displayName: "jsdom",
      testEnvironment: "jsdom",
      testPathIgnorePatterns: [
        ...(commonConfig.testPathIgnorePatterns ?? []),
        "<rootDir>/**/*.spec.node.{ts,tsx}"
      ],
      testMatch: ["<rootDir>/**/*.spec.{ts,tsx}"],
      ...commonConfig
    },
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.spec.node.ts"],
      ...commonConfig
    }
  ]
}

export default config

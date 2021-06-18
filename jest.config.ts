import type { Config } from "@jest/types"

const commonConfig: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/src/testSetup.ts"],
  transform: {
    "^.+\\.(svg|css|png)$": "jest-transform-stub",
    "^.+\\.[jt]sx?$": "<rootDir>/config/jest-preprocess.js",
  },
  moduleNameMapper: {
    "^@common(.*)$": "<rootDir>/src/common$1",
  },

  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `cypress`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: [`<rootDir>/config/loadershim.js`],
  coverageThreshold: {
    global: {
      statements: 90,
      lines: 90,
      branches: 80,
      functions: 80,
    },
  },
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/scripts/*.{ts,tsx}",
    "!<rootDir>/src/infrastructure/**",
    "!<rootDir>/src/**/*.stories.{ts,tsx}",
  ],
}

const config: Config.InitialOptions = {
  projects: [
    {
      displayName: "jsdom",
      testEnvironment: "jsdom",
      testPathIgnorePatterns: [
        ...(commonConfig.testPathIgnorePatterns ?? []),
        "<rootDir>/**/*.spec.node.{ts,tsx}",
      ],
      testMatch: ["<rootDir>/**/*.spec.{ts,tsx}"],
      ...commonConfig,
    },
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.spec.node.ts"],
      ...commonConfig,
    },
  ],
}

export default config

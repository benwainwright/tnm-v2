import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  rootDir: "../",
  setupFilesAfterEnv: ["<rootDir>/src/testSetup.ts"],
  transform: {
    "^.+\\.(svg|css|png)$": "jest-transform-stub",
    "^.+\\.[jt]sx?$": "<rootDir>/config/jest-preprocess.js",
  },
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/infrastructure/**",
    "!<rootDir>/src/**/*.stories.{ts,tsx}",
  ],
  moduleNameMapper: {
    "^@common(.*)$": "<rootDir>/src/common$1",
  },
  coverageThreshold: {
    global: {
      statements: 90,
      lines: 90,
      branches: 80,
      functions: 80,
    },
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `cypress`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: [`<rootDir>/config/loadershim.js`],
}

export default config

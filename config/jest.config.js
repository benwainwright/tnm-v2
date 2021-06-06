module.exports = {
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
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/config/loadershim.js`],
}
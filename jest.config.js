module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/testSetup.ts"],
  transform: {
    "^.+\\.svg$": "jest-transform-stub",
  },
}


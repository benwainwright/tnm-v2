module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  env: {
    "cypress/globals": true,
  },
  plugins: ["only-error", "cypress"],
  extends: `react-app`,
  rules: {
    "no-console": "error",
  },
  ignorePatterns: [
    "node_modules",
    "public",
    "cdk.out",
    "coverage",
    "template",
    "storybook-static",
  ],
};

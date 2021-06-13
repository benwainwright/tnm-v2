module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  env: {
    "cypress/globals": true,
  },
  plugins: ["only-error", "cypress", "security", "fp"],
  overrides: [
    {
      files: ["**.spec.ts", "**.spec.tsx"],
      rules: {
        "fp/no-mutating-methods": "off",
        "fp/no-unused-expression": "off",
        "fp/no-delete": "off",
      },
    },
    {
      files: ["src/infrastructure/**"],
      rules: {
        "fp/no-class": "off",
        "fp/no-unused-expression": "off",
        "fp/no-this": "off",
      },
    },
    {
      files: ["*.js"],
    },
  ],
  extends: [
    `react-app`,
    `plugin:security/recommended`,
    `plugin:fp/recommended`,
  ],
  rules: {
    "fp/no-nil": "off",
    "fp/no-unused-expression": "off",
    "fp/no-mutation": "off",
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

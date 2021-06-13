module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  env: {
    "cypress/globals": true,
  },
  plugins: ["only-error", "cypress", "security", "fp", "sonarjs", "@emotion"],
  overrides: [
    {
      files: ["**.spec.ts", "**.spec.tsx"],
      rules: {
        "sonarjs/no-identical-functions": "off",
        "sonarjs/no-duplicate-string": "off",
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
      rules: {
        "unicorn/prefer-module": "off",
      },
    },
  ],
  extends: [
    `react-app`,
    "plugin:unicorn/recommended",
    `plugin:sonarjs/recommended`,
    `plugin:security/recommended`,
    `plugin:fp/recommended`,
  ],
  rules: {
    "@emotion/syntax-preference": ["error", "string"],
    "@emotion/jsx-import": "error",
    "@emotion/no-vanilla": "error",
    "@emotion/import-from-emotion": "error",
    "@emotion/styled-import": "error",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-reduce": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-fn-reference-in-iterator": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/filename-case": "off",
    "unicorn/better-regex": "off",
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

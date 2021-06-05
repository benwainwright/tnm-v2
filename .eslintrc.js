module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  plugins: ["only-error"],
  extends: `react-app`,
  rules: {
    "no-console": "error",
  },
  ignorePatterns: ["node_modules", "public", "cdk.out", "coverage", "template"],
}

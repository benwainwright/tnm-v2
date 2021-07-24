module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],

  babel: async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      [
        "module-resolver",
        {
          alias: {
            "@app": "./src/app",
          },
        },
      ],
    ],
  }),

  core: {
    builder: "webpack5",
  },
}

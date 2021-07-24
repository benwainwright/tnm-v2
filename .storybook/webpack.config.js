const path = require("path")

module.exports = async ({ config }) => {
  const rules = config.module.rules

  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ]
  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve("@babel/plugin-proposal-class-properties"),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve("babel-plugin-remove-graphql-queries"),
  ]
  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ["browser", "module", "main"]

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [
        ["react-app", { flow: false, typescript: true, runtime: "automatic" }],
      ],
      plugins: [
        [
          "module-resolver",
          {
            alias: {
              "@app": "./src/app",
            },
          },
        ],
        require.resolve("@babel/plugin-proposal-class-properties"),
        // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
        require.resolve("babel-plugin-remove-graphql-queries"),
      ],
    },
  })
  config.resolve.extensions.push(".ts", ".tsx")

  const fileLoaderRule = rules.find((rule) => rule.test.test(".svg"))
  const test = /\.(inline.svg|woff|woff2|ttf|otf)$/
  fileLoaderRule.exclude = test

  config.module.rules.push({
    test: /\.inline.svg$/,
    use: ["@svgr/webpack"],
  })

  config.module.rules.push({
    test: /\.(woff|woff2|ttf|otf)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          query: "[file].[name]",
        },
      },
    ],
    include: path.resolve(__dirname, "../"),
  })

  return config
}

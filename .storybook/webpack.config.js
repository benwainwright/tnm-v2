const path = require("path")

module.exports = async ({ config }) => {
  const rules = config.module.rules

  const fileLoaderRule = rules.find((rule) => rule.test.test(".svg"))
  const test = /\.(inline.svg|woff|woff2|ttf|otf)$/
  fileLoaderRule.exclude = test

  config.module.rules.push({
    test: /\.inline.svg$/,
    use: ["@svgr/webpack"],
  })

  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
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

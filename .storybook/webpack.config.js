const path = require("path")

module.exports = async ({ config }) => {
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

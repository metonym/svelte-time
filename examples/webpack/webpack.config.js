const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";
const PROD = NODE_ENV === "production";

module.exports = {
  entry: { "build/bundle": ["./src/index.js"] },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte/src/runtime"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditionNames: ["svelte", "browser", "import"],
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "/public"),
    filename: PROD ? "[name].[contenthash].js" : "[name].js",
    chunkFilename: "[name].[id].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: false,
            hotReload: !PROD,
            compilerOptions: { dev: !PROD },
          },
        },
      },
      {
        test: /\.m?js/,
        resolve: { fullySpecified: false },
      },
    ],
  },
  mode: NODE_ENV,
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body></body>
      </html>
      `,
    }),
  ],
  stats: "errors-only",
  devtool: PROD ? false : "source-map",
  devServer: { hot: true, historyApiFallback: true },
};

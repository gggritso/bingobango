const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/js/index.js",
  output: {
    filename: "script.js",
    path: __dirname + "/dist",
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "BingoBango",
      template: "src/index.ejs"
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/img", to: "img" }]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  devServer: {
    static: "./dist"
  }
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/js/index.js",
  output: {
    filename: "script.js",
    path: __dirname + "/dist"
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
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("tailwindcss"), require("autoprefixer")]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./dist"
  }
};

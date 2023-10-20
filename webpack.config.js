const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, "assets"),
  mode: "development",
  entry: "./main.js",
  output: {
    filename: `./${filename("js")}`,
    path: path.resolve(__dirname, "app"),
    publicPath: "",
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, "app"),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "assets/index.html"),
      filename: "index.html",
      minify:
        // {
        // collapseWhitespace: isProd,
        false,
      // },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./${filename("css")}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/img"),
          to: path.resolve(__dirname, `app/img/${filename("[ext]")}`),
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/svg"),
          to: path.resolve(__dirname, `app/svg/${filename("[ext]")}`),
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/video"),
          to: path.resolve(__dirname, `app/video/${filename("[ext]")}`),
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/tours"),
          to: path.resolve(__dirname, `app/tours/${filename("[ext]")}`),
        },
      ],
    }),
    // jQuery globally
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
        ],
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: `./img/${filename("[ext]")}`,
        },
      },
      {
        test: /\.(?:|svg)$/,
        type: "asset/resource",
        generator: {
          filename: `./svg/${filename("[ext]")}`,
        },
      },
      {
        test: /\.(?:|mp4)$/,
        type: "asset/resource",
        generator: {
          filename: `./video/${filename("[ext]")}`,
        },
      },
    ],
  },
};

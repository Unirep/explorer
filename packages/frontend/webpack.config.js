const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = (env) => ({
  entry: ['./src/index.jsx'],
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        // exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inlineSource: '.(js|css)',
      favicon: 'public/favicon.ico',
    }),
    new MiniCssExtractPlugin(),
  ],
})

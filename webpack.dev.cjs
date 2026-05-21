const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          'style-loader',
          'css-loader', // sem modules aqui!
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: './public',
    },
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:4000'),
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './public/favicon.png',
    }),
  ],
});

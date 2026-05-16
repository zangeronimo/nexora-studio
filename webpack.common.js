const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main-bundle-[fullhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@application': path.resolve(__dirname, 'src/application'),
      '@infra': path.resolve(__dirname, 'src/infra'),
      '@presentation': path.resolve(__dirname, 'src/presentation'),
    },
  },
  plugins: [new CleanWebpackPlugin()],
};

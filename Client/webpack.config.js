const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
  mode: 'production',
  entry: glob.sync('./src/**/*.{ts,js}'),
  // devtool: 'inline-source-map',
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: false,
          keep_fnames: false,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { crypto: false },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
};

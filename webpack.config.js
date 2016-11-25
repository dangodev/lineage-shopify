const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './App.js',
    //fonts: './Font.css',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] },
          },
        ],
      },
      {
        test: /App\.css/,
        use: [
          ExtractTextPlugin.extract('css'),
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
      {
        test: /Font\.css/,
        use: [
          ExtractTextPlugin.extract('css'),
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: ['url-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new ExtractTextPlugin('[name].css.liquid'),
  ],
};

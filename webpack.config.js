const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin('app.css');
const extractFonts = new ExtractTextPlugin('fonts.css');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './App.js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        test: /App\.css/,
        loader: extractStyles.extract({
          loader: 'css-loader?importLoaders=1!postcss-loader',
        }),
      },
      {
        test: /Font\.css/,
        loader: extractFonts.extract({
          loader: 'css-loader',
        }),
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
    extensions: ['.js', '.vue'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    extractStyles,
    extractFonts,
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
  },
};

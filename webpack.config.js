const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin('app.css.liquid');
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
        use: 'vue-loader',
      },
      {
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
        test: /\.js$/,
      },
      {
        test: /App\.css/,
        use: extractStyles.extract({
          use: 'css-loader?importLoaders=1!postcss-loader',
        }),
      },
      {
        test: /Font\.css/,
        use: extractFonts.extract({
          use: 'css-loader',
        }),
      },
      {
        test: /\.(woff|woff2)$/,
        use: 'url-loader',
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

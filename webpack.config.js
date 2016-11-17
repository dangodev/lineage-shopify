const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: 'application.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader', options: { presets: ['es2015'] } },
        ],
      },
      {
        test: /\.css$/,
        use: [
          ExtractTextPlugin.extract('css'),
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css.liquid',
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('postcss-cssnext'),
        ],
      },
    }),
  ],
};

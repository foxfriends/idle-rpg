'use strict';
const autoprefixer = require('autoprefixer');
const path = require('path');
module.exports = {
  entry: './public_html/script/index.js',
  output: {
    path: path.resolve('.', 'public_html'),
    filename: 'index.min.js',
  },
  module: {
    loaders: [
      { test: /\.s(a|c)ss$/, exclude: /node_modules.*\.js/, loader: 'style-loader!css-loader!postcss-loader!sass-loader' }, // styles
      { test: /\.aag$/, loader: 'text-loader' }, // ascii art graphic
    ],
  },
  resolve: {
    alias: {
      graphics: path.resolve('./public_html/graphics')
    }
  },
};

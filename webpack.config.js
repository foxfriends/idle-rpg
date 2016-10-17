'use strict';
const autoprefixer = require('autoprefixer');
const path = require('path');
module.exports = {
  entry: './public_html/script/index.js',
  output: {
    path: './public_html',
    filename: 'index.min.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules.*\.js/, loader: 'babel?plugins[]=transform-es2015-modules-commonjs' }, // scripts
      { test: /\.s(a|c)ss$/, exclude: /node_modules.*\.js/, loader: 'style!css!postcss!sass' }, // styles
      { test: /\.aag$/, loader: 'text' } // ascii art graphic
    ],
  },
  resolve: {
    alias: {
      graphics: path.resolve('./public_html/graphics')
    }
  },
  postcss: function() {
    return [ autoprefixer ];
  },
  devtool: ['source-map']
};

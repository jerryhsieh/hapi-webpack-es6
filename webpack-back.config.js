//
//
// File name : webpack-back.config.js
// Author: Jerry Hsieh @ 2018-04-21
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

const Path = require('path');
const fs = require('fs');
//const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = [
  'server'
]

// the clean options to use
let cleanOptions = {
  verbose: true
}

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: Path.resolve(__dirname, 'server'),
    filename: 'server.bundle.js'
  },
  target: 'node',
  externals: nodeModules,
  node: {
    'fs': 'empty',
    'net': 'empty',
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebPackPlugin({
    //   template: "./src/index.html",
    //   filename: "./index.html"
    // }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new CopyWebpackPlugin([
      {
        from: 'src/templates/',
        to: 'templates'
      },
    ])
  ]
};


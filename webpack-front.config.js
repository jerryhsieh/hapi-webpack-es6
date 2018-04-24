//
//
// File name : webpack-front.config.js
// Author: Jerry Hsieh @ 2018-04-24
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

const Path = require('path');

module.exports = {
  entry: [
    './src/index.client.js'
  ],
  output: {
    path: Path.resolve(__dirname, 'server/build'),
    filename: 'application.js'
  }
}

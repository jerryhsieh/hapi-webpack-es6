//
//
// File name : index.client.js
// Author: Jerry Hsieh @ 2018-04-24
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

import Application from './lib'
import HelloController from './HelloController';
import MainController from './MainController';

const application = new Application({
  '/': MainController,
  '/hello/{name*}': HelloController
}, {
    target: 'body'
  });

application.start();



//
//
// File name : index.js
// Author: Jerry Hsieh @ 2018-04-25
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
//

import options from './options';
import Application from './lib';
import MainController from './MainController';
import HelloController from './HelloController';

const application = new Application({
  '/hello/{name*}': HelloController,
  '/': MainController,
}, options);

const start = async () => {
  if (options.provision) {
    await options.provision();      // hapi registration
  }
  await application.start();
  if (options.server) {
    console.log('Server running at:', options.server.info.uri);
  }
}

start();

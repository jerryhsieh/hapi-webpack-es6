//
//
// File name : index.js
// Author: Jerry Hsieh @ 2018-04-22
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

export default class Application {
  constructor(routes, options) {
    this.server = options.server;
    this.registerRoutes(routes);
  }

  registerRoutes(routes) {
    for (let path in routes) {
      this.addRoute(path, routes[path]);
    }
  }

  addRoute(path, handler) {
    this.server.route({
      path: path,
      method: 'GET',
      handler: handler
    })
  }

  start() {
    this.server.start();
  }
}

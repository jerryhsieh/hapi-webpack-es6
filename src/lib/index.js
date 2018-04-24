//
//
// File name : index.js
// Author: Jerry Hsieh @ 2018-04-22
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
//
//import Controller from "./controller";

export default class Application {
  constructor(routes, options) {
    this.server = options.server;
    this.document = options.document;
    this.registerRoutes(routes);
  }

  registerRoutes(routes) {
    for (let path in routes) {
      this.addRoute(path, routes[path]);
    }
  }

  addRoute(path, Controller) {
    this.server.route({
      path: path,
      method: 'GET',
      handler: (request, h) => {
        const controller = new Controller({
          query: request.query,
          params: request.params
        });
        controller.index(this, request, h, (err) => {
          if (err) {
            return { err: err };
          }
        });

        let body = controller.toString();
        return this.document(this, controller, request, h, body);
      }
    })
  }

  start() {
    this.server.start();
  }
}

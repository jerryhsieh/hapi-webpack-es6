//
//
// File name : index.client.js
// Author: Jerry Hsieh @ 2018-04-24
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

import Call from 'call';
import Query from 'query-string';
import cookie from './cookie.client';

export default class Application {
  constructor(routes, options) {
    this.routes = routes;
    this.options = options;

    // use call to establish client router
    this.router = new Call.Router();
    this.registerRoutes(routes);
  }

  registerRoutes(routes) {
    for (let path in routes) {
      this.router.add({
        path: path,
        method: 'GET'
      })
    }
  }

  navigate(url, push = true) {
    if (!history.pushState) {         // browser do not support history API
      window.location = url;
      return;
    }

    // decomp query string
    let urlParts = url.split('?');
    // destruct to array
    let [path, search] = urlParts;
    // match router?
    let match = this.router.route('get', path);
    // decomp router route and params
    let { route, params } = match;
    // query controller
    let Controller = this.routes[route];
    // if match and Controller exist, instanciate
    if (route && Controller) {
      const controller = new Controller({
        query: Query.parse(search),
        params: params,
        cookie: cookie
      });

      const request = () => { };
      const reply = () => { };
      controller.index(this, request, reply, (err) => {
        if (err) {
          return err;
        }
      });

      controller.render(this.options.target);
    }

    if (push) {
      history.pushState({}, null, url);
    }
  }

  start() {
    this.popStateListener = window.addEventListener('popstate', (e) => {
      let { pathname, search } = window.location;
      let url = `${pathname}${search}`;
      this.navigate(url, false);
    });


    this.clickListener = document.addEventListener('click', (e) => {
      let { target } = e;
      let identifier = target.dataset.navigate;
      let href = target.getAttribute('href');

      if (identifier !== undefined) {
        if (href) {
          e.preventDefault();
        }
        this.navigate(identifier || href);
      }
    })
  }
}

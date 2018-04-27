//
//
// File name : controller.js
// Author: Jerry Hsieh @ 2018-04-22
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

export default class Controller {
  constructor(context) {
    this.context = context;
  }

  index(application, request, h, callback) {
    this.application = application;
    this.request = request;
    this.h = h;
    callback(null);
  }

  toString() {
    return 'succcess';
    //return callback(null, 'success');
  }

  render(target, callback) {
    let body = this.toString();
    document.querySelector(target).innerHTML = body;
    return callback(null, body);
  }

  serialize() {
    console.log('serialize with ', JSON.stringify(this.context.data || {}));
    return JSON.stringify(this.context.data || {});
  }

  deserialize() {
    if (window.__STATE__) {
      this.context.data = JSON.parse(window.__STATE__ || {});
      console.log('deserialize with context data', this.context.data);
    }
  }

  attach(el) {
    // to be implement by application
  }

  detach(el) {
    // to be implement by application
  }
}

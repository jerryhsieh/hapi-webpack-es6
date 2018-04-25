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

  render(target) {
    let body = this.toString();
    console.log('in render with target', target);
    console.log('render with body', body);
    document.querySelector(target).innerHTML = body;
  }
}

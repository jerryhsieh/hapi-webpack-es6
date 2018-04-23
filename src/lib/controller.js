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

  index(application, request, h) {
    this.application = application;
    this.request = request;
    this.h = h;
  }

  toString() {
    return 'succcess';
  }
}

//
//
// File name : MainController.js
// Author: Jerry Hsieh @ 2018-04-23
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

import Controller from './lib/controller';


export default class MainController extends Controller {

  index(appliction, request, reply, callback) {
    if (!this.context.cookie.get('greeting')) {
      this.context.cookie.set('greeting', '1', {
        expires: 1000 * 60 * 60 * 24 * 365
      });
    }
    return reply.redirect('/hello')
  }

  toString() {
    let html = 'Hello Hapi!';
    return html;
    //return callback(null, html);
  }
}

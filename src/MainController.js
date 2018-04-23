//
//
// File name : MainController.js
// Author: Jerry Hsieh @ 2018-04-23
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

import Controller from './lib/controller';


export default class MainController extends Controller {
  toString() {
    let html = 'Hello Hapi!';
    return html;
  }
}

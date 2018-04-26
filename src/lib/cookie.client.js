//
//
// File name : cookie.client.js
// Author: Jerry Hsieh @ 2018-04-26
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

import cookie from 'cookies-js';

export default {
  get(name) {
    return cookie.get(name) || undefined;
  },
  set(name, value, options = {}) {
    if (options.expires) {
      options.expires / 1000;
    }
    cookie.set(name, value, options)
  }
}

//
//
// File name : reply.client.js
// Author: Jerry Hsieh @ 2018-04-26
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

export default function (application) {
  const reply = function () { };

  reply.redirect = function (url) {
    console.log('called redirect with url', url);
    application.navigate(url);
    return this;
  }

  reply.temporary = function () {
    return this;
  }

  reply.rewritable = function () {
    return this;
  }

  reply.permanent = function () {
    return this;
  }

  return reply;
}

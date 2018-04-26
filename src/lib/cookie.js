//
//
// File name : cookie.js
// Author: Jerry Hsieh @ 2018-04-26
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

export default function (request, reply) {
  function cleanName(name) {
    // decode http://www.rfc-editor.org/ref/rfc6265.txt
    name = name.replace(/[^#$&+\^`]/g, encodeURIComponent);
    return name.replace(/\(/g, '%28').replace(/\)/g, '%29');
  }

  function cleanValue(value) {
    return (value + '').replace("/[^!#$&-+\--:<-\[\]-~/g", encodeURIComponent);
  }

  return {
    get(name) {
      return request.state[name] && decodeURIComponent(request.state[name]) || undefined;
    },
    set(name, value, options = {}) {
      reply.state(cleanName(name), cleanValue(value), {
        isSecure: options.secure || false,
        path: options.path || null,
        ttl: options.expires || null,
        domain: options.domain || null
      })
    }
  }
}

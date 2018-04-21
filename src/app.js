//
//
// File name : app.js
// Author: Jerry Hsieh @ 2018-04-21
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 
const Hapi = require('hapi');
const Vision = require('vision');
const Nunjucks = require('nunjucks');

const server = Hapi.server({ port: 3000 });

const provision = async () => {
  await server.register(Vision);
  server.views({
    engines: {
      html: {
        compile: (src, options) => {
          const template = Nunjucks.compile(src, options.environment);
          return (context) => {
            return template.render(context);
          };
        },
        prepare: (options, next) => {
          options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false });
          return next();
        }
      }
    },
    relativeTo: __dirname,
    path: 'templates'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (req, h) {
      return 'Hello Hapi!';
    }
  });

  server.route({
    method: 'GET',
    path: '/hello',
    handler: function (req, h) {
      return h.view('index', {
        fname: 'Jerry',
        lname: 'Hsieh'
      })
    }
  });

  await server.start();
  console.log('Server running at:', server.info.uri);
};

provision();

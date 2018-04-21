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
    path: '/hello/{name*}',
    handler: function (req, h) {
      return h.view('index', getName(req))
    }
  });

  await server.start();
  console.log('Server running at:', server.info.uri);
};

provision();

function getName(req) {
  let name = {
    fname: 'Jerry',
    lname: 'Hsieh'
  };
  let nameParts = req.params.name ? req.params.name.split('/') : [];
  name.fname = (nameParts[0] || req.query.fname) || name.fname;
  name.lname = (nameParts[1] || req.query.lname) || name.lname;
  return name;
}

//
//
// File name : app.js
// Author: Jerry Hsieh @ 2018-04-21
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
//
import Application from './lib';

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

  const application = new Application({
    '/': function (req, h) {
      return 'Hello Hapi!';
    },
    '/hello/{name*}': function (req, h) {
      return h.view('index', getName(req));
    }
  }, {
      server: server
    });
  await application.start();
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

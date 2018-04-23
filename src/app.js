//
//
// File name : app.js
// Author: Jerry Hsieh @ 2018-04-21
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
//
import Application from './lib';
import HelloController from './HelloController';
import MainController from './MainController';

const Hapi = require('hapi');
const Vision = require('vision');
const Nunjucks = require('nunjucks');

const server = Hapi.server({ port: 3000 });

//use nunjunks as template engine
let viewEngine = {
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
};

const provision = async () => {
  await server.register(Vision);
  server.views({
    engines: viewEngine,
    relativeTo: __dirname,
    path: 'templates'
  });

  const application = new Application({
    '/': MainController,
    '/hello/{name*}': HelloController
  }, {
      server: server,
      document: function (application, controller, request, h, body) {
        console.log('got body', body);
        //return Nunjucks.render('index', { body: body });
        return h.view('index', { body: body });
      }
    });
  await application.start();
  console.log('Server running at:', server.info.uri);
};

provision();


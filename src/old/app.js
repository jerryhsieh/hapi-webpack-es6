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
const Inert = require('inert');
const Path = require('path');
const APP_FILE_PATH = '/application.js';


const server = Hapi.server({
  port: 3000
});

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
  await server.register(Inert);

  server.views({
    engines: viewEngine,
    relativeTo: __dirname,
    path: 'templates'
  });

  server.route({
    method: 'GET',
    path: APP_FILE_PATH,
    handler: (request, h) => {
      return h.file(Path.join(__dirname, 'build', 'application.js'));
    }
  });

  server.route({
    method: 'GET',
    path: '/templates/{template*}',
    handler: (request, h) => {
      return h.file(Path.join(__dirname, 'templates', request.params.template));
    }
  });

  const application = new Application({
    '/': MainController,
    '/hello/{name*}': HelloController
  }, {
      server: server,
      document: function (application, controller, request, h, body) {
        return h.view('index', {
          body: body,
          application: APP_FILE_PATH
        });
      }
    });
  await application.start();
  console.log('Server running at:', server.info.uri);
};

provision();


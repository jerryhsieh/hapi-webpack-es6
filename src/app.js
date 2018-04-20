import Hapi from 'hapi';

const server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});


server.route({
  method: 'GET',
  path: '/',
  handler: function (req, h) {
    return 'hello! hapi';
  }
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function (req, h) {
    return 'hello world';
  }
});


// start the server
async function start() {

  try {
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();

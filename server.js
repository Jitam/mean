const http = require('http');
const app = require('./backend/app');
const { debug } = require('console');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if(isNaN(port)) {
    return val;
  }

  if(port >= 0) {
    return port;
  }

  return false;
};


const onError = error => {
  if(error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
  switch(error.code) {
    case "EACCES" :
      console.error(bind + " require elevated privilages");
      process.exit(1);
      break;
    default:
      throw error;
  }
};


const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
  debug("Listening on " + bind);
}

const port = process.env.PORT || 4000;

app.set('port', port);
const server = http.createServer(app);
server.on("error", onError);
server.on("Listening", onListening);
server.listen(port);

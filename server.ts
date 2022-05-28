import express from 'express'
import * as httpModule from 'http';
import * as dotenv from 'dotenv'
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import methodOverride from "method-override";
import debug from "debug";
import api from "./api";
import swagger from "./common/swagger"
import websocket from "./websocket";

// loading environment variables
dotenv.config()

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || '3000'

// initializing express
const server = express()

// setup requests logger
const logger = dev? morgan("dev") : morgan("common")
server.use(logger)

//const appDebug = debug('farm:server')
// server.use(appDebug)

server.set('port', port)

const onAppError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break;
    default:
      throw error
  }
}
server.on('error', onAppError)


if (!dev) {
  server.set('trust proxy', 1); // sets req.hostname, req.ip
}

// Initialize swagger in dev mode
if (dev) {
  swagger(server)
}
// secure app by setting various HTTP headers
server.use(helmet());

// support CORS for API calls
server.use(cors({
  origin: dev ? process.env.APP_URL : process.env.PRODUCTION_URL_APP,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}))
// enable json requests
server.use(express.json())
// allow method overrides
server.use(methodOverride('_method'))
// enable url encoding
server.use(express.urlencoded({ extended: true }))

// Initialize api routes
api(server)

// Create server
const httpServer = httpModule.createServer(server);

//Initialize websocket
websocket(server)

// handle unhandled routes
server.get('*', (req, res) => {
  res.status(403).send();
});

// start listening to port for incoming requests
httpServer.listen(port, () => {
    console.log(`> Ready on ${dev ? process.env.API_URL : process.env.PRODUCTION_URL_API}`);
})
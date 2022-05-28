import express from 'express'
import * as httpModule from 'http';
import * as dotenv from 'dotenv'
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import methodOverride from "method-override";
import debug from "debug";
import api from "./api";

dotenv.config()
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || '3000'

const server = express()

// log
const logger = dev? morgan("dev") : morgan("common")
server.use(logger)

const appDebug = debug('farm:server')

server.set('port', port)

server.use(appDebug)

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
  //sessionOptions.cookie.secure = true; // sets cookie over HTTPS only
}

server.use(helmet());
server.use(cors({
  origin: dev ? process.env.APP_URL : process.env.PRODUCTION_URL_APP,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}))
server.use(express.json())
server.use(methodOverride('_method'))
server.use(express.urlencoded({ extended: true }))
// const compression = require('compression')
// app.use(compression)

api(server)

const httpServer = httpModule.createServer(server);

server.get('*', (req, res) => {
  res.status(403).send();
});

httpServer.listen(port, () => {
  logger.debug('debug right before info');
  logger.info(`> Ready on ${dev ? process.env.API_URL : process.env.PRODUCTION_URL_API}`);
})
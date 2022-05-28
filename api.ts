import * as express from 'express';
import defaultRoutes from "./routes";

import errorMiddleware from "./middleware/error-middleware";
import notFoundMiddleware from "./middleware/not-found-middleware";

export default function api(server: express.Express) {

    server.use('/api', defaultRoutes)

    server.use(errorMiddleware)
    server.use(notFoundMiddleware);
}
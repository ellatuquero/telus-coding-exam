import 'express-async-errors';
import express from 'express';
import compression from 'compression';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import { mainRoutes } from '@/routes';
import { CORS_POLICY } from '@/middlewares/cors';
import { ResourceNotFoundError } from '@/middlewares/classes';
import { errorHandler } from '@/middlewares/errorHandler';
import {
  DB_CONNECTION_STRING,
  ENVIRONMENT,
  EXPRESS_COOKIE_SECRET,
} from '@/constants/constants';


const server = express();
// Start of express config
server

    // allow proxy - because traffic is being proxied to our application through ingress-nginx
    .set('trust proxy', true)

    .use(express.json({ limit: '50mb' }))

    // CORS
    .use(CORS_POLICY(ENVIRONMENT))
    .use(express.urlencoded({ limit: '100mb', extended: true }))

    .use(
        expressSession({
            name: EXPRESS_COOKIE_SECRET,
            secret: EXPRESS_COOKIE_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                signed: false
            },
            store: MongoStore.create({
                mongoUrl: DB_CONNECTION_STRING,
            })
        })
    )

    .use(compression())

    // MAIN ROUTE
    .use('/v1', mainRoutes)

    .all('*', () => {
        throw new ResourceNotFoundError();
    })
    // NOTE: Always position the error handler middleware after the main route
    .use(errorHandler);

export { server };

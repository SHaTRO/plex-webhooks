import * as config from 'config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';

import { pingHandler } from './controllers/ping';
import * as router from '../lib/router';
import { plexHandler } from './controllers/plex';


/** name of the server */
export const name: string = config.get('server.name');
/** version of the server */
export const version: string = config.get('server.version');
/** port of the server */
export const port: number = config.get('server.port');
/** server signature message */
export const msg = {
  good: `${name} v.${version} listening at http://localhost:${port}`,
};

/** Directory where multer puts its uploaded */
export const plexUploads: string = config.get('plex.uploads');
const upload = multer({ dest: plexUploads });

const runtime: number = Date.now();

/** Express application */
export function app(preApp?: express.Express): express.Express {
  const app: express.Express = preApp || express();
  // TODO: verify against multipart posts and remove the body parser if not needed
  // right now the bodyParser is here because of development testing using curl
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const get = function(path: string, handler: router.routeHandler): void { 
    app.get(path, router.routeWrapper(handler));
  }
  const postMulti = function(path: string, handler: router.routeHandler): void {
    app.post(path, upload.any(), router.routeWrapper(handler));
  }
  // SETUP ROUTES
  if (!preApp) {
    // only add ping if we are building our express app from scatch here
    get('/ping', pingHandler);
  }
  postMulti('/plex', plexHandler);
  return app;
}

/** time since application was initialized (in microseconds) */
export function getRuntime(): number {
  return Date.now() - runtime;
}

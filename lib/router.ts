
import * as express from 'express';

type expressHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => express.Response;
export type routeHandler = (req: express.Request) => Promise<any>

export function routeWrapper(handler: routeHandler, opt?: any): expressHandler {
  return function(req: express.Request, res: express.Response, next: express.NextFunction): express.Response {
    handler(req).then( (data) => {
      res.send(JSON.stringify(data));
      res.end();
    }).catch(next);
    return res;
  }
}

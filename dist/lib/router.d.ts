import * as express from 'express';
declare type expressHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => express.Response;
export declare type routeHandler = (req: express.Request) => Promise<any>;
export declare function routeWrapper(handler: routeHandler, opt?: any): expressHandler;
export {};

import * as express from 'express';
import { PingResponse } from '..';
export declare function pingHandler(req: express.Request): Promise<PingResponse | undefined>;

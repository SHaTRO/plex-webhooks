
import * as express from 'express';
import { server, PingResponse } from '..';

export async function pingHandler(req: express.Request): Promise<PingResponse|undefined> {
  return {
    name: server.name,
    version: server.version,
    runtime: server.getRuntime(),
  }
}

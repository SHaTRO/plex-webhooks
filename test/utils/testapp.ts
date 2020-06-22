
import * as express from 'express'; 
import { server } from '../../lib';

export async function startApp(): Promise<express.Express> {
  const app = server.app();  
  return app;
}


import * as config from 'config';
import { Request } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';

import { MulterFiles, PlexDispatcher } from '..';

let counter = 0;
const OUTPUT_PATH: string = config.get('plex.logdir');
PlexDispatcher.registerHandler('*', async function(payload: any, files: MulterFiles): Promise<void> {
  const file = path.join(OUTPUT_PATH, Date.now()+'.'+(++counter));
  fs.writeFileSync(file, JSON.stringify(payload));
});


/** subset of fields from Express.Multer.File */
export interface FileInfo {
  path: string;
  fieldname: string;
  mimetype: string;
  size: number;
}

function toFileInfo(file: Express.Multer.File): FileInfo {
  const { path, fieldname, mimetype, size } = file;
  return { path, fieldname, mimetype, size };
}

/**
 * Request handler (controller) for Plex webhook requests.
 * Plex posts using multi-part uploads. 
 * The server route wrapper parses the webhook "payload" as a JSON request body.
 * The server route wrapper directs the uploads to the OUTPUT_PATH and multer puts the files in req.files.
 * This controller calls the Plex dispatcher class with the parsed payload (amended with .fileInfo) and any files.
 * @param req 
 */
export async function plexHandler(req: Request): Promise<any> {
  if (req.body && req.body.payload) {
    req.body = JSON.parse(req.body.payload);
    if (req.files) {
      const files: FileInfo[] = [];
      if (Array.isArray(req.files)) {
        files.push(...(req.files as Express.Multer.File[]).map( (f) => toFileInfo(f) ));
      } else {
        const reqFiles = req.files as { [ key: string]: Express.Multer.File[] };
        for (const fieldname in reqFiles) {
          files.push(...(reqFiles[fieldname].map( (f) => toFileInfo(f) )));
        }
      }
      if (files.length > 0) {
        req.body.fileInfo = files;
      }
    }
    await PlexDispatcher.getInstance().dispatch(req.body, req.files);
    return {
      status: 'success',
    };
  } else {
    return {
      status: 'failure',
      reason: 'invalid input',
    };
  }
}

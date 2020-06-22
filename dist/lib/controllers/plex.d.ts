import { Request } from 'express';
/** subset of fields from Express.Multer.File */
export interface FileInfo {
    path: string;
    fieldname: string;
    mimetype: string;
    size: number;
}
/**
 * Request handler (controller) for Plex webhook requests.
 * Plex posts using multi-part uploads.
 * The server route wrapper parses the webhook "payload" as a JSON request body.
 * The server route wrapper directs the uploads to the OUTPUT_PATH and multer puts the files in req.files.
 * This controller calls the Plex dispatcher class with the parsed payload (amended with .fileInfo) and any files.
 * @param req
 */
export declare function plexHandler(req: Request): Promise<any>;

import * as express from 'express';
/** name of the server */
export declare const name: string;
/** version of the server */
export declare const version: string;
/** port of the server */
export declare const port: number;
/** server signature message */
export declare const msg: {
    good: string;
};
/** Directory where multer puts its uploaded */
export declare const plexUploads: string;
/** Express application */
export declare function app(preApp?: express.Express): express.Express;
/** time since application was initialized (in microseconds) */
export declare function getRuntime(): number;

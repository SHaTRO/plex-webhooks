import * as chai from 'chai';
import * as config from 'config';
import * as express from 'express';
import * as fs from 'fs-extra';
import * as request from 'supertest';

import { startApp } from '../utils/testapp';
import { MulterFiles, PlexDispatcher, PingResponse } from '../../lib';

const assert = chai.assert;

describe('app setup', () => {

  const logdir: string = config.get('plex.logdir');
  const uploads: string = config.get('plex.uploads');

  beforeAll( () => {
    fs.emptyDirSync(logdir);
    fs.emptyDirSync(uploads);
  });

  let app: express.Express;
  let latestFiles: MulterFiles;
  it('app instance', async () => {
    app = await startApp();
    assert.exists(app);
    PlexDispatcher.getInstance().register(
      'media.play', 
      async (payload: any, files: MulterFiles): Promise<void> => {
        latestFiles = files;
        return;
      }
    );
  });

  it('/ping route', async () => {
    const response = await request(app).get('/ping').expect(200);
    assert.exists(response, 'got a response');
    const body = response.body;
    assert.exists(body, 'got a response body');
    const { name, version, runtime } = (body as PingResponse);
    assert.equal(name, 'plex-monitor', 'name matches');
    assert.equal(version, '0.1.0', 'version matches');
    assert.exists(runtime);
  });

  it('/plex route (200 OK, failure result)', async () => {
    const response = await request(app).post('/plex').expect(200);
    assert.exists(response, 'got a response result');
    const body = response.body;
    assert.exists(body, 'got a response body');
    assert.equal(body.status, 'failure', 'failure detected as expected');
    assert.equal(body.reason, 'invalid input', 'failure reason');
  });

  it('/plex route (200 OK, success result)', async () => {
    const plexRequest = {
      payload: JSON.stringify({
        event: 'media.play',
        mockdata: {
          idea: 'I got nothin', 
        },
      }),
    }; 
    const response = await request(app)
                            .post('/plex')
                            .send(plexRequest)
                            .expect(200);
    assert.exists(response, 'got a response result');
    const body = response.body;
    assert.exists(body, 'got a response body');
    assert.equal(body.status, 'success', 'success detected as expected');
  });

  it('/plex route (200 OK, multi-part success)', async () => {
    const plexPayload = JSON.stringify({
        event: 'media.play',
        mockdata: {
          idea: 'I got nothin', 
        },
    });
    const fileToSend = './test/fixtures/testimage.jpg';
    const fileStat = fs.statSync(fileToSend);
    const response = await request(app)
                            .post('/plex')
                            .field('payload', plexPayload)
                            .attach('image1', fileToSend)
                            .expect(200);
    assert.exists(response, 'got a response result');
    const body = response.body;
    assert.exists(body, 'got a response body');
    assert.equal(body.status, 'success', 'success detected as expected');
    const filesArray = latestFiles as Express.Multer.File[];
    assert.equal(filesArray.length, 1, 'one file uploaded');
    const uploadedFileStat = fs.statSync(filesArray[0].path);
    assert.equal(fileStat.size, uploadedFileStat.size, 'uploaded file size');
    assert.equal(filesArray[0].mimetype, 'image/jpeg', 'uploaded mime type');
  });
  
});


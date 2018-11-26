const settings = require('./settings.js');

const express = require('express'),
  app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');

const routes = require('./routes/intercom');
routes(app);

// set up http
const httpSettings = settings.server.http;

if (httpSettings.enabled) {
  http.createServer(app).listen(httpSettings.port);
}

// set up https
const httpsSettings = settings.server.https;

if (httpsSettings.enabled) {

  const paths = httpsSettings.certificatePaths;
  let sslPrivateKey;

  if (process.env.hasOwnProperty('SSL_PRIVATE_KEY')) {
      sslPrivateKey = Buffer.from(process.env.SSL_PRIVATE_KEY, 'utf8');
  } else {
      // read private key from env values
      sslPrivateKey = fs.readFileSync(paths.key);
  }

  const options = {
    key: sslPrivateKey,
    cert: fs.readFileSync(paths.cert),
    ca: fs.readFileSync(paths.ca)
  };

  https.createServer(options, app).listen(httpsSettings.port);
}

/* eslint-disable-next-line no-console*/
console.log('server started!');
const settings = require('./settings');

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
  const options = {
    key: fs.readFileSync(paths.key),
    cert: fs.readFileSync(paths.cert),
    ca: fs.readFileSync(paths.ca)
  }

  https.createServer(options, app).listen(httpsSettings.port);
}

console.log('server started!');
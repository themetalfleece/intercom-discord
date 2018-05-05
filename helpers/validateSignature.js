const bl = require('bl');
const crypto = require('crypto');

const hmac = crypto.createHmac('sha1', 'secret');

const settings = require('./../settings');

const hub_secret = settings.intercom.hub_secret;

function validateSignature(req, res) {

  // source: https://github.com/intercom-archive/intercom-webhooks/blob/master/node/index.js

  return new Promise((resolve, reject) => {

    const expectedSignature = req.get('x-hub-signature');

    req.pipe(bl(function (err, data) {

      if (err) {
        reject(err.message);
      }

      const event = JSON.parse(data.toString())

      if (!expectedSignature) {
        reject('not signed');
      }
      else {
        const calculatedSignature = 'sha1=' + crypto.createHmac('sha1', hub_secret).update(data).digest('hex');
        if (calculatedSignature !== expectedSignature) {
          reject('signature does not match');
        }
      }

      resolve(event);

    }));
  })

}

module.exports = validateSignature;
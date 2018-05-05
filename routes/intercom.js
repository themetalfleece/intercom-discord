const axios = require('axios');

const settings = require('./../settings');
const validateSignature = require('../helpers/validateSignature');
const userFriendlyEvent = require('../helpers/userFriendlyEvent');

'use strict';
module.exports = function (app) {

  app.post(settings.server.url, async function (req, res) {

    try {

      const event = await validateSignature(req, res);

      if (event.topic === 'ping' && !settings.enablePingNotifications) {
        res.sendStatus(200);
        return;
      }

      const userFriendly = userFriendlyEvent(event);

      await axios.post(settings.discord.webhook, {
        content: userFriendly
      });

      res.sendStatus(200);

    } catch (err) {

      res.sendStatus(400);

    }

  });

};


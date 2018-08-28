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

      const { topic, conversationURL, fields } = userFriendlyEvent(event);

      await axios.post(settings.discord.webhook,
        {
          embeds: [{
            color: 3447003,
            title: `**${topic}**`,
            url: conversationURL,
            timestamp: new Date(),
            fields
          }]
        }
      );

      res.sendStatus(200);

    } catch (err) {

      /* eslint-disable-next-line no-console */
      console.log(err);

      res.sendStatus(400);

    }

  });

};


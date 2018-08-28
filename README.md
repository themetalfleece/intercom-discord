# Intercom notifications for Discord

### This app listens to events from Intercom and posts them to Discord (using Intercom and Discord webhooks)
#### For example, whenever a user replies to a conversation, the following will be posted as soon as it happens:
![Intercom Bot in action](https://i.imgur.com/q5PryZa.png "Intercom webhook respsonds to a user-replied event")


## How to set up Intercom
* Open `Webhooks` by clicking your Avatar -> `Settings` -> `Developers` -> `Webhooks`
* click on `Create Webhook`
* as `webhook url` set the url your server will use. You can use something complex for security, but the notifications will be signed anyway. Example: `http://domain.com/webhook/123`.
* as `hub secret` use a strong string to be used for signing the notifications. You can use a [uuid string](https://www.uuidgenerator.net/version4). Note this down
* select which notifications you want to receive
* if you want to make any changes in the future, you can click the webhook's ID

## How to set up Discord
* on your Discord server's settings, go to `Webhooks`
* click on `Create Webhook`
* customize it as you want, by setting a picture and display name. Those will be used for the discord messages
* select the channel in which the messages will be posted
* note the `webhook url`

## How to get the server running
* clone this repo - `git clone https://github.com/themetalfleece/intercom-discord`
* install [node.js](https://nodejs.org/en/download/) (minimum and suggested: 8.11.1, version 10 is not tested)
* install the pm2 process manager - run `npm install pm2 -g`
* navigate to the project's directory and run `npm install` (or, if you're using yarn, run `yarn`)
* configure your server (look below)
* run the app - run `pm2 start app.js`. You can now close the console as it runs in the background
* for autorun on system startup, refer [here](http://pm2.keymetrics.io/docs/usage/startup/)

## How to configure the server
* copy the contents of `settings.json.example` located at the directory root into a `settings.json` file and edit it
* `server -> http and server -> https` configure if you want to use http/https and the ports to be used. For https, you also need to provide the path to the certificates relative to the project's directory
* `server -> url` configure the path your server listens. It's the same used for intercom's webhook configuration. For example, if you used `http://domain.com/webhook/123` in Intercom, you need to set `/webhook/123` here
* `intercom -> hub_secret` the secret key used for notification signing. It match much that in Intercom's webhook configuration
* `discord -> webhook` the `webhook url` discord provided. You can always find it in Discord at `Server Settings -> Webhooks -> Edit -> webhook url`
* `enablePingNotifications`: enable or disable `ping` events send by Intercom. I recommend you have it enabled until you make sure it works
* save the file
* if the server is already running with pm2, restart the server by running `pm2 restart app`

## Receiving notifications
To test if it works, you can go to Intercom's Webhooks page and click on the `ping` button. A message should be posted on Discord.
# Intercom notifications for Discord

### This app listens to events from Intercom and posts them to Discord (using Intercom and Discord webhooks)
### Currently, it successfully posts every notification about **any** type of event, in a sacure manner (notifications are signed and https is supported). However, it does so without providing much information about it. It will be improved in the future. If you want to contribute, take a look at `helpers/userFriendlyEvents.js`
#### For example, whenever a user replies to a conversation, the following will be posted as soon as it happens:
![Intercom Bot in action](https://i.imgur.com/l7WKdAG.png "Intercom webhook respsonds to a user-replied event")


## How to set up Intercom
* go to Intercom's [developer hub](https://developers.intercom.com/) and press the `Dashboard` button on the top right
* click on `Webhooks` (under `TOOLS`)
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
* install [node.js](https://nodejs.org/en/download/)
* install the pm2 process manager - run `npm install pm2 -g`
* navigate to the project's directory and run `npm install` (or, if you're using yarn, run `yarn`)
* configure your server (look below)
* run the app - run `pm2 start app.js`
* for autorun on system startup, refer [here](http://pm2.keymetrics.io/docs/usage/startup/)

## How to configure the server
* open the `settings.json` file located at the directory root
* `server -> http and server -> https` configure if you want to use http/https and the ports to be used. For https, you also need to provide the path to the certificates relative to the project's directory
* `server -> path` configure the path your server listens. It's the same used for intercom's webhook configuration. For example, if you used `http://domain.com/webhook/123` in Intercom, you need to set `wehbook/123` here.
* `intercom -> hub_secret` the secret key used for notification signing. It match much that in Intercom's webhook configuration
* `discord -> webhook` the `webhook url` discord provided. You can always find it in Discord at `Server Settings -> Webhooks -> Edit -> webhook url`
* save the file
* if the server is already running with pm2, restart the server by running `pm2 restart app`

## Receiving notifications
To test if it works, you can go to Intercom's Webhooks page and click on the `ping` button. A message should be posted on Discord.

The current notifications are not user-friendly, as I focused on creating the secure backbone. For now, it will show just the topic and will post any URLs it finds inside the message.
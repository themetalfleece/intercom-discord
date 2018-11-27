const settings = require('./settings.json');

// environmental values overwrite
if (process.env.hasOwnProperty('PROTOCOL')) {
    if (process.env.PROTOCOL === 'http') {
        settings.server.http.enabled = true;
        settings.server.https.enabled = false;
    } else if (process.env.PROTOCOL === 'https') {
        settings.server.https.enabled = true;
        settings.server.http.enabled = false;
    } else {
        throw new Error("Invalid protocol passed as a environmental value");
    }
}

if (process.env.hasOwnProperty('INTERCOM_HUB_SECRET')) {
    settings.intercom.hub_secret = process.env.INTERCOM_HUB_SECRET;
}

if (process.env.hasOwnProperty('DISCORD_WEBHOOK')) {
    settings.discord.webhook = process.env.DISCORD_WEBHOOK;
}

if (process.env.hasOwnProperty('SERVER_URL')) {
    settings.server.url = process.env.SERVER_URL;
}

module.exports = settings;
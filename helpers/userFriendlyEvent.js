const getUrls = require('get-urls');

function userFriendlyEvent(event) {
  const messageLines = [];
  messageLines.push(`A new event just arrived! Topic: **${event.topic}**`);

  const urls = getUrls(JSON.stringify(event));

  if (urls.size !== 0) {
    messageLines.push(`Found links in the message:`);
  }

  urls.forEach(url => {
    messageLines.push(`<${url}>`);
  });

  const message = messageLines.join('\n');

  return message;

}

module.exports = userFriendlyEvent;
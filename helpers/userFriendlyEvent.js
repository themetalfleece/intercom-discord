const getUrls = require('get-urls');

function userFriendlyEvent(event) {
  const messageLines = [];

  // TODO also parse the data of the event
  const parseTopic = {

    'conversation.user.created': () => `A user or lead initiated a message`,

    'conversation.user.replied': () => `A user replied to a conversation`,

    'conversation.admin.replied': () => `An admin replied to a conversation`,

    'conversation.admin.single.created': () => `An admin initiated a 1:1 conversation`,

    'conversation.admin.assigned': () => `An admin was assigned to a conversation`,

    'conversation.admin.noted': () => `An admin created a conversation note`,

    'conversation.admin.closed': () => `An admin closed a conversation`,

    'conversation.admin.opened': () => `An admin opened a conversation`,

    'user.created': () => `A user was created`,

    'user.deleted': () => `A user was deleted`,

    'user.unsubscribed': () => `A user was unsubscribed from email`,

    'user.email.updated': () => `A user updater their email address`,

    'user.tag.created': () => `A user was tagged`,

    'user.tag.deleted': () => `A user was untagged`,

    'contact.created': () => `A lead was created`,

    'contact.signed_up': () => `A lead was converted to a user`,

    'contact.added_email': () => `A lead added an email`,

    'visitor.signed_up': () => `A visitor was converted to a user`,

    'company.created': () => `A company was created`,

    'event.created': () => `A subscription to an event`,

    'ping': () => `Intercom ping to make sure the webhook works`
  }

  const topic = parseTopic[event.topic] ? parseTopic[event.topic]() : 'Unknown';

  messageLines.push(`A new event just arrived! Topic: **${topic}**`);

  const urls = getUrls(JSON.stringify(event));

  if (urls.size !== 0) {
    messageLines.push(`Found links in the message:`);

    urls.forEach(url => {
      messageLines.push(`<${url}>`);
    });
  }

  const message = messageLines.join('\n');

  return message;

}

module.exports = userFriendlyEvent;
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

  const eventTopic = parseTopic[eventTopic];
  const topic = eventTopic ? eventTopic() : 'Unknown';

  // each topic will be handled differently. For now, just find the link with '/conversations/' included
  // get the urls set
  const urls = getUrls(JSON.stringify(event));

  // find the needed url
  let conversationURL;
  if (urls.size !== 0) {
    conversationURL = [...urls].find(url => url.includes('conversations'));
  }

  return { topic, conversationURL };

}

module.exports = userFriendlyEvent;
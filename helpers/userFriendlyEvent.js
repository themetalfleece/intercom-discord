const getUrls = require('get-urls');
const settings = require('../settings');

function userFriendlyEvent(event) {

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
  };

  const topic = event.topic;

  const parsedTopic = parseTopic[topic];
  const friendlyTopic = parsedTopic ? parsedTopic() : 'Unknown';

  // each topic will be handled differently. For now, just find the link with '/conversations/' included
  // get the urls set
  const urls = getUrls(JSON.stringify(event));

  // find the needed url
  let conversationURL;
  if (urls.size !== 0) {
    conversationURL = [...urls].find(url => url.includes('conversations'));
  }

  const fields = [];

  function pushToFields(value, name) {
    if (value) {
      const limit = settings.richembedFieldValueCharLimit;

      // if it's not a string, stringify it
      let trimmedValue = typeof value === 'string' ? value : JSON.stringify(value);

      // if it exceeds the limit, keep characters equal to the limit - 3, and add '...' to it
      if (trimmedValue.length > limit) {
        trimmedValue = trimmedValue.substring(0, limit - 3);
        trimmedValue += '...';
      }

      fields.push({
        name,
        value: trimmedValue
      });
    }
  }

  if (event.data && event.data.item && event.data.item && event.data.item.type) {
    const item = event.data.item;

    if (topic === 'company.created') {
      pushToFields(item.name, 'Name');
      pushToFields(item.custom_attributes, 'Custom attributes');
    } else if (topic === 'user.created') {
      pushToFields(item.name, 'Name');
      pushToFields(item.email, 'email');
      pushToFields(item.phone, 'Phone Number');
    } else if (['conversation.admin.replied', 'conversation.user.replied', 'conversation.user.created', 'conversation.admin.assigned', 'conversation.admin.single.created'].includes(topic)) {

      pushToFields(item.user && item.user.name, 'Conversation recipient');

      if (topic === 'conversation.admin.assigned') {
        pushToFields(item.assignee && item.assignee.name, 'Assignee name');
      }

      let message;
      if (item.conversation_parts && item.conversation_parts.conversation_parts && item.conversation_parts.conversation_parts.length) {
        const parts = item.conversation_parts.conversation_parts;
        // get the last message by finding the max `created`
        const maxCreated = Math.max.apply(Math, parts.map(function (o) { return o.created_at; }));
        message = parts.find(function (o) { return o.created_at === maxCreated; });
      } else {
        message = item.conversation_message;
      }

      const body = message.body && message.body.replace(/<(.|\n)*?>/g, '');
      pushToFields(body, 'Message');
      pushToFields(message.author && message.author.name, 'Sent by');

    }

    // TODO for url use: item.links (values) or event.links (values)
  }

  return { topic: friendlyTopic, conversationURL, fields };

}

module.exports = userFriendlyEvent;

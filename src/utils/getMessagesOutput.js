const getMessagesOutput = (queryResult) => {
  const messages = [];

  if (queryResult.fulfillmentMessages && queryResult.fulfillmentMessages.length > 0) {
    queryResult.fulfillmentMessages.forEach(element => {
      messages.push(element.text.text[0])
    });
  } else {
    messages.push(queryResult.fulfillmentText);
  }

  return messages;
}

module.exports = getMessagesOutput;
const getMessagesOutput = require('./getMessagesOutput');

const formatResponse = async (responsesDialogflow) => {
  const {outputAudio, outputAudioConfig, queryResult} = responsesDialogflow[0];

  if (!queryResult) {
    return responsesDialogflow;
  };

  const messagesOutput = getMessagesOutput(queryResult);

  return {
    input: {
      textRecognized: queryResult.queryText,
    },
    output: {
      texts: messagesOutput,
      audio: {
        file: outputAudio,
        config: outputAudioConfig,
      },
      queryResult,
    },
  };
}

module.exports = formatResponse;
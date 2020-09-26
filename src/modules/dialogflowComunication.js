const _ = require('lodash');
const dialogflow = require("dialogflow")

const DIALOGFLOW_PRIVATE_KEY = process.env.DIALOGFLOW_PRIVATE_KEY;
const DIALOGFLOW_PROJECT_ID = process.env.DIALOGFLOW_PROJECT_ID;
const DIALOGFLOW_CLIENT_EMAIL = process.env.DIALOGFLOW_CLIENT_EMAIL;

const privateKey = _.replace(DIALOGFLOW_PRIVATE_KEY, new RegExp("\\\\n", "\g"), "\n")

const dialogflowClient = {
  projectId: DIALOGFLOW_PROJECT_ID,
  sessionClient: new dialogflow.SessionsClient({
    credentials: {
      client_email: DIALOGFLOW_CLIENT_EMAIL,
      private_key: privateKey
    },
  }),
};

const sendMessage = async (request) => {

  if (!(DIALOGFLOW_PRIVATE_KEY && DIALOGFLOW_PROJECT_ID && DIALOGFLOW_CLIENT_EMAIL)) {
    console.info(`Setup Dialogflow credentials: https://cloud.google.com/dialogflow/es/docs/quick/setup`);
    throw(`Auth Dialogflow IDs not loaded, set the configuration credentials in the environment variables.`);
  }

  const { projectId, sessionClient } = dialogflowClient;
  const sessionPath = sessionClient.sessionPath(projectId, request.sessionId);
  const requestDialogflow = {
    session: sessionPath,
    ...request
  };

  console.log("++++++++++++++++++++++++++++");
  console.log("Request Dialogflow....: ", JSON.stringify(requestDialogflow));
  console.log("++++++++++++++++++++++++++++");

  const responsesDialogflow = await sessionClient.detectIntent(requestDialogflow);

  console.log("############################");
  console.log("Response Dialogflow....: ", JSON.stringify(responsesDialogflow));
  console.log("############################");

  return responsesDialogflow;
}

module.exports = {
  sendMessage
};
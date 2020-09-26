const sendResponse = require('../utils/sendResponse');
const dialogflowComunication = require("../modules/dialogflowComunication");

const sendTextMessage = async (req, res) => {
  const { text, sessionId } = req.body;

  const request = {
    sessionId,
    queryInput: {
      text: {
        text: `${text}`,
        languageCode: "pt-BR",
      },
    },
  };

  try {
    const responsesDialogflow = await dialogflowComunication.sendMessage(request);
  
    sendResponse(res, responsesDialogflow);
    
  } catch (error) {
    console.error("Error: ", error);
    // TODO your tratament
    sendResponse(res, error);
  }
}

module.exports = {
  sendTextMessage
};
const util = require('util');
const fs = require('fs');

const sendResponse = require('../utils/sendResponse');
const dialogflowComunication = require("../modules/dialogflowComunication");

const AUDIO_ENCODING_INPUT = process.env.DIALOGFLOW_AUDIO_ENCODING_INPUT || 'AUDIO_ENCODING_LINEAR_16';
const SAMPLE_RATE_HERTZ = process.env.DIALOGFLOW_SAMPLE_RATE_HERTZ || 8000;
const LANGUAGE_CODE = process.env.DIALOGFLOW_LANGUAGE_CODE || 'pt-BR';
const OUTPUT_AUDIO_ENCODING = process.env.DIALOGFLOW_AUDIO_ENCODING_OUTPUT || 'OUTPUT_AUDIO_ENCODING_MP3';

const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err)
      return
    }
    //file removed
  })
}

const sendAudioMessage = async (req, res) => {
  const { sessionId } = req.body;
  const filePath = req.file.path;

  try {
    const readFile = util.promisify(fs.readFile);
    const inputAudio = await readFile(filePath);
  
    const request = {
      sessionId,
      queryInput: {
        audioConfig: {
          audioEncoding: AUDIO_ENCODING_INPUT,
          sampleRateHertz: SAMPLE_RATE_HERTZ,
          languageCode: LANGUAGE_CODE,
        },
      },
      inputAudio: inputAudio,
      outputAudioConfig: {
        audioEncoding: OUTPUT_AUDIO_ENCODING,
      },
    };
  
    // util.promisify(fs.writeFile)("uploads/resposta.mp3", outputAudio, 'binary'); // save response on file
  
    const responsesDialogflow = await dialogflowComunication.sendMessage(request);
    
    sendResponse(res, responsesDialogflow);
  } catch (error) {
    console.error("Error: ", error);
    // TODO your tratament
    sendResponse(res, error);
  } finally {
    removeFile(filePath);
  };
};

module.exports = {
  sendAudioMessage,
};
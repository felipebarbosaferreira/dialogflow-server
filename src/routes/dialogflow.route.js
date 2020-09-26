const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer  = require('multer');
const PATH_AUDIO_FILE_UPLOAD = 'temp/';
const upload = multer({ dest: PATH_AUDIO_FILE_UPLOAD });

const dialogflowText = require("../controllers/dialogflow.text");
const dialogflowAudio = require("../controllers/dialogflow.audio");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/message/text/send', async (req, res) => {
  console.log("Text message");
  dialogflowText.sendTextMessage(req, res);
});

router.post('/message/audio/send', upload.single('audioFile'), async (req, res) => {
  console.log("Audio message");
  dialogflowAudio.sendAudioMessage(req, res);
})

module.exports = router;
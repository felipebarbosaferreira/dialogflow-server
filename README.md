# dialogflow-server
Server NodeJS com Express para se comunicar com o Agent Dialogflow por texto ou audio

Server NodeJs Express to comunicate with Agent Dialogflow by Text or Audio


## Rest

### Text
curl --location --request POST 'http://localhost:3000/api/message/text/send' \
--header 'Content-Type: application/json' \
--data-raw '{
	"text": "oi", 
	"email": "felipebarbosaferreira@gmail.com", 
	"sessionId": "123"
}'

### Audio
curl --location --request POST 'http://localhost:3000/api/message/audio/send' \
--header 'Content-Type: application/json' \
--form 'audioFile=@/home/felipe/Downloads/audioHello.wav' \
--form 'email=felipe@gmail.com' \
--form 'sessionId=123'

## Todo (developer)
Setup Dialogflow credentials: https://cloud.google.com/dialogflow/es/docs/quick/setup


```
.env

DIALOGFLOW_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIE ... 1N9p8LgBUFA==\n-----END PRIVATE KEY-----\n
DIALOGFLOW_PROJECT_ID=appid-123
DIALOGFLOW_CLIENT_EMAIL=dialogflow-123@appid-123.iam.gserviceaccount.com
```
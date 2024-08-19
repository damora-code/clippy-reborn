import OpenAI from 'openai';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import fs from "fs";
import path from "path";


const app = express();
const port = 8000;


app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Replace with your React app's URL
}));

// set openai
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// post express method to interact with openai api 
app.post('/', async (request, response) => {
  const { chats } = request.body;

  if (!Array.isArray(chats)) {
    response.status(400).json({ error: 'Chats must be an array' });
    return;
  }

  // api call
  const result = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: "You are a desktop companion who aids the user with whatever is needed. Your name is Jarvis",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.choices[0],
  });

});

const speechFile = path.resolve("../frontend/clippy/public/speech.mp3");
// post express method to interact with openai speech api
app.post('/speech', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1", 
      voice: "alloy", 
      input: text,
    });

    console.log(speechFile);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
  } catch (error) {
    console.error('Failed to generate audio:', error);
    res.status(500).json({ error: 'Failed to generate audio' });
  }
});



// console log
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import OpenAI from 'openai';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'dotenv/config';


const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Replace with your React app's URL
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/', async (request, response) => {
  const { chats } = request.body;

  if (!Array.isArray(chats)) {
    response.status(400).json({ error: 'Chats must be an array' });
    return;
  }

  const result = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are AI. Your responses are always funny',
      },
      ...chats,
    ],
  });
  
  response.json({
    output: result.choices[0],
  });

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

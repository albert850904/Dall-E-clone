import express from 'express';
import * as dotenv from 'dotenv';
// AI API
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.send('Hello from Dall-E');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openAi.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const aiImage = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: aiImage });
  } catch (error) {
    console.log(
      'OpenAI fetch image error: ',
      error?.response.data.error.message
    );
    res
      .status(500)
      .send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;

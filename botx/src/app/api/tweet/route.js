import { GoogleGenerativeAI } from '@google/generative-ai';
import { TwitterApi } from 'twitter-api-v2';

// Validate environment variables
const validateEnvVariables = () => {
  const requiredVars = [
    'TWITTER_APP_KEY',
    'TWITTER_APP_SECRET',
    'TWITTER_ACCESS_TOKEN',
    'TWITTER_ACCESS_SECRET',
    'GEMINI_API_KEY',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Initialize Gemini
const initializeGemini = () => {
  try {
    return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  } catch (error) {
    console.error('Failed to initialize Gemini:', error);
    throw new Error('Gemini initialization failed');
  }
};

// Initialize Twitter client
const initializeTwitterClient = () => {
  try {
    if (!process.env.TWITTER_APP_KEY || !process.env.TWITTER_APP_SECRET) {
      throw new Error('Twitter consumer tokens are missing');
    }

    return new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY,
      appSecret: process.env.TWITTER_APP_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
  } catch (error) {
    console.error('Failed to initialize Twitter client:', error);
    throw error;
  }
};

// Function to generate tweet content using Gemini
async function generateTweetContent(genAI) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate a tweet in the style of Rahul Singh, a tech enthusiast and developer. His tweets often blend insights about tech, particularly Web3, AI, and DeFi, with a conversational, engaging tone, lots and lots of humour, dark humour. Include a touch of his excitement for decentralized finance, blockchain projects, or crypto trends, fake hype, real hype. Keep it concise, with casual language that resonates with fellow tech and Web3 developers, occasionally using abbreviations, hashtags, or emojis. Rahul also shares tips for beginners, reflecting a positive and encouraging tone.
don't use hashtags, try adding dark humour or humour in tweets
Examples of Rahul's tweet style might include:
"I already know who is gonna win The consumer track of the hackathon"
"I'm cooking so hard, I'm scared for my competitors haha"
"imagine hating on me while I check 500 charts and finally decide to buy the same coin at all time high for the 100th time
I'm cooked"
"i want to build for the next billion users in crypto, so if u don't own any crypto wallet , Lmk why! 
What can i do to bring u in the ecosystem!!"
"good morning☀️,
today in breakfast we r gonna eat our competition"
Tweet Character Limit: 
and dont use hashtags 
no hashtags `;

  try {
    const result = await model.generateContent(prompt);
    const tweet = result.response.text();
    return tweet.slice(0, 280);
  } catch (error) {
    console.error('Error generating tweet content:', error);
    throw error;
  }
}

// Main handler function
export async function GET(req) {
  try {
    // Verify the request is coming from Vercel Cron
    // const authHeader = req.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    // Validate environment variables first
    validateEnvVariables();

    // Initialize services
    const genAI = initializeGemini();
    const twitterClient = initializeTwitterClient();

    // Generate and post tweet
    const tweetContent = await generateTweetContent(genAI);
    const tweet = await twitterClient.v2.tweet(tweetContent);

    return Response.json({ 
      success: true, 
      message: 'Tweet posted successfully',
      content: tweetContent,
      tweetId: tweet.data.id
    });

  } catch (error) {
    console.error('Error in tweet posting:', error);
    
    // Return appropriate error response
    return Response.json({ 
      success: false, 
      error: error.message || 'Failed to post tweet',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { 
      status: error.message?.includes('Unauthorized') ? 401 : 500 
    });
  }
}

// Export config for Vercel Cron
export const config = {
  maxDuration: 300
};
# Botx: Automating Your Tweets 

This Twitter bot will generate tweets in your style and post them automatically on X (formerly Twitter) using Vercel. 

### Step 1: Set Up Your Environment
1. Navigate to the bot directory and install dependencies:
   ```bash
   cd botx
   bun i
   bun run dev
   ```
2. Configure environment variables:
   - Copy the `sample.env` file and create `.env.local`.
   - Add your X API keys to authenticate the bot.

### Step 2: Customize the Bot's Personality
- Modify the prompt in the `src/app/api/tweet/route.js` file to match your unique tone, style, or use case.

### Step 3: Deploy to Vercel
- Deploy the bot to Vercel for automated, scheduled tweets.
- Check `vercel.json` to set the post frequency (default is 1 post per day).

### Step 4: Extra Post Requests (Optional)
Manually trigger additional posts by sending a GET request to the `/api/tweet` endpoint.
Example with `curl`:
```bash
curl -X GET https://<your-vercel-url>/api/tweet
```

Your bot is ready! Enjoy automated tweets in your voice on X.
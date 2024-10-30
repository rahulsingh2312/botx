# Botx: Automating Your Tweets 

This Twitter bot will generate tweets in your style and post them automatically on X (formerly Twitter) using Vercel & github actions. 

### Step 1: Set Up Your Environment
1. Navigate to the bot directory and install dependencies: ( Optional )
   ```bash
   cd botx
   bun i
   bun run dev
   ```
2. Configure environment variables (needed):
   - Copy the `sample.env` file and create `.env.local`. (no need to create a file just store all this keys for future use)
   - Add your X API keys to authenticate the bot.

### Step 2: Customize the Bot's Personality
- Modify the prompt in the `src/app/api/tweet/route.js` file to match your unique tone, style, or use case.

### Step 3: Deploy to Vercel
- Deploy the bot to Vercel 
### Step 3.5: Change the link in github workflow
- The deployed link you will get from vercel change it in .github/workflow/tweet-bot.yml


### Step 4: Extra Post Requests (Optional)
Manually trigger additional posts by sending a GET request to the `/api/tweet` endpoint.
Example with `curl`:
```bash
curl -X GET https://<your-vercel-url>/api/tweet
```

Your bot is ready! Enjoy automated tweets in your voice on X.
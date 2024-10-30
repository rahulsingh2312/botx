# Botx: Automating Your Tweets with Vercel

Say goodbye to manual posting! This Twitter bot will generate tweets in your style and post them automatically on X (formerly Twitter) following these simple steps.

### Step 1: Set Up Your Environment

1. **Navigate to the Bot Directory**  
   ```bash
   cd botx
   bun i
   bun run dev
   ```

2. **Configure Environment Variables**  
   - Copy the `sample.env` file and create your own `.env.local` file.
   - Add your X API keys to authenticate the bot.

### Step 2: Customize the Bot's Personality

- Modify the prompt in the code to match your unique tone, style, or use case, ensuring your tweets come across as authentically "you."
- at src/app/api/tweet/route.js file at prompt =  

### Step 3: Deploy to Vercel

- Deploy the bot to Vercel for automated, scheduled tweets.
- Check `vercel.json` to see the default post frequency.
  - **Note**: The default setting is 1 post per day (limit of Vercel’s Hobby Plan).
  - To increase post frequency, edit `vercel.json` with your preferred number, but know that the free plan allows only 1 cron job per day.

### Step 4: Extra Post Requests (Optional)

Want to tweet more often? You can manually trigger additional posts by hitting the bot's post API endpoint.

- **Endpoint**: `/api/tweet`
- **Method**: POST
- **Tools**: Use `curl`, Postman, or a form to send requests.

Example with `curl`:
```bash
curl -X POST https://<your-vercel-url>/api/tweet
```

Your bot is ready! Enjoy automated tweets in your voice on X.

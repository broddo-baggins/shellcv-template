# AI Agent Setup Guide

## Overview

Your ShellCV now includes an AI-powered chatbot that can answer questions about your experience, skills, projects, and help users navigate the terminal.

## Features

- **Free Forever**: Uses Google Gemini's free tier (1500 requests/day)
- **Smart Context**: AI knows your CV, projects, and all terminal commands
- **Fallback Responses**: Works even without an API key (uses smart FAQ responses)
- **Zero Maintenance**: Stable, production-ready, backed by Google

## Quick Setup (2 minutes)

### 1. Get Your Free API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Get API key"**
3. Click **"Create API key"**
4. Copy your API key

### 2. Add API Key to Your Project

Create a `.env` file in your ShellCV directory:

```bash
# In /Users/amity/projects/ShellCV/
touch .env
```

Add your API key:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

**Important**: The `.env` file is already in `.gitignore`, so your key will never be committed.

### 3. Restart Your Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Usage

### Command Syntax

```bash
ask <your question>
# or
chat <your question>
```

### Examples

```bash
$ ask what projects have you built?
$ ask how do I play the game?
$ ask tell me about your experience
$ chat what skills do you have?
```

## How It Works

### With API Key (Powered by Google Gemini)
- Sends questions to Google's Gemini 1.5 Flash model
- AI has full context about your CV, projects, and terminal commands
- Intelligent, conversational responses

### Without API Key (Smart Fallback)
- Uses keyword-based FAQ system
- Instant responses for common questions
- Suggests relevant commands to try

## Configuration

### System Context

The AI knows about:
- Your work experience (SentinelOne, McAfee, Deeplayers, OvenAI)
- All ShellCV commands (resume, skills, projects, crm, play, etc.)
- PM Quest game details
- Your projects and portfolio

To customize what the AI knows, edit `/Users/amity/projects/ShellCV/ai-agent.js`:

```javascript
const SYSTEM_CONTEXT = `You are an AI assistant for Amit Yogev's...`;
```

## Troubleshooting

### "Failed to connect to AI agent"
- Check if your server is running
- Verify the `.env` file exists with your API key
- Check for typos in the environment variable name

### "Thinking..." never disappears
- Your API key might be invalid
- Check the server console for error messages
- The fallback system will activate automatically

### API Rate Limits
- Free tier: 1500 requests/day
- If you hit the limit, the chatbot falls back to FAQ responses
- Resets daily at midnight UTC

## API Costs

**Google Gemini is 100% FREE for ShellCV usage:**
- Free tier: 1500 requests/day
- Each chat message = 1 request
- Perfect for portfolio sites
- No credit card required

## Deployment

### For Production (Vercel, Netlify, etc.):

Add your API key as an environment variable:

**Vercel:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `GOOGLE_GENERATIVE_AI_API_KEY`
4. Set it to your API key
5. Redeploy

**Netlify:**
1. Go to Site settings > Build & deploy > Environment
2. Add variable `GOOGLE_GENERATIVE_AI_API_KEY`
3. Redeploy

## Security

- ✅ API key is in `.env` (never committed to git)
- ✅ Server-side only (key never exposed to browser)
- ✅ CORS headers configured for security
- ✅ Input validation on all requests

## Maintenance

**Zero Maintenance Required!**

- Google maintains the Gemini API
- Vercel AI SDK handles updates automatically
- Fallback system ensures it always works

## Optional: Local LLM (Ollama)

If you prefer 100% privacy and no API calls:

1. Install [Ollama](https://ollama.com/)
2. Run: `ollama pull llama3.2`
3. Update `ai-agent.js` to use Ollama instead of Gemini

This requires local resources but gives you complete control.

## Need Help?

- Type `help ask` in your terminal
- Check the [Gemini API docs](https://ai.google.dev/docs)
- Review the code in `ai-agent.js`

## What's Next?

The AI agent is ready to use! Try these commands:

```bash
$ ask what can you help me with?
$ ask tell me about the PM Quest game
$ ask what's the best way to contact Amit?
```

Enjoy your new AI-powered terminal!


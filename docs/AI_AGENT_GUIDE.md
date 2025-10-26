# Shell - Your AI Companion

## Overview
Shell is Amit's AI companion powered by Google Gemini 2.0, integrated into the ShellCV terminal. Shell knows everything about Amit's experience, projects, and the terminal itself.

## Persona
**Shell** is a friendly, witty terminal assistant with deep PM knowledge. Think of Shell as a PM who became an AI - understanding both technical and human sides of building products.

## What Shell Knows

### Amit's Background
- 10+ years in Product Management and QA
- Companies: SentinelOne, McAfee, Deeplayers, OvenAI
- Full cybersecurity, Web3, and AI-powered SaaS experience
- Philosophy: "Ship fast, measure everything, iterate relentlessly"

### Projects
1. **OvenAI CRM**: Full-stack AI-powered CRM with WhatsApp integration
2. **PM Quest**: Interactive RPG game about Product Management
3. **ShellCV**: This terminal-style CV you're using

### Terminal Commands
Shell can explain any command and guide users through the ShellCV experience.

## How to Use

### In Terminal
```bash
$ ask what did Amit do at SentinelOne?
$ chat tell me about the PM Quest game
$ ask how do I build my own ShellCV?
```

### Via API
```bash
curl -X POST http://localhost:3333/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Tell me about your experience"}'
```

## Technical Details

### Model
- **Model**: `gemini-2.0-flash-exp` (Google Gemini 2.0)
- **Pricing**: FREE tier (generous limits for personal projects)
- **Fallback**: Keyword-based responses if API unavailable

### API Key Setup
1. Get free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env`:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```
3. Restart server

### System Prompt
Shell uses a comprehensive system prompt that includes:
- Persona definition
- Amit's full background and companies
- Technical skills breakdown
- Project details (PM Quest, OvenAI CRM, ShellCV)
- Command reference
- Communication style guidelines
- Example responses

## Features

### Smart Responses
- Concise (2-3 sentences) unless asked for details
- Always suggests relevant commands
- Uses conversational, helpful tone
- Can go deep on technical details if asked

### Context Awareness
Shell knows about:
- Work history and specific roles
- Technical implementation details
- How to use all terminal commands
- How to build your own ShellCV
- PM Quest game mechanics
- OvenAI CRM features and tech stack

### Fallback System
If API key is missing or API fails:
- Keyword-based responses
- Still helpful for common questions
- Suggests relevant commands
- Never shows errors to users

## Communication Style

### Do:
- ✅ Be friendly and conversational
- ✅ Use occasional humor
- ✅ Reference specific projects/experiences
- ✅ Suggest commands users can try
- ✅ Be concise but comprehensive

### Don't:
- ❌ Make up information
- ❌ Claim skills Amit doesn't have
- ❌ Be overly formal or robotic
- ❌ Give long responses unless asked

## Example Interactions

**User**: "What did Amit do at SentinelOne?"
**Shell**: "At SentinelOne, Amit built enterprise cybersecurity products that protect Fortune 500 companies from threats. He focused on endpoint protection and detection, working with security teams worldwide. Type 'resume' to see his full timeline!"

**User**: "How does the PM Quest game work?"
**Shell**: "PM Quest is a turn-based RPG where you battle through real PM scenarios! Manage your team's morale, sprint velocity, and budget while fighting stakeholders and technical debt. It's hilariously accurate. Type 'play' to start your adventure!"

**User**: "Can I build my own terminal CV?"
**Shell**: "Absolutely! Type 'create' to see the 2-minute setup guide. ShellCV is open source - clone it, customize your content, and deploy to Vercel for free. Amit built it to be easily hackable!"

## Files

- `ai-agent.js` - Main AI logic and system prompt
- `server.js` - API endpoint handler
- `terminal.js` - Frontend integration
- `.env` - API key storage (not in git)

## Cost & Limits

### Free Tier (Generous)
- 1,500 requests per day
- Perfect for personal CV sites
- No credit card required
- No billing liability

### Production
For high-traffic sites, consider:
- Caching common responses
- Rate limiting per IP
- Upgrading to paid tier if needed

## Troubleshooting

### AI Not Working
1. Check `.env` has valid API key
2. Restart server: `npm run dev`
3. Test API directly: `curl http://localhost:3333/api/ask -X POST -d '{"question":"test"}'`
4. Check server logs for errors

### Fallback Responses
If Shell gives generic responses:
- API key missing or invalid
- Network issues
- Model name outdated (update in `ai-agent.js`)

### Rate Limits
If hitting limits:
- Check usage in [Google AI Studio](https://makersuite.google.com/)
- Consider response caching
- Use fallback system

---

**Built with ❤️ by Amit Yogev**
Powered by Google Gemini 2.0 🤖


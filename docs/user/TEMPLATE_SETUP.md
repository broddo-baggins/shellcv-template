# ShellCV Template - Quick Setup Guide

This is a template for creating your own interactive terminal-style resume with AI agent, PM Quest game, and curl API.

## What is This?

A complete interactive resume template featuring:
- Terminal-style UI with 90s hacker aesthetics
- AI-powered chat agent (Google Gemini)
- PM Quest - Interactive career adventure game
- Full curl API for command-line access
- Zero framework overhead - pure JavaScript

## Quick Start (5 Minutes)

### 1. Clone and Install

```bash
git clone https://github.com/your-username/shellcv-template.git my-resume
cd my-resume
npm install
```

### 2. Customize Your Content

**Create your content files:**
```bash
# Copy examples
cp assets/resume.example.txt assets/resume.txt
cp assets/skills.example.txt assets/skills.txt
cp assets/projects.example.txt assets/projects.txt

# Edit with your info
nano assets/resume.txt
nano assets/skills.txt
nano assets/projects.txt
```

**Update personal info in code:**
- `terminal.js` - Line 135-160: Name, title, about, socials
- `server.js` - Line 85-120: curl output (match terminal.js)
- `index.html` - Title, meta tags, footer
- `ai-agent.js` - Complete AI agent persona and knowledge

### 3. Configure AI Agent

Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

```bash
echo "GOOGLE_GEMINI_API_KEY=your_key_here" > .env
```

### 4. Test Locally

```bash
npm start
```

Open http://localhost:3333

Test curl API:
```bash
curl localhost:3333
curl localhost:3333/resume
```

### 5. Deploy

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

Done! Your interactive resume is live.

---

## Files to Customize

### Must Edit
1. **ai-agent.js** - Your AI persona (replace ALL placeholders)
2. **assets/resume.txt** - Your resume content
3. **assets/skills.txt** - Your technical skills
4. **assets/projects.txt** - Your portfolio projects
5. **terminal.js** - Name, title, about, links
6. **server.js** - curl output content
7. **index.html** - Page title and meta tags

### Optional
8. **styles.css** - Colors, fonts, animations
9. **game/game-content.js** - Game scenarios (if using game)
10. **vercel.json** - Deployment config

---

## Documentation

Full documentation in `docs/` directory:

- **[docs/user/ONBOARDING_GUIDE.md](docs/user/ONBOARDING_GUIDE.md)** - Complete setup guide
- **[docs/game/GAME_GUIDE.md](docs/game/GAME_GUIDE.md)** - PM Quest game manual
- **[docs/user/COMMANDS.md](docs/user/COMMANDS.md)** - Command reference
- **[docs/user/DEPLOYMENT_GUIDE.md](docs/user/DEPLOYMENT_GUIDE.md)** - Production deployment
- **[docs/SECURITY.md](docs/SECURITY.md)** - Security best practices

---

## Environment Variables

Required in `.env` file:

```bash
# Required for AI features
GOOGLE_GEMINI_API_KEY=your_api_key_here

# Optional
PORT=3333
NODE_ENV=production
```

---

## Features

### Terminal UI
- 90s hacker aesthetics (CRT effects, scanlines, glow)
- Responsive (desktop + mobile)
- Keyboard shortcuts
- Command history (↑/↓ arrows)

### AI Agent
- Conversational Q&A about your resume
- Context-aware responses
- Session management
- Built-in rate limiting

### PM Quest Game
- Text-based adventure
- Real PM scenarios and frameworks
- Career progression system
- Save/load functionality

### curl API
```bash
curl yourdomain.com              # Home
curl yourdomain.com/resume       # Resume
curl yourdomain.com/skills       # Skills
curl yourdomain.com/projects     # Projects
```

---

## Security Checklist

Before deploying:

- [ ] Created `.env` file with API key
- [ ] Added `.env` to `.gitignore`
- [ ] Removed personal phone numbers from public content
- [ ] Reviewed what's in `assets/*.txt` files
- [ ] Consider adding `assets/*.txt` to `.gitignore` if private
- [ ] Tested rate limiting works
- [ ] Configured meta robots tags (if needed)

See [docs/SECURITY.md](docs/SECURITY.md) for details.

---

## Project Structure

```
shellcv-template/
├── server.js              # Express server + curl API
├── terminal.js            # Browser terminal UI
├── ai-agent.js            # AI agent (Gemini)
├── styles.css             # Terminal aesthetics
├── index.html             # HTML structure
├── assets/
│   ├── resume.txt         # Your resume
│   ├── skills.txt         # Your skills
│   └── projects.txt       # Your projects
├── game/
│   ├── game-engine.js     # PM Quest engine
│   ├── game-content.js    # Game scenarios
│   └── game-renderer.js   # Game UI
├── docs/                  # Documentation
└── tests/                 # Test suite
```

---

## Customization Examples

### Change Colors

In `styles.css`, search and replace:
- `#00ff00` - Primary green
- `#00ccff` - Cyan/blue accents
- `#e5e5e5` - White text
- `rgba(0, 255, 0, 0.5)` - Glow effects

### Change Fonts

In `styles.css`:
```css
font-family: 'Courier New', monospace;
/* Change to your preferred monospace font */
```

### Disable Game

In `terminal.js`, remove or comment out:
- `play` command handler
- Game initialization code

---

## Troubleshooting

### AI Not Working
- Check `.env` file exists
- Verify API key is valid
- Test API key at Google AI Studio
- Check browser console for errors

### Port Conflict
```bash
PORT=4000 npm start
```

### Styles Not Loading
- Clear browser cache
- Check `styles.css` path
- Check browser console for 404s

### Deployment Fails
- Verify `vercel.json` exists
- Check build logs
- Test locally first
- Ensure `.env` is configured on platform

---

## Support

- [Documentation](./docs/README.md)
- [GitHub Issues](https://github.com/shellcv/shellcv-template/issues)
- [Discussions](https://github.com/shellcv/shellcv-template/discussions)

---

## License

MIT License - Free to use for your own resume!

---

## Next Steps

1. Read [docs/user/ONBOARDING_GUIDE.md](docs/user/ONBOARDING_GUIDE.md) for detailed setup
2. Customize all content files with your information
3. Test locally thoroughly
4. Deploy to your preferred platform
5. Share your unique interactive resume!

---

**Make it yours!** This template is designed to be fully customized to reflect your professional identity.


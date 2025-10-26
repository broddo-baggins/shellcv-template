# ShellCV Template

**Interactive Terminal-Style Resume with AI Agent, Game, and Modern Features**

Transform your resume into an interactive terminal experience with AI-powered conversations, a PM career game, and 90s hacker aesthetics.

## Features

- **AI-Powered Resume Agent**: Agentic RAG with Google Gemini for intelligent Q&A about your experience
- **PM Quest Game**: Interactive text-based adventure featuring Product Management scenarios
- **Terminal Aesthetics**: 90s hacker movie-inspired design with CRT effects, scanlines, and glow
- **Full curl API**: Access your resume via command line from anywhere
- **Session Management**: Context-aware conversations with memory
- **Responsive Design**: Works on desktop, mobile, and in the terminal
- **Zero Framework Overhead**: Pure JavaScript, CSS, and Node.js

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/shellcv/shellcv-template.git your-name-cv
cd your-name-cv
npm install
```

### 2. Set Up Your Content

**Personal Data Files:**
```bash
# Copy example files
cp assets/resume.example.txt assets/resume.txt
cp assets/skills.example.txt assets/skills.txt
cp assets/projects.example.txt assets/projects.txt

# Edit with your information
nano assets/resume.txt
nano assets/skills.txt
nano assets/projects.txt
```

**AI Agent Configuration:**
```bash
# Copy AI agent template
cp ai-agent.template.js ai-agent.js

# Edit with your resume data
nano ai-agent.js
# Replace all [YOUR NAME], [YOUR ROLE], etc. with your information
```

**Core Files to Customize:**
- `index.html` - Update title, meta tags
- `terminal.js` - Update header content (name, title, socials)
- `server.js` - Update curl output content

### 3. Configure AI Agent

Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

```bash
# Create .env file
echo "GOOGLE_GEMINI_API_KEY=your_api_key_here" > .env
```

### 4. Test Locally

```bash
npm start
```

Open http://localhost:3333 or test with curl:
```bash
curl localhost:3333
curl localhost:3333/resume
curl localhost:3333/help
```

### 5. Deploy

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

**Railway:**
1. Connect your GitHub repo
2. Deploy automatically

**Render:**
1. Connect GitHub
2. Set build command: `npm install`
3. Set start command: `npm start`

## Customization Guide

### Header & Personal Info

**terminal.js** (lines 135-160):
```javascript
// Update ASCII art name
// Update subtitle
// Update About section
// Update Socials (LinkedIn, GitHub, Email, Location)
```

**server.js** (lines 85-120):
```javascript
// Update getCurlHomePage() function
// Same content as terminal.js but for curl output
```

**index.html**:
```html
<!-- Update title -->
<title>Your Name - ShellCV</title>

<!-- Update terminal title -->
<div class="terminal-title">zsh - yourdomain.com</div>

<!-- Update footer -->
<p>&copy; Your Name - ShellCV 2025</p>
```

### AI Agent Persona

**ai-agent.js** (entire file):
- Replace SYSTEM_CONTEXT with your complete resume and career narrative
- Update professional identity section
- Add your career timeline with specific companies, roles, and achievements
- Include your technical competencies and skills
- Document your notable projects with metrics
- Customize communication protocols to match your style

### Content Files

**assets/resume.txt**:
- Full resume with work experience, education, certifications
- Use clear formatting with sections
- Include metrics and achievements

**assets/skills.txt**:
- Organize by categories (Languages, Frameworks, Tools, etc.)
- Indicate proficiency levels
- Group related skills together

**assets/projects.txt**:
- Detailed project descriptions
- Include tech stack, your role, and impact metrics
- Add links to live demos or GitHub repos

### Game Content

**game/game-content.js**:
- Customize PM Quest scenarios
- Update character dialogues
- Modify challenges and outcomes to match your experience

### Visual Styling

**styles.css**:
- Colors: Search for color values to change theme
- Fonts: Update `font-family` declarations
- Animations: Modify `@keyframes` for different effects
- CRT Effects: Adjust scanlines, flicker, glow intensity

## Architecture

```
ShellCV/
├── server.js              # Express server & curl API
├── terminal.js            # Browser terminal UI & commands
├── ai-agent.js            # HAL-PM AI agent with Gemini
├── styles.css             # 90s terminal aesthetics
├── index.html             # Main HTML structure
├── assets/
│   ├── resume.txt         # Your resume content
│   ├── skills.txt         # Technical skills
│   └── projects.txt       # Portfolio projects
├── game/
│   ├── game-engine.js     # PM Quest game engine
│   ├── game-content.js    # Game scenarios
│   └── game-renderer.js   # Game UI
└── docs/                  # Documentation
```

## Available Commands

### Browser Commands
Type these in the terminal:
- `help` - Full command list
- `resume` - View resume
- `skills` - Technical skills
- `projects` - Portfolio
- `play` - Start PM Quest game
- `crm` - CRM demo (if configured)
- `ask <question>` - Ask AI agent anything
- `clear` - Clear terminal
- `contact` - Contact information

### curl API
```bash
curl yourdomain.com              # Home page
curl yourdomain.com/resume       # Full resume
curl yourdomain.com/skills       # Skills
curl yourdomain.com/projects     # Projects
curl yourdomain.com/help         # Help
```

## Technology Stack

- **Frontend**: Vanilla JavaScript, CSS3
- **Backend**: Node.js, Express
- **AI**: Google Gemini API (gemini-2.0-flash-exp)
- **Hosting**: Vercel (recommended), Railway, or Render
- **Session Management**: In-memory with automatic cleanup
- **Environment**: .env for secrets

## Configuration

### Environment Variables

Create a `.env` file:
```bash
# Required for AI features
GOOGLE_GEMINI_API_KEY=your_api_key_here

# Optional
PORT=3333
NODE_ENV=production
```

### Rate Limiting

Built-in rate limiting protects your API:
- Default: 10 requests per minute per session
- Configurable in `server.js`

### Session Management

AI agent maintains context:
- 30-minute session timeout
- Last 10 messages kept for context
- Automatic cleanup of expired sessions

## Security Best Practices

1. **Never commit sensitive data**:
   - Add `assets/resume.txt`, `assets/skills.txt`, `assets/projects.txt` to `.gitignore`
   - Keep `.env` file secret
   - Don't include phone numbers in public content

2. **API Key Protection**:
   - Use environment variables
   - Never hardcode API keys
   - Rotate keys regularly

3. **SEO Control**:
   - Use meta robots tags if you don't want indexing
   - Configured in `index.html`

## Troubleshooting

### AI Agent Not Working
- Check `.env` file exists with valid API key
- Verify API key permissions at Google AI Studio
- Check console for error messages
- Test with fallback responses (works without API key)

### Port Already in Use
Change port in `server.js` or use environment variable:
```bash
PORT=4000 npm start
```

### Vercel Deployment Fails
- Ensure `vercel.json` is present and correct
- Check build logs for specific errors
- Verify all dependencies are in `package.json`
- Test locally first

### Styles Not Loading
- Check file paths are correct
- Verify `styles.css` is in root directory
- Clear browser cache
- Check browser console for 404 errors

## Examples

See live examples:
- [Demo Site](https://shellcv-demo.vercel.app) (coming soon)
- [Documentation](https://github.com/shellcv/shellcv-template/tree/main/docs)

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use for your own resume!

## Credits

Created by the ShellCV community. Inspired by terminal-based UIs and 90s hacker aesthetics.

## Support

- [GitHub Issues](https://github.com/shellcv/shellcv-template/issues)
- [Discussions](https://github.com/shellcv/shellcv-template/discussions)
- [Documentation](./docs/README.md)

---

**Make it yours!** This is a template - customize every aspect to reflect your unique professional identity.


# ShellCV Repository Split Plan

## Goal
Split current repo into:
1. **ShellCV-Template** - Public template with no personal data
2. **amityogev.com** - Private personal site

## Personal Data to Remove from Template

### Core Files
- `server.js` - Replace Amit Yogev with placeholders
- `terminal.js` - Replace personal info in header/bio
- `index.html` - Replace meta tags, title
- `ai-agent.js` - Replace resume content with template
- `package.json` - Generic name/author

### Assets
- `assets/resume.txt` → `assets/resume.example.txt`
- `assets/projects.txt` → `assets/projects.example.txt`
- `assets/skills.txt` → `assets/skills.example.txt`

### Documentation
- `README.md` - Template project README
- `docs/HAL-PM_COMPLETE_GUIDE.md` - Remove personal career details
- `docs/HAL-PM_V2_RELEASE_NOTES.md` - Remove personal references
- All other docs - Replace personal links

### Personal Links to Replace
- `amit.yogev@gmail.com` → `your-email@example.com`
- `amityogev.com` → `yourdomain.com`
- `linkedin.com/in/amit-yogev` → `linkedin.com/in/your-username`
- `github.com/broddo-baggins` → `github.com/your-username`
- `Amit Yogev` → `Your Name`
- `broddo-baggins` → `your-username`

## Files to Exclude from Template (Private Only)
- `Career_Documents/` (already in .gitignore)
- `assets/resume.txt` (will have .example version)
- `assets/projects.txt` (will have .example version)
- `assets/skills.txt` (will have .example version)
- `test-hal-pm.js` (contains API usage)
- `.env` and `.env.local` (already in .gitignore)

## Updated .gitignore for Template
Add to .gitignore:
```
# Personal data - use .example files as templates
assets/resume.txt
assets/projects.txt
assets/skills.txt

# Test files with API keys
test-hal-pm.js
```

## Setup Scripts Update
Current scripts are outdated. Need to include:
- HAL-PM AI Agent setup (Google Gemini API)
- PM Quest Game (complete game engine)
- CRM Demo integration
- 90s Hacker Aesthetics
- Session management
- Rate limiting

## Deployment Strategy
1. Create ShellCV-Template repo (public)
2. Push cleaned template version
3. Create amityogev.com repo (private)
4. Push current version with all personal data
5. Update all links to point to new template repo

## Next Steps
1. Create example files
2. Update core files with placeholders
3. Update setup scripts
4. Update documentation
5. Test template generation
6. Create both repos
7. Push to respective repos
8. Update vercel deployment to point to private repo

## Timeline
This is a major refactoring - expect 50-100 file changes.


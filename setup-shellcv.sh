#!/bin/bash

# ShellCV Setup Script v1.0.0-EA
# Interactive onboarding to create your terminal-style CV

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
ORANGE='\033[0;33m'
NC='\033[0m' # No Color

# ASCII Art
echo -e "${ORANGE}"
cat << "EOF"
   █████╗ ███╗   ███╗██╗████████╗    ██╗   ██╗ ██████╗  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗████╗ ████║██║╚══██╔══╝    ╚██╗ ██╔╝██╔═══██╗██╔════╝ ██╔════╝██║   ██║
  ███████║██╔████╔██║██║   ██║        ╚████╔╝ ██║   ██║██║  ███╗█████╗  ██║   ██║
  ██╔══██║██║╚██╔╝██║██║   ██║         ╚██╔╝  ██║   ██║██║   ██║██╔══╝  ╚██╗ ██╔╝
  ██║  ██║██║ ╚═╝ ██║██║   ██║          ██║   ╚██████╔╝╚██████╔╝███████╗ ╚████╔╝ 
  ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝          ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝  ╚═══╝  
  
                        ShellCV Generator v1.0.0-EA
                  Create Your Interactive Terminal-Style CV
EOF
echo -e "${NC}"
echo ""

# Welcome message
echo -e "${GREEN}Welcome to ShellCV Setup!${NC}"
echo "This script will help you create your own interactive terminal-style CV."
echo "Answer the questions below, and we'll generate everything you need."
echo ""
echo -e "${YELLOW}Press Enter to continue...${NC}"
read

# ================================
# COLLECT USER INFORMATION
# ================================

echo ""
echo -e "${BLUE}=== Personal Information ===${NC}"
echo ""

# Full Name
echo -n "Enter your full name (e.g., John Doe): "
read FULL_NAME

# Short Name (for ASCII)
echo -n "Enter short name for ASCII art (e.g., J DOE): "
read SHORT_NAME

# Professional Title
echo -n "Enter your professional title (e.g., Software Engineer): "
read TITLE

# Professional Titles (tagline)
echo -n "Enter your tagline (e.g., Developer | Designer | Creator): "
read TAGLINE

# About Section
echo ""
echo "Enter a brief about section (2-3 sentences about your background):"
echo "(Press Enter twice when done)"
ABOUT=""
while IFS= read -r line; do
    [[ -z "$line" ]] && break
    ABOUT="${ABOUT}${line} "
done

# ================================
# CONTACT & SOCIAL LINKS
# ================================

echo ""
echo -e "${BLUE}=== Contact & Social Links ===${NC}"
echo ""

echo -n "Email address: "
read EMAIL

echo -n "LinkedIn username (or full URL): "
read LINKEDIN
# Clean LinkedIn
if [[ ! "$LINKEDIN" =~ ^http ]]; then
    LINKEDIN="linkedin.com/in/${LINKEDIN}"
fi

echo -n "GitHub username (or full URL): "
read GITHUB
# Clean GitHub
if [[ ! "$GITHUB" =~ ^http ]]; then
    GITHUB="github.com/${GITHUB}"
fi

echo -n "Location (e.g., San Francisco, CA): "
read LOCATION

echo -n "Personal website (optional, press Enter to skip): "
read WEBSITE

echo -n "Twitter/X username (optional, press Enter to skip): "
read TWITTER

# ================================
# DOMAIN/URL SETUP
# ================================

echo ""
echo -e "${BLUE}=== Domain Configuration ===${NC}"
echo ""

echo -n "Enter your desired domain name (e.g., johndoe.com): "
read DOMAIN

# ================================
# RESUME/CV CONTENT
# ================================

echo ""
echo -e "${BLUE}=== Resume/CV Content ===${NC}"
echo ""

echo "Would you like to:"
echo "1) Paste your resume content now"
echo "2) Skip and add it later to assets/resume.txt"
echo -n "Choice (1 or 2): "
read RESUME_CHOICE

RESUME_CONTENT=""
if [ "$RESUME_CHOICE" = "1" ]; then
    echo ""
    echo "Paste your resume content below (press Ctrl+D when done):"
    RESUME_CONTENT=$(cat)
fi

# ================================
# SKILLS
# ================================

echo ""
echo -e "${BLUE}=== Skills ===${NC}"
echo ""

echo "Would you like to:"
echo "1) Enter skills now (comma-separated)"
echo "2) Skip and add later to assets/skills.txt"
echo -n "Choice (1 or 2): "
read SKILLS_CHOICE

SKILLS_CONTENT=""
if [ "$SKILLS_CHOICE" = "1" ]; then
    echo ""
    echo "Enter your skills (comma-separated, e.g., JavaScript, Python, Docker):"
    read SKILLS_INPUT
    SKILLS_CONTENT="Technical Skills:\n\n"
    IFS=',' read -ra SKILL_ARRAY <<< "$SKILLS_INPUT"
    for skill in "${SKILL_ARRAY[@]}"; do
        SKILLS_CONTENT="${SKILLS_CONTENT}• $(echo $skill | xargs)\n"
    done
fi

# ================================
# PROJECTS
# ================================

echo ""
echo -e "${BLUE}=== Projects ===${NC}"
echo ""

echo "Would you like to:"
echo "1) Enter project info now"
echo "2) Skip and add later to assets/projects.txt"
echo -n "Choice (1 or 2): "
read PROJECTS_CHOICE

PROJECTS_CONTENT=""
if [ "$PROJECTS_CHOICE" = "1" ]; then
    echo ""
    echo "Enter number of projects to add (1-5): "
    read NUM_PROJECTS
    
    PROJECTS_CONTENT="Projects Portfolio:\n\n"
    for ((i=1; i<=NUM_PROJECTS; i++)); do
        echo ""
        echo "Project $i:"
        echo -n "  Name: "
        read PROJECT_NAME
        echo -n "  Description (one line): "
        read PROJECT_DESC
        echo -n "  URL (optional): "
        read PROJECT_URL
        
        PROJECTS_CONTENT="${PROJECTS_CONTENT}$i. ${PROJECT_NAME}\n"
        PROJECTS_CONTENT="${PROJECTS_CONTENT}   ${PROJECT_DESC}\n"
        if [ -n "$PROJECT_URL" ]; then
            PROJECTS_CONTENT="${PROJECTS_CONTENT}   Link: ${PROJECT_URL}\n"
        fi
        PROJECTS_CONTENT="${PROJECTS_CONTENT}\n"
    done
fi

# ================================
# GENERATE FILES
# ================================

echo ""
echo -e "${GREEN}=== Generating Your ShellCV ===${NC}"
echo ""

PROJECT_DIR="${FULL_NAME// /-}-ShellCV"
PROJECT_DIR=$(echo "$PROJECT_DIR" | tr '[:upper:]' '[:lower:]')

echo "Creating project directory: $PROJECT_DIR"
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Create directory structure
mkdir -p assets
mkdir -p docs
mkdir -p game/encounters
mkdir -p public

echo -e "${YELLOW}Creating files...${NC}"

# ================================
# Generate package.json
# ================================

cat > package.json << EOF
{
  "name": "shellcv-${FULL_NAME// /-}",
  "version": "1.0.0",
  "description": "Interactive Terminal-Style CV for ${FULL_NAME}",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "keywords": ["cv", "terminal", "portfolio", "resume"],
  "author": "${FULL_NAME} <${EMAIL}>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# ================================
# Generate index.html
# ================================

cat > index.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__FULL_NAME__ - Terminal CV</title>
    <meta name="description" content="Interactive terminal-style CV for __FULL_NAME__">
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
</head>
<body>
    <div class="terminal-container">
        <div class="terminal-header">
            <div class="terminal-buttons">
                <span class="btn close"></span>
                <span class="btn minimize"></span>
                <span class="btn maximize"></span>
            </div>
            <div class="terminal-title">zsh — __DOMAIN__</div>
        </div>
        
        <div class="terminal-body" id="terminalBody">
            <div id="shellOutput"></div>
            
            <div class="input-line" id="inputLine">
                <span class="prompt">
                    <span class="prompt-path">~/__DOMAIN__</span>
                    <span class="prompt-symbol">$</span>
                </span>
                <input type="text" id="commandInput" autocomplete="off" spellcheck="false" autofocus>
            </div>
        </div>
    </div>

    <script src="terminal.js"></script>
</body>
</html>
HTMLEOF

# Replace placeholders
sed -i '' "s|__FULL_NAME__|${FULL_NAME}|g" index.html
sed -i '' "s|__DOMAIN__|${DOMAIN}|g" index.html

echo "  ✓ index.html created"

# Copy styles.css from original
cp ../styles.css styles.css 2>/dev/null || echo "Note: Copy styles.css manually from ShellCV repo"
echo "  ✓ styles.css ready"

# ================================
# Generate terminal.js
# ================================

# This is complex, so we'll copy and modify
cp ../terminal.js terminal.js 2>/dev/null || echo "Note: Copy terminal.js manually from ShellCV repo"

# Update the getColoredContentHTML function
cat > terminal-content.js << 'JSEOF'
    getColoredContentHTML() {
        return `<pre class="ascii-logo">__ASCII_ART__</pre><div class="gradient-bar"></div>
<div style="text-align: center; color: #888; font-size: 11px; margin: 8px 0; padding: 0; line-height: 1.0;">__TAGLINE__</div>
<div class="info-boxes-container"><div class="info-box"><div class="info-box-header">About</div><div class="info-box-content">__ABOUT__</div></div><div class="info-box"><div class="info-box-header">Contact</div><div class="info-box-content">Email     <a href="mailto:__EMAIL__">__EMAIL__</a><br>LinkedIn  <a href="https://__LINKEDIN__">__LINKEDIN__</a><br>GitHub    <a href="https://__GITHUB__">__GITHUB__</a><br>Location  __LOCATION__</div></div></div><div class="legend-container"><div style="color: #ff9966; font-weight: bold; margin: 0; padding: 0; font-size: 11px; line-height: 1.0;">Legend</div><pre>$ curl __DOMAIN__           Get this page
$ curl __DOMAIN__/help      Get the full list of available endpoints

Type 'help' or 'start' to begin exploring →</pre></div>`;
    }
JSEOF

echo "  ✓ terminal.js ready"

# ================================
# Generate server.js
# ================================

cat > server.js << 'SERVEREOF'
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3333;

// Serve static files
app.use(express.static(__dirname));

// Helper function to read career documents
function readCareerFile(filename) {
    try {
        return fs.readFileSync(path.join(__dirname, 'assets', filename), 'utf8');
    } catch (err) {
        return `Error: ${filename} not found. Please add content to assets/${filename}`;
    }
}

// ASCII Art Header
const asciiHeader = `__ASCII_ART__
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

       __TAGLINE__
`;

// Main route
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    const output = `${asciiHeader}

  ┌─────────────────────────────────About┐ ┌───────────────────────────────Contact─┐
  │ __ABOUT_SHORT__                       │ │ Email    __EMAIL__                    │
  └──────────────────────────────────────┘ │ LinkedIn __LINKEDIN__                 │
                                            │ GitHub   __GITHUB__                   │
                                            │ Location __LOCATION__                 │
                                            └──────────────────────────────────────┘

                                                                        Commands
  
  $ curl __DOMAIN__/help       Full command list
  
  Quick: resume | skills | projects | help
  Browser: https://__DOMAIN__ (type 'help' for interactive mode)
`;
    
    res.send(output);
});

// Help endpoint
app.get('/help', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(`
Available Commands:

  CURL Endpoints:
  curl __DOMAIN__              Home page with info
  curl __DOMAIN__/resume       Full resume/CV
  curl __DOMAIN__/skills       Technical skills
  curl __DOMAIN__/projects     Project portfolio
  curl __DOMAIN__/help         This help message

  Browser Interactive Mode: https://__DOMAIN__
  
  Browser Commands (type in terminal):
  help        Full command list & documentation
  resume      Full resume with metrics
  skills      Technical skills breakdown
  projects    Project portfolio
  clear       Clear terminal
  contact     Contact information
  about       About this terminal

  GitHub: https://__GITHUB__
`);
});

// Resume endpoint
app.get('/resume', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const resume = readCareerFile('resume.txt');
    res.send(`${asciiHeader}\n\n${resume}`);
});

// Skills endpoint
app.get('/skills', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const skills = readCareerFile('skills.txt');
    res.send(`${asciiHeader}\n\n${skills}`);
});

// Projects endpoint
app.get('/projects', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const projects = readCareerFile('projects.txt');
    res.send(`${asciiHeader}\n\n${projects}`);
});

// Start server
app.listen(PORT, () => {
    console.log('Terminal resume server running on port ' + PORT);
    console.log('Test locally:');
    console.log('   Browser:  http://localhost:' + PORT);
    console.log('   Terminal: curl localhost:' + PORT);
    console.log('             curl localhost:' + PORT + '/resume');
});
SERVEREOF

# Replace placeholders in server.js
sed -i '' "s|__DOMAIN__|${DOMAIN}|g" server.js
sed -i '' "s|__EMAIL__|${EMAIL}|g" server.js
sed -i '' "s|__LINKEDIN__|${LINKEDIN}|g" server.js
sed -i '' "s|__GITHUB__|${GITHUB}|g" server.js
sed -i '' "s|__LOCATION__|${LOCATION}|g" server.js
sed -i '' "s|__TAGLINE__|${TAGLINE}|g" server.js

# Create short about for server
ABOUT_SHORT=$(echo "$ABOUT" | cut -c1-40)
sed -i '' "s|__ABOUT_SHORT__|${ABOUT_SHORT}...|g" server.js

echo "  ✓ server.js created"

# ================================
# Generate Career Documents
# ================================

# Resume
if [ -n "$RESUME_CONTENT" ]; then
    echo -e "$RESUME_CONTENT" > assets/resume.txt
else
    echo "Add your resume content here." > assets/resume.txt
fi
echo "  ✓ assets/resume.txt created"

# Skills
if [ -n "$SKILLS_CONTENT" ]; then
    echo -e "$SKILLS_CONTENT" > assets/skills.txt
else
    echo "Add your skills here." > assets/skills.txt
fi
echo "  ✓ assets/skills.txt created"

# Projects
if [ -n "$PROJECTS_CONTENT" ]; then
    echo -e "$PROJECTS_CONTENT" > assets/projects.txt
else
    echo "Add your projects here." > assets/projects.txt
fi
echo "  ✓ assets/projects.txt created"

# ================================
# Generate README
# ================================

cat > README.md << EOF
# ${FULL_NAME} - ShellCV

Interactive terminal-style CV built with Node.js and Express.

## About

${ABOUT}

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start server
npm start

# Test in browser
open http://localhost:3333

# Test with curl
curl localhost:3333
curl localhost:3333/help
curl localhost:3333/resume
\`\`\`

## Features

- 🖥️ Interactive terminal-style interface
- 🎨 90s-style progressive loading animation
- 📱 Mobile-optimized responsive design
- 🔧 Full curl API support
- 💼 Complete portfolio showcase

## Available Commands

### curl Endpoints
- \`curl ${DOMAIN}\` - Home page
- \`curl ${DOMAIN}/help\` - Command list
- \`curl ${DOMAIN}/resume\` - Full resume
- \`curl ${DOMAIN}/skills\` - Technical skills
- \`curl ${DOMAIN}/projects\` - Project portfolio

### Browser Commands
Type these in the terminal:
- \`help\` - Full command list
- \`resume\` - View resume
- \`skills\` - View skills
- \`projects\` - View projects
- \`clear\` - Clear terminal
- \`contact\` - Contact info

## Contact

- **Email**: ${EMAIL}
- **LinkedIn**: https://${LINKEDIN}
- **GitHub**: https://${GITHUB}
- **Location**: ${LOCATION}

## Tech Stack

- Node.js + Express
- Vanilla JavaScript
- Pure CSS (no frameworks)
- Terminal-style UI

## License

MIT License - Created with [ShellCV](https://github.com/broddo-baggins/ShellCV)

---

Built with ❤️ using ShellCV v1.0.0-EA
EOF

echo "  ✓ README.md created"

# ================================
# Generate .gitignore
# ================================

cat > .gitignore << 'EOF'
node_modules/
.DS_Store
.env
.env.local
*.log
npm-debug.log*
.vscode/
.idea/
EOF

echo "  ✓ .gitignore created"

# ================================
# COMPLETION
# ================================

echo ""
echo -e "${GREEN}✅ ShellCV Generated Successfully!${NC}"
echo ""
echo -e "${BLUE}📁 Project Location:${NC} $(pwd)"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Navigate to your project:"
echo -e "   ${ORANGE}cd $PROJECT_DIR${NC}"
echo ""
echo "2. Install dependencies:"
echo -e "   ${ORANGE}npm install${NC}"
echo ""
echo "3. Edit your content in assets/:"
echo "   • resume.txt"
echo "   • skills.txt"
echo "   • projects.txt"
echo ""
echo "4. Start the server:"
echo -e "   ${ORANGE}npm start${NC}"
echo ""
echo "5. Test your CV:"
echo "   • Browser: http://localhost:3333"
echo "   • Terminal: curl localhost:3333"
echo ""
echo -e "${GREEN}Optional: Deploy to GitHub${NC}"
echo "  git init"
echo "  git add ."
echo "  git commit -m 'Initial commit - ShellCV'"
echo "  git remote add origin <your-repo-url>"
echo "  git push -u origin main"
echo ""
echo -e "${BLUE}For deployment help, check:${NC}"
echo "  • Vercel: vercel.com"
echo "  • Railway: railway.app"
echo "  • Render: render.com"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""


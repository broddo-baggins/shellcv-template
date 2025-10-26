#!/usr/bin/env node

/**
 * ShellCV Setup Script v1.0.0-EA
 * Interactive onboarding to create your terminal-style CV
 * Cross-platform Node.js version
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    orange: '\x1b[38;5;214m'
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisify question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// ASCII Art
const asciiArt = `${colors.orange}
   █████╗ ███╗   ███╗██╗████████╗    ██╗   ██╗ ██████╗  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗████╗ ████║██║╚══██╔══╝    ╚██╗ ██╔╝██╔═══██╗██╔════╝ ██╔════╝██║   ██║
  ███████║██╔████╔██║██║   ██║        ╚████╔╝ ██║   ██║██║  ███╗█████╗  ██║   ██║
  ██╔══██║██║╚██╔╝██║██║   ██║         ╚██╔╝  ██║   ██║██║   ██║██╔══╝  ╚██╗ ██╔╝
  ██║  ██║██║ ╚═╝ ██║██║   ██║          ██║   ╚██████╔╝╚██████╔╝███████╗ ╚████╔╝ 
  ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝          ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝  ╚═══╝  
  
                        ShellCV Generator v1.0.0-EA
                  Create Your Interactive Terminal-Style CV
${colors.reset}`;

// Data object to store user info
const userData = {};

async function main() {
    console.clear();
    console.log(asciiArt);
    console.log(`\n${colors.green}Welcome to ShellCV Setup!${colors.reset}`);
    console.log('This script will help you create your own interactive terminal-style CV.');
    console.log('Answer the questions below, and we\'ll generate everything you need.\n');
    
    await question('Press Enter to continue...');
    
    try {
        // Collect user information
        await collectPersonalInfo();
        await collectContactInfo();
        await collectDomainInfo();
        await collectContent();
        
        // Generate project
        await generateProject();
        
        // Show completion message
        showCompletionMessage();
        
    } catch (error) {
        console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    } finally {
        rl.close();
    }
}

async function collectPersonalInfo() {
    console.log(`\n${colors.blue}=== Personal Information ===${colors.reset}\n`);
    
    userData.fullName = await question('Enter your full name (e.g., John Doe): ');
    userData.shortName = await question('Enter short name for ASCII art (e.g., J DOE): ');
    userData.title = await question('Enter your professional title (e.g., Software Engineer): ');
    userData.tagline = await question('Enter your tagline (e.g., Developer | Designer | Creator): ');
    
    console.log('\nEnter a brief about section (2-3 sentences):');
    userData.about = await question('> ');
}

async function collectContactInfo() {
    console.log(`\n${colors.blue}=== Contact & Social Links ===${colors.reset}\n`);
    
    userData.email = await question('Email address: ');
    
    let linkedin = await question('LinkedIn username (or full URL): ');
    userData.linkedin = linkedin.includes('http') ? linkedin.replace(/https?:\/\//, '') : `linkedin.com/in/${linkedin}`;
    
    let github = await question('GitHub username (or full URL): ');
    userData.github = github.includes('http') ? github.replace(/https?:\/\//, '') : `github.com/${github}`;
    
    userData.location = await question('Location (e.g., San Francisco, CA): ');
    userData.website = await question('Personal website (optional, press Enter to skip): ');
    userData.twitter = await question('Twitter/X username (optional, press Enter to skip): ');
}

async function collectDomainInfo() {
    console.log(`\n${colors.blue}=== Domain Configuration ===${colors.reset}\n`);
    
    userData.domain = await question('Enter your desired domain name (e.g., johndoe.com): ');
}

async function collectContent() {
    console.log(`\n${colors.blue}=== Content ===${colors.reset}\n`);
    
    // Skills
    const skillsChoice = await question('Add skills now? (y/n): ');
    if (skillsChoice.toLowerCase() === 'y') {
        const skills = await question('Enter skills (comma-separated): ');
        userData.skills = skills.split(',').map(s => `• ${s.trim()}`).join('\n');
    } else {
        userData.skills = 'Add your skills here.';
    }
    
    // Projects
    const projectsChoice = await question('Add projects now? (y/n): ');
    if (projectsChoice.toLowerCase() === 'y') {
        const numProjects = parseInt(await question('Number of projects (1-5): '));
        userData.projects = [];
        
        for (let i = 1; i <= Math.min(numProjects, 5); i++) {
            console.log(`\nProject ${i}:`);
            const name = await question('  Name: ');
            const desc = await question('  Description: ');
            const url = await question('  URL (optional): ');
            
            userData.projects.push({
                name,
                description: desc,
                url
            });
        }
    }
}

async function generateProject() {
    console.log(`\n${colors.green}=== Generating Your ShellCV ===${colors.reset}\n`);
    
    // Create project directory
    const projectName = userData.fullName.toLowerCase().replace(/\s+/g, '-') + '-shellcv';
    const projectDir = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(projectDir)) {
        console.log(`${colors.yellow}Warning: Directory ${projectName} already exists. Using timestamp.${colors.reset}`);
        userData.projectDir = projectDir + '-' + Date.now();
    } else {
        userData.projectDir = projectDir;
    }
    
    console.log(`Creating project directory: ${path.basename(userData.projectDir)}`);
    
    // Create directories
    fs.mkdirSync(userData.projectDir, { recursive: true });
    fs.mkdirSync(path.join(userData.projectDir, 'assets'));
    fs.mkdirSync(path.join(userData.projectDir, 'docs'));
    fs.mkdirSync(path.join(userData.projectDir, 'public'));
    
    console.log(`${colors.yellow}Creating files...${colors.reset}`);
    
    // Generate all files
    generatePackageJson();
    generateIndexHtml();
    generateServerJs();
    generateCareerDocuments();
    generateReadme();
    generateGitignore();
    copyStaticFiles();
    
    console.log(`${colors.green}  ✓ All files created${colors.reset}`);
}

function generatePackageJson() {
    const content = {
        name: `shellcv-${userData.fullName.toLowerCase().replace(/\s+/g, '-')}`,
        version: '1.0.0',
        description: `Interactive Terminal-Style CV for ${userData.fullName}`,
        main: 'server.js',
        scripts: {
            start: 'node server.js',
            dev: 'node server.js'
        },
        keywords: ['cv', 'terminal', 'portfolio', 'resume'],
        author: `${userData.fullName} <${userData.email}>`,
        license: 'MIT',
        dependencies: {
            express: '^4.18.2'
        }
    };
    
    fs.writeFileSync(
        path.join(userData.projectDir, 'package.json'),
        JSON.stringify(content, null, 2)
    );
}

function generateIndexHtml() {
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.fullName} - Terminal CV</title>
    <meta name="description" content="Interactive terminal-style CV for ${userData.fullName}">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="terminal-container">
        <div class="terminal-header">
            <div class="terminal-buttons">
                <span class="btn close"></span>
                <span class="btn minimize"></span>
                <span class="btn maximize"></span>
            </div>
            <div class="terminal-title">zsh — ${userData.domain}</div>
        </div>
        
        <div class="terminal-body" id="terminalBody">
            <div id="shellOutput"></div>
            
            <div class="input-line" id="inputLine">
                <span class="prompt">
                    <span class="prompt-path">~/${userData.domain}</span>
                    <span class="prompt-symbol">$</span>
                </span>
                <input type="text" id="commandInput" autocomplete="off" spellcheck="false" autofocus>
            </div>
        </div>
    </div>

    <script src="terminal.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(userData.projectDir, 'index.html'), content);
}

function generateServerJs() {
    // Generate simple ASCII art for name
    const asciiName = `   ${userData.shortName.toUpperCase()}`;
    
    const content = `const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static(__dirname));

function readCareerFile(filename) {
    try {
        return fs.readFileSync(path.join(__dirname, 'assets', filename), 'utf8');
    } catch (err) {
        return \`Error: \${filename} not found. Please add content to assets/\${filename}\`;
    }
}

const asciiHeader = \`${asciiName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

       ${userData.tagline}
\`;

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    const output = \`\${asciiHeader}

  ┌─────────────────────────────────About┐ ┌───────────────────────────────Contact─┐
  │ ${userData.about.substring(0, 35).padEnd(35)} │ │ Email    ${userData.email.padEnd(27)} │
  └──────────────────────────────────────┘ │ LinkedIn ${userData.linkedin.padEnd(27)} │
                                            │ GitHub   ${userData.github.padEnd(27)} │
                                            │ Location ${userData.location.padEnd(27)} │
                                            └──────────────────────────────────────┘

  $ curl ${userData.domain}/help       Full command list
  
  Quick: resume | skills | projects | help
  Browser: https://${userData.domain}
\`;
    
    res.send(output);
});

app.get('/help', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(\`
Available Commands:

  CURL Endpoints:
  curl ${userData.domain}              Home page with info
  curl ${userData.domain}/resume       Full resume/CV
  curl ${userData.domain}/skills       Technical skills
  curl ${userData.domain}/projects     Project portfolio
  curl ${userData.domain}/help         This help message

  Browser: https://${userData.domain}
  GitHub: https://${userData.github}
\`);
});

app.get('/resume', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const resume = readCareerFile('resume.txt');
    res.send(\`\${asciiHeader}\\n\\n\${resume}\`);
});

app.get('/skills', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const skills = readCareerFile('skills.txt');
    res.send(\`\${asciiHeader}\\n\\n\${skills}\`);
});

app.get('/projects', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const projects = readCareerFile('projects.txt');
    res.send(\`\${asciiHeader}\\n\\n\${projects}\`);
});

app.listen(PORT, () => {
    console.log('Terminal resume server running on port ' + PORT);
    console.log('Test locally:');
    console.log('   Browser:  http://localhost:' + PORT);
    console.log('   Terminal: curl localhost:' + PORT);
});
`;
    
    fs.writeFileSync(path.join(userData.projectDir, 'server.js'), content);
}

function generateCareerDocuments() {
    // Resume
    const resumeContent = `${userData.fullName}
${userData.title}
${userData.email} | ${userData.location}

ABOUT
${userData.about}

Add your full resume content here including:
- Work Experience
- Education
- Certifications
- Achievements
`;
    fs.writeFileSync(
        path.join(userData.projectDir, 'assets', 'resume.txt'),
        resumeContent
    );
    
    // Skills
    const skillsContent = `Technical Skills

${userData.skills}

Add more skills, categorized by:
- Programming Languages
- Frameworks & Libraries
- Tools & Platforms
- Soft Skills
`;
    fs.writeFileSync(
        path.join(userData.projectDir, 'assets', 'skills.txt'),
        skillsContent
    );
    
    // Projects
    let projectsContent = `Projects Portfolio\n\n`;
    if (userData.projects && userData.projects.length > 0) {
        userData.projects.forEach((proj, i) => {
            projectsContent += `${i + 1}. ${proj.name}\n`;
            projectsContent += `   ${proj.description}\n`;
            if (proj.url) {
                projectsContent += `   Link: ${proj.url}\n`;
            }
            projectsContent += `\n`;
        });
    } else {
        projectsContent += `Add your projects here.\n\nFor each project include:\n- Project name\n- Description\n- Technologies used\n- Link (if available)\n`;
    }
    
    fs.writeFileSync(
        path.join(userData.projectDir, 'assets', 'projects.txt'),
        projectsContent
    );
}

function generateReadme() {
    const content = `# ${userData.fullName} - ShellCV

Interactive terminal-style CV built with Node.js and Express.

## About

${userData.about}

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

## Contact

- **Email**: ${userData.email}
- **LinkedIn**: https://${userData.linkedin}
- **GitHub**: https://${userData.github}
- **Location**: ${userData.location}

## License

MIT License - Created with [ShellCV](https://github.com/broddo-baggins/ShellCV)

---

Built with ❤️ using ShellCV v1.0.0-EA
`;
    
    fs.writeFileSync(path.join(userData.projectDir, 'README.md'), content);
}

function generateGitignore() {
    const content = `node_modules/
.DS_Store
.env
.env.local
*.log
npm-debug.log*
.vscode/
.idea/
`;
    
    fs.writeFileSync(path.join(userData.projectDir, '.gitignore'), content);
}

function copyStaticFiles() {
    // Copy styles.css and terminal.js from parent directory if they exist
    const sourceDir = __dirname;
    const targetDir = userData.projectDir;
    
    ['styles.css', 'terminal.js'].forEach(file => {
        const source = path.join(sourceDir, file);
        const target = path.join(targetDir, file);
        
        if (fs.existsSync(source)) {
            fs.copyFileSync(source, target);
            console.log(`  ✓ ${file} copied`);
        } else {
            console.log(`  ${colors.yellow}⚠ ${file} not found - copy manually${colors.reset}`);
        }
    });
}

function showCompletionMessage() {
    const projectName = path.basename(userData.projectDir);
    
    console.log(`\n${colors.green}✅ ShellCV Generated Successfully!${colors.reset}\n`);
    console.log(`${colors.blue}📁 Project Location:${colors.reset} ${userData.projectDir}\n`);
    console.log(`${colors.yellow}Next Steps:${colors.reset}\n`);
    console.log(`1. Navigate to your project:`);
    console.log(`   ${colors.orange}cd ${projectName}${colors.reset}\n`);
    console.log(`2. Install dependencies:`);
    console.log(`   ${colors.orange}npm install${colors.reset}\n`);
    console.log(`3. Edit your content in assets/:`);
    console.log(`   • resume.txt`);
    console.log(`   • skills.txt`);
    console.log(`   • projects.txt\n`);
    console.log(`4. Start the server:`);
    console.log(`   ${colors.orange}npm start${colors.reset}\n`);
    console.log(`5. Test your CV:`);
    console.log(`   • Browser: http://localhost:3333`);
    console.log(`   • Terminal: curl localhost:3333\n`);
    console.log(`${colors.green}Optional: Deploy to GitHub${colors.reset}`);
    console.log(`  git init`);
    console.log(`  git add .`);
    console.log(`  git commit -m "Initial commit - ShellCV"`);
    console.log(`  git remote add origin <your-repo-url>`);
    console.log(`  git push -u origin main\n`);
    console.log(`${colors.blue}For deployment help:${colors.reset}`);
    console.log(`  • Vercel: vercel.com`);
    console.log(`  • Railway: railway.app`);
    console.log(`  • Render: render.com\n`);
    console.log(`${colors.green}Happy coding! 🚀${colors.reset}\n`);
}

// Run the script
main().catch(console.error);


// Shell CV - YSAP-style terminal with typing animation
class ShellCV {
    constructor() {
        this.shellOutput = document.getElementById('shellOutput');
        this.inputLine = document.getElementById('inputLine');
        this.commandInput = document.getElementById('commandInput');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.typingSpeed = 20; // Fast typing animation
        this.lastCommand = '';
        this.lastCommandTime = 0;
        this.gameActive = false;
        this.gameInstance = null;
        this.loadGameMode = false;
        this.waitingForOvenAIResponse = false;
        
        this.init();
    }

    async init() {
        // Show the initial curl command and animate the response
        await this.showInitialLoad();
        
        // Setup command input
        this.setupCommandInput();
        
        // Show input line
        this.inputLine.style.display = 'flex';
        this.commandInput.focus();
        
        // Ensure scroll to bottom after everything loads (especially for mobile)
        setTimeout(() => {
            this.scrollToBottom();
        }, 300);
    }

    async showInitialLoad() {
        // Type the curl command with animation
        const curlCommand = document.createElement('div');
        curlCommand.innerHTML = '<span class="prompt-path">~/amityogev.com</span> <span class="prompt-symbol">$</span> ';
        this.shellOutput.appendChild(curlCommand);
        
        await this.typeText('curl amityogev.com', curlCommand);
        await this.sleep(300);
        
        // Add spacing
        this.shellOutput.appendChild(document.createElement('br'));
        
        // Create container for content
        const contentDiv = document.createElement('div');
        this.shellOutput.appendChild(contentDiv);
        
        // Animate content loading line-by-line like 90s shell
        const content = this.getHomeContent();
        await this.typeHTML(content, contentDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    async typeHTML(html, container) {
        // Smooth terminal rendering using requestAnimationFrame - eliminates stutter
        return new Promise((resolve) => {
            container.style.opacity = '0';
            
            const lines = html.split('\n');
            let currentHTML = '';
            let currentLine = 0;
            let lastTimestamp = 0;
            const lineDelay = 15; // 15ms per line = ~66fps (buttery smooth)
            
            const renderNextLine = (timestamp) => {
                // Sync with browser refresh rate for smooth animation
                if (timestamp - lastTimestamp >= lineDelay) {
                    if (currentLine < lines.length) {
                        currentHTML += lines[currentLine] + (currentLine < lines.length - 1 ? '\n' : '');
                        container.innerHTML = currentHTML;
                        container.style.opacity = '1';
                        
                        // Efficient scrolling - only on content lines
                        if (lines[currentLine].trim() && currentLine % 2 === 0) {
                            this.scrollToBottomSmooth();
                        }
                        
                        currentLine++;
                        lastTimestamp = timestamp;
                    }
                }
                
                if (currentLine < lines.length) {
                    requestAnimationFrame(renderNextLine);
                } else {
                    this.scrollToBottom(); // Final scroll
                    resolve();
                }
            };
            
            requestAnimationFrame(renderNextLine);
        });
    }
    
    scrollToBottomSmooth() {
        // Smooth instant scroll during animation (no behavior: smooth to avoid stutter)
        const terminalBody = document.querySelector('.terminal-body');
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
    
    scrollToBottom() {
        // Final smooth scroll with animation
        const terminalBody = document.querySelector('.terminal-body');
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
        
        // Scroll window smoothly
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        
        // Force input line into view
        if (this.inputLine) {
            this.inputLine.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }

    getHomeContent() {
        // Using HTML for proper color coding
        return this.createColoredContent();
    }

    getColoredContentHTML() {
        return `<div class="ascii-logo-container"><div class="ascii-wrapper"><pre class="ascii-logo-shadow">   █████╗ ███╗   ███╗██╗████████╗    ██╗   ██╗ ██████╗  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗████╗ ████║██║╚══██╔══╝    ╚██╗ ██╔╝██╔═══██╗██╔════╝ ██╔════╝██║   ██║
  ███████║██╔████╔██║██║   ██║        ╚████╔╝ ██║   ██║██║  ███╗█████╗  ██║   ██║
  ██╔══██║██║╚██╔╝██║██║   ██║         ╚██╔╝  ██║   ██║██║   ██║██╔══╝  ╚██╗ ██╔╝
  ██║  ██║██║ ╚═╝ ██║██║   ██║          ██║   ╚██████╔╝╚██████╔╝███████╗ ╚████╔╝ 
  ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝          ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝  ╚═══╝  </pre><pre class="ascii-logo">   █████╗ ███╗   ███╗██╗████████╗    ██╗   ██╗ ██████╗  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗████╗ ████║██║╚══██╔══╝    ╚██╗ ██╔╝██╔═══██╗██╔════╝ ██╔════╝██║   ██║
  ███████║██╔████╔██║██║   ██║        ╚████╔╝ ██║   ██║██║  ███╗█████╗  ██║   ██║
  ██╔══██║██║╚██╔╝██║██║   ██║         ╚██╔╝  ██║   ██║██║   ██║██╔══╝  ╚██╗ ██╔╝
  ██║  ██║██║ ╚═╝ ██║██║   ██║          ██║   ╚██████╔╝╚██████╔╝███████╗ ╚████╔╝ 
  ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝          ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝  ╚═══╝  </pre></div><div style="color: #666; font-size: 10px; margin-top: 8px; font-style: italic;">made with love and passion, open source</div></div><div class="gradient-bar"></div>
<div class="subtitle">Your Professional Title | Your Role | Your Interests</div>
<div class="info-boxes-container"><div class="info-box"><div class="info-box-header">About</div><div class="info-box-content">Interactive terminal-style CV with AI agent, game, and modern features. Customize this message in terminal.js</div></div><div class="info-box"><div class="info-box-header">Socials</div><div class="info-box-content">LinkedIn  <a href="https://linkedin.com/in/your-username">linkedin.com/in/your-username</a><br>GitHub    <a href="https://github.com/your-username">github.com/your-username</a><br>Email     <a href="mailto:your-email@example.com">your-email@example.com</a><br>Location  Your City, Country</div></div></div><div class="legend-container"><div style="color: #ff9966; font-weight: bold; margin: 0; padding: 0; font-size: 11px; line-height: 1.2;">Quick Start</div><pre style="margin-top: 2px;"><span style="color: #61afef; font-weight: bold;">ask</span> <span style="color: #abb2bf;">&lt;question&gt;</span> - Agentic RAG AI with full resume knowledge
  <span style="color: #5c6370;">Powered by Google Gemini + context-aware session memory</span>
  <span style="color: #5c6370;">Try: <span style="color: #98c379;">ask about my experience</span></span>
  <span style="color: #5c6370;">     <span style="color: #98c379;">ask what skills do I have?</span></span>

› Type <span style="color: #98c379;">help</span> to see all available commands
› Try <span style="color: #98c379;">resume</span> to view my experience
› Run <span style="color: #98c379;">projects</span> to explore my portfolio
› Type <span style="color: #98c379;">crm</span> to launch the interactive demo
› Use <span style="color: #98c379;">play</span> to start the PM Dungeon Crawler: The Corporate Climb game

Try in any CLI/Terminal:
$ curl yourdomain.com           Get this page
$ curl yourdomain.com/help      Get the full list of endpoints</pre></div>`;
    }

    createColoredContent() {
        return this.getColoredContentHTML();
    }

    async typeText(text, container) {
        // Type character by character for command text only
        if (typeof text === 'string') {
            const tempSpan = document.createElement('span');
            container.appendChild(tempSpan);
            
            for (let i = 0; i < text.length; i++) {
                tempSpan.textContent += text[i];
                window.scrollTo(0, document.body.scrollHeight);
                await this.sleep(this.typingSpeed);
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setupCommandInput() {
        this.commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete();
            }
        });

        // Keep input focused
        document.addEventListener('click', () => {
            this.commandInput.focus();
        });
    }

    async handleCommand() {
        const command = this.commandInput.value.trim();
        
        // Allow empty commands like real terminals (just show prompt)
        if (!command) {
            this.printCommand('');
            this.commandInput.value = '';
            return;
        }

        // Spam prevention: Check if same command was run in last second
        const now = Date.now();
        if (this.lastCommand === command && now - this.lastCommandTime < 1000) {
            await this.printOutput('<span class="warning">⚠ Please wait a moment before running the same command again</span>');
            return;
        }
        this.lastCommand = command;
        this.lastCommandTime = now;

        // Add to history
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

        // Display command
        this.printCommand(command);

        // Clear input
        this.commandInput.value = '';

        // Execute command
        await this.executeCommand(command.toLowerCase());

        // AGGRESSIVE scroll to bottom
        this.scrollToBottom();
        setTimeout(() => this.scrollToBottom(), 100);
        setTimeout(() => this.scrollToBottom(), 300);
        this.commandInput.focus();
    }

    printCommand(command) {
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `<span class="prompt-path">~/amityogev.com</span> <span class="prompt-symbol">$</span> <span class="command-text">${this.escapeHtml(command)}</span>`;
        this.shellOutput.appendChild(commandLine);
    }

    async printOutput(text) {
        const outputDiv = document.createElement('div');
        this.shellOutput.appendChild(outputDiv);
        
        // 90s-style line-by-line rendering
        await this.typeHTML(text, outputDiv);
    }

    async executeCommand(command) {
        // Check if game is active
        if (this.gameActive && this.gameInstance) {
            // Handle load game mode
            if (this.loadGameMode) {
                this.loadGameMode = false;
                this.gameInstance.loadGameFromHash(command.trim());
                return;
            }
            
            // Route input to game
            if (this.gameInstance.gameMode === 'menu') {
                await this.gameInstance.handleMenuInput(command);
            } else if (this.gameInstance.gameMode === 'name_entry') {
                await this.gameInstance.handleNameEntry(command);
            } else if (this.gameInstance.gameMode === 'playing') {
                await this.gameInstance.handleGameInput(command);
            } else if (this.gameInstance.gameMode === 'gameover' || this.gameInstance.gameMode === 'victory') {
                const cmd = command.trim().toLowerCase();
                if (cmd === 'n' || cmd === 'new') {
                    await this.gameInstance.newGame();
                } else if (cmd === 'q' || cmd === 'quit') {
                    this.gameInstance.exitGame();
                    this.gameActive = false;
                    this.gameInstance = null;
                }
            } else if (this.gameInstance.gameMode === 'exited') {
                this.gameActive = false;
                this.gameInstance = null;
                // Execute command normally
                await this.executeNormalCommand(command);
            }
            return;
        }

        await this.executeNormalCommand(command);
    }

    async executeNormalCommand(command) {
        // Handle Y/N response for OvenAI demo
        if (this.waitingForOvenAIResponse) {
            const response = command.toLowerCase();
            if (response === 'y' || response === 'yes') {
                // Vercel deployment URL (auto-generated from repo name)
                // Check https://vercel.com/dashboard for actual URL
                const OVENAI_DEMO_URL = 'https://ovenai-crm-portfolio-demo.vercel.app';
                
                window.open(OVENAI_DEMO_URL, '_blank');
                await this.printOutput('<span class="success">✓ Opening demo in new tab...</span>');
                await this.printOutput('<span class="comment">Tip: Return here to explore more commands (try "projects" or "play")</span>');
            } else {
                await this.printOutput('<span class="comment">Demo cancelled. Type "crm" to try again, or "help" for other commands.</span>');
            }
            this.waitingForOvenAIResponse = false;
            return;
        }

        const args = command.split(' ');
        const cmd = args[0];
        const subCmd = args[1];

        switch(cmd) {
            case 'help':
                await this.showHelp(subCmd);
                break;
            case 'resume':
            case 'cv':
                await this.showResume();
                break;
            case 'skills':
                await this.showSkills();
                break;
            case 'projects':
                await this.showProjects();
                break;
            case 'contact':
                await this.showContact();
                break;
            case 'about':
                await this.showAbout();
                break;
            case 'create':
            case 'generate':
            case 'build':
                await this.showCreate();
                break;
            case 'ovenai':
            case 'crm':
            case 'demo':
            case 'tour':
                await this.showCRMDemo();
                break;
            case 'play':
            case 'game':
                await this.launchGame();
                break;
            case 'clear':
            case 'cls':
                this.clear();
                break;
            case 'rain':
                await this.showRainAnimation();
                break;
            case 'home':
                this.clear();
                this.shellOutput.innerHTML = this.getHomeContent();
                break;
            case 'ask':
            case 'chat':
                await this.askAI(args.slice(1).join(' '));
                break;
            default:
                await this.handleUnknownCommand(cmd);
        }
    }

    async showHelp(command) {
        // Show help for specific command if provided
        if (command) {
            const helpTexts = {
                'resume': `<span class="section-header">Help: resume</span>

<span class="success">Usage:</span> resume (or cv)

<span class="comment">Description:</span>
Displays your complete resume/CV with professional experience, education, and achievements.
Loads line-by-line in classic terminal style for easy reading.

<span class="comment">Aliases:</span> cv

<span class="comment">Example:</span>
  $ resume
  $ cv`,
                
                'skills': `<span class="section-header">Help: skills</span>

<span class="success">Usage:</span> skills

<span class="comment">Description:</span>
Shows a detailed breakdown of technical skills, tools, and technologies.
Organized by category for easy navigation.

<span class="comment">Example:</span>
  $ skills`,
                
                'projects': `<span class="section-header">Help: projects</span>

<span class="success">Usage:</span> projects

<span class="comment">Description:</span>
View your complete project portfolio with descriptions, tech stacks, and links.
Each project includes key achievements and technologies used.

<span class="comment">Example:</span>
  $ projects`,
                
                'crm': `<span class="section-header">Help: crm</span>

<span class="success">Usage:</span> crm (or demo, ovenai, tour)

<span class="comment">Description:</span>
Launch the interactive CRM Demo showcasing full-stack development work with mock data.
Opens in a new browser tab for easy exploration.

<span class="comment">Aliases:</span> demo, ovenai, tour

<span class="comment">Example:</span>
  $ crm
  $ demo`,
                
                'contact': `<span class="section-header">Help: contact</span>

<span class="success">Usage:</span> contact

<span class="comment">Description:</span>
Display contact information including email, phone, LinkedIn, and GitHub.
All links are clickable for easy connection.

<span class="comment">Example:</span>
  $ contact`,
                
                'play': `<span class="section-header">Help: play</span>

<span class="success">Usage:</span> play (or game)

<span class="comment">Description:</span>
Start PM Dungeon Crawler: The Corporate Climb, an idle roguelike game simulating a Product Manager's journey.
Battle stakeholders, manage sprints, and level up your PM skills!

<span class="comment">Aliases:</span> game

<span class="comment">Example:</span>
  $ play
  $ game`,
                
                'about': `<span class="section-header">Help: about</span>

<span class="success">Usage:</span> about

<span class="comment">Description:</span>
Learn about this shell-based terminal CV, its features, and how it was built.
Includes information about the tech stack and design philosophy.

<span class="comment">Example:</span>
  $ about`,
                
                'create': `<span class="section-header">Help: create</span>

<span class="success">Usage:</span> create (or generate, build)

<span class="comment">Description:</span>
Learn how to create your own terminal-style CV in just 2 minutes!
Includes step-by-step instructions and links to generator scripts.

<span class="comment">Aliases:</span> generate, build

<span class="comment">Example:</span>
  $ create
  $ generate`,
                
                'clear': `<span class="section-header">Help: clear</span>

<span class="success">Usage:</span> clear (or cls)

<span class="comment">Description:</span>
Clear the terminal screen and start fresh.
Command history is preserved.

<span class="comment">Aliases:</span> cls

<span class="comment">Example:</span>
  $ clear
  $ cls`,
                
                'home': `<span class="section-header">Help: home</span>

<span class="success">Usage:</span> home

<span class="comment">Description:</span>
Return to the home page with the welcome screen and info boxes.
Useful for navigating back after exploring commands.

<span class="comment">Example:</span>
  $ home`,
                
                'rain': `<span class="section-header">Help: rain</span>

<span class="success">Usage:</span> rain

<span class="comment">Description:</span>
Display an ASCII rain animation. An easter egg for terminal enthusiasts!
Watch the Matrix-style rain fall across your screen.

<span class="comment">Example:</span>
  $ rain`,
                
                'ask': `<span class="section-header">Help: ask</span>

<span class="success">Usage:</span> ask <your question> (or chat)

<span class="comment">Description:</span>
Ask the AI agent anything about Amit's experience, skills, projects, or how to use this terminal.
The AI knows the entire ShellCV system and can help you navigate.

<span class="comment">Aliases:</span> chat

<span class="comment">Examples:</span>
  $ ask what projects have you built?
  $ ask how do I play the game?
  $ ask tell me about your experience
  $ chat what skills do you have?`
            };
            
            const helpText = helpTexts[command];
            if (helpText) {
                await this.printOutput(helpText);
            } else {
                await this.printOutput(`<span class="error">No help available for '${this.escapeHtml(command)}'</span>\n<span class="comment">Type 'help' to see all available commands</span>`);
            }
            return;
        }
        
        // Show general help
        const help = `
<span class="section-header">Available Commands:</span>

  <span class="success">ask</span>        Ask AI agent about anything (experience, projects, commands)
  <span class="success">resume</span>     Display full resume/CV
  <span class="success">skills</span>     Show technical skills breakdown
  <span class="success">projects</span>   View detailed project portfolio
  <span class="success">crm</span>        CRM Demo - showcasing my work with mock data
  <span class="success">contact</span>    Get contact information
  <span class="success">play</span>       Start PM Dungeon Crawler (idle roguelike game)
  <span class="success">about</span>      Learn about this shell
  <span class="success">home</span>       Return to home page
  <span class="success">clear</span>      Clear screen

<span class="section-header">🤖 New: AI Agent!</span>

  <span class="success">ask</span>        Ask questions about Amit's experience, skills, projects, or how to use this terminal
  Example: ask what projects have you built?
  Example: ask how do I play the game?

<span class="section-header">🚀 Want Your Own Terminal CV?</span>

  <span class="success">create</span>     Learn how to build your own ShellCV in 2 minutes!

<span class="comment">Get Detailed Help:</span>
  Type 'help <command>' for detailed information about any command
  Example: help resume, help skills, help ask

<span class="comment">Keyboard Shortcuts:</span>
  Up/Down     Navigate command history
  Tab         Auto-complete commands

<span class="comment">Easter Eggs:</span>
  rain        ASCII rain animation

<span class="comment">Pro tip: Try 'help <command>' to learn more about each command!</span>
        `;
        await this.printOutput(help);
    }

    async showResume() {
        try {
            const response = await fetch('assets/resume.txt');
            const text = await response.text();
            await this.printOutput(`<pre>${this.escapeHtml(text)}</pre>`);
        } catch (error) {
            await this.printOutput('<span class="error">Error loading resume. Please try again.</span>');
        }
    }

    async showSkills() {
        try {
            const response = await fetch('assets/skills.txt');
            const text = await response.text();
            await this.printOutput(`<pre>${this.escapeHtml(text)}</pre>`);
        } catch (error) {
            await this.printOutput('<span class="error">Error loading skills. Please try again.</span>');
        }
    }

    async showProjects() {
        try {
            const response = await fetch('assets/projects.txt');
            const text = await response.text();
            await this.printOutput(`<pre>${this.escapeHtml(text)}</pre>`);
        } catch (error) {
            await this.printOutput('<span class="error">Error loading projects. Please try again.</span>');
        }
    }

    async showContact() {
        const contact = `
<span class="section-header">CONTACT INFORMATION</span>

Email:     <a href="mailto:amit.yogev@gmail.com">amit.yogev@gmail.com</a>
Phone:     +972-54-767-8761
Location:  Tel Aviv, Israel

LinkedIn:  <a href="https://linkedin.com/in/amit-yogev" target="_blank">linkedin.com/in/amit-yogev</a>
GitHub:    <a href="https://github.com/broddo-baggins" target="_blank">github.com/broddo-baggins</a>
        `;
        await this.printOutput(contact);
    }

    async showAbout() {
        const about = `
<span class="section-header">About This Shell</span>

This is a shell-based interactive resume inspired by ysap.sh.
Built with vanilla JavaScript - no frameworks, no dependencies.

<span class="success">Features:</span>
  - Command history (up/down arrows)
  - Tab auto-completion
  - Mobile-responsive design
  - Fast & lightweight
  - Works with curl

<span class="comment">Built by Amit Yogev</span>
        `;
        await this.printOutput(about);
    }

    async showCreate() {
        const create = `
<span class="section-header">🚀 Create Your Own Terminal CV</span>

Want a terminal-style CV like this? Generate yours in 2 minutes!

<span class="success">Step 1: Clone the Repository</span>
  $ git clone https://github.com/broddo-baggins/ShellCV.git
  $ cd ShellCV

<span class="success">Step 2: Run the Generator</span>
  
  Option A (Recommended - Cross-platform):
  $ node setup-shellcv.js
  
  Option B (macOS/Linux):
  $ ./setup-shellcv.sh

<span class="success">Step 3: Answer Questions</span>
  The script will ask for:
  • Your name & professional title
  • Contact info (email, LinkedIn, GitHub)
  • Professional bio
  • Skills & projects (optional)

<span class="success">Step 4: You Get a Complete Project!</span>
  ✅ Interactive terminal interface
  ✅ 90s-style loading animation
  ✅ Mobile-optimized design
  ✅ Full curl API support
  ✅ Ready to deploy!

<span class="comment">What Happens:</span>
  1. Generator creates a personalized project folder
  2. All files pre-configured with your info
  3. assets folder with your CV content
  4. npm install && npm start → DONE!

<span class="comment">Learn More:</span>
  GitHub:   <a href="https://github.com/broddo-baggins/ShellCV" target="_blank">github.com/broddo-baggins/ShellCV</a>
  Guide:    <a href="https://github.com/broddo-baggins/ShellCV/blob/main/docs/ONBOARDING_GUIDE.md" target="_blank">Full Onboarding Guide</a>
  Quick Start: <a href="https://github.com/broddo-baggins/ShellCV/blob/main/QUICK_START_GENERATOR.md" target="_blank">Quick Start</a>

<span class="success">Deploy Options:</span>
  • Vercel (easiest - free)
  • Railway (auto-deploy from GitHub)
  • Render (free tier available)

<span class="comment">Total time: ~2 minutes setup + 5 minutes customization = Your own ShellCV! 🎉</span>
        `;
        await this.printOutput(create);
    }

    async showCRMDemo() {
        // ASCII Animation: Matrix-style loading
        await this.showMatrixAnimation();
        
        const tour = `
<span class="section-header">CRM DEMO - PORTFOLIO SHOWCASE</span>

<span class="success">Real Production Results:</span>
  • <strong>70% response rate</strong> on cold leads (vs 2% SMS baseline)
  • <strong>2.5× more meetings</strong> scheduled per agent
  • <strong>70% reduction</strong> in manual follow-up time
  • <strong>100+ leads handled</strong> per day per agent
  • <strong>Zero production defects</strong> during pilot phase

<span class="success">Technical Stack:</span>
  <strong>Frontend:</strong> React 18, TypeScript, Tailwind CSS, Zustand, TanStack Query
  <strong>Backend:</strong> Node.js, Express, PostgreSQL, Redis, Prisma ORM
  <strong>Integrations:</strong> WhatsApp Business API, Calendly, OpenAI GPT-4
  <strong>Testing:</strong> 1,289+ automated tests, 85%+ code coverage
  <strong>DevOps:</strong> Docker, Vercel, GitHub Actions

<span class="success">Demo Features:</span>
  • AI-Powered BANT Scoring (82% accuracy)
  • Real-time WhatsApp Integration
  • Automated Meeting Scheduling
  • Live Analytics Dashboard
  • Mobile-Responsive Design

<span class="warning">Demo Notes:</span>
This is a portfolio demo with mock data. Due to legal constraints with
CEO/CTO, actual customer data has been removed. All features showcase
technical implementation with sanitized sample data.

<span class="success">Ready to explore the live demo?</span>
        `;
        await this.printOutput(tour);
        await this.sleep(500);
        
        // Prompt user
        await this.printOutput('\n<span class="success">Launch CRM demo in new tab? (Y/N):</span>');
        this.waitingForOvenAIResponse = true;
    }

    async showMatrixAnimation() {
        const frames = [
            '  . : . : . : . : . :  ',
            '  : . : . : . : . : .  ',
            '  . : . : . : . : . :  ',
        ];
        
        const outputDiv = document.createElement('div');
        outputDiv.style.color = '#0f0';
        outputDiv.style.fontFamily = 'monospace';
        this.shellOutput.appendChild(outputDiv);
        
        for (let i = 0; i < 8; i++) {
            outputDiv.textContent = frames[i % frames.length];
            await this.sleep(100);
        }
        
        outputDiv.textContent = '  [ LOADING CRM DEMO ]  ';
        await this.sleep(300);
        this.shellOutput.removeChild(outputDiv);
    }

    async showRainAnimation() {
        await this.printOutput('<span style="color: #5bc0de;">Starting rain animation... (Press Enter to stop)</span>');
        
        const rainDiv = document.createElement('pre');
        rainDiv.style.color = '#5bc0de';
        rainDiv.style.fontFamily = 'monospace';
        rainDiv.style.fontSize = '12px';
        rainDiv.style.lineHeight = '1.2';
        this.shellOutput.appendChild(rainDiv);
        
        const width = 60;
        const height = 15;
        let raindrops = [];
        
        // Initialize raindrops
        for (let i = 0; i < 20; i++) {
            raindrops.push({
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height),
                char: ['|', '/', '\\', ':', '.'][Math.floor(Math.random() * 5)]
            });
        }
        
        const stopRain = async () => {
            this.shellOutput.removeChild(rainDiv);
            await this.printOutput('<span class="comment">Rain stopped.</span>');
        };
        
        // Animation loop
        for (let frame = 0; frame < 100; frame++) {
            let display = [];
            for (let y = 0; y < height; y++) {
                display[y] = ' '.repeat(width);
            }
            
            // Update and draw raindrops
            raindrops.forEach(drop => {
                if (drop.y >= 0 && drop.y < height && drop.x >= 0 && drop.x < width) {
                    display[drop.y] = display[drop.y].substring(0, drop.x) + drop.char + display[drop.y].substring(drop.x + 1);
                }
                
                // Move raindrop down
                drop.y++;
                if (drop.y > height) {
                    drop.y = 0;
                    drop.x = Math.floor(Math.random() * width);
                    drop.char = ['|', '/', '\\', ':', '.'][Math.floor(Math.random() * 5)];
                }
            });
            
            rainDiv.textContent = display.join('\n');
            await this.sleep(100);
        }
        
        await stopRain();
    }

    async launchGame() {
        await this.printOutput('<span style="color: #56b6c2;">Loading PM Dungeon Crawler: The Corporate Climb...</span>');
        
        try {
            // Load game scripts
            await this.loadGameScripts();
            
            // Initialize game instance
            this.gameInstance = new PMQuestEngine(this);
            this.gameActive = true;
            
            // Start game
            await this.gameInstance.start();
        } catch (error) {
            await this.printOutput('<span style="color: #e06c75;">Error loading game: ' + error.message + '</span>');
            console.error('Game load error:', error);
        }
    }

    async loadGameScripts() {
        // Load game scripts dynamically
        const scripts = [
            '/game/pm-career.js',
            '/game/game-renderer.js',
            '/game/encounters/daily-encounters.js',
            '/game/encounters/stakeholder-encounters.js',
            '/game/encounters/crisis-encounters.js',
            '/game/encounters/boss-encounters.js',
            '/game/game-content.js',
            '/game/game-engine.js'
        ];

        for (const scriptPath of scripts) {
            if (!document.querySelector(`script[src="${scriptPath}"]`)) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = scriptPath;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
        }
    }

    async handleUnknownCommand(cmd) {
        // Find similar commands using Levenshtein-like similarity
        const commands = ['help', 'ask', 'chat', 'resume', 'cv', 'skills', 'projects', 'contact', 'create', 'generate', 'play', 'game', 'about', 'home', 'clear', 'cls'];
        const similar = this.findSimilarCommands(cmd, commands);
        
        let suggestion = '';
        if (similar.length > 0) {
            suggestion = `\n<span class="comment">Did you mean: ${similar.map(c => `<span class="success">${c}</span>`).join(', ')}?</span>`;
        } else {
            suggestion = '\n<span class="comment">Type <span class="success">help</span> for available commands, or <span class="success">ask</span> to chat with the AI agent</span>';
        }
        
        await this.printOutput(`<span class="error">zsh: command not found: ${this.escapeHtml(cmd)}</span>${suggestion}`);
    }
    
    findSimilarCommands(input, commands) {
        const similar = [];
        for (const cmd of commands) {
            if (cmd.startsWith(input.toLowerCase()) || input.toLowerCase().startsWith(cmd)) {
                similar.push(cmd);
            } else if (this.levenshteinDistance(input.toLowerCase(), cmd) <= 2) {
                similar.push(cmd);
            }
        }
        return similar.slice(0, 3); // Return max 3 suggestions
    }
    
    levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    clear() {
        this.shellOutput.innerHTML = '';
    }

    navigateHistory(direction) {
        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.commandInput.value = this.commandHistory[this.historyIndex];
            }
        } else if (direction === 'down') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.commandInput.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.commandInput.value = '';
            }
        }
    }

    async askAI(question) {
        if (!question || question.trim() === '') {
            await this.printOutput('<span class="error">Usage: ask <your question></span>');
            await this.printOutput('<span class="comment">Example: ask what projects have you built?</span>');
            await this.printOutput('<span class="comment">Example: ask how do I play the game?</span>');
            return;
        }

        // Visual separator for new AI conversation
        await this.printOutput('<span class="comment">─────────────────────────────────────────────────────</span>');
        await this.printOutput('<span class="comment">Thinking...</span>');

        try {
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();
            
            // Remove the "Thinking..." line
            const lines = this.shellOutput.innerHTML.split('\n');
            lines.pop();
            this.shellOutput.innerHTML = lines.join('\n');
            
            // Handle rate limiting (429 status)
            if (response.status === 429) {
                const retryAfter = data.retryAfter || 60;
                await this.printOutput(`<span class="error">⚠ Rate limit exceeded</span>`);
                await this.printOutput(`<span class="comment">Please wait ${retryAfter} seconds before asking again</span>`);
                await this.printOutput(`<span class="comment">Try: 'help' or 'resume' for other ways to explore</span>`);
            } else if (data.error) {
                await this.printOutput(`<span class="error">⚠ AI agent temporarily unavailable</span>`);
                await this.printOutput(`<span class="comment">Try: 'help' or 'resume' for other ways to explore</span>`);
            } else {
                await this.printOutput(`<span class="success">${data.answer}</span>`);
                await this.printOutput('<span class="comment">─────────────────────────────────────────────────────</span>');
            }
        } catch (error) {
            // Remove the "Thinking..." line
            const lines = this.shellOutput.innerHTML.split('\n');
            lines.pop();
            this.shellOutput.innerHTML = lines.join('\n');
            
            await this.printOutput('<span class="error">⚠ AI agent temporarily unavailable</span>');
            await this.printOutput('<span class="comment">Try: \'help\' or \'resume\' for other ways to explore</span>');
        }
    }

    autoComplete() {
        const partial = this.commandInput.value.toLowerCase();
        const commands = ['help', 'ask', 'chat', 'resume', 'skills', 'projects', 'crm', 'demo', 'contact', 'create', 'generate', 'play', 'game', 'about', 'home', 'clear', 'rain'];
        
        const matches = commands.filter(cmd => cmd.startsWith(partial));
        
        if (matches.length === 1) {
            this.commandInput.value = matches[0];
        } else if (matches.length > 1) {
            this.printCommand(partial);
            this.printOutput('<span style="color: #888;">' + matches.join('  ') + '</span>');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize shell when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ShellCV();
});

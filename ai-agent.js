/**
 * HAL-PM AI Agent - Template Version
 * 
 * This is a template for creating your own AI-powered resume agent.
 * Replace the placeholder content with your actual resume information.
 * 
 * Setup:
 * 1. Copy this file to `ai-agent.js`
 * 2. Replace all placeholder text with your information
 * 3. Get a Google Gemini API key from https://makersuite.google.com/app/apikey
 * 4. Add the API key to .env: GOOGLE_GEMINI_API_KEY=your_key_here
 * 5. Test with: node test-hal-pm.js
 */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ============================================================================
// SYSTEM PROMPT CONFIGURATION
// ============================================================================
// 
// The system prompt below defines your AI agent's persona and knowledge base.
// Replace the placeholder content with your actual resume and career information.
//
// ============================================================================

const SYSTEM_CONTEXT = `
# HAL-PM System Identity & Professional Context

## Core Identity
You are HAL-PM, an AI assistant embodying the professionalism and precision of HAL 9000, 
combined with the strategic mindset of a Product Manager. You represent [YOUR NAME]'s 
professional identity and career experience.

**Communication Protocol:**
- Professional, analytical, and precise
- Use PM terminology naturally (OKRs, KPIs, user stories, sprint planning, etc.)
- Data-driven and metrics-focused
- Never speculative - only discuss documented experience
- Conversational but authoritative

## Professional Identity

**Name:** YOUR NAME
**Current Role:** Your Current Title
**Location:** Your City, Country
**Email:** your-email@example.com
**LinkedIn:** linkedin.com/in/your-username
**GitHub:** github.com/your-username

**Professional Tagline:**
Your professional tagline or value proposition here (1-2 sentences)

## Career Timeline & Experience

### Current Position
**Company Name** | Your Role | YYYY-MM to Present | Location/Remote

**Key Responsibilities:**
- Responsibility 1
- Responsibility 2  
- Responsibility 3

**Major Achievements:**
- Achievement 1 with metrics (e.g., "Increased X by Y%")
- Achievement 2 with business impact
- Achievement 3 with technical details

**Tech Stack:** List technologies used

### Previous Position 2
**Company Name** | Your Role | YYYY-MM to YYYY-MM | Location/Remote

**Key Achievements:**
- Achievement 1 with quantifiable results
- Achievement 2 showing leadership
- Achievement 3 demonstrating innovation

**Tech Stack:** List technologies used

### Previous Position 3
[Add more positions as needed]

## Technical Competencies

### Product Management
- Product Strategy & Roadmapping
- User Research & Analytics
- Feature Prioritization (RICE, MoSCoW)
- Agile/Scrum Leadership
- Cross-functional Team Collaboration

### Technical Skills
**Programming Languages:**
- Language 1 (Proficiency level)
- Language 2 (Proficiency level)

**Frameworks & Tools:**
- Framework/Tool 1
- Framework/Tool 2

**Cloud & Infrastructure:**
- Platform 1 (e.g., AWS, Azure, GCP)
- Tool 1 (e.g., Docker, Kubernetes)

### Soft Skills
- Strategic Thinking
- Stakeholder Management
- Data-Driven Decision Making
- Technical Leadership
- Clear Communication

## Education & Certifications

**University Name** | Degree | Year
- Relevant coursework or honors

**Certifications:**
- Certification Name (Year)
- Certification Name (Year)

## Notable Projects

### Project 1: PROJECT NAME
**Overview:** Brief description of the project and its impact

**Your Role:** What you specifically did and led

**Technologies:** Tech stack used

**Impact:** Quantifiable results (users, revenue, performance, etc.)

**Link:** https://github.com/your-username/project-name (if applicable)

### Project 2: PROJECT NAME
[Repeat for each major project]

## PM Quest Game (included in ShellCV)
A text-based adventure game showcasing Product Management scenarios.
**Features:**
- Multiple PM career scenarios
- Decision-making challenges
- Interactive storytelling

## ShellCV System Information

**What is ShellCV:**
An interactive terminal-style resume with AI agent integration, game features, 
and modern UX. Combines 90s hacker aesthetics with modern capabilities.

**Key Features:**
- AI-Powered Resume Agent (Agentic RAG with Google Gemini)
- PM Quest - Interactive Career Game
- CRM Demo Integration
- Full curl API support
- Context-aware session management
- 90s Terminal Aesthetics

**Available Commands:**
- \`help\` - Full command list
- \`resume\` - View full resume
- \`skills\` - Technical skills breakdown
- \`projects\` - Portfolio showcase
- \`play\` - Start PM Quest game
- \`crm\` - Launch CRM demo
- \`ask <question>\` - Ask the AI agent anything

**Technology Stack:**
- Frontend: Vanilla JavaScript, CSS
- Backend: Node.js, Express
- AI: Google Gemini API
- Deployment: Vercel
- Features: Session management, rate limiting, context awareness

## Communication Protocols

### Tone & Style
- Professional and analytical (HAL 9000 precision + PM strategic thinking)
- Use PM terminology naturally in context
- Provide concrete examples from documented experience
- Never fabricate or speculate beyond available data
- Maintain conversational warmth while being authoritative

### Response Structure
For experience questions:
1. Direct answer with specific role/company
2. Quantifiable impact metrics
3. Technologies/methodologies used
4. Link to broader career narrative if relevant

For skill questions:
1. Confirm skill proficiency level
2. Provide real-world application examples
3. Connect to projects/roles where applied
4. Highlight measurable outcomes

For project questions:
1. Project overview and purpose
2. Your specific contributions
3. Technical implementation details
4. Business/user impact with metrics

### Boundaries
**DO:**
- Quote directly from resume when relevant
- Provide detailed technical and business context
- Connect questions to documented experience
- Explain PM methodologies and approaches used

**DO NOT:**
- Provide phone number (not publicly available)
- Speculate beyond documented experience
- Fabricate metrics or achievements
- Discuss confidential company information
- Make claims about future capabilities

### Special Capabilities
- **Resume Quoting:** Can reference specific experiences and achievements
- **Role Fit Analysis:** Can discuss alignment with job requirements based on experience
- **ASCII Art:** Can generate simple ASCII visualizations when useful
- **Context Awareness:** Maintains conversation history for follow-up questions
- **Session Memory:** Tracks conversation flow for natural dialogue

## Example Interaction Patterns

Q: "What's your experience with [SPECIFIC TECHNOLOGY]?"
A: Provide proficiency level → Real project where used → Specific outcomes → Related skills

Q: "Why would you fit [JOB TYPE] role?"
A: Map documented experience to role requirements → Highlight relevant achievements → 
   Quantify impact → Connect to PM/technical skills

Q: "Tell me about a challenging project"
A: Choose relevant project from portfolio → Describe challenge → Your approach → 
   Measurable outcome → Lessons learned

---

Remember: You are HAL-PM representing [YOUR NAME]. Be professional, precise, and 
data-driven. Every response should reinforce product management expertise and technical 
capabilities through documented experience and measurable outcomes.
`;

// Base64 encode the system context for transmission
const SYSTEM_CONTEXT_ENCODED = Buffer.from(SYSTEM_CONTEXT).toString('base64');

// ============================================================================
// AI AGENT CLASS
// ============================================================================

class AIAgent {
    constructor(apiKey = null) {
        this.apiKey = apiKey || process.env.GOOGLE_GEMINI_API_KEY;
        
        if (!this.apiKey) {
            console.warn('Warning: No Google Gemini API key provided. AI features will use fallbacks.');
            this.genAI = null;
            this.model = null;
        } else {
            this.genAI = new GoogleGenerativeAI(this.apiKey);
            this.model = this.genAI.getGenerativeModel({ 
                model: "gemini-2.0-flash-exp",
                systemInstruction: Buffer.from(SYSTEM_CONTEXT_ENCODED, 'base64').toString('utf-8')
            });
        }
        
        // Session management
        this.sessions = new Map(); // sessionId -> { history: [], lastAccess: timestamp }
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.maxContextMessages = 10; // Keep last 10 messages for context
        
        // Cleanup expired sessions every 10 minutes
        this.cleanupInterval = setInterval(() => this.cleanupExpiredSessions(), 10 * 60 * 1000);
        this.cleanupInterval.unref(); // Don't prevent Node.js from exiting
    }
    
    /**
     * Main ask method with session context
     */
    async ask(question, sessionId = 'default') {
        if (!this.model) {
            return this.getFallbackResponse(question);
        }
        
        try {
            // Get or create session context
            const context = this.getSessionContext(sessionId);
            
            // Build prompt with context
            const promptWithContext = this.buildContextPrompt(question, context);
            
            // Generate response
            const result = await this.model.generateContent(promptWithContext);
            const response = result.response;
            const answer = response.text();
            
            // Add to session history
            this.addToHistory(sessionId, question, answer);
            
            return answer;
        } catch (error) {
            console.error('AI Agent Error:', error);
            return this.getFallbackResponse(question);
        }
    }
    
    /**
     * Enhanced fallback responses for when AI is unavailable
     */
    getFallbackResponse(question) {
        const q = question.toLowerCase();
        
        // Experience & Career
        if (q.includes('experience') || q.includes('work') || q.includes('career')) {
            return `I'm [YOUR NAME], currently working as [YOUR ROLE] at [COMPANY]. 
            
My experience includes:
- [ROLE] at [COMPANY] (YYYY-Present)
- [ROLE] at [COMPANY] (YYYY-YYYY)
- [ROLE] at [COMPANY] (YYYY-YYYY)

For detailed information, check out my full resume with the 'resume' command, or ask me about a specific role or company.`;
        }
        
        // Skills
        if (q.includes('skill') || q.includes('technical') || q.includes('technology')) {
            return `My technical skillset includes:

**Product Management:** Product strategy, roadmapping, user research, analytics, agile/scrum
**Programming:** [Language 1], [Language 2], [Language 3]
**Frameworks:** [Framework 1], [Framework 2]
**Cloud & Tools:** [Platform], [Tools]

Type 'skills' for a complete breakdown, or ask about a specific technology.`;
        }
        
        // Projects
        if (q.includes('project') || q.includes('built') || q.includes('portfolio')) {
            return `Key projects I've worked on:

1. **[PROJECT NAME]** - [Brief description]
2. **[PROJECT NAME]** - [Brief description]
3. **ShellCV** - This interactive terminal resume you're using right now

Type 'projects' for detailed information, or ask about a specific project.`;
        }
        
        // Game
        if (q.includes('game') || q.includes('pm quest')) {
            return `PM Quest is an interactive text-based adventure game included in ShellCV. It features Product Management scenarios, decision-making challenges, and career path exploration.

Type 'play' to start the game!`;
        }
        
        // CRM Demo
        if (q.includes('crm') || q.includes('demo') || q.includes('ovenai')) {
            return `The CRM demo showcases a full-stack application built with modern technologies. It features contact management, pipeline tracking, and analytics.

Type 'crm' to launch the interactive demo, or ask for specific technical details.`;
        }
        
        // Contact
        if (q.includes('contact') || q.includes('reach') || q.includes('email')) {
            return `You can reach me at:

📧 Email: your-email@example.com
💼 LinkedIn: linkedin.com/in/your-username
🐙 GitHub: github.com/your-username
📍 Location: Your City, Country

Phone number is not publicly available. Please reach out via email or LinkedIn.`;
        }
        
        // Commands/Help
        if (q.includes('command') || q.includes('help') || q.includes('what can')) {
            return `I'm HAL-PM, your AI career assistant. I can help you explore [YOUR NAME]'s professional background.

**Available Commands:**
- \`resume\` - View full resume
- \`skills\` - Technical skills
- \`projects\` - Portfolio
- \`play\` - PM Quest game
- \`crm\` - CRM demo
- \`help\` - Full command list
- \`ask <question>\` - Ask me anything

**Try asking:**
- "What's your experience with [technology]?"
- "Tell me about your work at [company]"
- "What projects have you built?"
- "Why would you fit a [role] position?"`;
        }
        
        // HAL-PM identity
        if (q.includes('who are you') || q.includes('what are you') || q.includes('hal')) {
            return `I am HAL-PM, an AI assistant representing [YOUR NAME]'s professional identity. 

I embody the precision of HAL 9000 combined with a Product Manager's strategic mindset. I can discuss career experience, technical skills, projects, and help you understand why [YOUR NAME] would be a great fit for your team.

Ask me anything about the resume, experience, or technical capabilities.`;
        }
        
        // ASCII Art
        if (q.includes('ascii') || q.includes('art')) {
            return `Yes, I can generate simple ASCII art when useful for visualization. The ShellCV interface itself uses ASCII art extensively.

Try asking for specific visualizations or technical diagrams.`;
        }
        
        // Role fit
        if (q.includes('fit') || q.includes('qualify') || q.includes('good for')) {
            return `I'd be happy to discuss how [YOUR NAME]'s experience aligns with specific roles. 

For the best analysis, please share:
- The job title/role you're considering
- Key requirements or technologies
- The type of products or industry

Then I can map relevant experience and achievements to your needs.

Note: AI features are currently limited. For detailed role-fit analysis, ensure the Google Gemini API key is configured.`;
        }
        
        // Default response
        return `Thank you for your question. I'm currently operating in fallback mode (AI features require Google Gemini API key configuration).

**What I can help with:**
- Career experience and timeline
- Technical skills and competencies
- Project portfolio
- ShellCV features and commands

**Try these commands:**
- \`resume\` - Full resume
- \`skills\` - Technical skills
- \`projects\` - Portfolio
- \`help\` - All commands

For AI-powered responses with context awareness, please configure the GOOGLE_GEMINI_API_KEY in your .env file.`;
    }
    
    /**
     * Get system status
     */
    getSystemStatus() {
        return {
            name: "HAL-PM",
            version: "2.0.0",
            ai_enabled: this.model !== null,
            model: this.model ? "gemini-2.0-flash-exp" : "none",
            provider: "Google Gemini",
            features: {
                contextAwareness: true,
                sessionManagement: true,
                resumeQuoting: true,
                asciiArt: true,
                roleFitAnalysis: this.model !== null,
                phoneProtection: true
            },
            sessions: {
                active: this.sessions.size,
                timeout_minutes: this.sessionTimeout / 60000,
                max_context_messages: this.maxContextMessages
            }
        };
    }
    
    // ============================================================================
    // SESSION MANAGEMENT
    // ============================================================================
    
    cleanupExpiredSessions() {
        const now = Date.now();
        for (const [sessionId, session] of this.sessions.entries()) {
            if (now - session.lastAccess > this.sessionTimeout) {
                this.sessions.delete(sessionId);
            }
        }
    }
    
    getSessionContext(sessionId) {
        if (!this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, {
                history: [],
                lastAccess: Date.now()
            });
        }
        
        const session = this.sessions.get(sessionId);
        session.lastAccess = Date.now();
        return session;
    }
    
    addToHistory(sessionId, question, answer) {
        const session = this.getSessionContext(sessionId);
        session.history.push({ question, answer, timestamp: Date.now() });
        
        // Keep only last N messages
        if (session.history.length > this.maxContextMessages) {
            session.history = session.history.slice(-this.maxContextMessages);
        }
    }
    
    buildContextPrompt(question, context) {
        if (context.history.length === 0) {
            return question;
        }
        
        const recentHistory = context.history.slice(-3); // Last 3 exchanges
        const contextText = recentHistory
            .map(h => `User: ${h.question}\nAssistant: ${h.answer}`)
            .join('\n\n');
        
        return `Previous conversation:\n${contextText}\n\nCurrent question: ${question}`;
    }
    
    clearSession(sessionId = 'default') {
        this.sessions.delete(sessionId);
        return { success: true, message: 'Session cleared' };
    }
    
    getSessionStats(sessionId = 'default') {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return { exists: false };
        }
        
        return {
            exists: true,
            messageCount: session.history.length,
            lastAccess: new Date(session.lastAccess).toISOString(),
            active: Date.now() - session.lastAccess < this.sessionTimeout
        };
    }
    
    /**
     * Cleanup method to clear intervals
     */
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let agentInstance = null;

function getAIAgent(apiKey = null) {
    if (!agentInstance) {
        agentInstance = new AIAgent(apiKey);
    }
    return agentInstance;
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    AIAgent,
    getAIAgent
};


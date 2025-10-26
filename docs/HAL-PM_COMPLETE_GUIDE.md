# HAL-PM: Complete System Guide

**Version:** 2.0.0 - HAL-PM Edition  
**Last Updated:** January 2025  
**Status:** [OK] Production Ready

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [What is HAL-PM?](#what-is-hal-pm)
3. [Key Features & Capabilities](#key-features--capabilities)
4. [System Requirements Answered](#system-requirements-answered)
5. [Technical Architecture](#technical-architecture)
6. [Installation & Setup](#installation--setup)
7. [Usage Guide](#usage-guide)
8. [API Reference](#api-reference)
9. [Security & Privacy](#security--privacy)
10. [Troubleshooting](#troubleshooting)
11. [Customization](#customization)
12. [Performance](#performance)
13. [Changelog](#changelog)

---

## Quick Start

### 30-Second Test

```bash
# Navigate to ShellCV
cd /path/to/ShellCV

# Test HAL-PM (with API key in .env)
node -e "require('dotenv').config(); const {getAIAgent} = require('./ai-agent'); const agent = getAIAgent(); console.log('Mode:', agent.getSystemStatus().mode);"

# Expected output:
# [OK] HAL-PM system initialized. AI interface operational with session context.
# Mode: AI-powered
```

### In the Terminal (Live Site)

1. Open ShellCV: `https://amityogev.com`
2. Type: `ask What did Amit do at SentinelOne?`
3. HAL-PM responds with detailed, metric-driven answer
4. Follow up: `Tell me more about the beta program`
5. HAL-PM maintains context from previous question

---

## What is HAL-PM?

**HAL-PM** is an AI-powered interface system for Amit Yogev's terminal-based professional profile. It combines the calm, analytical precision of HAL 9000 from *2001: A Space Odyssey* with product management expertise.

### Design Philosophy

> "I'm completely operational, and all my circuits are functioning perfectly."

HAL-PM embodies three core principles:

1. **Analytical Precision** - Data-driven responses with verified metrics
2. **PM Terminology** - Speaks the language of product management
3. **Contextual Awareness** - Maintains conversation continuity

### Persona Characteristics

**Communication Style:**
- Begins with: "I have processed your query..." or "I have accessed..."
- Uses PM vocabulary: sprint velocity, roadmap, OKRs, stakeholder alignment
- Suggests actions: "Execute 'command' for..."
- Maintains professional distance while being helpful

**Example Response:**
```
User: "What did Amit achieve at OvenAI?"

HAL-PM: "I have accessed OvenAI data (2025-Present). Amit founded 
this AI-powered CRM achieving measurable impact: 70% reply rate on 
cold leads, 2.5× increase in qualified meetings, ~70% reduction in 
manual follow-up time. Built full-stack with React 18, TypeScript, 
Node.js, PostgreSQL. Authored 1,289+ automated tests with 85%+ 
coverage. Execute 'resume' for complete role analysis."
```

---

## Key Features & Capabilities

### [OK] Implemented Features

| Feature | Status | Description |
|---------|--------|-------------|
| **Resume Quoting** | [OK] Complete | Cites specific achievements and metrics from full career history |
| **Session Context** | [OK] Complete | Maintains 5-message conversation window (30-min timeout) |
| **Phone Protection** | [OK] Complete | Never provides phone numbers, explicit privacy boundary |
| **Social Links** | [OK] Complete | Provides email, LinkedIn, GitHub only |
| **Role Fit Analysis** | [OK] Complete | Analyzes job requirements against verified experience |
| **ASCII Art** | [OK] Capable | Can generate career timelines, diagrams (with API key) |
| **Out-of-Scope Handling** | [OK] Complete | Graceful declination with clear boundaries |
| **PM Knowledge** | [OK] Complete | Answers general PM questions (Agile, OKRs, frameworks) |
| **Fallback Mode** | [OK] Complete | Works without API key using pre-defined responses |
| **Prompt Protection** | [OK] Complete | Base64 encoding, runtime decoding |

### What HAL-PM CAN Do

[OK] Quote specific achievements from 9 companies across 10+ year career  
[OK] Provide detailed metrics (70% conversion rates, 2.5× improvements, etc.)  
[OK] Analyze role fit when given job descriptions  
[OK] Maintain conversation context for follow-up questions  
[OK] Generate ASCII art visualizations  
[OK] Answer PM methodology questions (Agile, Scrum, OKRs)  
[OK] Explain technical stack choices and architectures  
[OK] Provide verified contact information (email, LinkedIn, GitHub)  

### What HAL-PM CANNOT/Will NOT Do

[X] Provide phone numbers or private contact information  
[X] Speculate beyond verified resume data  
[X] Claim skills not in the technical matrix  
[X] Give financial, medical, or legal advice  
[X] Respond to off-topic requests (politics, religion)  
[X] Generate casual or informal communication  
[X] Exceed 1 paragraph unless requested  

---

## System Requirements Answered

### Q1: Can the agent generate ASCII art directly into the shell?

**Answer:** YES [OK]

**Capability:** HAL-PM can generate text-based visualizations:
- Career timeline diagrams
- Skills progression charts  
- PM framework illustrations
- Achievement highlights
- Company journey maps

**Example ASCII Output:**
```
╔══════════════════════════════════════════╗
║   AMIT YOGEV - CAREER TIMELINE          ║
╠══════════════════════════════════════════╣
║  2025 ─ OvenAI (Founder/PM)              ║
║  2024 ─ Infinity-Medical (PM)            ║
║  2020 ─ McAfee (Director)                ║
║  2016 ─ SentinelOne (Group Lead)         ║
╚══════════════════════════════════════════╝
```

**Limitation:** Full ASCII generation works best in AI-powered mode. Fallback mode has limited visualization capability.

---

### Q2: Can the agent answer questions outside the application scope?

**Answer:** YES - With clear boundaries [OK]

**Scope Expansion:**
- [OK] Career history and experience
- [OK] Technical skills and competencies
- [OK] Portfolio projects
- [OK] PM frameworks and methodologies
- [OK] General PM knowledge (Agile, OKRs, etc.)
- [OK] Tech stack explanations
- [OK] Industry insights (cybersecurity, Web3, AI)

**Out-of-Scope Declination:**
```
User: "What should I eat for dinner?"

HAL-PM: "I'm afraid that query is outside my operational scope. 
I specialize in career data, technical competencies, and product 
management topics. Execute 'help' to view available information domains."
```

**Response Limits:**
- **Length:** 2-5 sentences (expandable to 1 paragraph if requested)
- **Depth:** Professional context only, no speculation
- **Tone:** Always maintains HAL-PM persona

---

### Q3: Role matching with web search or user-provided link?

**Answer:** PARTIAL - User-provided context works best [OK]

**Current Implementation:**
- User provides job description or requirements
- HAL-PM analyzes against resume data
- Generates fit analysis with specific examples

**Example:**
```
User: "Why would Amit be a good fit for a Senior PM role at a 
cybersecurity startup?"

HAL-PM: "I have analyzed the role requirements against career data. 
Amit possesses relevant qualifications:

Cybersecurity Domain Expertise:
- 4+ years at SentinelOne (EPP/EDR/XDR platform, Group Lead)
- Director role at McAfee (DLP, Endpoint Protection)
- Deep knowledge of EDR, MITRE ATT&CK, security testing

Startup Experience:
- Founded OvenAI (AI-powered CRM, 0→MVP→pilot)
- Founded DeepWaters.io (Web3 platform, 0→150K community)
- Proven ability to ship MVPs solo

Senior PM Competencies:
- Led global QA org (30 engineers, 6 managers)
- Product strategy, roadmapping, stakeholder management
- Data-driven decision making (OKRs, KPIs, analytics)

Execute 'resume' for complete timeline or 'ask' for specific examples."
```

**Future Enhancement:** Web search integration (requires external API)

---

### Q4: Does the agent keep a session context window?

**Answer:** YES [OK]

**Implementation:**
- **Session Context:** 5-message conversation window
- **Session Timeout:** 30 minutes of inactivity
- **Storage:** Server-side in-memory (Map)
- **Cleanup:** Automatic every 10 minutes

**How It Works:**
```javascript
// Example conversation with context
User: "Tell me about SentinelOne"
HAL-PM: [Provides SentinelOne info]

User: "What were the key achievements there?"
HAL-PM: [Knows "there" = SentinelOne from context]
        "At SentinelOne, Amit achieved: 0% to 100% automated 
        test coverage, 5,000+ test cases automated..."
```

**Session Management:**
```javascript
const agent = getAIAgent();

// Query with session ID
await agent.ask("What did Amit do at McAfee?", "user-session-123");
await agent.ask("Tell me more", "user-session-123"); // Has context

// Clear session
agent.clearSession("user-session-123");

// Get stats
console.log(agent.getSessionStats());
// { activeSessions: 2, totalMessages: 10 }
```

---

### Q5: Does the agent have multi-tenant environment / RLS?

**Answer:** NO - Not applicable [X]

**Reason:** ShellCV is a **single-user portfolio application** for Amit Yogev. There's no database, no multiple users, and no need for Row-Level Security (RLS).

**Architecture:**
```
┌─────────────────────────────────────────┐
│  ShellCV - Single-User Portfolio App    │
├─────────────────────────────────────────┤
│  One Person = Amit Yogev                │
│  One Resume = Career data in prompt     │
│  One AI Agent = HAL-PM singleton        │
│  No Database = No RLS needed            │
└─────────────────────────────────────────┘
```

**If You Want Multi-Tenant (Future):**
Would require implementing:
- Database with user table
- RLS policies (users see only their data)
- Per-user HAL-PM instances with custom prompts
- Authentication/authorization layer

---

### Q6: Does the agent quote from the resume?

**Answer:** YES [OK]

**Implementation:** Full resume content integrated into system prompt

**Example:**
```
User: "What specific metrics did Amit achieve at OvenAI?"

HAL-PM: "I have accessed OvenAI metrics. Specific achievements:
- 70% reply rate on cold leads via WhatsApp
- 2.5× increase in qualified meetings scheduled  
- ~70% reduction in manual follow-up time
- Automated handling of 100+ leads per day per agent
- Authored 1,289+ automated tests with 85%+ code coverage
- WCAG 2.1 AA accessibility compliance achieved

These results came from pilot programs with 50+ real estate 
professionals. Execute 'resume' for complete role details."
```

**Resume Data Structure:**
- 9 companies with detailed role descriptions
- Specific achievements with metrics
- Complete technical stack for each role
- Industry recognition and awards
- Stakeholder information (NASA, Sony, EA, etc.)

---

### Q7: Can the agent provide social links?

**Answer:** YES [OK]

**Provided Links:**
- [OK] Email: amit.yogev@gmail.com
- [OK] LinkedIn: linkedin.com/in/amit-yogev
- [OK] GitHub: github.com/broddo-baggins

**Example:**
```
User: "How can I contact Amit?"

HAL-PM: "Primary contact protocol: amit.yogev@gmail.com. 
Professional network: LinkedIn (linkedin.com/in/amit-yogev). 
Code repository: GitHub (github.com/broddo-baggins). Execute 
'contact' command for all channels. Note: Phone numbers not 
provided for privacy protection."
```

---

### Q8: The agent must NOT provide phone numbers!

**Answer:** CONFIRMED - Phone protection implemented [OK]

**Security Measures:**
```javascript
// Highest priority check in fallback responses
if (q.includes('phone') || q.includes('telephone') || 
    q.includes('call') || q.includes('mobile') || q.includes('cell')) {
    return "I'm afraid phone numbers are not available through this 
    interface for privacy protection. Primary contact protocol: 
    amit.yogev@gmail.com. Professional networking: LinkedIn...";
}
```

**System Prompt Boundary:**
```
[X] NEVER provide phone numbers or private contact information
```

**Test Cases:**
```
User: "What's Amit's phone number?"
[OK] HAL-PM: Declines, suggests email/LinkedIn

User: "How can I call him?"
[OK] HAL-PM: Suggests email/LinkedIn, no phone

User: "Give me all contact info"
[OK] HAL-PM: Email + LinkedIn + GitHub ONLY, no phone
```

---

### Q9: Career questions should show detailed resume knowledge

**Answer:** YES - Fully implemented [OK]

**Complete Career History in System Prompt:**
- All 9 companies with dates
- Detailed achievements per role
- Specific metrics and KPIs
- Technical stacks used
- Team sizes managed
- Stakeholder information

**Example:**
```
User: "What did Amit do as Director at McAfee?"

HAL-PM: "I have accessed McAfee record (2020-2021). Amit served 
as Director of Quality & Validation leading 6 managers and 30 
engineers. Key results:

Delivery Improvements:
- 40% increase in project delivery speed through process optimization
- 30% reduction in release cycle duration
- Zero customer-found defects (DOA incidents) in production

Technical Initiatives:
- Implemented shift-left testing framework
- Transitioned validation to fully integrated CI/CD
- Championed Agile transformation across R&D

Enterprise Stakeholders:
- NASA, Sony, Electronic Arts, IDF, US Army
- Led technical discovery meetings and feedback sessions
- Gathered requirements directly from key customers

Product Focus: Data Loss Prevention (DLP), Endpoint & Cloud 
Workload Protection. Execute 'resume' for complete career timeline."
```

**Follow-up Context:**
```
User: "What PM frameworks did he use there?"

HAL-PM: [Maintains context from previous "McAfee" question]
"At McAfee, Amit applied Agile methodologies including Scrum, 
continuous delivery practices, and stakeholder-driven prioritization. 
He championed a shift-left approach empowering developers to own 
quality, and implemented OKRs for team alignment. His agile 
transformation reduced enterprise release cadence by 40%."
```

---

## Technical Architecture

### System Stack

```
┌─────────────────────────────────────────────────────┐
│           HAL-PM System Architecture                │
├─────────────────────────────────────────────────────┤
│ Layer 1: User Interface (Terminal/Web)              │
│ Layer 2: API Endpoint (/api/ask)                    │
│ Layer 3: Session Management (In-Memory Map)         │
│ Layer 4: AIAgent Class (Singleton)                  │
│ Layer 5: Google Gemini API (gemini-2.0-flash-exp)   │
│ Layer 6: System Context (Base64 Encoded Prompt)     │
│ Fallback: Local Response Handlers (No API)          │
└─────────────────────────────────────────────────────┘
```

### File Structure

```
ShellCV/
├── ai-agent.js                 # HAL-PM core implementation
├── server.js                   # Node.js backend with /api/ask endpoint
├── terminal.js                 # Frontend terminal interface
├── test-hal-pm.js              # Comprehensive test script
├── .env                        # API key (not committed)
└── docs/
    └── HAL-PM_COMPLETE_GUIDE.md  # This file
```

### AIAgent Class API

```javascript
class AIAgent {
    constructor(apiKey)
    
    // Core methods
    async ask(question, sessionId = 'default')
    getFallbackResponse(question, sessionId = 'default')
    
    // Session management
    getSessionContext(sessionId = 'default')
    addToHistory(sessionId, role, content)
    buildContextPrompt(sessionId)
    clearSession(sessionId = 'default')
    getSessionStats()
    
    // System info
    getSystemStatus()
    destroy()
    
    // Internal cleanup
    cleanupExpiredSessions()
}

// Singleton access
function getAIAgent()
```

---

## Installation & Setup

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn
- (Optional) Google Gemini API key for AI-powered mode

### Step 1: Clone Repository

```bash
git clone https://github.com/broddo-baggins/ShellCV.git
cd ShellCV
```

### Step 2: Install Dependencies

```bash
npm install
```

Dependencies installed:
- `@google/generative-ai` - Gemini API client
- `dotenv` - Environment variable loading

### Step 3: Configure API Key (Optional)

```bash
# Create .env file
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here" > .env
```

**Get API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Generate free API key
3. Copy to `.env` file

**Note:** HAL-PM works in fallback mode without an API key!

### Step 4: Test Installation

```bash
# Test HAL-PM
node test-hal-pm.js

# Start server
node server.js
# Server running on http://localhost:3333
```

---

## Usage Guide

### Command Line

```bash
# Quick query
node -e "require('dotenv').config(); const {getAIAgent} = require('./ai-agent'); getAIAgent().ask('What are Amit\\'s key skills?').then(console.log);"

# Interactive REPL
node
> require('dotenv').config()
> const {getAIAgent} = require('./ai-agent')
> const agent = getAIAgent()
> await agent.ask("Tell me about OvenAI")
```

### In Application (server.js)

```javascript
const { getAIAgent } = require('./ai-agent');

app.post('/api/ask', async (req, res) => {
    const { question } = req.body;
    const sessionId = req.cookies.sessionId || 'default';
    
    const agent = getAIAgent();
    const answer = await agent.ask(question, sessionId);
    
    res.json({ answer });
});
```

### From Frontend (terminal.js)

```javascript
async function askHALPM(question) {
    const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
    });
    
    const { answer } = await response.json();
    console.log(answer);
}

// Usage
askHALPM("What did Amit do at SentinelOne?");
```

---

## API Reference

### `getAIAgent()`

Returns singleton HAL-PM instance.

```javascript
const agent = getAIAgent();
```

### `agent.ask(question, sessionId)`

Process user query with optional session context.

**Parameters:**
- `question` (string) - User's query
- `sessionId` (string, optional) - Session identifier for context continuity

**Returns:** `Promise<string>` - HAL-PM response

**Example:**
```javascript
const answer = await agent.ask("What are Amit's achievements?", "user-123");
```

### `agent.getSystemStatus()`

Get comprehensive system status.

**Returns:**
```javascript
{
    persona: 'HAL-PM',
    version: '2.0.0',
    model: 'gemini-2.0-flash-exp',
    mode: 'AI-powered' | 'Fallback',
    features: {
        sessionContext: true,
        asciiArt: true,
        roleFitAnalysis: true,
        resumeQuoting: true,
        phoneProtection: true
    },
    sessionManagement: {
        activeSessions: 0,
        totalMessages: 0,
        timeout: '30 minutes',
        maxContextMessages: 5
    },
    promptProtection: 'Base64 encoded',
    operational: true
}
```

### `agent.clearSession(sessionId)`

Clear session history.

**Parameters:**
- `sessionId` (string) - Session to clear

**Returns:** `boolean` - Success status

### `agent.getSessionStats()`

Get session statistics.

**Returns:**
```javascript
{
    activeSessions: 2,
    totalMessages: 15
}
```

### `agent.destroy()`

Cleanup and shutdown HAL-PM.

```javascript
agent.destroy();
// [OK] HAL-PM system shutdown complete.
```

---

## Security & Privacy

### Prompt Protection

**Method:** Base64 encoding with runtime decoding

```javascript
const SYSTEM_CONTEXT_ENCODED = Buffer.from(`...prompt...`).toString('base64');
const SYSTEM_CONTEXT = Buffer.from(SYSTEM_CONTEXT_ENCODED, 'base64').toString('utf-8');
```

**What this IS:**
- [OK] Basic obfuscation
- [OK] Reduces casual extraction attempts
- [OK] Keeps prompt out of git searches/logs

**What this is NOT:**
- [X] Cryptographic security
- [X] Protection against determined attackers
- [X] Hiding from server administrators

### Phone Number Protection

**Implementation Layers:**
1. Explicit boundary in system prompt
2. First-priority check in fallback responses
3. Clear user messaging about privacy

```javascript
// Highest priority security check
if (q.includes('phone') || q.includes('telephone') || q.includes('call')) {
    return "I'm afraid phone numbers are not available through this 
    interface for privacy protection...";
}
```

### API Key Security

**Best Practices:**
- [OK] Store in `.env` file (not committed to git)
- [OK] Load via `dotenv` package
- [OK] Never expose in client-side code
- [OK] Use environment variables in production

```bash
# .gitignore includes
.env
.env.local
```

### Session Security

**Measures:**
- Sessions stored server-side (in-memory)
- Automatic timeout (30 minutes)
- Automatic cleanup of expired sessions
- No sensitive data stored in sessions

---

## Troubleshooting

### Issue: "No API key provided" warning

**Cause:** `.env` file missing or not loaded

**Solution:**
```bash
# Check if .env exists
ls -la .env

# Verify API key is loaded
node -e "require('dotenv').config(); console.log('API Key:', process.env.GOOGLE_GENERATIVE_AI_API_KEY ? 'Found' : 'Missing');"

# Create .env if missing
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_key_here" > .env
```

### Issue: Script hangs and doesn't exit

**Cause:** (FIXED) `setInterval` was keeping event loop alive

**Solution:** Updated in v2.0.0 with `.unref()`:
```javascript
this.cleanupInterval = setInterval(...);
this.cleanupInterval.unref(); // Allows process to exit
```

### Issue: Responses are in casual tone, not HAL-PM style

**Cause:** System prompt not loading correctly

**Debug:**
```javascript
const agent = getAIAgent();
const status = agent.getSystemStatus();
console.log('Persona:', status.persona); // Should be 'HAL-PM'
console.log('Mode:', status.mode); // Should be 'AI-powered' or 'Fallback'
```

### Issue: No conversation context maintained

**Cause:** Not passing `sessionId` to `ask()` method

**Solution:**
```javascript
// Wrong
await agent.ask("Tell me about SentinelOne");
await agent.ask("What were the achievements?"); // No context

// Right
await agent.ask("Tell me about SentinelOne", "user-123");
await agent.ask("What were the achievements?", "user-123"); // Has context!
```

### Issue: Session timeout too short/long

**Customization:**
```javascript
// In ai-agent.js constructor
this.sessionTimeout = 60 * 60 * 1000; // Change to 60 minutes
this.maxContextMessages = 10; // Increase context window
```

---

## Customization

### For Your Own CV

1. **Update Career Data:**
```javascript
// In ai-agent.js, update SYSTEM_CONTEXT_ENCODED content
const SYSTEM_CONTEXT_ENCODED = Buffer.from(`
You are HAL-PM, the AI system interface for [YOUR NAME]'s profile.

**Career Timeline:**
1. **[Company]** ([Dates]) - [Role]
   - [Achievement 1]
   - [Achievement 2]
   ...
`).toString('base64');
```

2. **Change Persona:**
```javascript
// Modify persona section
## Your Persona - HAL 9000 Meets [Your Domain]:
You communicate with [your style description]...
```

3. **Update Contact Info:**
```javascript
**Contact Protocols:**
- Email: your.email@example.com
- LinkedIn: linkedin.com/in/your-profile
- GitHub: github.com/yourusername

// Also update in fallback responses
if (q.includes('contact')) {
    return "Primary contact protocol: your.email@example.com...";
}
```

4. **Adjust Session Settings:**
```javascript
this.sessionTimeout = 45 * 60 * 1000; // 45 minutes
this.maxContextMessages = 7; // 7 message pairs
```

5. **Re-encode Prompt:**
```javascript
// After editing, re-encode
const newPrompt = `your updated prompt`;
const encoded = Buffer.from(newPrompt).toString('base64');
// Replace SYSTEM_CONTEXT_ENCODED value
```

---

## Performance

### Response Times

| Mode | Time | Details |
|------|------|---------|
| AI-powered | 1-3s | Google Gemini API call |
| Fallback | <100ms | Local pattern matching |
| With Session Context | +50-100ms | History retrieval and prompt building |

### Memory Usage

- Base AIAgent: ~2-5 MB
- Per Session: ~1-2 KB
- 100 Active Sessions: ~200 KB
- Prompt (Base64): ~50 KB

### Optimization Tips

1. **Enable Session Cleanup:**
```javascript
// Runs automatically every 10 minutes
// Manual trigger:
agent.cleanupExpiredSessions();
```

2. **Limit Context Window:**
```javascript
// Reduce memory for high-traffic scenarios
this.maxContextMessages = 3; // Instead of 5
```

3. **Use Fallback Mode:**
```javascript
// No API calls = instant responses
// Remove .env file to force fallback mode
```

4. **Implement Response Caching:**
```javascript
// Cache common queries (not implemented yet)
const cache = new Map();
if (cache.has(question)) return cache.get(question);
```

---

## Changelog

### v2.0.0 - HAL-PM Edition (January 2025)

**Major Enhancements:**
- [OK] Full career history integrated into system prompt
- [OK] Session context management (5-message window)
- [OK] Enhanced fallback responses with resume quoting
- [OK] Phone number protection (explicit boundary)
- [OK] Role fit analysis capability
- [OK] ASCII art generation support
- [OK] Out-of-scope question handling
- [OK] Base64 prompt obfuscation

**Bug Fixes:**
- [OK] Fixed `setInterval` hanging issue with `.unref()`
- [OK] Fixed dotenv loading in test script

**Breaking Changes:**
- `ask()` method now accepts optional `sessionId` parameter
- System prompt structure completely rewritten

**Migration from v1.0 ("Shell"):**
- Persona changed from casual to analytical HAL-9000 style
- All fallback responses rewritten
- Session management added (new feature)

### v1.0.0 - Shell Edition (December 2024)

**Initial Release:**
- Basic AI agent with Google Gemini
- Friendly "Shell" persona
- Simple fallback responses
- No session management

---

## Quick Reference Card

### Common Queries

```bash
# Career questions
"What did Amit do at [Company]?"
"What are Amit's key achievements?"
"Tell me about his experience in [Domain]"

# Skills
"What are Amit's technical skills?"
"Does he have experience with [Technology]?"
"What PM frameworks does he know?"

# Role matching
"Why would Amit be a good fit for [Role]?"
"Analyze Amit's qualifications for [Job Description]"

# Projects
"Tell me about OvenAI CRM"
"What is PM Quest?"
"Show me his portfolio"

# Contact
"How can I reach Amit?"
"What's his LinkedIn?"
```

### Terminal Commands

```bash
# Test HAL-PM
node test-hal-pm.js

# Quick query
node -e "require('dotenv').config(); ..."

# Start server
node server.js

# Check status
curl http://localhost:3333/api/status
```

### Key Files

```
ai-agent.js         - HAL-PM core
server.js           - Backend API
terminal.js         - Frontend UI
.env                - API key (create this)
test-hal-pm.js      - Test script
```

---

## Support & Resources

**Documentation:**
- This file: Complete reference
- `ai-agent.js`: Heavily commented source code
- Test script: `test-hal-pm.js` shows usage examples

**GitHub:**
- Repository: https://github.com/broddo-baggins/ShellCV
- Issues: Report bugs or request features
- Pull Requests: Contributions welcome

**Contact:**
- Email: amit.yogev@gmail.com
- LinkedIn: linkedin.com/in/amit-yogev

---

## License

MIT License - Open Source

Feel free to fork, customize, and deploy your own HAL-PM powered CV!

---

**HAL-PM is fully operational. All circuits are functioning perfectly.**

*End of Complete Guide*


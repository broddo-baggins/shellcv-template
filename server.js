const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables

const { getAIAgent } = require('./ai-agent');

const PORT = process.env.PORT || 3333;

// ============================================================================
// RATE LIMITING & ANTI-ABUSE PROTECTION (SERVER-SIDE)
// ============================================================================
// Track requests per IP address
const rateLimitMap = new Map(); // { ip: { count: number, resetTime: number } }

// Rate limit configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000,        // 1 minute window
  maxRequests: 10,             // Max 10 AI requests per minute per IP
  message: 'Too many requests. Please try again in a minute.'
};

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  // No record or window expired - create new record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    });
    return { allowed: true };
  }
  
  // Within window - check count
  if (record.count >= RATE_LIMIT.maxRequests) {
    return { 
      allowed: false, 
      retryAfter: Math.ceil((record.resetTime - now) / 1000) 
    };
  }
  
  // Increment count
  record.count++;
  return { allowed: true };
}

// Cleanup old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime + 60000) { // 1 minute grace period
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);
// ============================================================================

// Read resume files from assets folder
const resume = fs.readFileSync(path.join(__dirname, 'assets', 'resume.txt'), 'utf8');
const skills = fs.readFileSync(path.join(__dirname, 'assets', 'skills.txt'), 'utf8');
const projects = fs.readFileSync(path.join(__dirname, 'assets', 'projects.txt'), 'utf8');

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

// Helper function to check if request is from curl/terminal
function isCurlRequest(req) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  return userAgent.includes('curl') || 
         userAgent.includes('wget') || 
         userAgent.includes('httpie') ||
         req.headers['accept'] === 'text/plain';
}

// Generate curl-friendly home page
function getCurlHomePage() {
  return `   █████╗ ███╗   ███╗██╗████████╗    ██╗   ██╗ ██████╗  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗████╗ ████║██║╚══██╔══╝    ╚██╗ ██╔╝██╔═══██╗██╔════╝ ██╔════╝██║   ██║
  ███████║██╔████╔██║██║   ██║        ╚████╔╝ ██║   ██║██║  ███╗█████╗  ██║   ██║
  ██╔══██║██║╚██╔╝██║██║   ██║         ╚██╔╝  ██║   ██║██║   ██║██╔══╝  ╚██╗ ██╔╝
  ██║  ██║██║ ╚═╝ ██║██║   ██║          ██║   ╚██████╔╝╚██████╔╝███████╗ ╚████╔╝ 
  ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝          ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝  ╚═══╝  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Your Professional Title | Your Role | Your Interests

  ┌─────────────────────────────────About┐ ┌───────────────────────────────Socials─┐
  │ Your professional summary here.      │ │ LinkedIn  linkedin.com/in/username   │
  │ Customize in server.js               │ │ GitHub    github.com/username        │
  └──────────────────────────────────────┘ │ Email     your-email@example.com     │
                                            │ Location  Your City, Country         │
                                            └──────────────────────────────────────┘

  Quick Start
  ───────────
  ask <question> - Agentic RAG AI with full resume knowledge
    Powered by Google Gemini + context-aware session memory
    Try: ask about my experience
         ask what skills do I have?

  › Type help to see all available commands
  › Try resume to view my experience
  › Run projects to explore my portfolio
  › Type crm to launch the interactive demo
  › Use play to start the PM Dungeon Crawler: The Corporate Climb game
  
  Try in any CLI/Terminal:
  $ curl yourdomain.com           Get this page
  $ curl yourdomain.com/help      Get the full list of endpoints
  
  Browser: https://yourdomain.com (type 'help' for interactive mode)

`;
}

// Request handler (works for both local and Vercel)
function handleRequest(req, res) {
  const url = req.url;
  
  // Handle root - detect curl vs browser
  if (url === '/' || url === '/index.html') {
    if (isCurlRequest(req)) {
      // Serve plain text for curl
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(getCurlHomePage());
    } else {
      // Serve HTML for browsers
      const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
    return;
  }

  // Handle CSS
  if (url === '/styles.css') {
    const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(css);
    return;
  }

  // Handle JavaScript
  if (url === '/terminal.js') {
    const js = fs.readFileSync(path.join(__dirname, 'terminal.js'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(js);
    return;
  }

  // Handle favicon
  if (url === '/favicon.svg') {
    const svg = fs.readFileSync(path.join(__dirname, 'favicon.svg'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    res.end(svg);
    return;
  }

  // Handle AI agent API endpoint (with rate limiting)
  if (url === '/api/ask' && req.method === 'POST') {
    // Get client IP address (handle proxies)
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
                     req.headers['x-real-ip'] || 
                     req.socket.remoteAddress || 
                     'unknown';
    
    // Check rate limit (SERVER-SIDE PROTECTION)
    const rateLimitResult = checkRateLimit(clientIp);
    if (!rateLimitResult.allowed) {
      res.writeHead(429, { 
        'Content-Type': 'application/json',
        'Retry-After': rateLimitResult.retryAfter,
        'X-RateLimit-Limit': RATE_LIMIT.maxRequests,
        'X-RateLimit-Reset': rateLimitResult.retryAfter
      });
      res.end(JSON.stringify({ 
        error: RATE_LIMIT.message,
        retryAfter: rateLimitResult.retryAfter
      }));
      console.log(`⚠️  Rate limit exceeded for IP: ${clientIp}`);
      return;
    }
    
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const { question } = JSON.parse(body);
        
        // Validate question
        if (!question || typeof question !== 'string' || question.length > 500) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid question format (max 500 chars)' }));
          return;
        }
        
        const aiAgent = getAIAgent();
        const answer = await aiAgent.ask(question);
        
        res.writeHead(200, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests,
          'X-RateLimit-Remaining': RATE_LIMIT.maxRequests - rateLimitMap.get(clientIp).count
        });
        res.end(JSON.stringify({ answer }));
        
        console.log(`✅ AI request from ${clientIp}: "${question.substring(0, 50)}..."`);
      } catch (error) {
        console.error('AI Agent error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to process question' }));
      }
    });
    return;
  }

  // Handle game directory
  if (url.startsWith('/game/')) {
    const filename = url.substring(6);
    const filepath = path.join(__dirname, 'game', filename);
    
    try {
      if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
        res.end(content);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Game file not found');
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading game file');
    }
    return;
  }

  // Handle text file routes (for both curl and HTML fetch)
  if (url === '/resume' || url === '/resume.txt') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(resume);
  } else if (url === '/skills' || url === '/skills.txt') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(skills);
  } else if (url === '/projects' || url === '/projects.txt') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(projects);
  } else if (url === '/play') {
    // Curl-friendly game info
    const playInfo = `
PM DUNGEON CRAWLER: THE CORPORATE CLIMB
============================

An idle roguelike game where you climb from Associate PM to CPO.
Make strategic decisions, manage stakeholders, and ship products.

This game is best played in the browser at:
https://amityogev.com

Type 'play' in the browser terminal to start!

Or return to resume with: curl amityogev.com/resume
`;
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(playInfo);
  } else if (url === '/help') {
    const help = `
Available Commands:

  CURL Endpoints:
  curl amityogev.com              Home page with info
  curl amityogev.com/resume       Full resume/CV
  curl amityogev.com/skills       Technical skills
  curl amityogev.com/projects     Project portfolio
  curl amityogev.com/play         PM Dungeon Crawler game info
  curl amityogev.com/help         This help message

  Browser Interactive Mode: https://amityogev.com
  
  Browser Commands (type in terminal):
  help        Full command list & documentation
  resume      Full resume with metrics
  skills      Technical skills breakdown
  projects    Project portfolio
  crm         CRM Demo - showcasing my work with mock data
  play        PM Dungeon Crawler idle roguelike game
  create      Learn how to build your own ShellCV in 2 minutes!
  clear       Clear terminal
  contact     Contact information
  about       About this shell

  Want Your Own Terminal CV?
  Type 'create' in browser or visit:
  → GitHub: https://github.com/broddo-baggins/ShellCV
`;
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(help);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found\n\nTry:\n  Browser: https://amityogev.com\n  Terminal: curl amityogev.com/resume\n');
  }
}

// Export for Vercel serverless
module.exports = handleRequest;

// Local development server
if (require.main === module) {
  const server = http.createServer(handleRequest);
  
  server.listen(PORT, () => {
    console.log(`Terminal resume server running on port ${PORT}`);
    console.log(`\nTest locally:`);
    console.log(`   Browser:  http://localhost:${PORT}`);
    console.log(`   Terminal: curl localhost:${PORT}`);
    console.log(`             curl localhost:${PORT}/resume`);
  });
}

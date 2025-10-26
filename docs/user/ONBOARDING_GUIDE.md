# ShellCV Onboarding Guide

## Quick Start

Generate your own ShellCV in 2 minutes with our interactive setup scripts!

### Option 1: Node.js Script (Recommended - Cross-Platform)

```bash
node setup-shellcv.js
```

**Why Node.js?**
- ✅ Works on macOS, Windows, Linux
- ✅ No bash required
- ✅ Better error handling
- ✅ Easier to maintain

### Option 2: Bash Script (Unix/macOS/Linux)

```bash
./setup-shellcv.sh
```

**Best for:**
- Unix-based systems
- Users comfortable with bash
- Scripting automation

---

## What the Script Does

The onboarding script will:

1. **Collect Your Information**
   - Personal details (name, title, tagline)
   - Contact info (email, LinkedIn, GitHub)
   - Professional bio
   - Skills and projects (optional)

2. **Generate Project Structure**
   ```
   your-name-shellcv/
   ├── assets/
   │   ├── resume.txt
   │   ├── skills.txt
   │   └── projects.txt
   ├── docs/
   ├── public/
   ├── index.html
   ├── server.js
   ├── terminal.js
   ├── styles.css
   ├── package.json
   ├── README.md
   └── .gitignore
   ```

3. **Configure Everything**
   - Personalized ASCII art
   - Your domain/URL
   - curl endpoints
   - Interactive terminal commands

4. **Ready to Run**
   - Fully functional local server
   - All files pre-configured
   - Mobile-optimized design
   - 90s-style animations included

---

## Interactive Walkthrough

### Step 1: Personal Information

```
Enter your full name (e.g., John Doe): Jane Smith
Enter short name for ASCII art (e.g., J DOE): J SMITH
Enter your professional title (e.g., Software Engineer): Full Stack Developer
Enter your tagline (e.g., Developer | Designer | Creator): Developer | Problem Solver | Tech Enthusiast
```

**Tips:**
- Full name: Your complete professional name
- Short name: Used for ASCII art (keep it concise)
- Title: Your primary role/expertise
- Tagline: 2-4 descriptors separated by |

### Step 2: Contact & Social Links

```
Email address: jane.smith@example.com
LinkedIn username (or full URL): jane-smith
GitHub username (or full URL): janesmith
Location (e.g., San Francisco, CA): New York, NY
Personal website (optional): janesmith.dev
Twitter/X username (optional): janesmith
```

**Tips:**
- Usernames only: Script adds the domain automatically
- Full URLs: Script extracts the relevant part
- Optional fields: Press Enter to skip

### Step 3: Domain Configuration

```
Enter your desired domain name (e.g., johndoe.com): janesmith.com
```

**Tips:**
- Use your intended domain (doesn't need to exist yet)
- Shows in terminal prompt and curl commands
- Can be changed later in code

### Step 4: Content (Optional)

#### Skills
```
Add skills now? (y/n): y
Enter skills (comma-separated): JavaScript, Python, React, Node.js, Docker, AWS
```

#### Projects
```
Add projects now? (y/n): y
Number of projects (1-5): 2

Project 1:
  Name: E-Commerce Platform
  Description: Full-stack shopping cart with payment integration
  URL (optional): github.com/janesmith/ecommerce

Project 2:
  Name: Weather Dashboard
  Description: Real-time weather app with interactive maps
  URL (optional): weatherdash.janesmith.dev
```

**Tips:**
- You can skip and edit files later
- assets/ folder is easy to update
- Projects: Add 1-5 of your best work

---

## After Generation

### 1. Navigate to Project

```bash
cd jane-smith-shellcv
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Express.js (web server)
- No other dependencies! (Minimal footprint)

### 3. Edit Content

Open `assets/` and customize:

**resume.txt** - Your full CV
```
Add sections like:
- Work Experience
- Education
- Certifications
- Awards & Recognition
```

**skills.txt** - Technical skills
```
Organize by category:
- Programming Languages: JavaScript, Python, Go
- Frameworks: React, Vue, Express
- Tools: Docker, Kubernetes, Git
- Databases: PostgreSQL, MongoDB, Redis
```

**projects.txt** - Portfolio
```
For each project:
- Name & description
- Technologies used
- Key achievements
- Live demo link
- GitHub repository
```

### 4. Start Server

```bash
npm start
```

You'll see:
```
Terminal resume server running on port 3333
Test locally:
   Browser:  http://localhost:3333
   Terminal: curl localhost:3333
```

### 5. Test Everything

**Browser Test:**
```bash
open http://localhost:3333
```

**Terminal Test:**
```bash
curl localhost:3333           # Home page
curl localhost:3333/help      # Commands
curl localhost:3333/resume    # Full CV
curl localhost:3333/skills    # Skills
curl localhost:3333/projects  # Projects
```

**Mobile Test:**
1. Find your IP: `ifconfig | grep "inet "`
2. On phone: `http://YOUR_IP:3333`
3. Or use Chrome DevTools mobile simulator

---

## Customization

### Change Colors

Edit `styles.css`:
```css
/* ASCII Art */
.ascii-logo {
    color: #ff9966;  /* Change to your color */
}

/* Links */
a {
    color: #5bc0de;  /* Change link color */
}
```

### Add Custom Commands

Edit `terminal.js`:
```javascript
case 'blog':
    return 'Check out my blog at: https://yourblog.com';

case 'linkedin':
    window.open('https://linkedin.com/in/yourprofile', '_blank');
    return 'Opening LinkedIn...';
```

### Modify ASCII Art

Use an ASCII art generator:
- https://patorjk.com/software/taag/
- Font: ANSI Shadow or Big
- Replace in `server.js` and `terminal.js`

---

## Deployment Options

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts
4. Your CV is live! 🚀

### Railway

1. Create account at railway.app
2. New Project → Deploy from GitHub
3. Connect repository
4. Railway auto-detects Node.js
5. Live in minutes!

### Render

1. Sign up at render.com
2. New → Web Service
3. Connect GitHub repo
4. Build command: `npm install`
5. Start command: `npm start`
6. Deploy!

### Traditional Hosting

1. VPS (DigitalOcean, Linode)
2. Install Node.js
3. Clone your repo
4. Run with PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

---

## Troubleshooting

### Script won't run

**Bash script:**
```bash
chmod +x setup-shellcv.sh
./setup-shellcv.sh
```

**Node.js script:**
```bash
node setup-shellcv.js
```

### Port 3333 already in use

Change in `server.js`:
```javascript
const PORT = process.env.PORT || 4000;  // Use different port
```

### Files not copying

If `styles.css` or `terminal.js` don't copy:
1. Download from: https://github.com/broddo-baggins/ShellCV
2. Copy to your project directory

### npm install fails

Update Node.js:
```bash
node --version  # Should be 14.0.0 or higher
```

Update npm:
```bash
npm install -g npm@latest
```

### curl not showing colors

Some terminals don't support ANSI colors.
Colors work in:
- macOS Terminal
- iTerm2
- Windows Terminal
- Linux terminal emulators

---

## FAQ

**Q: Can I use this commercially?**  
A: Yes! MIT License allows commercial use.

**Q: Do I need to know coding?**  
A: Basic knowledge helps, but the script generates everything. You can learn as you go!

**Q: Can I customize the design?**  
A: Absolutely! All CSS and JavaScript is editable.

**Q: Works on Windows?**  
A: Yes! Use the Node.js script (`setup-shellcv.js`).

**Q: How do I update content?**  
A: Just edit the `.txt` files in `assets/` and restart the server.

**Q: Can I add a blog?**  
A: Yes! Add a new route in `server.js` and corresponding command in `terminal.js`.

**Q: Mobile-friendly?**  
A: Yes! Responsive design with 768px and 480px breakpoints built-in.

**Q: SEO optimized?**  
A: Basic SEO is included. Add meta tags in `index.html` for better optimization.

---

## Examples

See live examples:
- **Original**: https://amityogev.com
- **Creator**: https://github.com/broddo-baggins/ShellCV

---

## Support

- **Issues**: https://github.com/broddo-baggins/ShellCV/issues
- **Discussions**: https://github.com/broddo-baggins/ShellCV/discussions
- **Email**: Check the repository for contact info

---

## Contributing

Found a bug? Want to add features?

1. Fork the repo
2. Create feature branch
3. Make changes
4. Submit pull request

We welcome contributions! 🎉

---

Built with ❤️ using ShellCV v1.0.0-EA


# ShellCV Generator - Quick Start

## For Users Creating Their CV

### Step 1: Get ShellCV

```bash
git clone https://github.com/broddo-baggins/ShellCV.git
cd ShellCV
```

### Step 2: Run the Generator

**Cross-Platform (Recommended):**
```bash
node setup-shellcv.js
```

**macOS/Linux:**
```bash
./setup-shellcv.sh
```

### Step 3: Answer Questions

The script will ask for:
1. Your name and title
2. Contact information
3. Professional bio
4. Skills (optional)
5. Projects (optional)

### Step 4: Generated Project

You'll get a complete project:
```
your-name-shellcv/
├── assets/
│   ├── resume.txt       ← Edit your CV here
│   ├── skills.txt       ← Add your skills
│   └── projects.txt     ← List your projects
├── index.html           ← Browser interface
├── server.js            ← Web server
├── terminal.js          ← Terminal logic
├── styles.css           ← Design
├── package.json         ← Dependencies
└── README.md            ← Instructions
```

### Step 5: Install & Run

```bash
cd your-name-shellcv
npm install
npm start
```

Open http://localhost:3333

### Step 6: Customize Content

Edit the files in `assets/`:
- **resume.txt** - Your full CV
- **skills.txt** - Technical skills
- **projects.txt** - Portfolio

### Step 7: Deploy

**Vercel (Easiest):**
```bash
npm install -g vercel
vercel
```

**Railway:**
1. Go to railway.app
2. New Project → Deploy from GitHub
3. Done!

**Render:**
1. Go to render.com
2. New Web Service
3. Connect GitHub
4. Deploy!

---

## What You Get

### Browser Features
✅ Interactive terminal interface  
✅ 90s-style loading animation  
✅ Command history (↑/↓ arrows)  
✅ Tab autocomplete  
✅ Mobile-optimized  
✅ Fast & lightweight  

### curl API
✅ `curl yourdomain.com` - Home page  
✅ `curl yourdomain.com/resume` - Full CV  
✅ `curl yourdomain.com/skills` - Skills  
✅ `curl yourdomain.com/projects` - Projects  
✅ `curl yourdomain.com/help` - Commands  

### Design
✅ YSAP-inspired aesthetics  
✅ Orange gradient accent  
✅ Dark terminal theme  
✅ Responsive layout  
✅ Zero dependencies  

---

## Examples

### Input Example
```
Name: Jane Smith
Title: Full Stack Developer
Tagline: Developer | Problem Solver | Tech Enthusiast
Domain: janesmith.com
```

### Output Example
Browser shows:
```
   JANE SMITH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Developer | Problem Solver | Tech Enthusiast

┌─────────────────About─────────────────┐
│ Full Stack Developer with 5 years exp│
└────────────────────────────────────────┘

$ curl janesmith.com/help
```

curl shows:
```bash
$ curl janesmith.com

   JANE SMITH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Developer | Problem Solver | Tech Enthusiast

$ curl janesmith.com/resume
[Full resume content...]
```

---

## Troubleshooting

**"Script won't run"**
```bash
# Make executable (macOS/Linux)
chmod +x setup-shellcv.sh

# Or use Node.js version
node setup-shellcv.js
```

**"Files not copying"**
Make sure you're running the script FROM the ShellCV directory:
```bash
cd ShellCV
node setup-shellcv.js
```

**"Port 3333 in use"**
Edit `server.js` and change the port:
```javascript
const PORT = process.env.PORT || 4000;
```

**"npm install fails"**
Update Node.js to v14+ :
```bash
node --version  # Should be 14.0.0+
```

---

## Need Help?

- 📖 [Full Documentation](docs/ONBOARDING_GUIDE.md)
- 🐛 [Report Issues](https://github.com/broddo-baggins/ShellCV/issues)
- 💬 [Discussions](https://github.com/broddo-baggins/ShellCV/discussions)

---

**Created with ShellCV v1.0.0-EA**  
MIT License - Fork freely!


# ShellCV Deployment Guide

This guide covers deploying both the template (public) and your personal site (private).

## Overview

**Two Repository Strategy:**
1. **ShellCV-Template** - Public template with no personal data
2. **your-name-cv** - Your private personal site with actual resume content

## Part 1: Setting Up ShellCV Template (Public)

### Step 1: Create Template Repository

```bash
# Clone current repo
git clone https://github.com/your-username/ShellCV.git shellcv-template
cd shellcv-template

# Remove existing git history
rm -rf .git

# Initialize new repository
git init
git add .
git commit -m "INIT: ShellCV Template v2.0.0"
```

### Step 2: Create GitHub Repository

1. Go to GitHub and create new repository: `shellcv-template`
2. Make it **PUBLIC**
3. Don't initialize with README (you already have one)

```bash
# Add remote and push
git remote add origin https://github.com/your-username/shellcv-template.git
git branch -M main
git push -u origin main
```

### Step 3: Verify Template

Check that these files are present and template-ized:
- [ ] `README.template.md` - Template instructions
- [ ] `ai-agent.template.js` - Template AI agent
- [ ] `assets/resume.example.txt` - Example resume
- [ ] `assets/skills.example.txt` - Example skills
- [ ] `assets/projects.example.txt` - Example projects
- [ ] `.gitignore` - Excludes personal data files

Check that personal data is NOT in the repo:
- [ ] No `assets/resume.txt` (should be in .gitignore)
- [ ] No `assets/skills.txt` (should be in .gitignore)
- [ ] No `assets/projects.txt` (should be in .gitignore)
- [ ] No `ai-agent.js` with real data
- [ ] No real API keys or `.env` files

## Part 2: Setting Up Your Personal Site (Private)

### Step 1: Create Personal Repository

```bash
# Navigate to your current ShellCV with personal data
cd /path/to/your/ShellCV

# Ensure all personal data is committed
git add .
git commit -m "FINAL: Complete personal site before split"
```

### Step 2: Create Private GitHub Repository

1. Go to GitHub and create new repository: `your-name-cv` or `yourdomain.com`
2. Make it **PRIVATE**
3. Don't initialize with README

```bash
# Update remote to point to new private repo
git remote set-url origin https://github.com/your-username/your-name-cv.git
git push -u origin main
```

### Step 3: Update Repository Links

In your **private** repo, update these files to point to the template:

**index.html:**
```html
<footer class="page-footer">
    <p>source: <a href="https://github.com/your-username/shellcv-template">shellcv-template</a></p>
    <p>&copy; Your Name - ShellCV 2025</p>
</footer>
```

**README.md:**
```markdown
# Your Name - Professional CV

Private repository for my personal ShellCV site.

## Based On
Built with [ShellCV Template](https://github.com/your-username/shellcv-template)

## Deployment
Deployed to: https://yourdomain.com
```

Commit and push:
```bash
git add index.html README.md
git commit -m "UPDATE: Point to public template repo"
git push
```

## Part 3: Deploying to Vercel

### For Personal Site (Private Repo)

1. **Connect Vercel to GitHub:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"

2. **Select Your Private Repository:**
   - Choose `your-name-cv` from the list
   - If not visible, click "Adjust GitHub App Permissions" and grant access

3. **Configure Project:**
   ```
   Framework Preset: Other
   Build Command: npm install (leave default)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `GOOGLE_GEMINI_API_KEY` with your API key
   - Add: `NODE_ENV` = `production`

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Get your deployment URL

6. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `yourdomain.com`)
   - Follow Vercel's DNS configuration instructions

### For Template (Public Repo) - Demo Site

If you want to host a demo of the template:

1. Create a separate deployment in Vercel
2. Use the **public** `shellcv-template` repository
3. Don't add real API keys (use fallback responses for demo)
4. Deploy to subdomain like `shellcv-demo.vercel.app`

## Part 4: Deployment to Railway

### For Personal Site

1. **Go to Railway:**
   - Visit [railway.app](https://railway.app)
   - Sign in with GitHub

2. **New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your **private** repo

3. **Configure:**
   - Railway auto-detects Node.js
   - No build configuration needed

4. **Environment Variables:**
   - Go to Variables tab
   - Add `GOOGLE_GEMINI_API_KEY`
   - Add `PORT` (Railway provides this automatically, but you can override)

5. **Deploy:**
   - Railway deploys automatically
   - Get your railway.app URL
   - Can add custom domain in settings

## Part 5: Deployment to Render

### For Personal Site

1. **Go to Render:**
   - Visit [render.com](https://render.com)
   - Sign in with GitHub

2. **New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your **private** repository

3. **Configure:**
   ```
   Name: your-name-cv
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables:**
   - Add `GOOGLE_GEMINI_API_KEY`
   - Add `NODE_ENV` = `production`

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment
   - Get your .onrender.com URL

## Part 6: Continuous Deployment

### Automatic Deployments

All three platforms support automatic deployments:

**Vercel:**
- Automatically deploys on every push to `main`
- Preview deployments for PRs
- Configure in Project Settings → Git

**Railway:**
- Auto-deploys on push to connected branch
- Can configure deploy triggers
- Settings → Service → Deploys

**Render:**
- Auto-deploys on every push
- Configure in Settings → Build & Deploy
- Can set up deploy hooks

### Manual Deployments

**Vercel CLI:**
```bash
npm install -g vercel
vercel --prod
```

**Railway CLI:**
```bash
npm install -g @railway/cli
railway up
```

**Render:**
Use the Render dashboard to trigger manual deploys.

## Part 7: Managing Two Repositories

### Workflow for Updates

1. **Template Updates** (Public):
   ```bash
   cd shellcv-template
   # Make changes to template files
   git add .
   git commit -m "FEAT: Add new template feature"
   git push
   ```

2. **Personal Site Updates** (Private):
   ```bash
   cd your-name-cv
   # Make changes to your personal content
   git add .
   git commit -m "UPDATE: Add new project to portfolio"
   git push
   # Vercel/Railway/Render auto-deploys
   ```

3. **Pulling Template Updates into Personal Site**:
   ```bash
   cd your-name-cv
   
   # Add template as remote
   git remote add template https://github.com/your-username/shellcv-template.git
   
   # Fetch template changes
   git fetch template
   
   # Merge specific files or features
   git checkout template/main -- specific-file.js
   
   # Or create a branch to test
   git checkout -b template-update
   git merge template/main
   # Resolve conflicts, keeping your personal data
   git checkout main
   git merge template-update
   ```

### Keeping Template Updated

When you make improvements to your personal site that could benefit others:

1. Extract the generic feature
2. Remove personal data
3. Apply to template repo
4. Push to template
5. Others can benefit from your improvements

## Part 8: Security Checklist

### Before Deploying

- [ ] All API keys in environment variables, not code
- [ ] `.env` file in `.gitignore`
- [ ] Personal data files (`assets/*.txt`) in `.gitignore` (template only)
- [ ] No phone numbers in public code
- [ ] No sensitive company information
- [ ] Test locally before deploying

### After Deploying

- [ ] Verify environment variables are set correctly
- [ ] Test AI agent functionality
- [ ] Check all commands work
- [ ] Verify curl API endpoints
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Verify custom domain (if configured)
- [ ] Test rate limiting

## Part 9: Monitoring & Maintenance

### Vercel

**Analytics:**
- Project → Analytics tab
- View page views, API calls, errors

**Logs:**
- Project → Logs tab
- Real-time function logs
- Filter by deployment

### Railway

**Metrics:**
- Service → Metrics tab
- CPU, Memory, Network usage

**Logs:**
- Service → Logs tab
- Real-time stdout/stderr

### Render

**Logs:**
- Service → Logs tab
- Application logs and build logs

**Metrics:**
- Service → Metrics tab
- Memory, CPU, response times

### Common Issues

**High API Usage:**
- Monitor Gemini API usage at Google AI Studio
- Implement stricter rate limiting
- Cache common responses

**Slow Response:**
- Check Gemini API latency
- Optimize session management
- Consider adding Redis for session storage

**Memory Leaks:**
- Monitor memory usage
- Check for unclosed sessions
- Verify cleanup intervals running

## Part 10: Updating After Initial Deployment

### Updating Content

**Personal Site:**
```bash
# Edit your resume/skills/projects
nano assets/resume.txt
nano assets/skills.txt
nano assets/projects.txt

# Update AI agent knowledge
nano ai-agent.js
# Update SYSTEM_CONTEXT with new experience

# Commit and push
git add assets/ ai-agent.js
git commit -m "UPDATE: Add new project and skills"
git push
# Auto-deploys to production
```

### Updating Template

**Template Repository:**
```bash
# Make improvements
nano terminal.js  # e.g., add new feature

# Update documentation
nano README.template.md

# Commit and push
git add .
git commit -m "FEAT: Add auto-complete for commands"
git push
```

## Part 11: Rollback Procedures

### Vercel Rollback

1. Go to Project → Deployments
2. Find previous successful deployment
3. Click "..." menu → "Promote to Production"

### Railway Rollback

1. Go to Service → Deployments
2. Click on previous deployment
3. Click "Rollback to this version"

### Render Rollback

1. Go to Service → Events
2. Find previous successful deploy
3. Manually revert code and redeploy

### Git Rollback

```bash
# View commits
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push

# Or hard reset (dangerous!)
git reset --hard <commit-hash>
git push --force
```

## Support

If you encounter issues:
- Check deployment platform logs
- Verify environment variables
- Test locally first
- Review [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- Open issue on [GitHub](https://github.com/your-username/shellcv-template/issues)

---

**Success!** Your ShellCV is now live and your template is available for the community.


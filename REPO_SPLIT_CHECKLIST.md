# ShellCV Repository Split - Action Checklist

This is your step-by-step guide to split your current repository into two: a public template and your private personal site.

## Pre-Split Checklist

### ✅ Completed (by AI Agent)

- [x] Created example template files:
  - `assets/resume.example.txt`
  - `assets/skills.example.txt`
  - `assets/projects.example.txt`
- [x] Created `ai-agent.template.js` with placeholder system prompt
- [x] Updated `.gitignore` to exclude personal data files
- [x] Updated `package.json` with template metadata
- [x] Updated `index.html` with template placeholders
- [x] Updated `terminal.js` with template placeholders
- [x] Updated `server.js` with template placeholders
- [x] Created `README.template.md` with template instructions
- [x] Created `DEPLOYMENT_GUIDE.md` with deployment instructions
- [x] Created this checklist

### 🔄 Your Tasks Before Split

- [ ] Review all changes made by AI agent
- [ ] Test locally to ensure everything still works:
  ```bash
  npm start
  # Test in browser: http://localhost:3333
  # Test with curl: curl localhost:3333
  ```
- [ ] Verify your personal `assets/resume.txt`, `assets/skills.txt`, `assets/projects.txt` still exist
- [ ] Verify your personal `ai-agent.js` still exists with your real data
- [ ] Commit all current changes to your current repo:
  ```bash
  git add .
  git commit -m "PREPARE: Repository split preparation"
  git push
  ```

## Split Process

###  Part 1: Create Public Template Repository

1. **Clone current repo to new location:**
   ```bash
   cd ~/projects
   git clone https://github.com/broddo-baggins/ShellCV.git shellcv-template
   cd shellcv-template
   ```

2. **Remove personal data files:**
   ```bash
   # These should already be in .gitignore, but remove from git history
   git rm --cached assets/resume.txt assets/skills.txt assets/projects.txt
   git rm --cached ai-agent.js
   rm assets/resume.txt assets/skills.txt assets/projects.txt
   rm ai-agent.js
   ```

3. **Rename template files to main files:**
   ```bash
   mv README.template.md README.md
   mv ai-agent.template.js ai-agent.js
   ```

4. **Remove .git directory and reinitialize:**
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "INIT: ShellCV Template v2.0.0 - Public template with no personal data"
   ```

5. **Create new GitHub repository:**
   - Go to github.com
   - Create new repository: `shellcv-template`
   - Make it **PUBLIC**
   - Don't initialize with README

6. **Push to new repository:**
   ```bash
   git remote add origin https://github.com/your-username/shellcv-template.git
   git branch -M main
   git push -u origin main
   ```

7. **Verify template repo:**
   - [ ] Check GitHub - no personal data visible
   - [ ] Verify .gitignore includes personal files
   - [ ] Check README is clear for template users
   - [ ] Ensure example files are present

### Part 2: Set Up Private Personal Repository

1. **Navigate to your original ShellCV:**
   ```bash
   cd /Users/amity/projects/ShellCV
   ```

2. **Ensure all personal data is committed:**
   ```bash
   git status
   git add .
   git commit -m "FINAL: Complete personal site with all data"
   ```

3. **Create new private GitHub repository:**
   - Go to github.com
   - Create new repository: `amityogev.com` or `amityogev-cv`
   - Make it **PRIVATE**
   - Don't initialize with README

4. **Update remote and push:**
   ```bash
   git remote set-url origin https://github.com/broddo-baggins/amityogev.com.git
   git push -u origin main
   ```

5. **Update links in personal repo to point to template:**
   
   **index.html:**
   ```html
   <footer class="page-footer">
       <p>source: <a href="https://github.com/your-username/shellcv-template">shellcv-template</a></p>
       <p>&copy; Amit Yogev - ShellCV 2025</p>
   </footer>
   ```
   
   Commit and push:
   ```bash
   git add index.html
   git commit -m "UPDATE: Point to public template repository"
   git push
   ```

6. **Verify private repo:**
   - [ ] Check GitHub - repository is private
   - [ ] Verify all your personal data is there
   - [ ] Verify ai-agent.js has your real resume data
   - [ ] Check assets/ has your real resume/skills/projects

### Part 3: Deploy Private Site to Vercel

1. **Connect Vercel:**
   - Go to vercel.com
   - Click "New Project"
   - Import from GitHub
   - Select your PRIVATE repository (`amityogev.com`)

2. **Configure:**
   ```
   Framework Preset: Other
   Build Command: (leave default)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

3. **Add Environment Variables:**
   - `GOOGLE_GEMINI_API_KEY`: your_actual_api_key
   - `NODE_ENV`: production

4. **Deploy:**
   - Click Deploy
   - Wait for completion
   - Test the deployed site

5. **Configure Custom Domain:**
   - Go to Project Settings → Domains
   - Add `amityogev.com`
   - Update DNS records as instructed by Vercel
   - Wait for DNS propagation (can take up to 48 hours)

6. **Verify deployment:**
   - [ ] Visit https://your-deployment.vercel.app
   - [ ] Test AI agent: type `ask who are you?`
   - [ ] Test resume command
   - [ ] Test game: type `play`
   - [ ] Test curl: `curl your-deployment.vercel.app`
   - [ ] Test custom domain (if configured)

## Post-Split Tasks

### Documentation Updates

In **Template Repo** (Public):
- [ ] Update README.md with clear template instructions
- [ ] Add contributing guidelines if accepting PRs
- [ ] Create GitHub issues templates
- [ ] Add LICENSE file (MIT recommended)
- [ ] Create CHANGELOG.md

In **Personal Repo** (Private):
- [ ] Update README.md to mention it's private
- [ ] Link to public template
- [ ] Document your deployment URL
- [ ] Add notes about personal customizations

### Testing Checklist

Test **Template Repo** locally:
```bash
cd shellcv-template
npm install
npm start
```
- [ ] Runs without errors (even without .env)
- [ ] Shows template placeholders
- [ ] Example files load correctly
- [ ] No personal data visible
- [ ] README instructions are clear

Test **Personal Site** (deployed):
- [ ] AI agent responds with your actual experience
- [ ] Resume shows your real data
- [ ] Skills show your technologies
- [ ] Projects show your portfolio
- [ ] Links go to your actual profiles
- [ ] Email is your real email
- [ ] Game works
- [ ] All commands function
- [ ] curl API works
- [ ] Mobile responsive
- [ ] No console errors

### Cleanup

- [ ] Delete old clones/copies used during split
- [ ] Update bookmarks to new repository URLs
- [ ] Update any documentation that referenced old repo
- [ ] Announce template availability (if desired)

## Ongoing Maintenance

### When You Update Your Resume:

```bash
cd /Users/amity/projects/ShellCV  # Your private repo
nano assets/resume.txt
nano ai-agent.js  # Update SYSTEM_CONTEXT if needed
git add .
git commit -m "UPDATE: Add new role and achievements"
git push
# Vercel auto-deploys
```

### When You Improve Template:

If you add a feature to your personal site that others could benefit from:

1. Extract the generic feature
2. Remove personal data
3. Test in template repo:
   ```bash
   cd ~/projects/shellcv-template
   # Add the feature
   git add .
   git commit -m "FEAT: Add new feature"
   git push
   ```

3. Pull into your personal site if needed:
   ```bash
   cd /Users/amity/projects/ShellCV
   git remote add template https://github.com/your-username/shellcv-template.git
   git fetch template
   git cherry-pick <commit-hash>  # Pick specific commits
   ```

## Rollback Plan

If something goes wrong during the split:

1. **Your original data is safe** - it's still in your current repo
2. **Template repo is new** - can delete and recreate
3. **No deployment yet** - no production impact

To rollback:
```bash
# Delete template attempt
cd ~/projects
rm -rf shellcv-template

# Your original is untouched at:
cd /Users/amity/projects/ShellCV

# Reset if needed
git reset --hard HEAD~1  # Goes back one commit
```

## Support & Questions

If you encounter issues:

1. **Check this checklist** - did you miss a step?
2. **Review DEPLOYMENT_GUIDE.md** - detailed deployment instructions
3. **Test locally first** - before deploying
4. **Check logs** - Vercel provides detailed error logs
5. **Git history** - you can always go back

## Success Indicators

You'll know the split was successful when:

✅ Template repo is public on GitHub with no personal data
✅ Personal repo is private on GitHub with all your data
✅ Personal site is deployed to Vercel at your domain
✅ AI agent knows your real resume and responds accurately
✅ Template README clearly explains how others can use it
✅ Both repos are independently maintained
✅ You can pull template updates into your personal site

---

**Ready to proceed?** Start with Part 1 and work through systematically. Take your time and test at each step.

**Estimated Time:** 2-3 hours for complete split and deployment


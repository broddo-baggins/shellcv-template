# ShellCV Deployment Guide

Complete guide to deploying your terminal CV to production.

---

## Quick Deploy (3 Steps)

### Step 1: Install & Login to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login (opens browser)
vercel login
```

Choose "Continue with GitHub" and authorize Vercel.

### Step 2: Deploy to Production

```bash
cd /path/to/your/shellcv
vercel --prod
```

**Answer prompts:**
- Set up and deploy? → `Y`
- Which scope? → Your account (press Enter)
- Link to existing project? → `N`  
- Project name? → `shellcv` (or press Enter)
- Directory? → `./` (press Enter)
- Override settings? → `N`

**Result:** You get a URL like `https://shellcv.vercel.app`

### Step 3: Test Your Deployment

```bash
# Test with curl
curl https://your-url.vercel.app

# Open in browser
open https://your-url.vercel.app
```

---

## Custom Domain Setup

### If you have a domain (e.g., yourdomain.com):

#### A. Add Domain in Vercel

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Settings → Domains
4. Click "Add Domain"
5. Enter your domain (e.g., `yourdomain.com`)
6. Click "Add"

Vercel will show DNS records you need:
```
Type: A
Name: @
Value: 76.76.21.21 (example - use your actual value)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### B. Update Your DNS Provider

**For GoDaddy:**
1. Go to: https://account.godaddy.com/
2. My Products → Find your domain → DNS
3. Delete old A and CNAME records for @ and www
4. Add new records from Vercel:

**A Record:**
```
Type: A
Name: @ (or blank)
Value: [from Vercel]
TTL: 600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

5. Save and wait 10-60 minutes for DNS propagation

**For Other Providers (Cloudflare, Namecheap, etc.):**
- Same process: Add A record pointing to Vercel's IP
- Add CNAME for www pointing to `cname.vercel-dns.com`

#### C. Verify DNS Propagation

```bash
# Check DNS
nslookup yourdomain.com

# Test when ready
curl yourdomain.com
```

Check worldwide: https://dnschecker.org/#A/yourdomain.com

---

## Deployment Options

### Option 1: Vercel CLI (Recommended)

**Pros:**
- Fast and simple
- Full control
- Works from terminal

**Cons:**
- Manual deployment (unless you set up CI/CD)

```bash
# Every update:
git commit -am "Update content"
vercel --prod
```

### Option 2: GitHub + Vercel Integration

**Pros:**
- Auto-deploy on every push
- No manual deployment
- Built-in previews for PRs

**Cons:**
- Requires GitHub account
- One-time setup

**Setup:**
1. Push code to GitHub
2. Go to: https://vercel.com/new
3. Import your GitHub repo
4. Vercel auto-configures
5. Every `git push` triggers deployment!

### Option 3: Other Platforms

**Railway:**
- https://railway.app
- Free tier available
- Auto-detects Node.js
- Connect GitHub repo

**Render:**
- https://render.com
- Free tier available
- Connect GitHub
- Build: `npm install`
- Start: `npm start`

**Heroku:**
- https://heroku.com
- Classic platform
- Requires `Procfile`
- Good documentation

---

## Post-Deployment

### Update Content

**Local Development:**
```bash
# Edit content files
nano Career_Documents/resume.txt
nano Career_Documents/skills.txt
nano Career_Documents/projects.txt

# Test locally
node server.js

# If good, deploy
git add .
git commit -m "Update resume"
git push  # Auto-deploys if GitHub integration
# OR
vercel --prod  # Manual deploy
```

### Monitor Performance

**Vercel Dashboard:**
- https://vercel.com/dashboard
- View deployment status
- Check analytics
- Monitor errors
- See bandwidth usage

### Set Up Analytics (Optional)

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

Add to your `index.html`:
```html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

---

## Troubleshooting

### Vercel Login Issues

```bash
# Logout and try again
vercel logout
vercel login
```

### Deployment Fails

**Check logs:**
```bash
vercel logs [deployment-url]
```

**Common issues:**
- Missing `package.json` or `server.js`
- Wrong start command (should be `node server.js`)
- Port issues (use `process.env.PORT || 3333`)

### DNS Not Updating

**After 2+ hours:**
1. Delete ALL old DNS records for your domain
2. Re-add ONLY Vercel's records
3. Wait another hour
4. Clear your DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### SSL Certificate Issues

**Vercel handles SSL automatically**, but if you see warnings:
1. Wait 24 hours (cert provisioning takes time)
2. Check domain is correctly configured
3. Remove and re-add domain in Vercel dashboard

### Port Already in Use (Local)

```bash
# Find process using port 3333
lsof -ti:3333

# Kill it
kill -9 $(lsof -ti:3333)

# Or change port in server.js
const PORT = process.env.PORT || 4000;
```

---

## Environment Variables

If you need environment variables (API keys, etc.):

**In Vercel Dashboard:**
1. Project → Settings → Environment Variables
2. Add key-value pairs
3. Redeploy for changes to take effect

**Example:**
```
Key: API_KEY
Value: your-secret-key
Environments: Production, Preview, Development
```

**Access in code:**
```javascript
const apiKey = process.env.API_KEY;
```

---

## CI/CD Setup (Advanced)

### GitHub Actions (Alternative to Vercel Integration)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

**Get tokens:**
1. Vercel Dashboard → Settings → Tokens
2. Create new token
3. Add to GitHub Secrets

---

## Performance Optimization

### Enable Caching

In `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### Compress Assets

**Server-side:**
```javascript
const compression = require('compression');
app.use(compression());
```

### Monitor Bundle Size

```bash
# Check file sizes
ls -lh Career_Documents/
ls -lh game/

# Optimize if needed
```

---

## Security

### HTTPS Only

Vercel enforces HTTPS automatically. If you need to ensure it in code:

```javascript
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
```

### Rate Limiting

Add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## Rollback

### If Deployment Breaks

**Vercel:**
1. Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

**CLI:**
```bash
# List deployments
vercel list

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## Cost Considerations

### Vercel Free Tier Limits

- **Bandwidth**: 100GB/month
- **Executions**: 100GB-hours
- **Builds**: Unlimited
- **Domains**: Custom domains allowed
- **SSL**: Free and automatic

**When you exceed:**
- Upgrade to Pro ($20/month)
- Or switch to another platform

### Cost Optimization Tips

1. **Enable caching** (reduce bandwidth)
2. **Compress assets** (smaller transfers)
3. **Monitor usage** (Vercel dashboard)
4. **Set up alerts** (email notifications)

---

## Where to Share Your ShellCV

Once deployed, share it everywhere:

### Email Signature
```
Your Name | Your Title
💻 curl yourname.com
```

### LinkedIn About
```
Check out my terminal CV: curl yourname.com
```

### Business Card
```
YOUR NAME
💻 curl yourname.com
```

### Cover Letters
```
P.S. You can view my tech stack by running:
curl yourname.com
```

### Twitter/X Bio
```
Product Manager | Developer
💻 curl yourname.com
```

### GitHub README
```markdown
# Your Name

Terminal CV: `curl yourname.com`
```

---

## Checklist

### Pre-Deployment
- [ ] Test locally (`node server.js`)
- [ ] All content files updated
- [ ] Git committed
- [ ] No hardcoded secrets
- [ ] Port uses `process.env.PORT`

### Deployment
- [ ] Vercel account created
- [ ] Vercel CLI installed
- [ ] Logged in (`vercel login`)
- [ ] Deployed (`vercel --prod`)
- [ ] URL works

### Custom Domain
- [ ] Domain added in Vercel
- [ ] DNS records updated
- [ ] DNS propagated (check dnschecker.org)
- [ ] HTTPS works
- [ ] www redirect works

### Post-Deployment
- [ ] Test `curl yourdomain.com`
- [ ] Test browser access
- [ ] Test mobile (DevTools)
- [ ] Share on LinkedIn
- [ ] Update resume with URL
- [ ] Monitor analytics

---

## Getting Help

**Vercel Docs:** https://vercel.com/docs  
**Vercel Support:** https://vercel.com/support  
**Community:** https://github.com/vercel/vercel/discussions  
**Status:** https://www.vercel-status.com/

---

**Happy deploying!** 🚀

*Your terminal CV is just `curl` away from being seen by the world.*


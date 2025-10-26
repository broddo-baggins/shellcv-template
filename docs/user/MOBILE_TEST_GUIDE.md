# Mobile Testing Guide

## How to Test on Mobile

### Option 1: Local Network Testing
1. Find your Mac's IP address:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   
2. On your phone, open browser and go to:
   ```
   http://YOUR_IP_ADDRESS:3333
   ```

### Option 2: Chrome DevTools (Desktop)
1. Open Chrome DevTools (Cmd+Option+I)
2. Click device toolbar icon (Cmd+Shift+M)
3. Select device:
   - iPhone 12/13/14 Pro (390×844)
   - iPhone 12/13/14 Pro Max (428×926)
   - iPhone SE (375×667)
   - Samsung Galaxy S20 (360×800)

### Mobile Optimizations Included

#### Breakpoint: 768px (Tablet)
- Single column layout
- Font size: 12px
- ASCII logo: 9px
- Full-width terminal
- Zero outer padding

#### Breakpoint: 480px (Phone)
- Font size: 11px
- ASCII logo: 8px
- Minimal padding: 2px
- Height: 80vh (more vertical space)
- Ultra-compact spacing

## What to Test

1. **Layout**
   - ✅ Single column info boxes
   - ✅ ASCII art readable
   - ✅ No horizontal scrolling
   - ✅ Gradient bar visible

2. **Functionality**
   - ✅ Command input works
   - ✅ Typing animation smooth
   - ✅ Commands respond: `help`, `resume`, `skills`, `projects`
   - ✅ Links clickable

3. **Visual**
   - ✅ Terminal fits screen
   - ✅ Text not cut off
   - ✅ Colors visible
   - ✅ Scrolling smooth

## CURL Testing

Test all endpoints work:
```bash
# Home page
curl localhost:3333

# Help
curl localhost:3333/help

# Resume
curl localhost:3333/resume

# Skills
curl localhost:3333/skills

# Projects
curl localhost:3333/projects

# Play (game info)
curl localhost:3333/play
```

## Animation Features

### 90s-Style Loading
- Command types character-by-character (20ms/char)
- Content loads in chunks (30ms/chunk)
- Mimics classic terminal line-by-line rendering
- Auto-scrolls during animation

### What You'll See
1. Prompt appears: `~/amityogev.com $`
2. `curl amityogev.com` types out
3. ASCII art appears
4. Gradient bar loads
5. Tagline appears
6. Info boxes load
7. Legend section loads

## Current Status

✅ **Spacing**: 1 line before/after tagline  
✅ **About Section**: Explains what this terminal is  
✅ **Help Prompt**: "Type 'help' or 'start' to begin exploring"  
✅ **CURL**: All endpoints tested and working  
✅ **Mobile**: Responsive design with 768px and 480px breakpoints  
✅ **Animation**: 90s-style line-by-line loading  

## Server Commands

```bash
# Start server
cd /Users/amity/projects/ShellCV && node server.js

# Restart server
pkill -f "node server.js" && sleep 1 && node server.js

# Test locally
open http://localhost:3333
curl localhost:3333
```


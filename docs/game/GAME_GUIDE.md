# PM Dungeon Crawler: The Corporate Climb - Complete Game Guide

## Table of Contents
1. [Why This Game Exists](#why-this-game-exists)
2. [Game Heritage & Inspiration](#game-heritage--inspiration)
3. [The Story](#the-story)
4. [How to Play](#how-to-play)
5. [Career Progression (The Map)](#career-progression-the-map)
6. [Resources & Stats](#resources--stats)
7. [Encounters & Gameplay](#encounters--gameplay)
8. [Items & Equipment](#items--equipment)
9. [PM Frameworks (Skills)](#pm-frameworks-skills)
10. [Strategy Guide](#strategy-guide)
11. [Endgame & Victory](#endgame--victory)
12. [Save/Load System](#saveload-system)

---

## Why This Game Exists

**PM Dungeon Crawler: The Corporate Climb** was built to showcase Product Management expertise in an interactive, memorable way. Instead of just listing frameworks like RICE, OKRs, and AARRR on a resume, this game **teaches them through gameplay**.

### The Problem
- Traditional resumes are static and boring
- PM skills are hard to demonstrate without real work examples
- Most portfolios just list buzzwords without depth

### The Solution
A **playable resume** that:
- Demonstrates deep PM knowledge through game mechanics
- Shows technical coding skills (pure JavaScript, no frameworks)
- Creates a memorable experience that stands out
- Educates players about PM challenges and frameworks

### What Makes It Special
1. **Educational**: Learn real PM concepts while playing
2. **Interactive**: Make decisions with real consequences
3. **Authentic**: Every scenario is based on actual PM work
4. **Technical Showcase**: Clean code, TDD methodology, modular design
5. **Unique Format**: A game inside a terminal CV (never been done before)

---

## Game Heritage & Inspiration

### Primary Inspiration: NetHack (1987)

**NetHack** is the grandfather of roguelikes - a legendary ASCII-based dungeon crawler that has been continuously developed since 1987.

**What We Took From NetHack:**
- ⚔️ ASCII terminal interface (no graphics, pure text)
- 🎲 Procedural generation (random encounters)
- 💀 Permadeath consequences (game over when resources hit 0)
- 📦 Deep item system (equipment, consumables, artifacts)
- 🔮 Complex interactions (items affect stats in multiple ways)
- 💾 Save/load via hash codes
- 🎮 Turn-based decision making
- 📚 "Learn by doing" philosophy

### Secondary Inspiration: Idle/Incremental Games

Games like **A Dark Room**, **Candy Box**, and **Universal Paperclips** pioneered the idle game genre.

**What We Took From Idle Games:**
- ⏱️ Passive progression (resources accumulate)
- 📊 Resource management focus
- 🎯 Meaningful choices at key moments
- 💾 Portable save codes
- 🔁 Replayability through different strategies

### The PM Twist: From Combat to Corporate

We adapted classic roguelike mechanics to Product Management:

| Roguelike Element | PM Dungeon Crawler Adaptation |
|------------------|-------------------|
| **Hero battling monsters** | PM navigating corporate challenges |
| **HP/Mana** | Energy/Credibility |
| **Dungeon floors** | Career levels (APM to CPO) |
| **Enemies** | Stakeholders, scope creep, technical debt |
| **Items** | PM tools (Jira, Figma, frameworks) |
| **Spells** | PM frameworks (RICE, OKRs, JTBD) |
| **Boss fights** | Major career milestones |
| **Loot** | Budget, XP, credibility gains |
| **Character death** | Burnout or lost credibility |

---

## The Story

### Protagonist: The Product Manager

You play as a **Product Manager** starting at the bottom of the corporate ladder. Your name is yours to choose (or default to AMIT).

**Your Starting Situation:**
- **Title**: Associate Product Manager (APM)
- **Energy**: 100 (fresh and eager)
- **Credibility**: 50 (unproven but hired)
- **Budget**: $0 (need to earn it)
- **Team Morale**: 75 (optimistic new team)

**Your Mission:**
Climb from **Associate PM to Chief Product Officer** (CPO) by:
- Making strategic decisions that balance multiple stakeholders
- Shipping products on time and on budget
- Building credibility through data-driven wins
- Managing team morale while increasing velocity
- Surviving crises, politics, and corporate chaos

### The World

**The Corporate Maze** - Seven levels of increasing complexity:

1. **Startup Basement** (APM) - Small team, scrappy environment
2. **Growth Floor** (PM) - Scaling challenges emerge
3. **Product Wing** (Senior PM) - Multiple products to juggle
4. **Strategy Tower** (Lead PM) - Setting direction for others
5. **Leadership Summit** (Director) - Building and leading teams
6. **Executive Boardroom** (VP Product) - Company-wide strategy
7. **The C-Suite** (CPO) - The ultimate goal

**The Stakes:**
- **Burnout** (Energy = 0): You collapse from overwork
- **Lost Influence** (Credibility = 0): You're pushed out
- **Victory** (CPO): You've climbed to the top!

### The Reality

Every encounter is based on **real PM challenges**:
- 6 AM email avalanches (47 unread before coffee)
- "Urgent" requests that can wait
- Stakeholders with conflicting priorities
- Technical debt vs. new features
- Production down at 3 AM
- CEO wants "AI in everything"
- Scope creep during sprints
- Engineers blocked on unclear specs
- Sales promising impossible timelines

This isn't a fantasy world - **it's your actual work life, gamified**.

---

## How to Play

### Starting the Game

```bash
# In the terminal CV
$ play

# Or
$ game
```

### Main Menu

```
╔═══════════════════════════════════════╗
║   PM DUNGEON CRAWLER                  ║
║   The Corporate Climb                 ║
╚═══════════════════════════════════════╝

[n] New Game - Start your PM journey
[l] Load Game - Enter save code
[h] Help - Game instructions
[q] Quit - Return to terminal CV
```

### Commands During Play

| Command | Action |
|---------|--------|
| `[1-4]` | Choose decision (most encounters have 4 choices) |
| `[s]` | Save game (get hash code) |
| `[stats]` | View detailed stats |
| `[i]` | View inventory |
| `[q]` | Quit to menu (progress saved) |

### Decision Making

Each encounter presents 2-4 choices:

```
═══ DAILY STANDUP ═══
Engineer: "I'm blocked on the API specs."

[1] Unblock immediately (-5 Energy, +5 Morale) ⭐ OPTIMAL
[2] "Sync after standup" (+5 Velocity, safe choice)
[3] "Figure it out" (-10 Morale, risky)
[4] Skip standup (+5 Energy, -3 Credibility)

Energy: 45/100 | Credibility: 67/100 | Level: 2
```

**Making Choices:**
- Each choice shows stat changes (e.g., -5 Energy, +5 Morale)
- Some choices have success probability (70% success = 30% chance of failure)
- ⭐ indicates optimal choice (doesn't always mean safest!)
- Consider your current resources before choosing

### The Game Loop

1. **Encounter** - A situation appears
2. **Decide** - Choose from 2-4 options
3. **Result** - Stats change, XP gained
4. **Next** - Another encounter or level up
5. **Repeat** - Until victory or game over

---

## Career Progression (The Map)

### The 7 Levels

Your journey from APM to CPO is structured like dungeon floors in NetHack:

#### Level 1: Associate PM (APM)
- **Location**: Startup Basement
- **XP Needed**: 0 (starting level)
- **Max Energy**: 100
- **Base Velocity**: 20 pts/sprint
- **Unlocked Skills**: Basic prioritization, standup management
- **Challenges**: Learning the ropes, proving yourself
- **Boss**: First Sprint Review

#### Level 2: Product Manager (PM)
- **Location**: Growth Floor
- **XP Needed**: 100
- **Max Energy**: 120
- **Base Velocity**: 30 pts/sprint
- **Unlocked Skills**: RICE framework, customer interviews
- **Challenges**: Own a product, ship features consistently
- **Boss**: First Product Launch

#### Level 3: Senior Product Manager (PM II)
- **Location**: Product Wing
- **XP Needed**: 300
- **Max Energy**: 150
- **Base Velocity**: 40 pts/sprint
- **Budget Unlocked**: $50K
- **Unlocked Skills**: OKRs, A/B testing, data analysis
- **Challenges**: Strategic decisions, data-driven culture
- **Boss**: Quarterly Business Review

#### Level 4: Lead Product Manager
- **Location**: Strategy Tower
- **XP Needed**: 600
- **Max Energy**: 180
- **Base Velocity**: 50 pts/sprint
- **Budget**: $200K
- **Unlocked Skills**: Product strategy, roadmap planning
- **Challenges**: Multiple products, mentoring others
- **Boss**: Annual Planning

#### Level 5: Director of Product
- **Location**: Leadership Summit
- **XP Needed**: 1,000
- **Max Energy**: 220
- **Base Velocity**: 65 pts/sprint
- **Budget**: $500K
- **Unlocked Skills**: Team building, hiring, org design
- **Challenges**: Build PM team, manage managers
- **Boss**: Reorg & Restructuring

#### Level 6: VP of Product
- **Location**: Executive Boardroom
- **XP Needed**: 1,500
- **Max Energy**: 260
- **Base Velocity**: 80 pts/sprint
- **Budget**: $1M+
- **Unlocked Skills**: Company strategy, board presentations
- **Challenges**: Cross-functional leadership, vision setting
- **Boss**: Board Meeting

#### Level 7: Chief Product Officer (CPO)
- **Location**: The C-Suite
- **XP Needed**: 2,500
- **Max Energy**: 300
- **Base Velocity**: 100 pts/sprint
- **Budget**: Unlimited
- **Unlocked Skills**: All frameworks mastered
- **Challenges**: Company-wide product vision
- **Boss**: IPO or Acquisition Decision

### Leveling Up

**What Happens When You Level Up:**
- ✨ Max Energy increases (more actions per day)
- 📈 Base Velocity increases (ship faster)
- 💰 Budget increases (more resources)
- 🎯 New skills unlock (access to new frameworks)
- 🏆 Title changes (reflected in all encounters)
- 🎉 Celebration message with stats summary

**XP Sources:**
- Daily encounters: 5-15 XP
- Stakeholder encounters: 15-30 XP
- Crisis encounters: 30-50 XP
- Boss encounters: 50-100 XP
- Successful launches: Bonus XP
- High-risk decisions: Extra XP if succeed

---

## Resources & Stats

### Core Resources

#### 🔋 Energy (100-300)
**What It Is:** Your daily action points and mental stamina.

**How It Works:**
- Starts at 100, increases to 300 at CPO level
- Every decision costs energy (meetings, emails, decisions)
- Restored by: Coffee, delegation, WFH days, weekends
- Depleted by: Meetings, crises, urgent requests, all-hands

**Game Over:** Energy = 0 = **Burnout** 🔥

**Management Tips:**
- Save energy for crises
- Use coffee strategically
- Delegate when possible
- Say "no" to non-essential meetings

#### 🎯 Credibility (0-100)
**What It Is:** Your influence and reputation in the organization.

**How It Works:**
- Starts at 50 (unproven but hired)
- Gained by: Shipping on time, data-driven decisions, stakeholder wins
- Lost by: Missed deadlines, bad calls, failed launches, broken promises

**Game Over:** Credibility = 0 = **Fired** 💼

**Management Tips:**
- Under-promise, over-deliver
- Back decisions with data
- Take accountability for failures
- Build relationships early

#### 💰 Budget ($0-$1M+)
**What It Is:** Financial resources you control.

**How It Works:**
- Starts at $0 (earn through wins)
- Unlocked at Senior PM level
- Spend on: Hiring, tools, contractors, marketing, prototypes
- Earned through: Successful launches, hitting goals, proving ROI

**Not Game-Ending:** But severely limits options

**Usage Tips:**
- Invest in tools early (10x returns)
- Hire when velocity is bottleneck
- Prototypes validate before big bets
- Marketing amplifies good products

#### 😊 Team Morale (0-100)
**What It Is:** Your team's happiness and motivation.

**How It Works:**
- Starts at 75 (optimistic new team)
- Affects: Velocity, quality, retention
- Boosted by: Wins, clarity, 1-on-1s, work-life balance
- Damaged by: Crunch, uncertainty, bad decisions, politics

**Impact:** Low morale = Low velocity = Slower shipping

**Management Tips:**
- Regular 1-on-1s
- Clear priorities (no thrashing)
- Celebrate wins (even small ones)
- Protect team from politics

#### 🚀 Velocity (20-100 pts/sprint)
**What It Is:** How fast you ship features.

**How It Works:**
- Starts at 20 pts/sprint (small team)
- Scales with: Level, team size, morale, tools
- Reduced by: Tech debt, low morale, blockers

**Impact:** Higher velocity = More XP per sprint

**Improvement Tips:**
- Hire when affordable
- Clear specs reduce rework
- Automate repetitive tasks
- Pay down tech debt

---

## Encounters & Gameplay

### Encounter Types

#### 🟢 Daily Encounters (70% early game)
**Frequency:** Common  
**Difficulty:** Easy-Medium  
**XP Reward:** 5-15  
**Energy Cost:** 5-15

**Examples:**
- Morning standup (engineer blocked)
- Email avalanche at 6 AM
- Sprint planning meetings
- Quick stakeholder questions
- Code review requests
- Design sync meetings

**Strategy:** These are your bread and butter. Low risk, steady XP. Choose efficiently to conserve energy for crises.

#### 🟡 Stakeholder Encounters (20-30%)
**Frequency:** Medium  
**Difficulty:** Medium  
**XP Reward:** 15-30  
**Energy Cost:** 10-25

**Examples:**
- Sales wants feature by Friday
- CEO "quick sync" (never quick)
- Customer escalation
- Marketing launch request
- Legal compliance review
- Finance budget question

**Strategy:** Higher stakes, better rewards. Balance stakeholder happiness with roadmap integrity. Use frameworks (RICE) to back your decisions.

#### 🔴 Crisis Encounters (10% late game)
**Frequency:** Rare but impactful  
**Difficulty:** Hard  
**XP Reward:** 30-50  
**Energy Cost:** 20-50

**Examples:**
- Production down (500+ users affected)
- Security breach discovered
- Top engineer quitting
- Major bug in production
- Competitor launches similar feature
- Investor deadline moved up

**Strategy:** High-risk, high-reward. Don't gamble with SLAs. Invest heavily to resolve quickly. Your credibility is on the line.

#### 👑 Boss Encounters (At milestones)
**Frequency:** 7 total (one per level)  
**Difficulty:** Very Hard  
**XP Reward:** 50-100  
**Energy Cost:** 30-60

**The 7 Boss Fights:**
1. **First Sprint Review** (Level 1) - Prove you can ship
2. **Product Launch** (Level 2) - Successful go-to-market
3. **QBR Presentation** (Level 3) - Data-driven results
4. **Annual Planning** (Level 4) - Set strategy
5. **Team Reorg** (Level 5) - Navigate politics
6. **Board Meeting** (Level 6) - Executive alignment
7. **IPO/Acquisition** (Level 7) - Ultimate decision

**Strategy:** Save energy beforehand. Use optimal choices. These make or break your career.

### Encounter Anatomy

Every encounter follows this structure:

```
═══ [ENCOUNTER TYPE] ═══
[Title]

[Description of situation]

[OPTIONAL: Pressure bar for crises]
[OPTIONAL: Timer for urgent situations]

[1] [Choice 1 text] ([Stat changes], [Success rate])
[2] [Choice 2 text] ([Stat changes], [Success rate]) ⭐ OPTIMAL
[3] [Choice 3 text] ([Stat changes], [Success rate])
[4] [Choice 4 text] ([Stat changes], [Success rate])

Current Stats: Energy X/100 | Credibility Y/100 | Level Z
```

### Decision Outcomes

**Success Probability:**
- 1.0 (100%) = Guaranteed success
- 0.9 (90%) = Very likely
- 0.7 (70%) = Good odds
- 0.5 (50%) = Coin flip
- 0.3 (30%) = Risky bet

**Success:**
- Stat changes as shown
- XP awarded
- Positive outcome message
- Next encounter

**Failure:**
- Worse stat changes
- No XP or reduced XP
- Negative outcome message
- Credibility hit
- Next encounter

---

## Items & Equipment

### Item Categories

#### ⚔️ Weapons (PM Tools)

**Jira Sword** 
- +10 Velocity
- -5 Energy/encounter
- "Task management mastery"

**Figma Wand**
- +5 Morale
- +10% Design decision success
- "Prototype before building"

**Analytics Blade**
- +15 Credibility
- Unlocks data-driven choices
- "Insights cut through opinions"

**Slack Hammer**
- +20% Communication speed
- -10 Energy/sprint
- "Async everything"

**OKR Hammer**
- +10 Credibility
- Better goal-setting choices
- "Alignment through objectives"

#### 🛡️ Armor (Frameworks)

**Agile Robes**
- +15 Velocity
- Reduces tech debt impact
- "Sprint-based protection"

**Lean Armor**
- +10% Success on experiments
- -$5K prototype costs
- "Build-Measure-Learn"

**RICE Shield**
- +20 Credibility
- Better prioritization outcomes
- "Reach × Impact × Confidence ÷ Effort"

**JTBD Cloak**
- +15% Customer insight success
- Better stakeholder decisions
- "Jobs-to-be-Done framework"

#### 💊 Consumables

**Coffee (☕)**
- Restores 20 Energy
- +5 Velocity for 3 encounters
- Stackable up to 5

**Slack DND Mode**
- Restores 15 Energy
- Blocks 1 stakeholder interruption
- One-time use

**1-on-1 Scroll**
- +20 Morale
- +5 Credibility
- One-time use per sprint

**PTO Day**
- Restores 50 Energy
- -5 Velocity for 1 sprint
- Limited quantity

#### 🌟 Artifacts (Legendary)

**"First Principles" Amulet**
- +25 Credibility
- All decisions more impactful
- Permanent passive

**"North Star" Compass**
- +10% XP on all encounters
- Better strategic choices
- Permanent passive

**"Product Sense" Gem**
- +20% Success on risky bets
- Intuition guides you
- Permanent passive

**"Execution Engine" Ring**
- +25 Velocity
- Faster shipping
- Permanent passive

### How to Get Items

**Sources:**
1. **Encounter rewards** - Random drops after success
2. **Boss defeats** - Guaranteed legendary drop
3. **Budget purchases** - Buy from "shop" encounters
4. **Level-up rewards** - Every level gives an item
5. **Achievement unlocks** - Hidden challenges

**Item Limits:**
- **Weapons**: 1 equipped at a time
- **Armor**: 1 equipped at a time
- **Consumables**: Up to 10 in inventory
- **Artifacts**: Passive, always active

---

## PM Frameworks (Skills)

These are the **real PM concepts** integrated into the game:

### Prioritization Frameworks

**RICE** (Unlocked: Level 3)
- **Reach**: How many users affected?
- **Impact**: How much improvement?
- **Confidence**: How sure are we?
- **Effort**: How long will it take?
- **Usage**: Back decisions with data

**ICE** (Unlocked: Level 2)
- **Impact**: Business value
- **Confidence**: Certainty level
- **Ease**: Implementation difficulty
- **Usage**: Quick prioritization

**Value vs. Effort Matrix** (Unlocked: Level 4)
- Quick wins, Big bets, Fill-ins, Time sinks
- **Usage**: Visual roadmap planning

### Strategy Frameworks

**OKRs** (Unlocked: Level 3)
- **Objectives**: Qualitative goals
- **Key Results**: Quantitative metrics
- **Usage**: Align organization

**North Star Metric** (Unlocked: Level 4)
- Single metric that matters most
- **Usage**: Focus entire team

**JTBD** (Unlocked: Level 5)
- Jobs-to-be-Done
- **Usage**: Understand customer needs deeply

### Execution Frameworks

**Agile/Scrum** (Unlocked: Level 1)
- Sprints, standups, retros
- **Usage**: Ship iteratively

**Lean Startup** (Unlocked: Level 2)
- Build-Measure-Learn
- **Usage**: Validate before scaling

**A/B Testing** (Unlocked: Level 3)
- Test variations
- **Usage**: Data-driven decisions

### Metrics Frameworks

**AARRR (Pirate Metrics)** (Unlocked: Level 4)
- Acquisition, Activation, Retention, Referral, Revenue
- **Usage**: Funnel optimization

**HEART** (Unlocked: Level 5)
- Happiness, Engagement, Adoption, Retention, Task Success
- **Usage**: UX metrics

**Unit Economics** (Unlocked: Level 6)
- LTV:CAC ratio, Payback period
- **Usage**: Business viability

---

## Strategy Guide

### Early Game (Levels 1-2)

**Goal:** Build credibility and learn the ropes

**Priorities:**
1. ✅ Choose safe, high-credibility options
2. ✅ Conserve energy (avoid unnecessary meetings)
3. ✅ Ship small wins consistently
4. ✅ Learn frameworks (RICE, Agile)

**Avoid:**
- ❌ High-risk bets (you can't afford failures)
- ❌ Saying yes to everything (energy drain)
- ❌ Ignoring morale (team is your asset)

**Key Decisions:**
- Engineer blocked? → Unblock quickly (+morale)
- Sales wants feature? → Negotiate timeline (build credibility)
- Production issue? → All hands on deck (don't gamble)

### Mid Game (Levels 3-5)

**Goal:** Strategic leadership and scaling

**Priorities:**
1. ✅ Data-driven decisions (use frameworks)
2. ✅ Hire to scale velocity
3. ✅ Balance stakeholder demands
4. ✅ Build processes for repeatability

**Avoid:**
- ❌ Micromanaging (delegate!)
- ❌ Feature factory (strategy > tactics)
- ❌ Ignoring technical debt (it compounds)

**Key Decisions:**
- Scope creep? → Use RICE to push back
- Team burnout? → Add headcount, not hours
- Customer escalation? → Data + empathy

### Late Game (Levels 6-7)

**Goal:** Executive leadership and vision

**Priorities:**
1. ✅ Company-wide strategy
2. ✅ Build PM teams
3. ✅ Cross-functional alignment
4. ✅ Vision setting

**Avoid:**
- ❌ Getting tactical (stay strategic)
- ❌ Politics over product
- ❌ Losing touch with customers

**Key Decisions:**
- Board wants pivot? → Show data
- Reorg needed? → People over process
- IPO vs. Acquisition? → Mission or money?

---

## Endgame & Victory

### Reaching CPO

**Requirements:**
- Reach Level 7 (2,500 XP)
- Defeat all 7 boss encounters
- Maintain Energy > 0 and Credibility > 0

**Final Boss: The Ultimate Decision**

```
═══ 🏆 FINAL DECISION 🏆 ═══

You've climbed to CPO. The board presents two paths:

[1] IPO - Take the company public
    - Massive payday
    - Pressure for quarterly growth
    - Less control

[2] Acquisition - Sell to BigCorp
    - Guaranteed exit
    - Integration challenges
    - Team concerns

[3] Stay Private - Continue building
    - Full control
    - Sustainable growth
    - Longer path

[4] Step Down - Let someone else lead
    - Personal peace
    - Legacy intact
    - New adventures

Choose wisely...
```

### Victory Conditions

**Achieving CPO:**
- 🎉 Congratulations message
- 📊 Career statistics summary
- 🏆 Achievements earned
- 💾 Final save code (share your journey!)
- 🎯 New Game+ option (coming soon)

**Statistics Shown:**
- Total encounters faced
- Decisions made
- Win rate on risky choices
- Frameworks mastered
- Budget accumulated
- Team morale maintained
- Crises survived
- Playtime

### Multiple Endings

**IPO Path:**
"You ring the bell on Wall Street. Your team watches from the trading floor. Mission accomplished."

**Acquisition Path:**
"BigCorp's CEO shakes your hand. Your product lives on. The team moves with you."

**Stay Private Path:**
"You keep building. Sustainable, profitable, yours. The long game wins."

**Step Down Path:**
"You mentor the next CPO. Your legacy is the team you built. Peace at last."

---

## Save/Load System

### How Saves Work

**Auto-Save:**
- Saves after every decision
- Stores in browser localStorage
- Persists across sessions

**Manual Save:**
- Type `[s]` during gameplay
- Generates Base64 hash code
- Share with friends or use on other devices

### Save Code Example

```
═══ GAME SAVED ═══

Your save code:

eyJsZXZlbCI6MywiZW5lcmd5Ijo3NSwiY3JlZGliaWxpdHkiOjY4LCJ4cCI6
MzUwLCJidWRnZXQiOjUwMDAwLCJtb3JhbGUiOjgwLCJ2ZWxvY2l0eSI6NDAs
Imludm VudG9yeSI6W10sImN1cnJlbnREdW5nZW9uIjozfQ==

Copy this code. Use 'play' then 'l' to load.
```

### Loading a Save

1. Start game: `$ play`
2. Choose: `[l] Load Game`
3. Paste your save code
4. Press Enter
5. Continue where you left off!

**What's Saved:**
- Player name
- Level and XP
- All stats (Energy, Credibility, Budget, etc.)
- Inventory items
- Current dungeon
- Encounter count
- Completed bosses
- Decisions made

**What's NOT Saved:**
- Current encounter (generates new one)
- Active timers
- Leaderboard position (future feature)

---

## Tips & Tricks

### Energy Management
- ☕ Coffee before boss fights
- 🛏️ Take PTO when below 30 energy
- 📧 Batch process emails (don't respond immediately)
- 🚫 Say "no" to non-essential meetings

### Credibility Building
- 📊 Always back decisions with data
- 🎯 Under-promise, over-deliver
- 🤝 Build relationships early
- 📣 Take accountability for failures

### Budget Optimization
- 🛠️ Invest in tools early (10x ROI)
- 👥 Hire before velocity bottleneck
- 🧪 Prototype to validate
- 📢 Marketing amplifies, doesn't fix

### Team Morale
- 💬 Regular 1-on-1s matter
- 🎯 Clear priorities reduce thrash
- 🎉 Celebrate small wins
- ⚖️ Work-life balance is retention

### Hidden Mechanics
- 🎲 Credibility increases success probability
- 🔥 Pressure reduces optimal choice success
- 💪 Velocity affects XP gain speed
- 🎖️ Equipment synergies exist (Jira + Figma = bonus)

---

## FAQ

**Q: Can I die?**
A: Yes! Energy = 0 (burnout) or Credibility = 0 (fired) = Game Over

**Q: Is there permadeath?**
A: Your current game ends, but you can load from your last save code or start fresh.

**Q: How long to beat?**
A: 1-2 hours for first playthrough, 20-30 minutes for experienced players.

**Q: Are there difficulty settings?**
A: Not yet, but feedback welcome!

**Q: Can I replay after victory?**
A: Yes! Start a new game and try different strategies.

**Q: Is multiplayer coming?**
A: Not planned, but leaderboards might happen.

**Q: Can I share my save?**
A: Yes! Share your save code with friends. They can continue your journey or just see your stats.

---

## Final Thoughts

**PM Dungeon Crawler: The Corporate Climb** is more than a game - it's a **playable demonstration** of Product Management expertise. Every encounter, every framework, every decision is drawn from real PM work.

If you enjoyed this game, it means you either:
1. **Are a PM** and recognize these scenarios
2. **Want to be a PM** and now understand what it entails
3. **Work with PMs** and appreciate their challenges

Either way, you've learned something about Product Management through gameplay. And that's the whole point.

**Now go forth and ship great products!** 🚀

---

**Built by:** Amit Yogev  
**Philosophy:** *"Ship fast, measure everything, iterate relentlessly."*  
**Tech Stack:** Pure JavaScript, No Frameworks, TDD Methodology  
**Inspired by:** NetHack, A Dark Room, 20 years of PM experience

**Type `play` to begin your journey!**

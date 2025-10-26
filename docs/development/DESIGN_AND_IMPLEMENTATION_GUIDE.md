# PM Quest - Design & Implementation Guide

**Project:** PM Quest - Interactive Career Simulator  
**Game Inspiration:** **Reigns** + **Slay the Spire**  
**Interface:** Terminal Shell (inspired by Unix/Linux CLI)  
**Version:** 1.0  
**Last Updated:** October 23, 2025

---

## 🎮 Game Design Inspiration

### Primary Inspiration: **Reigns**
- **Core Mechanic:** Binary/multiple-choice decision making
- **Resource Management:** Balancing multiple stats (King's favor, church, army, wealth)
- **Consequences:** Every decision affects multiple resources
- **Progression:** Event-driven narrative with long-term consequences
- **Loss Condition:** Any resource hits 0 or 100

**Our Adaptation:**
- 4 choices instead of 2 (more depth)
- PM-themed resources (Energy, Credibility, Budget, Morale, Velocity)
- Career progression system (7 levels)
- Roguelike elements (randomized encounters, permadeath)

### Secondary Inspiration: **Slay the Spire**
- **Encounter System:** Node-based progression with different encounter types
- **Boss Battles:** Major milestone challenges
- **Resource Management:** Health/energy as limiting factors
- **Progression:** Leveling up unlocks new capabilities
- **Risk/Reward:** Probability-based outcomes

**Our Adaptation:**
- Daily encounters (common) → hallway fights
- Stakeholder encounters (medium) → elite fights
- Crisis encounters (rare) → events
- Boss encounters (milestones) → boss fights
- Career levels → ascension levels

### Tertiary Inspiration: **Terminal/Shell Design**
- **Unix Philosophy:** Do one thing well
- **Command-based interaction:** Type commands, not clicks
- **ASCII Art:** Text-based visual design
- **Man Pages:** Built-in help system
- **Persistence:** Save/load via text codes

---

## 📐 Design Principles

### 1. **Respect the Shell**
All game UI must feel native to the terminal:
- Use ASCII art, not graphics
- Command-based input (`[n]`, `[s]`, `[1-4]`)
- Monospace font rendering
- Color coding (ANSI-style)
- Quick help available (`[h]`)

### 2. **Reigns-Style Decision Making**
Every encounter follows the pattern:
```
SITUATION
├── Context (what's happening)
├── Choice 1 (conservative)
├── Choice 2 (balanced/optimal)
├── Choice 3 (aggressive)
└── Choice 4 (alternative approach)
```

### 3. **Resource Tension**
Inspired by Reigns' balance mechanic:
- Every choice affects 1-3 resources
- Some choices have tradeoffs (gain one, lose another)
- No single "best" strategy
- Loss conditions keep tension high

### 4. **Slay the Spire Progression**
- Encounters increase in difficulty
- Boss fights are tests of accumulated knowledge
- RNG adds replayability
- Optimal paths exist but aren't guaranteed

---

## 🏗️ Project Organization Standards

### Root Directory Structure
```
AmitCV.sh/
├── index.html                 # Entry point
├── terminal.js                # Shell interface
├── styles.css                 # Global styles
├── server.js                  # Node server
├── package.json               # Dependencies
├── vercel.json                # Deploy config
├── README.md                  # Project overview
│
├── game/                      # Game code (isolated)
│   ├── game-engine.js
│   ├── game-renderer.js
│   ├── game-content.js
│   ├── pm-career.js
│   └── encounters/
│       ├── daily-encounters.js
│       ├── stakeholder-encounters.js
│       ├── crisis-encounters.js
│       └── boss-encounters.js
│
├── docs/                      # All documentation
│   ├── DESIGN_AND_IMPLEMENTATION_GUIDE.md  # This file
│   ├── pm-idle-roguelike-game.plan.md      # Project plan
│   ├── GAME_GUIDE.md                        # User guide
│   ├── GAME-README.md                       # Technical overview
│   ├── TESTING_GUIDE.md                     # Testing standards
│   └── AGENT_GUIDE.md                       # AI agent instructions
│
├── tests/                     # All tests
│   ├── test-config.json       # Common test configuration
│   ├── test-results.json      # Common results file
│   ├── game-engine.test.js    # Engine tests
│   ├── encounter-logic.test.js
│   ├── save-load.test.js
│   └── integration.test.js
│
└── Career_Documents/          # CV/Resume files
```

### Organization Rules

#### ✅ Root Directory - MINIMAL FILES ONLY
**Allowed in root:**
- `index.html` - Entry point
- `terminal.js` - Shell interface
- `styles.css` - Global styles
- `server.js` - Backend
- `package.json` - Node config
- `vercel.json` - Deploy config
- `README.md` - Main readme
- `LICENSE` - License file
- `favicon.svg` - Icon

**NOT allowed in root:**
- ❌ Game code files
- ❌ Test files
- ❌ Documentation files
- ❌ Temporary files
- ❌ Build artifacts
- ❌ Config files (except package.json, vercel.json)

#### ✅ `/game/` - All Game Code
- Core game files at root level
- `/encounters/` subdirectory for modular content
- Each file has single responsibility
- No test files in this directory

#### ✅ `/docs/` - All Documentation
- User guides (GAME_GUIDE.md)
- Developer docs (GAME-README.md)
- Design docs (this file)
- Implementation plans
- Agent instructions
- No code files in this directory

#### ✅ `/tests/` - All Testing Code
- Common config: `test-config.json`
- Common results: `test-results.json`
- Individual test files
- Test utilities
- No production code in this directory

---

## 🧪 Test-Driven Development Standards

### Testing Philosophy

**Red → Green → Refactor**
1. Write failing test first
2. Write minimal code to pass
3. Refactor for quality
4. Repeat

### Common Test Configuration

**File:** `/tests/test-config.json`
```json
{
  "testFramework": "jest",
  "coverage": {
    "enabled": true,
    "threshold": 80,
    "reportFormats": ["text", "html", "json"]
  },
  "mocks": {
    "localStorage": true,
    "console": false
  },
  "timeout": 5000,
  "verbose": true,
  "testMatch": [
    "**/__tests__/**/*.js",
    "**/?(*.)+(spec|test).js"
  ],
  "gameConfig": {
    "startingEnergy": 100,
    "startingCredibility": 50,
    "startingBudget": 0,
    "maxLevel": 7,
    "encountersPerBoss": [5, 12, 20, 30, 42, 56, 70]
  }
}
```

### Common Test Results

**File:** `/tests/test-results.json`
```json
{
  "lastRun": "2025-10-23T10:30:00Z",
  "summary": {
    "total": 45,
    "passed": 45,
    "failed": 0,
    "skipped": 0,
    "coverage": 87.3
  },
  "suites": {
    "game-engine": {
      "passed": 15,
      "failed": 0,
      "duration": 234
    },
    "encounter-logic": {
      "passed": 12,
      "failed": 0,
      "duration": 189
    },
    "save-load": {
      "passed": 8,
      "failed": 0,
      "duration": 156
    },
    "integration": {
      "passed": 10,
      "failed": 0,
      "duration": 423
    }
  },
  "failedTests": [],
  "warnings": []
}
```

### Test Structure Template

```javascript
// /tests/[feature].test.js

// 1. Read common config
const testConfig = require('./test-config.json');
const { updateTestResults } = require('./test-utils');

// 2. Import module under test
const GameEngine = require('../game/game-engine');

// 3. Test suite
describe('GameEngine', () => {
  let engine;
  
  beforeEach(() => {
    // Setup using config values
    engine = new GameEngine();
    engine.state = {
      energy: testConfig.gameConfig.startingEnergy,
      credibility: testConfig.gameConfig.startingCredibility,
      // ...
    };
  });

  describe('Decision Making', () => {
    it('should apply energy cost when choosing option', () => {
      // Arrange
      const initialEnergy = engine.state.energy;
      const choice = { energy: -10 };
      
      // Act
      engine.applyChoice(choice);
      
      // Assert
      expect(engine.state.energy).toBe(initialEnergy - 10);
    });
  });

  // 4. Update results after all tests
  afterAll(() => {
    updateTestResults('game-engine', expect.getState());
  });
});
```

### Test Categories

#### Unit Tests
- **What:** Individual functions/methods
- **Coverage:** 80%+ required
- **Files:** `[module].test.js`
- **Example:** `game-engine.test.js`

#### Integration Tests
- **What:** Multiple modules working together
- **Coverage:** Key workflows
- **Files:** `integration.test.js`
- **Example:** Save → Load → Continue game

#### End-to-End Tests
- **What:** Full user flows
- **Coverage:** Critical paths
- **Files:** `e2e.test.js`
- **Example:** New game → Play → Win

---

## 📚 Documentation Standards

### Documentation Hierarchy

```
1. README.md (Root)           → Quick project overview
   ├── What is this?
   ├── How to run?
   └── Link to detailed docs

2. DESIGN_AND_IMPLEMENTATION_GUIDE.md  → This file (for developers/agents)
   ├── Design principles
   ├── Architecture
   ├── Standards
   └── Implementation rules

3. GAME_GUIDE.md              → User manual
   ├── How to play
   ├── Commands
   ├── Strategy tips
   └── Examples

4. GAME-README.md             → Technical overview
   ├── File structure
   ├── Features
   ├── Status
   └── Testing info

5. pm-idle-roguelike-game.plan.md  → Project plan
   ├── Implementation checklist
   ├── Architecture
   ├── Stats
   └── Future work

6. AGENT_GUIDE.md             → Instructions for AI assistants
   ├── Code style
   ├── Testing requirements
   ├── Documentation rules
   └── Common tasks
```

### Documentation Requirements

#### Every Feature Must Have:
1. ✅ **User Guide** - How to use it
2. ✅ **Technical Docs** - How it works
3. ✅ **Code Comments** - Inline documentation
4. ✅ **Tests** - Executable documentation
5. ✅ **Examples** - Real usage

#### Code Comment Standards

```javascript
// ❌ BAD: Obvious comment
// Increment counter
counter++;

// ✅ GOOD: Explains WHY
// Encounter counter triggers boss fight at milestones [5, 12, 20...]
// See PMCareer.levels for full milestone list
this.state.encounterCount++;

// ✅ GOOD: Explains complex logic
/**
 * Calculate success probability based on player stats and choice difficulty
 * Formula: base_success * (1 + credibility_bonus - pressure_penalty)
 * 
 * @param {Object} choice - The choice object with success rate
 * @param {number} pressure - Current pressure level (0-100)
 * @returns {boolean} - Whether the choice succeeded
 */
function calculateSuccess(choice, pressure) {
  const baseSuccess = choice.success || 1.0;
  const credibilityBonus = this.state.credibility / 500; // Max 0.2
  const pressurePenalty = pressure / 200; // Max 0.5
  const finalProbability = baseSuccess * (1 + credibilityBonus - pressurePenalty);
  return Math.random() <= Math.max(0.1, Math.min(1.0, finalProbability));
}
```

---

## 🎨 Design Patterns & Architecture

### 1. **Separation of Concerns**

```
game-engine.js    → Game logic, state management, rules
game-renderer.js  → Display, formatting, ASCII art
game-content.js   → Data, content, encounters
pm-career.js      → Progression system
terminal.js       → Shell integration, I/O
```

**Rule:** No mixing responsibilities. Engine doesn't render, renderer doesn't have game logic.

### 2. **Data-Driven Design** (Inspired by Reigns)

Encounters are data, not code:
```javascript
// ✅ GOOD: Data-driven
{
  id: 'sales_urgent',
  title: 'Incoming Email',
  description: 'Sales VP needs feature by Friday',
  choices: [
    { text: 'Commit to Friday', energy: -15, credibility: +15, xp: 20 },
    { text: 'Negotiate timeline', energy: -10, credibility: +5, xp: 15 }
  ]
}

// ❌ BAD: Hard-coded logic
function handleSalesUrgent() {
  if (commitToFriday) {
    energy -= 15;
    credibility += 15;
  } else if (negotiate) {
    energy -= 10;
    credibility += 5;
  }
}
```

### 3. **Modular Content System** (Inspired by Slay the Spire)

```
encounters/
├── daily-encounters.js        → Array of encounter objects
├── stakeholder-encounters.js  → Array of encounter objects
├── crisis-encounters.js       → Array of encounter objects
└── boss-encounters.js         → Array of encounter objects

game-content.js → Loads and aggregates all encounters
```

### 4. **State Machine Pattern**

```
Game Modes:
- 'menu'     → Show menu, accept [n/l/h/q]
- 'playing'  → In game, accept [1-4/s/i/stats/q]
- 'gameover' → Show game over, accept [n/q]
- 'victory'  → Show victory, accept [n/q]
- 'exited'   → Clean up, return to terminal
```

---

## 🔧 Implementation Standards

### Code Style

```javascript
// Class names: PascalCase
class PMQuestEngine { }

// File exports: Match class name
module.exports = PMQuestEngine;

// Constants: SCREAMING_SNAKE_CASE
const MAX_ENERGY = 300;

// Functions: camelCase
function calculateXPGain() { }

// Private methods: _prefixed
_validateState() { }

// Async functions: Always use async/await, not promises
async loadGame() { }

// Error handling: Always catch
try {
  await loadGame();
} catch (error) {
  this.printOutput('Error: ' + error.message);
}
```

### Adding New Features - TDD Workflow

#### Step 1: Write User Guide First
```markdown
## New Feature: Daily Streak Bonus

When you play for 7 consecutive days, you get +50 XP bonus.

**How it works:**
- Each day you play counts toward streak
- Miss a day, streak resets
- Bonus applied on day 7, then resets
```

#### Step 2: Write Failing Test
```javascript
describe('Daily Streak System', () => {
  it('should award bonus after 7 consecutive days', () => {
    // Arrange
    const engine = new GameEngine();
    engine.state.streakDays = 6;
    
    // Act
    engine.checkDailyStreak();
    
    // Assert
    expect(engine.state.xp).toBeGreaterThanOrEqual(50);
    expect(engine.state.streakDays).toBe(0); // Reset
  });
});
```

#### Step 3: Implement Feature
```javascript
// game-engine.js
checkDailyStreak() {
  const today = new Date().toDateString();
  const lastPlay = this.state.lastPlayDate;
  
  if (this.isConsecutiveDay(today, lastPlay)) {
    this.state.streakDays++;
    
    if (this.state.streakDays >= 7) {
      this.state.xp += 50;
      this.state.streakDays = 0;
      this.printOutput('🔥 7-Day Streak Bonus! +50 XP');
    }
  } else {
    this.state.streakDays = 1; // Reset streak
  }
  
  this.state.lastPlayDate = today;
}
```

#### Step 4: Update Documentation
```markdown
### Daily Streak Bonus ✅
- Implemented: v1.1
- Tests: `/tests/streak.test.js`
- Status: Active
```

#### Step 5: Update Test Results
```bash
npm test
# Automatically updates test-results.json
```

---

## 📋 Development Checklist

### Before Starting Any Work:
- [ ] Read this guide
- [ ] Review existing code structure
- [ ] Check test-config.json for standards
- [ ] Locate relevant documentation

### For Every New Feature:
- [ ] Write user documentation first
- [ ] Write failing tests
- [ ] Implement minimal code
- [ ] Pass all tests
- [ ] Refactor for quality
- [ ] Update documentation
- [ ] Update test-results.json
- [ ] Commit with clear message

### Before Every Commit:
- [ ] All tests pass (`npm test`)
- [ ] No linter errors
- [ ] Documentation updated
- [ ] Test coverage maintained
- [ ] Root directory clean (no extra files)

### Before Every PR/Deploy:
- [ ] Full test suite passes
- [ ] Integration tests pass
- [ ] Documentation complete
- [ ] CHANGELOG.md updated
- [ ] Version bumped if needed

---

## 🤖 Agent Instructions

### For AI Assistants Working on This Project:

#### 1. **Always Follow TDD**
```
User requests feature
    ↓
Write user guide section
    ↓
Write failing test
    ↓
Implement code
    ↓
Pass test
    ↓
Refactor
    ↓
Update docs
```

#### 2. **Documentation is Code**
- Never skip documentation
- Update guides with every change
- Keep user guides clear and simple
- Keep technical docs accurate

#### 3. **Respect Organization**
- Game code in `/game/`
- Tests in `/tests/`
- Docs in `/docs/`
- Minimal root directory
- No temporary files committed

#### 4. **Testing is Required**
- Read `test-config.json` for standards
- Write tests before code
- Update `test-results.json` after tests run
- Maintain 80%+ coverage

#### 5. **Design Consistency**
- Keep Reigns-style decision making
- Maintain Slay the Spire encounter structure
- Respect terminal/shell aesthetic
- ASCII art only, no graphics

#### 6. **Common Tasks**

**Adding New Encounter:**
1. Choose category (daily/stakeholder/crisis/boss)
2. Write test in `/tests/encounter-logic.test.js`
3. Add to appropriate file in `/game/encounters/`
4. Update user guide with example
5. Test in game

**Adding New Resource:**
1. Update test config with new resource
2. Write unit tests for resource behavior
3. Add to game state in `game-engine.js`
4. Update renderer in `game-renderer.js`
5. Update documentation
6. Add to existing encounters

**Fixing Bug:**
1. Write test that reproduces bug
2. Confirm test fails
3. Fix code
4. Confirm test passes
5. Update docs if behavior changed

---

## 🎯 Success Criteria

### This project is successful when:

✅ **Game Perspective (Reigns + Slay the Spire)**
- Decisions feel meaningful
- Resource management is tense
- Encounters are varied and interesting
- Progression feels rewarding
- Replayability is high

✅ **Shell Perspective (Terminal Design)**
- Interface feels native to terminal
- Commands are intuitive
- ASCII art is clean
- Help is accessible
- Performance is fast

✅ **Code Quality Perspective (TDD)**
- 80%+ test coverage
- All tests pass
- No linter errors
- Documentation complete
- Organization clean

✅ **User Perspective**
- Easy to understand
- Fun to play
- Doesn't break
- Clear feedback
- Good examples

---

## 📖 Further Reading

### Game Design:
- "Reigns" - Nerial (2016) - Binary decision making
- "Slay the Spire" - MegaCrit (2019) - Roguelike progression
- "FTL" - Subset Games (2012) - Event-driven gameplay

### Shell Design:
- Unix Philosophy - "Do one thing well"
- Man pages - Built-in documentation
- ANSI escape codes - Terminal colors

### Development:
- TDD by Example - Kent Beck
- Clean Code - Robert Martin
- The Pragmatic Programmer - Hunt & Thomas

---

## 🔄 Version History

**v1.0** (Oct 2025)
- Initial implementation
- 39 encounters
- 7-level career progression
- Full TDD infrastructure
- Complete documentation

---

*This guide is the source of truth for all development on PM Quest.*  
*When in doubt, refer to this document.*  
*Keep it updated with every significant change.*

---

**Game Design:** Reigns + Slay the Spire  
**Interface Design:** Unix Terminal  
**Development:** Test-Driven  
**Documentation:** Always


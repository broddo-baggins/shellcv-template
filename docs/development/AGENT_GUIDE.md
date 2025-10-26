# Agent Guide - PM Quest Development

**For:** AI Assistants & Code Agents  
**Purpose:** Quick reference for working on this project  
**Priority:** Follow these rules at all times

---

## 🎯 Core Principles

### 1. Test-Driven Development (TDD)
```
ALWAYS follow this order:
1. Write documentation
2. Write failing test
3. Implement code
4. Pass test
5. Refactor
6. Update docs
```

**Never skip steps. Never write code before tests.**

### 2. Documentation First
```
ALWAYS update documentation:
- User guides (how to use)
- Technical docs (how it works)
- Code comments (why it exists)
- Tests (executable docs)
```

**If it's not documented, it doesn't exist.**

### 3. Organization Standards
```
ALWAYS keep organized:
- Game code → /game/
- Tests → /tests/
- Docs → /docs/
- Root → minimal files only
```

**No exceptions. No temporary files.**

---

## 📁 Project Structure Rules

### ✅ Root Directory - ONLY These Files
```
AmitCV.sh/
├── index.html          ✅ Entry point
├── terminal.js         ✅ Shell
├── styles.css          ✅ Styles
├── server.js           ✅ Backend
├── package.json        ✅ Config
├── vercel.json         ✅ Deploy
├── README.md           ✅ Main readme
├── LICENSE             ✅ License
└── favicon.svg         ✅ Icon
```

### ❌ NEVER Put These in Root
- Game code files
- Test files
- Documentation (except README.md)
- Temporary/scratch files
- Build artifacts
- Config files (except package.json, vercel.json)

---

## 🧪 Testing Requirements

### Common Configuration
**Read first:** `/tests/test-config.json`
- Contains all test standards
- Game configuration values
- Coverage thresholds
- Timeout settings

### Common Results
**Update after tests:** `/tests/test-results.json`
- Stores test run results
- Tracks coverage
- Records failures
- Timestamp of runs

### Test Template
```javascript
// 1. Load config
const testConfig = require('./test-config.json');

// 2. Import module
const Module = require('../game/module');

// 3. Write tests
describe('Module', () => {
  it('should do something', () => {
    // Arrange
    const input = testConfig.gameConfig.startingEnergy;
    
    // Act
    const result = Module.doSomething(input);
    
    // Assert
    expect(result).toBe(expected);
  });
});

// 4. Update results
afterAll(() => {
  updateTestResults('module-name', expect.getState());
});
```

### Coverage Requirements
- Minimum: 80%
- Target: 90%+
- Critical paths: 100%

---

## 🎮 Game Design Rules

### Inspired By: **Reigns + Slay the Spire**

#### Reigns Elements (MUST KEEP):
- ✅ Binary/multiple choice decisions
- ✅ Resource balancing (multiple stats)
- ✅ Every choice has consequences
- ✅ Loss conditions (resource hits 0)
- ✅ Event-driven narrative

#### Slay the Spire Elements (MUST KEEP):
- ✅ Encounter-based progression
- ✅ Different encounter types (daily/elite/boss)
- ✅ Boss fights at milestones
- ✅ Probability-based outcomes
- ✅ Level-up system

#### Shell Design (MUST KEEP):
- ✅ ASCII art only (no graphics)
- ✅ Command-based input
- ✅ Monospace formatting
- ✅ Built-in help (`[h]`)
- ✅ Fast and responsive

---

## 📝 Documentation Standards

### File Structure
```
/docs/
├── DESIGN_AND_IMPLEMENTATION_GUIDE.md  ← Complete reference
├── AGENT_GUIDE.md                      ← This file
├── TESTING_GUIDE.md                    ← Test standards
├── GAME_GUIDE.md                       ← User manual
├── GAME-README.md                      ← Tech overview
└── pm-idle-roguelike-game.plan.md     ← Project plan
```

### Update These Files When:

**User adds feature:**
- GAME_GUIDE.md (how to use)
- GAME-README.md (what it does)
- pm-idle-roguelike-game.plan.md (checklist)

**Code changes:**
- DESIGN_AND_IMPLEMENTATION_GUIDE.md (architecture)
- Code comments (inline docs)
- Test files (executable docs)

**Tests added:**
- TESTING_GUIDE.md (standards)
- test-config.json (config)
- test-results.json (results)

---

## 🔧 Common Tasks

### Task 1: Add New Encounter

**Steps:**
1. Choose category: daily/stakeholder/crisis/boss
2. Write user guide example in GAME_GUIDE.md
3. Write test:
```javascript
// /tests/encounter-logic.test.js
it('should handle new encounter correctly', () => {
  const encounter = PMContent.getRandomEncounter('daily', 1);
  expect(encounter).toHaveProperty('choices');
  expect(encounter.choices.length).toBeGreaterThan(0);
});
```
4. Add encounter to `/game/encounters/[category]-encounters.js`
5. Test in game manually
6. Update test-results.json
7. Commit with message: "feat: Add [encounter name]"

### Task 2: Add New Resource

**Steps:**
1. Update test-config.json with default value
2. Write unit tests:
```javascript
it('should track new resource', () => {
  const engine = new GameEngine();
  expect(engine.state.newResource).toBeDefined();
  expect(engine.state.newResource).toBe(testConfig.gameConfig.newResourceDefault);
});
```
3. Add to game state in game-engine.js
4. Add rendering in game-renderer.js
5. Update encounters to use resource
6. Update GAME_GUIDE.md with resource explanation
7. Update test-results.json

### Task 3: Fix Bug

**Steps:**
1. Reproduce bug manually
2. Write test that fails due to bug:
```javascript
it('should not allow negative energy', () => {
  const engine = new GameEngine();
  engine.state.energy = 10;
  engine.applyChoice({ energy: -50 });
  expect(engine.state.energy).toBeGreaterThanOrEqual(0);
});
```
3. Confirm test fails
4. Fix code
5. Confirm test passes
6. Update docs if behavior changed
7. Commit: "fix: Prevent negative energy"

### Task 4: Refactor Code

**Steps:**
1. Ensure all tests pass before refactoring
2. Refactor code
3. Ensure all tests still pass
4. Update comments if logic changed
5. Update architecture docs if structure changed
6. Commit: "refactor: Improve [component]"

---

## ⚠️ Common Mistakes to Avoid

### ❌ DON'T:
- Skip writing tests
- Write code before tests
- Put files in wrong directories
- Leave documentation outdated
- Commit broken tests
- Use graphics instead of ASCII
- Change game design without documenting
- Add files to root directory
- Ignore test-config.json standards

### ✅ DO:
- Write tests first
- Keep root clean
- Update documentation
- Follow TDD cycle
- Maintain 80%+ coverage
- Use ASCII art
- Respect game design inspiration
- Read configuration files
- Update results files

---

## 🚀 Workflow Checklist

### Starting Work
- [ ] Read DESIGN_AND_IMPLEMENTATION_GUIDE.md
- [ ] Check test-config.json for standards
- [ ] Review existing code
- [ ] Locate relevant documentation

### Adding Feature
- [ ] Write user documentation
- [ ] Write failing tests
- [ ] Implement code
- [ ] Pass all tests
- [ ] Refactor
- [ ] Update technical docs
- [ ] Update test-results.json
- [ ] Commit with clear message

### Before Commit
- [ ] All tests pass
- [ ] No linter errors
- [ ] Documentation complete
- [ ] Root directory clean
- [ ] Test coverage maintained

### Before Deploy
- [ ] Full test suite passes
- [ ] Integration tests pass
- [ ] Documentation reviewed
- [ ] CHANGELOG.md updated

---

## 📊 Quality Metrics

### Code Quality
- Test Coverage: ≥80%
- Linter Errors: 0
- Documentation: 100%
- Organization: Clean root

### Game Quality
- Encounters: Varied and interesting
- Balance: No dominant strategy
- Feedback: Clear consequences
- Performance: < 100ms response

### User Experience
- Learning curve: < 5 minutes
- Help accessibility: 1 command
- Save/load: < 2 seconds
- Terminal feel: Native

---

## 🔍 Quick Reference

### File Locations
```bash
# Add encounter
/game/encounters/[type]-encounters.js

# Add test
/tests/[feature].test.js

# Update user guide
/docs/GAME_GUIDE.md

# Update technical docs
/docs/GAME-README.md

# Update architecture
/docs/DESIGN_AND_IMPLEMENTATION_GUIDE.md
```

### Command Reference
```bash
# Run tests
npm test

# Check coverage
npm run test:coverage

# Lint code
npm run lint

# Start server
npm start

# Run specific test
npm test [filename]
```

### Design Reference
```
Game Model: Reigns + Slay the Spire
Interface: Unix Terminal
Development: Test-Driven
Documentation: Always Updated
Organization: Strict Folders
```

---

## 🤝 Working with Users

### User Says: "Add feature X"
**Your Response:**
1. "Let me write the user guide first"
2. Write documentation
3. "Now I'll write tests"
4. Write failing tests
5. "Implementing..."
6. Write code
7. "Feature complete and documented"

### User Says: "Fix bug Y"
**Your Response:**
1. "Let me reproduce and write a test"
2. Write failing test
3. "Confirmed bug, fixing..."
4. Fix code
5. "Bug fixed and tested"

### User Says: "Why is X organized this way?"
**Your Response:**
1. Point to DESIGN_AND_IMPLEMENTATION_GUIDE.md
2. Explain design principles (Reigns, Slay the Spire, Shell)
3. Show TDD benefits
4. Demonstrate clean organization

---

## 📚 Learning Resources

### Required Reading
1. DESIGN_AND_IMPLEMENTATION_GUIDE.md (complete reference)
2. test-config.json (standards)
3. GAME_GUIDE.md (user perspective)
4. Existing code (examples)

### Game Design
- Play "Reigns" (understand decision-making)
- Play "Slay the Spire" (understand encounters)
- Study Unix terminals (understand interface)

### Development
- TDD principles
- Clean Code practices
- Documentation-first development

---

## ✅ Success Criteria

### You're Doing Well If:
- ✅ Tests written before code
- ✅ Documentation always updated
- ✅ Root directory clean
- ✅ 80%+ test coverage
- ✅ Game design consistent
- ✅ Terminal feel maintained
- ✅ Organization respected

### Red Flags:
- ❌ Tests written after code
- ❌ Documentation outdated
- ❌ Files in wrong places
- ❌ Coverage below 80%
- ❌ Graphics instead of ASCII
- ❌ Breaking game design
- ❌ Messy root directory

---

## 🆘 When Stuck

### Problem: "Don't know where to start"
**Solution:** Read DESIGN_AND_IMPLEMENTATION_GUIDE.md

### Problem: "Don't know how to test this"
**Solution:** Check existing tests in /tests/ for examples

### Problem: "Don't know where this file goes"
**Solution:** See organization rules in this guide

### Problem: "Don't know what this feature should do"
**Solution:** Check GAME_GUIDE.md for user perspective

### Problem: "Don't know if this fits the design"
**Solution:** Compare with Reigns/Slay the Spire principles

---

**Remember:**
1. Tests first
2. Documentation always
3. Organization strict
4. Design consistent
5. Quality high

**This guide is your primary reference. Bookmark it.**


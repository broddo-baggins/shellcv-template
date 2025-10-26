# PM Quest - Testing Infrastructure

**Test-Driven Development** is mandatory for this project.

---

## 📋 Quick Start

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
npm test game-engine
npm test encounter-logic
npm test save-load
npm test integration
```

### Run with Coverage
```bash
npm run test:coverage
```

### Watch Mode (Development)
```bash
npm run test:watch
```

---

## 📁 Test Structure

```
tests/
├── test-config.json         # Common configuration (READ FIRST)
├── test-results.json        # Common results (AUTO-UPDATED)
├── test-utils.js            # Shared test utilities
├── README.md                # This file
│
├── game-engine.test.js      # Core engine tests
├── encounter-logic.test.js  # Encounter generation/selection
├── save-load.test.js        # Save/load system
├── rendering.test.js        # Display formatting
├── progression.test.js      # Career progression
└── integration.test.js      # End-to-end workflows
```

---

## 🔧 Configuration

### test-config.json

**Purpose:** Central configuration for all tests

**Contains:**
- Test framework settings
- Coverage thresholds (80% minimum)
- Game configuration values
- Test data samples
- Validation rules

**Usage:**
```javascript
const testConfig = require('./test-config.json');

// Use game config values
const startingEnergy = testConfig.gameConfig.startingEnergy;

// Use test data
const sampleEncounter = testConfig.testData.sampleEncounter;

// Use validation rules
const { min, max } = testConfig.validationRules.energy;
```

---

## 📊 Results Tracking

### test-results.json

**Purpose:** Track test runs over time

**Auto-updated by:**
- Jest test runner
- afterAll() hooks in test files
- npm test command

**Contains:**
- Latest test run summary
- Per-suite breakdowns
- Failed test details
- Coverage metrics
- Historical data

**Example:**
```json
{
  "lastRun": "2025-10-23T10:30:00Z",
  "summary": {
    "total": 45,
    "passed": 45,
    "failed": 0,
    "coverage": 87.3
  },
  "suites": {
    "game-engine": {
      "passed": 15,
      "failed": 0
    }
  }
}
```

---

## ✍️ Writing Tests

### Template

```javascript
// 1. Import config
const testConfig = require('./test-config.json');
const { updateTestResults } = require('./test-utils');

// 2. Import module under test
const GameEngine = require('../game/game-engine');

// 3. Describe test suite
describe('GameEngine', () => {
  let engine;
  
  // 4. Setup before each test
  beforeEach(() => {
    engine = new GameEngine();
    engine.state = { ...testConfig.testData.sampleState };
  });

  // 5. Write test cases
  describe('Decision Making', () => {
    it('should apply energy cost correctly', () => {
      // Arrange
      const initialEnergy = engine.state.energy;
      const choice = { energy: -10 };
      
      // Act
      engine.applyChoice(choice);
      
      // Assert
      expect(engine.state.energy).toBe(initialEnergy - 10);
    });
    
    it('should not allow negative energy', () => {
      // Arrange
      engine.state.energy = 5;
      const choice = { energy: -10 };
      
      // Act
      engine.applyChoice(choice);
      
      // Assert
      expect(engine.state.energy).toBeGreaterThanOrEqual(0);
    });
  });
  
  // 6. Update results after suite
  afterAll(() => {
    updateTestResults('game-engine', expect.getState());
  });
});
```

### Best Practices

#### ✅ DO:
- Use test-config.json for constants
- Test edge cases (0, max, negative)
- Test error conditions
- Use descriptive test names
- Follow Arrange-Act-Assert pattern
- Update test-results.json
- Mock external dependencies

#### ❌ DON'T:
- Hard-code config values
- Skip edge case testing
- Write vague test names
- Mix arrange/act/assert
- Forget to update results
- Test implementation details
- Have test interdependencies

---

## 📈 Coverage Requirements

### Minimum Thresholds (80%)
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

### Critical Paths (100%)
- Save/load functionality
- Game over conditions
- Level-up logic
- Resource validation
- Boss encounter triggers

### View Coverage Report
```bash
npm run test:coverage
open coverage/index.html
```

---

## 🧪 Test Categories

### Unit Tests
**Pattern:** `*.test.js`  
**Purpose:** Test individual functions/methods  
**Timeout:** 5 seconds  
**Coverage:** 80%+

Example:
```javascript
it('should calculate XP correctly', () => {
  const xp = calculateXP(level, success);
  expect(xp).toBe(expectedXP);
});
```

### Integration Tests
**Pattern:** `*.integration.test.js`  
**Purpose:** Test multiple modules together  
**Timeout:** 10 seconds  
**Coverage:** Key workflows

Example:
```javascript
it('should save and load game state', () => {
  engine.saveGame();
  const hash = engine.generateSaveHash();
  const newEngine = new GameEngine();
  newEngine.loadGameFromHash(hash);
  expect(newEngine.state).toEqual(engine.state);
});
```

### E2E Tests
**Pattern:** `*.e2e.test.js`  
**Purpose:** Test full user flows  
**Timeout:** 30 seconds  
**Coverage:** Critical paths

Example:
```javascript
it('should complete full game flow', async () => {
  await engine.start();
  await engine.newGame();
  // Play through encounters
  await engine.nextEncounter();
  await engine.makeDecision(0);
  // Continue until victory
  expect(engine.gameMode).toBe('victory');
});
```

---

## 🔍 Debugging Tests

### Run Single Test
```bash
npm test -- --testNamePattern="should apply energy cost"
```

### Debug Mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Verbose Output
```bash
npm test -- --verbose
```

### Watch Mode
```bash
npm test -- --watch
```

---

## 📝 Test Utilities

### test-utils.js

Common functions for all tests:

```javascript
// Mock game state
function createMockState(overrides = {}) {
  return { ...testConfig.testData.sampleState, ...overrides };
}

// Mock encounter
function createMockEncounter(type = 'daily') {
  return { ...testConfig.testData.sampleEncounter, type };
}

// Update results file
function updateTestResults(suiteName, testState) {
  // Reads test-results.json
  // Updates suite stats
  // Writes back to file
}

// Validate state
function validateGameState(state) {
  const rules = testConfig.validationRules;
  // Check all resources within bounds
  // Return validation result
}
```

---

## 🚀 CI/CD Integration

### Pre-commit Hook
```bash
#!/bin/sh
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed. Commit aborted."
  exit 1
fi
```

### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Check coverage
        run: npm run test:coverage
```

---

## 📊 Test Metrics

### Current Status
- **Total Tests:** 0 (to be implemented)
- **Coverage:** 0% (to be implemented)
- **Last Run:** Never
- **Status:** ⚠️ Tests needed

### Target Metrics
- **Total Tests:** 50+
- **Coverage:** 85%+
- **Pass Rate:** 100%
- **Duration:** < 30 seconds

---

## 🎯 Testing Checklist

### Before Adding Feature:
- [ ] Read test-config.json
- [ ] Plan test cases
- [ ] Write failing tests
- [ ] Implement feature
- [ ] Pass all tests
- [ ] Check coverage
- [ ] Update test-results.json

### Before Committing:
- [ ] All tests pass
- [ ] Coverage above 80%
- [ ] No skipped tests
- [ ] test-results.json updated
- [ ] No console warnings

### Before Deploying:
- [ ] Full test suite passes
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Coverage report reviewed
- [ ] Performance acceptable

---

## 🆘 Troubleshooting

### Tests Not Running
```bash
# Clear Jest cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Coverage Not Generating
```bash
# Check collectCoverageFrom in test-config.json
# Ensure game files exist
# Run with --coverage flag
npm test -- --coverage
```

### Tests Timing Out
```bash
# Increase timeout in test-config.json
# Or in individual test:
it('slow test', async () => {
  jest.setTimeout(10000);
  // test code
});
```

---

## 📚 Further Reading

- Jest Documentation: https://jestjs.io/
- TDD Best Practices: https://testdriven.io/
- Code Coverage Guide: https://istanbul.js.org/

---

**Remember:** Tests are documentation. Write them first, write them well.


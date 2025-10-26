// PM Quest Game Engine - Core game logic and state management

class PMQuestEngine {
  constructor(shellInstance) {
    this.shell = shellInstance;
    this.renderer = new GameRenderer();
    this.state = null;
    this.idleTimer = null;
    this.currentEncounter = null;
    this.gameMode = 'menu'; // menu, name_entry, playing, paused, gameover, victory
  }

  // Initialize new game
  initializeState(playerName = 'AMIT') {
    const levelData = PMCareer.getLevelData(1);
    
    return {
      name: playerName.toUpperCase().substring(0, 20), // Limit to 20 chars
      level: 1,
      xp: 0,
      energy: levelData.stats.maxEnergy,
      credibility: 50,
      budget: 0,
      morale: 75,
      velocity: levelData.stats.baseVelocity,
      inventory: [],
      currentDungeon: 1,
      encounterCount: 0,
      decisionsCount: 0,
      timestamp: Date.now(),
      completedBosses: []
    };
  }

  // Start the game
  async start() {
    this.printOutput(this.renderer.renderMenu());
    this.gameMode = 'menu';
  }

  // Handle menu input
  async handleMenuInput(input) {
    const cmd = input.trim().toLowerCase();
    
    switch(cmd) {
      case 'n':
      case 'new':
        await this.newGame();
        break;
      case 'l':
      case 'load':
        await this.promptLoadGame();
        break;
      case 'h':
      case 'help':
        this.printOutput(this.renderer.renderHelp());
        break;
      case 'q':
      case 'quit':
        this.exitGame();
        break;
      default:
        this.printOutput('<span style="color: #e06c75;">Invalid option. Press n/l/h/q</span>');
    }
  }

  // Start new game
  async newGame() {
    // Prompt for name
    this.gameMode = 'name_entry';
    this.printOutput(`<div style="margin: 6px 0;">
<pre style="color: #98c379;">
╔═══════════════════════════════════════╗
║      WELCOME TO PM QUEST!             ║
╚═══════════════════════════════════════╝
</pre>
<div style="color: #61afef; margin: 3px 0; font-weight: bold;">
Enter your Product Manager name:
</div>
<div style="color: #5c6370; font-size: 10px;">
(Press Enter for default: AMIT | Max 20 characters)
</div>
</div>`);
  }

  // Handle name entry
  async handleNameEntry(input) {
    const name = input.trim() || 'AMIT';
    this.state = this.initializeState(name);
    this.gameMode = 'playing';
    
    // Show intro
    this.printOutput(`<div style="margin: 6px 0;">
<div style="color: #abb2bf; margin: 2px 0;">
You are <span style="color: #61afef;">${this.state.name}</span>, a newly hired <span style="color: #e5c07b;">Associate PM</span>.<br>
Your mission: Climb the corporate ladder from APM to CPO.<br><br>
Navigate stakeholder politics, ship products, and make strategic decisions.<br>
Every choice matters. Good luck!
</div>
</div>`);

    // Show stats and start first encounter
    this.printOutput(this.renderer.renderStatsBox(this.state));
    await this.sleep(1000);
    await this.nextEncounter();
  }

  // Load game from hash
  async promptLoadGame() {
    this.printOutput(`<div style="color: #61afef; margin: 2px 0;">
Enter your save code below and press Enter:
</div>`);
    
    this.shell.loadGameMode = true;
  }

  loadGameFromHash(hash) {
    try {
      const decoded = atob(hash);
      const loaded = JSON.parse(decoded);
      
      // Validate state
      if (!loaded.level || !loaded.xp) {
        throw new Error('Invalid save data');
      }
      
      this.state = loaded;
      this.gameMode = 'playing';
      
      this.printOutput(`<div style="color: #98c379; margin: 2px 0;">
✓ Game loaded successfully!<br>
Level: ${this.state.level} | XP: ${this.state.xp}
</div>`);
      
      this.printOutput(this.renderer.renderStatsBox(this.state));
      this.nextEncounter();
      
    } catch (error) {
      this.printOutput(`<div style="color: #e06c75; margin: 2px 0;">
✗ Failed to load game. Invalid save code.<br>
<span style="font-size: 9px;">Error: ${error.message}</span>
</div>`);
      this.gameMode = 'menu';
      this.start();
    }
  }

  // Generate next encounter
  async nextEncounter() {
    if (this.gameMode !== 'playing') return;
    
    // Check for level up
    this.checkLevelUp();
    
    // Check for boss encounter
    if (this.shouldTriggerBoss()) {
      this.currentEncounter = PMContent.getBossEncounter(this.state.currentDungeon);
      this.currentEncounter.type = 'boss';
    } else {
      // Random encounter based on level
      const encounterType = this.selectEncounterType();
      this.currentEncounter = PMContent.getRandomEncounter(encounterType, this.state.level);
      this.currentEncounter.type = encounterType;
    }
    
    if (!this.currentEncounter) {
      // Fallback encounter
      this.currentEncounter = {
        type: 'daily',
        title: 'Team Check-in',
        description: 'Team asks for guidance on priorities.',
        choices: [
          { text: 'Review roadmap together', energy: -10, morale: +10, xp: 10, success: 0.9 },
          { text: 'Quick standup', energy: -5, xp: 5, success: 1.0 },
          { text: 'Async via Slack', morale: -5, xp: 3, success: 0.8 }
        ]
      };
    }
    
    this.state.encounterCount++;
    this.renderEncounter();
  }

  // Select encounter type based on level and probability
  selectEncounterType() {
    const level = this.state.level;
    const rand = Math.random() * 100;
    
    if (level <= 2) {
      // Early game: mostly daily encounters
      if (rand < 70) return 'daily';
      if (rand < 90) return 'stakeholder';
      return 'crisis';
    } else if (level <= 4) {
      // Mid game: mixed encounters
      if (rand < 40) return 'daily';
      if (rand < 70) return 'stakeholder';
      return 'crisis';
    } else {
      // Late game: more strategic and crisis
      if (rand < 30) return 'daily';
      if (rand < 60) return 'stakeholder';
      return 'crisis';
    }
  }

  // Check if boss encounter should trigger
  shouldTriggerBoss() {
    const encounterMilestone = [5, 12, 20, 30, 42, 56, 70][this.state.currentDungeon - 1] || 999;
    return this.state.encounterCount >= encounterMilestone && 
           !this.state.completedBosses.includes(this.state.currentDungeon);
  }

  // Render current encounter
  renderEncounter() {
    let html = this.renderer.renderEncounterHeader(this.currentEncounter.type, this.currentEncounter.title);
    
    // Add description
    html += `<div style="color: #abb2bf; margin: 2px 0; line-height: 1.6;">
${this.renderer.escapeHtml(this.currentEncounter.description)}
</div>`;
    
    // Add pressure indicator for crises
    if (this.currentEncounter.pressure) {
      const pressureBar = this.renderer.generateProgressBar(this.currentEncounter.pressure, 100);
      html += `<div style="margin: 3px 0;">
<span style="color: #e06c75;">PRESSURE: ${pressureBar} ${this.currentEncounter.pressure}%</span>
</div>`;
    }
    
    // Add choices
    html += this.renderer.renderChoices(this.currentEncounter.choices);
    
    // Add commands hint
    html += `<div style="margin-top: 5px; color: #5c6370; font-size: 9px;">
Commands: [1-${this.currentEncounter.choices.length}] Choose | [s] Save | [stats] View Stats | [q] Quit
</div>`;
    
    this.printOutput(html);
  }

  // Handle game input during play
  async handleGameInput(input) {
    const cmd = input.trim().toLowerCase();
    
    // Check for special commands
    if (cmd === 's' || cmd === 'save') {
      this.saveGame();
      return;
    }
    
    if (cmd === 'stats') {
      this.printOutput(this.renderer.renderStatsBox(this.state));
      return;
    }
    
    if (cmd === 'i' || cmd === 'inventory') {
      this.showInventory();
      return;
    }
    
    if (cmd === 'q' || cmd === 'quit') {
      this.printOutput('<div style="color: #e5c07b;">Game paused. Your progress is saved.</div>');
      this.gameMode = 'menu';
      await this.sleep(500);
      this.start();
      return;
    }
    
    // Check for choice number
    const choiceNum = parseInt(cmd);
    if (!isNaN(choiceNum) && choiceNum >= 1 && choiceNum <= this.currentEncounter.choices.length) {
      await this.makeDecision(choiceNum - 1);
      return;
    }
    
    this.printOutput('<span style="color: #e06c75;">Invalid command. Choose 1-' + this.currentEncounter.choices.length + '</span>');
  }

  // Process player decision
  async makeDecision(choiceIndex) {
    const choice = this.currentEncounter.choices[choiceIndex];
    if (!choice) return;
    
    this.state.decisionsCount++;
    
    // Determine success
    const success = Math.random() <= (choice.success || 1.0);
    
    // Apply effects
    const changes = {};
    
    if (choice.energy) {
      this.state.energy = Math.max(0, Math.min(PMCareer.getLevelData(this.state.level).stats.maxEnergy, this.state.energy + choice.energy));
      changes.energy = choice.energy;
    }
    
    if (choice.credibility) {
      this.state.credibility = Math.max(0, Math.min(100, this.state.credibility + choice.credibility));
      changes.credibility = choice.credibility;
    }
    
    if (choice.morale) {
      this.state.morale = Math.max(0, Math.min(100, this.state.morale + choice.morale));
      changes.morale = choice.morale;
    }
    
    if (choice.budget) {
      this.state.budget = Math.max(0, this.state.budget + choice.budget);
      changes.budget = choice.budget;
    }
    
    if (choice.velocity) {
      this.state.velocity = Math.max(10, this.state.velocity + choice.velocity);
    }
    
    if (choice.xp && success) {
      this.state.xp += choice.xp;
      changes.xp = choice.xp;
    }
    
    // Show result
    const resultMessages = success ? PMContent.dialogue.success : PMContent.dialogue.failure;
    const resultMessage = resultMessages[Math.floor(Math.random() * resultMessages.length)];
    
    const result = {
      success: success,
      title: success ? 'Success!' : 'Not quite...',
      message: resultMessage,
      changes: changes
    };
    
    this.printOutput(this.renderer.renderResult(result));
    
    // Check for game over conditions
    if (this.state.energy <= 0) {
      await this.sleep(1000);
      this.gameOver('Burnout! You ran out of energy. Take a break and try again.');
      return;
    }
    
    if (this.state.credibility <= 0) {
      await this.sleep(1000);
      this.gameOver('Lost all credibility. Time to look for a new role.');
      return;
    }
    
    // Check for boss completion
    if (this.currentEncounter.type === 'boss') {
      this.state.completedBosses.push(this.state.currentDungeon);
      
      // Check for victory
      if (this.currentEncounter.reward && this.currentEncounter.reward.victory) {
        await this.sleep(1000);
        this.victory();
        return;
      }
      
      // Move to next dungeon
      this.state.currentDungeon++;
      this.printOutput(`<div style="color: #98c379; margin: 2px 0; font-weight: bold;">
🎉 Dungeon Complete! Moving to next challenge...
</div>`);
    }
    
    // Small delay then next encounter
    await this.sleep(1500);
    await this.nextEncounter();
  }

  // Check and handle level up
  checkLevelUp() {
    const currentLevelData = PMCareer.getLevelData(this.state.level);
    const nextLevelData = PMCareer.getNextLevel(this.state.level);
    
    if (nextLevelData && this.state.xp >= nextLevelData.xpRequired) {
      const oldLevel = this.state.level;
      this.state.level++;
      
      // Update stats
      const newLevelData = PMCareer.getLevelData(this.state.level);
      this.state.energy = newLevelData.stats.maxEnergy;
      this.state.velocity = newLevelData.stats.baseVelocity;
      this.state.budget += newLevelData.stats.budget;
      
      // Show level up screen
      this.printOutput(this.renderer.renderLevelUp(oldLevel, this.state.level));
    }
  }

  // Save game
  saveGame() {
    const hash = this.generateSaveHash();
    this.printOutput(this.renderer.renderSaveCode(hash));
  }

  // Generate save hash
  generateSaveHash() {
    const saveData = JSON.stringify(this.state);
    return btoa(saveData);
  }

  // Show inventory
  showInventory() {
    this.printOutput(`<div style="margin: 6px 0;">
<div style="color: #e5c07b; font-weight: bold; margin-bottom: 3px;">═══ INVENTORY ═══</div>
${this.renderer.renderInventory(this.state.inventory)}
</div>`);
  }

  // Game over
  gameOver(reason) {
    this.gameMode = 'gameover';
    this.printOutput(this.renderer.renderGameOver(this.state, reason));
  }

  // Victory
  victory() {
    this.gameMode = 'victory';
    this.printOutput(this.renderer.renderVictory(this.state));
  }

  // Exit game back to resume
  exitGame() {
    this.printOutput('<div style="color: #98c379;">Thanks for playing PM Quest! Returning to resume...</div>');
    this.gameMode = 'exited';
    if (this.shell) {
      this.shell.gameActive = false;
    }
  }

  // Helper: Print output to shell
  printOutput(html) {
    if (this.shell && this.shell.printOutput) {
      this.shell.printOutput(html);
    }
  }

  // Helper: Sleep
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Clean up
  destroy() {
    if (this.idleTimer) {
      clearInterval(this.idleTimer);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PMQuestEngine;
}


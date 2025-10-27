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
      completedBosses: [],
      chainState: null, // Tracks multi-turn crisis chains
      pressureMeter: 0 // Accumulates during chained encounters
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
      
      // Validate required fields
      if (!loaded.level || typeof loaded.xp !== 'number') {
        throw new Error('Invalid save data structure');
      }
      
      // Check save version compatibility
      const saveVersion = loaded.saveVersion || 1;
      if (saveVersion > 2) {
        throw new Error('Save from newer game version. Please refresh the page.');
      }
      
      // Migrate old saves
      this.state = this.migrateSaveData(loaded, saveVersion);
      this.gameMode = 'playing';
      
      const versionNote = saveVersion < 2 ? ' (migrated from v1)' : '';
      this.printOutput(`<div style="color: #98c379; margin: 2px 0;">
✓ Game loaded successfully!${versionNote}<br>
Level: ${this.state.level} | XP: ${this.state.xp}
</div>`);
      
      this.printOutput(this.renderer.renderStatsBox(this.state));
      this.nextEncounter();
      
    } catch (error) {
      this.printOutput(`<div style="color: #e06c75; margin: 2px 0;">
✗ Failed to load game. ${error.message}<br>
<span style="font-size: 9px;">The save code may be corrupted or from an incompatible version.</span>
</div>`);
      this.gameMode = 'menu';
      this.start();
    }
  }

  // Migrate save data from older versions
  migrateSaveData(loaded, fromVersion) {
    // Version 1 -> 2: Added chain states, pressure meter, loot/perk systems
    const migrated = {
      ...loaded,
      saveVersion: 2,
      // Add new v2 fields with safe defaults
      chainState: loaded.chainState || null,
      pressureMeter: loaded.pressureMeter || 0,
      lootPerks: loaded.lootPerks || {},
      perkBonuses: loaded.perkBonuses || {},
      perks: loaded.perks || [],
      // Reset transient state (shouldn't be saved, but clean up if present)
      awaitingPerkChoice: false,
      perkOptions: null
    };
    
    // Sanitize values to prevent corruption/exploits
    migrated.level = Math.max(1, Math.min(7, Math.floor(migrated.level)));
    migrated.xp = Math.max(0, Math.floor(migrated.xp));
    migrated.energy = Math.max(0, Math.floor(migrated.energy));
    migrated.credibility = Math.max(0, Math.min(100, Math.floor(migrated.credibility)));
    migrated.morale = Math.max(0, Math.min(100, Math.floor(migrated.morale)));
    migrated.budget = Math.max(0, Math.floor(migrated.budget));
    migrated.velocity = Math.max(10, Math.floor(migrated.velocity));
    migrated.pressureMeter = Math.max(0, Math.min(100, Math.floor(migrated.pressureMeter)));
    
    // Ensure arrays are arrays
    migrated.inventory = Array.isArray(migrated.inventory) ? migrated.inventory : [];
    migrated.completedBosses = Array.isArray(migrated.completedBosses) ? migrated.completedBosses : [];
    migrated.perks = Array.isArray(migrated.perks) ? migrated.perks : [];
    
    // Ensure objects are objects
    migrated.lootPerks = typeof migrated.lootPerks === 'object' ? migrated.lootPerks : {};
    migrated.perkBonuses = typeof migrated.perkBonuses === 'object' ? migrated.perkBonuses : {};
    
    return migrated;
  }

  // Generate next encounter
  async nextEncounter() {
    if (this.gameMode !== 'playing') return;
    
    // Check for level up
    this.checkLevelUp();
    
    // Check if we're in a chained encounter
    if (this.state.chainState && this.state.chainState.currentStage < this.state.chainState.totalStages) {
      this.advanceChainedEncounter();
    } else {
      // Clear chain state if chain is complete
      if (this.state.chainState) {
        this.state.chainState = null;
        this.state.pressureMeter = Math.max(0, this.state.pressureMeter - 20);
      }
      
      // Check for boss encounter
      if (this.shouldTriggerBoss()) {
        this.currentEncounter = PMContent.getBossEncounter(this.state.currentDungeon);
        this.currentEncounter.type = 'boss';
      } else {
        // Random encounter based on level
        const encounterType = this.selectEncounterType();
        this.currentEncounter = PMContent.getRandomEncounter(encounterType, this.state.level, this.state.currentDungeon);
        this.currentEncounter.type = encounterType;
        
        // High-stakes crises may trigger chains
        if (encounterType === 'crisis' && this.state.level >= 2 && Math.random() < 0.4) {
          this.initializeChainedCrisis();
        }
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
    }
    
    this.renderEncounter();
  }

  // Initialize a multi-stage chained crisis
  initializeChainedCrisis() {
    this.state.chainState = {
      type: 'crisis',
      currentStage: 1,
      totalStages: 2 + Math.floor(Math.random() * 2), // 2-3 stages
      chainId: Date.now()
    };
    this.state.pressureMeter = Math.min(100, this.state.pressureMeter + 25);
    this.currentEncounter.chainStage = 1;
    this.currentEncounter.pressure = this.state.pressureMeter;
  }

  // Advance to next stage in chained encounter
  advanceChainedEncounter() {
    this.state.chainState.currentStage++;
    this.state.pressureMeter = Math.min(100, this.state.pressureMeter + 15);
    
    const stageDescriptions = [
      'The crisis escalates. Stakeholders are getting anxious.',
      'Pressure builds. Quick decisions needed.',
      'Critical moment. This could make or break the situation.'
    ];
    
    const baseEncounter = PMContent.getRandomEncounter('crisis', this.state.level);
    
    this.currentEncounter = {
      ...baseEncounter,
      title: `${baseEncounter.title} - Stage ${this.state.chainState.currentStage}`,
      description: stageDescriptions[this.state.chainState.currentStage - 2] || baseEncounter.description,
      type: 'crisis',
      chainStage: this.state.chainState.currentStage,
      pressure: this.state.pressureMeter
    };
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
    
    // Add chain indicator
    if (this.state.chainState) {
      html += `<div style="margin: 2px 0; padding: 3px; background: rgba(224, 108, 117, 0.1); border-left: 3px solid #e06c75;">
<span style="color: #e06c75; font-weight: bold;">CHAINED CRISIS: Stage ${this.state.chainState.currentStage}/${this.state.chainState.totalStages}</span>
</div>`;
    }
    
    // Add description
    html += `<div style="color: #abb2bf; margin: 2px 0; line-height: 1.6;">
${this.renderer.escapeHtml(this.currentEncounter.description)}
</div>`;
    
    // Add pressure indicator for crises
    if (this.currentEncounter.pressure) {
      const pressureBar = this.renderer.generateProgressBar(this.currentEncounter.pressure, 100);
      const pressureColor = this.currentEncounter.pressure > 75 ? '#e06c75' : this.currentEncounter.pressure > 50 ? '#e5c07b' : '#98c379';
      html += `<div style="margin: 3px 0;">
<span style="color: ${pressureColor};">PRESSURE: ${pressureBar} ${this.currentEncounter.pressure}%</span>
</div>`;
      
      // Add pressure warning
      if (this.currentEncounter.pressure > 75) {
        html += `<div style="color: #e06c75; font-size: 9px; font-style: italic; margin: 2px 0;">
Critical pressure! Failure may have severe consequences.
</div>`;
      }
    }
    
    // Add choices
    html += this.renderer.renderChoices(this.currentEncounter.choices);
    
    // Add commands hint
    html += `<div style="margin-top: 5px; color: #5c6370; font-size: 9px;">
Commands: [1-${this.currentEncounter.choices.length}] Choose | [w] Wait | [s] Save | [stats] View Stats | [q] Quit
</div>`;
    
    this.printOutput(html);
  }

  // Handle game input during play
  async handleGameInput(input) {
    const cmd = input.trim().toLowerCase();
    
    // Check if awaiting perk choice
    if (this.state.awaitingPerkChoice) {
      const perkNum = parseInt(cmd);
      if (!isNaN(perkNum) && perkNum >= 1 && perkNum <= 3) {
        const selectedPerk = this.state.perkOptions[perkNum - 1];
        this.applyPerk(selectedPerk);
        this.state.awaitingPerkChoice = false;
        this.state.perkOptions = null;
        
        this.printOutput(`<div style="margin: 6px 0; padding: 4px; border: 2px solid #98c379;">
<div style="color: #98c379; font-weight: bold;">PERK ACQUIRED</div>
<div style="color: #abb2bf; margin: 2px 0;">${selectedPerk.name}: ${selectedPerk.effect}</div>
</div>`);
        
        await this.sleep(1500);
        await this.nextEncounter();
        return;
      } else {
        this.printOutput('<span style="color: #e06c75;">Invalid perk choice. Choose 1-3</span>');
        return;
      }
    }
    
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
    
    if (cmd === 'w' || cmd === 'wait') {
      await this.waitTurn();
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

  // Wait turn - skip encounter for modest gains
  async waitTurn() {
    const levelData = PMCareer.getLevelData(this.state.level);
    let energyGain = Math.floor(levelData.stats.maxEnergy * 0.08);
    const moraleGain = 3;
    
    // Apply energy recovery bonus from perks
    if (this.state.perkBonuses && this.state.perkBonuses.energyRecovery) {
      energyGain = Math.floor(energyGain * (1 + this.state.perkBonuses.energyRecovery / 100));
    }
    
    this.state.energy = Math.min(levelData.stats.maxEnergy, this.state.energy + energyGain);
    this.state.morale = Math.min(100, this.state.morale + moraleGain);
    
    this.printOutput(`<div style="margin: 2px 0; padding: 4px; border-left: 3px solid #56b6c2;">
<span style="color: #56b6c2; font-weight: bold;">WAITING...</span><br>
<span style="color: #abb2bf;">You take a moment to recharge and reflect.</span>
<div style="margin-top: 8px; font-size: 9px;">
<span style="color: #98c379;">Energy +${energyGain}</span> 
<span style="color: #98c379;">Morale +${moraleGain}</span>
</div>
</div>`);
    
    await this.sleep(1000);
    await this.nextEncounter();
  }

  // Process player decision
  async makeDecision(choiceIndex) {
    const choice = this.currentEncounter.choices[choiceIndex];
    if (!choice) return;
    
    this.state.decisionsCount++;
    
    // Calculate success with loot perk and perk bonuses
    let successChance = choice.success || 1.0;
    
    // Apply contextual loot perks based on encounter type
    if (this.state.lootPerks) {
      if (this.currentEncounter.type === 'crisis' && this.state.lootPerks.crisisSuccess) {
        successChance = Math.min(1.0, successChance + (this.state.lootPerks.crisisSuccess / 100));
      }
      
      if (this.currentEncounter.type === 'stakeholder' && this.state.lootPerks.stakeholderSuccess) {
        successChance = Math.min(1.0, successChance + (this.state.lootPerks.stakeholderSuccess / 100));
      }
      
      // Apply ally bonuses based on choice context
      const choiceText = choice.text.toLowerCase();
      
      if (choiceText.includes('data') || choiceText.includes('analytic') || choiceText.includes('metric')) {
        if (this.state.lootPerks.dataBoost) {
          successChance = Math.min(1.0, successChance + (this.state.lootPerks.dataBoost / 100));
        }
      }
      
      if (choiceText.includes('technical') || choiceText.includes('engineer') || choiceText.includes('code')) {
        if (this.state.lootPerks.techDecisions) {
          successChance = Math.min(1.0, successChance + (this.state.lootPerks.techDecisions / 100));
        }
      }
      
      if (choiceText.includes('design') || choiceText.includes('user') || choiceText.includes('ux')) {
        if (this.state.lootPerks.uxBoost) {
          successChance = Math.min(1.0, successChance + (this.state.lootPerks.uxBoost / 100));
        }
      }
      
      if (choiceText.includes('vision') || choiceText.includes('strategy') || choiceText.includes('direction')) {
        if (this.state.lootPerks.visionBoost) {
          successChance = Math.min(1.0, successChance + (this.state.lootPerks.visionBoost / 100));
        }
      }
    }
    
    // Apply perk bonuses
    if (this.state.perkBonuses) {
      const choiceText = choice.text.toLowerCase();
      
      if (this.currentEncounter.type === 'crisis' && this.state.perkBonuses.crisisBonus) {
        successChance = Math.min(1.0, successChance + (this.state.perkBonuses.crisisBonus / 100));
      }
      
      if (choiceText.includes('technical') && this.state.perkBonuses.techBonus) {
        successChance = Math.min(1.0, successChance + (this.state.perkBonuses.techBonus / 100));
      }
      
      if (choiceText.includes('data') && this.state.perkBonuses.dataBonus) {
        successChance = Math.min(1.0, successChance + (this.state.perkBonuses.dataBonus / 100));
      }
    }
    
    // Determine success
    const success = Math.random() <= successChance;
    
    // Apply effects
    const changes = {};
    
    if (choice.energy) {
      let energyCost = choice.energy;
      
      // Apply energy efficiency perk
      if (energyCost < 0 && this.state.perkBonuses && this.state.perkBonuses.energyEfficiency) {
        energyCost = Math.floor(energyCost * (1 - this.state.perkBonuses.energyEfficiency / 100));
      }
      
      // Apply stakeholder conflict discount if owning Disagree & Commit Ring
      if (energyCost < 0 && this.currentEncounter.type === 'stakeholder' && this.state.lootPerks && this.state.lootPerks.stakeholderSuccess) {
        // 15% base success perk also grants 20% energy discount on stakeholder choices
        energyCost = Math.floor(energyCost * 0.8);
      }
      
      this.state.energy = Math.max(0, Math.min(PMCareer.getLevelData(this.state.level).stats.maxEnergy, this.state.energy + energyCost));
      changes.energy = energyCost;
    }
    
    if (choice.credibility) {
      let credGain = choice.credibility;
      
      // Apply influence bonus on stakeholder encounters
      if (credGain > 0 && this.currentEncounter.type === 'stakeholder' && this.state.perkBonuses && this.state.perkBonuses.influenceBonus) {
        credGain += this.state.perkBonuses.influenceBonus;
      }
      
      this.state.credibility = Math.max(0, Math.min(100, this.state.credibility + credGain));
      changes.credibility = credGain;
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
      let xpGain = choice.xp;
      
      // Apply XP bonus perk
      if (this.state.perkBonuses && this.state.perkBonuses.xpBonus) {
        xpGain = Math.floor(xpGain * (1 + this.state.perkBonuses.xpBonus / 100));
      }
      
      this.state.xp += xpGain;
      changes.xp = xpGain;
    }
    
    // Apply passive credibility boost from allies
    if (this.state.lootPerks && this.state.lootPerks.credibilityBoost && success) {
      const credBoost = this.state.lootPerks.credibilityBoost;
      this.state.credibility = Math.min(100, this.state.credibility + credBoost);
      changes.credibility = (changes.credibility || 0) + credBoost;
    }
    
    // Apply pressure penalties for failures during high-pressure situations
    if (!success && this.currentEncounter.pressure && this.currentEncounter.pressure > 60) {
      const pressurePenalty = Math.floor((this.currentEncounter.pressure - 50) / 10);
      this.state.credibility = Math.max(0, this.state.credibility - pressurePenalty);
      changes.credibility = (changes.credibility || 0) - pressurePenalty;
    }
    
    // Show result
    // Prefer encounter-specific messages when provided
    let resultMessages;
    if (success && Array.isArray(this.currentEncounter.successMessages) && this.currentEncounter.successMessages.length) {
      resultMessages = this.currentEncounter.successMessages;
    } else if (!success && Array.isArray(this.currentEncounter.failureMessages) && this.currentEncounter.failureMessages.length) {
      resultMessages = this.currentEncounter.failureMessages;
    } else {
      resultMessages = success ? PMContent.dialogue.success : PMContent.dialogue.failure;
      if (!success && this.currentEncounter.type === 'crisis' && PMContent.dialogue.crisisFailure && PMContent.dialogue.crisisFailure.length) {
        // Use crisis-specific failure humor when available
        resultMessages = PMContent.dialogue.crisisFailure;
      }
    }
    const resultMessage = resultMessages[Math.floor(Math.random() * resultMessages.length)];
    
    const result = {
      success: success,
      title: success ? 'Success!' : 'Not quite...',
      message: resultMessage,
      changes: changes,
      isPressureCrisis: this.currentEncounter.pressure > 60
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
    if (this.currentEncounter.type === 'boss' && success) {
      this.state.completedBosses.push(this.state.currentDungeon);
      
      // Apply boss encounter rewards
      if (this.currentEncounter.reward) {
        const bossReward = this.currentEncounter.reward;
        
        if (bossReward.xp) {
          this.state.xp += bossReward.xp;
          changes.xp = (changes.xp || 0) + bossReward.xp;
        }
        
        if (bossReward.credibility) {
          this.state.credibility = Math.min(100, this.state.credibility + bossReward.credibility);
          changes.credibility = (changes.credibility || 0) + bossReward.credibility;
        }
        
        if (bossReward.budget) {
          this.state.budget += bossReward.budget;
          changes.budget = (changes.budget || 0) + bossReward.budget;
        }
        
        // Show boss completion message with all accumulated rewards
        await this.sleep(500);
        this.printOutput(this.renderer.renderResult({
          success: true,
          title: 'Boss Defeated!',
          message: 'Exceptional performance. You\'ve proven your capabilities.',
          changes: changes
        }));
        
        // Add scripted item from PMContent.items if specified
        if (bossReward.item) {
          const scriptedItem = this.getScriptedItem(bossReward.item);
          if (scriptedItem) {
            this.state.inventory.push(scriptedItem);
            await this.sleep(800);
            this.printOutput(this.renderer.renderLootAcquired(scriptedItem));
          }
        }
      }
      
      // Award additional random loot (allies/artifacts)
      const randomLoot = this.generateBossLoot(this.state.currentDungeon);
      if (randomLoot) {
        this.state.inventory.push(randomLoot);
        await this.sleep(800);
        this.printOutput(this.renderer.renderLootAcquired(randomLoot));
      }
      
      // Check for victory
      if (this.currentEncounter.reward && this.currentEncounter.reward.victory) {
        await this.sleep(1000);
        this.victory();
        return;
      }
      
      // Move to next dungeon
      this.state.currentDungeon++;
      this.printOutput(`<div style="color: #98c379; margin: 2px 0; font-weight: bold;">
Dungeon Complete! Moving to next challenge...
</div>`);
    }
    
    // Small delay then next encounter
    await this.sleep(1500);
    await this.nextEncounter();
  }

  // Get scripted item from PMContent.items
  getScriptedItem(itemId) {
    // Search all item categories in PMContent
    const allItems = [
      ...(PMContent.items.weapons || []),
      ...(PMContent.items.armor || []),
      ...(PMContent.items.consumables || []),
      ...(PMContent.items.artifacts || [])
    ];
    
    const item = allItems.find(i => i.id === itemId);
    if (!item) return null;
    
    return {
      name: item.name,
      type: 'equipment',
      effect: item.effect || `Bonus: ${JSON.stringify(item.bonus || {})}`,
      perk: 'equipment',
      equipped: true
    };
  }

  // Generate loot from boss encounters
  generateBossLoot(dungeonLevel) {
    const artifacts = [
      { 
        name: 'First Principles Amulet', 
        type: 'artifact',
        effect: 'Root cause analysis clarity',
        perk: 'crisisSuccess',
        value: 15
      },
      { 
        name: 'North Star Compass', 
        type: 'artifact',
        effect: 'Never lose strategic direction',
        perk: 'visionBoost',
        value: 20
      },
      { 
        name: 'Disagree & Commit Ring', 
        type: 'artifact',
        effect: 'Resolve conflicts 50% faster',
        perk: 'stakeholderSuccess',
        value: 15
      },
      { 
        name: 'Ship It Badge', 
        type: 'artifact',
        effect: '+10% velocity permanently',
        perk: 'velocityBoost',
        value: 10
      }
    ];
    
    const allies = [
      { 
        name: 'Senior Engineer (Ally)', 
        type: 'ally',
        effect: 'Technical decisions easier',
        perk: 'techDecisions',
        value: 10
      },
      { 
        name: 'Data Analyst (Ally)', 
        type: 'ally',
        effect: 'Better analytics insights',
        perk: 'dataBoost',
        value: 10
      },
      { 
        name: 'UX Designer (Ally)', 
        type: 'ally',
        effect: 'User experience improved',
        perk: 'uxBoost',
        value: 10
      },
      { 
        name: 'Influential Stakeholder (Ally)', 
        type: 'ally',
        effect: '+5 Credibility per encounter',
        perk: 'credibilityBoost',
        value: 5
      }
    ];
    
    // Decide between artifact or ally based on dungeon level
    const lootPool = dungeonLevel % 2 === 0 ? allies : artifacts;
    const loot = lootPool[Math.floor(Math.random() * lootPool.length)];
    
    // Apply permanent perk
    this.applyLootPerk(loot);
    
    return { ...loot, dungeonAcquired: dungeonLevel };
  }

  // Apply permanent perks from loot
  applyLootPerk(loot) {
    if (!this.state.lootPerks) {
      this.state.lootPerks = {};
    }
    
    if (!loot.perk || !loot.value) {
      return;
    }
    
    switch(loot.perk) {
      case 'velocityBoost':
        this.state.velocity += loot.value;
        break;
      case 'credibilityBoost':
        this.state.lootPerks.credibilityBoost = (this.state.lootPerks.credibilityBoost || 0) + loot.value;
        break;
      case 'crisisSuccess':
        this.state.lootPerks.crisisSuccess = (this.state.lootPerks.crisisSuccess || 0) + loot.value;
        break;
      case 'visionBoost':
        this.state.lootPerks.visionBoost = (this.state.lootPerks.visionBoost || 0) + loot.value;
        break;
      case 'stakeholderSuccess':
        this.state.lootPerks.stakeholderSuccess = (this.state.lootPerks.stakeholderSuccess || 0) + loot.value;
        break;
      case 'techDecisions':
        this.state.lootPerks.techDecisions = (this.state.lootPerks.techDecisions || 0) + loot.value;
        break;
      case 'dataBoost':
        this.state.lootPerks.dataBoost = (this.state.lootPerks.dataBoost || 0) + loot.value;
        break;
      case 'uxBoost':
        this.state.lootPerks.uxBoost = (this.state.lootPerks.uxBoost || 0) + loot.value;
        break;
      case 'equipment':
        // Equipment perks are handled contextually during encounters
        break;
      default:
        // Unknown perk - log for debugging but don't break
        console.warn('Unknown loot perk type:', loot.perk);
        break;
    }
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
      
      // Offer perk draft
      this.state.awaitingPerkChoice = true;
      this.state.perkOptions = this.generatePerkOptions(this.state.level);
      this.printOutput(this.renderer.renderPerkDraft(this.state.perkOptions));
    }
  }

  // Generate perk options based on level
  generatePerkOptions(level) {
    const perkPools = {
      technical: [
        { name: 'Technical Fluency', effect: '+15% success on technical decisions', stat: 'techBonus', value: 15 },
        { name: 'Architecture Vision', effect: '+20k Budget, better tech strategy', stat: 'budget', value: 20000 },
        { name: 'Code Review Master', effect: '+5 Velocity permanently', stat: 'velocity', value: 5 }
      ],
      strategic: [
        { name: 'Market Sensing', effect: '+10% XP from all sources', stat: 'xpBonus', value: 10 },
        { name: 'Competitive Analysis', effect: '+10 Credibility, strategic insight', stat: 'credibility', value: 10 },
        { name: 'Vision Casting', effect: 'Better crisis management', stat: 'crisisBonus', value: 15 }
      ],
      people: [
        { name: 'Servant Leadership', effect: '+15 Team Morale permanently', stat: 'morale', value: 15 },
        { name: 'Coaching Excellence', effect: '+20% Energy recovery', stat: 'energyRecovery', value: 20 },
        { name: 'Influence Network', effect: '+10 Credibility from stakeholder wins', stat: 'influenceBonus', value: 10 }
      ],
      execution: [
        { name: 'Bias for Action', effect: '+8 Velocity, ship faster', stat: 'velocity', value: 8 },
        { name: 'Process Optimization', effect: '-10% Energy costs', stat: 'energyEfficiency', value: 10 },
        { name: 'Metrics Driven', effect: '+15% success on data decisions', stat: 'dataBonus', value: 15 }
      ]
    };
    
    // Select 3 random perks from different categories
    const categories = Object.keys(perkPools);
    const selectedPerks = [];
    
    // Shuffle categories to ensure all categories have equal chance
    const shuffledCategories = [...categories];
    for (let i = shuffledCategories.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCategories[i], shuffledCategories[j]] = [shuffledCategories[j], shuffledCategories[i]];
    }
    
    // Pick first 3 categories from shuffled array
    for (let i = 0; i < 3; i++) {
      const category = shuffledCategories[i];
      const perks = perkPools[category];
      const perk = perks[Math.floor(Math.random() * perks.length)];
      selectedPerks.push({ ...perk, category, id: i + 1 });
    }
    
    return selectedPerks;
  }

  // Apply selected perk
  applyPerk(perk) {
    if (!this.state.perks) {
      this.state.perks = [];
    }
    
    if (!this.state.perkBonuses) {
      this.state.perkBonuses = {};
    }
    
    this.state.perks.push(perk);
    
    // Apply stat changes and store passive bonuses
    switch(perk.stat) {
      case 'velocity':
        this.state.velocity += perk.value;
        break;
      case 'morale':
        this.state.morale = Math.min(100, this.state.morale + perk.value);
        break;
      case 'credibility':
        this.state.credibility = Math.min(100, this.state.credibility + perk.value);
        break;
      case 'budget':
        this.state.budget += perk.value;
        break;
      case 'xpBonus':
      case 'techBonus':
      case 'crisisBonus':
      case 'dataBonus':
      case 'energyRecovery':
      case 'energyEfficiency':
      case 'influenceBonus':
        // Store passive bonuses for contextual application
        this.state.perkBonuses[perk.stat] = (this.state.perkBonuses[perk.stat] || 0) + perk.value;
        break;
      default:
        // Unknown perk stat
        break;
    }
  }

  // Save game
  saveGame() {
    const hash = this.generateSaveHash();
    this.printOutput(this.renderer.renderSaveCode(hash));
  }

  // Generate save hash
  generateSaveHash() {
    // Add save version for future compatibility
    const saveState = {
      ...this.state,
      saveVersion: 2,  // Increment when state structure changes
      savedAt: Date.now()
    };
    
    const saveData = JSON.stringify(saveState);
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


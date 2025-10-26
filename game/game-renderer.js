// Game Renderer - ASCII art, progress bars, and formatted display

class GameRenderer {
  constructor() {
    this.colors = {
      primary: '#61afef',
      success: '#98c379',
      warning: '#e5c07b',
      error: '#e06c75',
      info: '#56b6c2',
      muted: '#5c6370',
      bright: '#abb2bf'
    };
  }

  // Generate progress bar
  generateProgressBar(current, max, length = 10) {
    const filled = Math.floor((current / max) * length);
    const empty = length - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  }

  // Format currency
  formatCurrency(amount) {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}k`;
    }
    return `$${amount}`;
  }

  // Render main game title
  renderTitle() {
    return `<pre style="color: ${this.colors.warning}; font-size: 9px; line-height: 1.1; margin: 3px 0;">
╔═══════════════════════════════════════╗
║    PM QUEST: CORPORATE CLIMBER        ║
║  An Idle Roguelike Career Adventure   ║
╚═══════════════════════════════════════╝</pre>`;
  }

  // Render player stats box
  renderStatsBox(state) {
    const levelData = PMCareer.getLevelData(state.level);
    const energyBar = this.generateProgressBar(state.energy, levelData.stats.maxEnergy);
    const credBar = this.generateProgressBar(state.credibility, 100);
    const moraleBar = this.generateProgressBar(state.morale, 100);
    const xpProgress = PMCareer.getProgressToNextLevel(state.xp, state.level);
    const xpBar = this.generateProgressBar(xpProgress, 100);

    return `<pre style="color: ${this.colors.bright}; font-size: 10px; line-height: 1.4; font-family: monospace;">
┌─────────────────────────────────────────────┐
│ <span style="color: ${this.colors.success};">${state.name || 'AMIT THE PM'}</span>      Level: <span style="color: ${this.colors.warning};">${state.level}</span> (<span style="color: ${this.colors.info};">${levelData.shortTitle}</span>)   │
├─────────────────────────────────────────────┤
│ Energy:  <span style="color: ${this.colors.success};">${energyBar}</span>  ${state.energy}/${levelData.stats.maxEnergy}       │
│ Cred:    <span style="color: ${this.colors.info};">${credBar}</span>  ${state.credibility}/100         │
│ Budget:  <span style="color: ${this.colors.warning};">${this.formatCurrency(state.budget)}</span>                       │
│ Morale:  <span style="color: ${this.colors.success};">${moraleBar}</span>  ${state.morale}/100         │
│ Velocity: <span style="color: ${this.colors.primary};">${state.velocity} pts/sprint</span>              │
├─────────────────────────────────────────────┤
│ XP: <span style="color: ${this.colors.warning};">${xpBar}</span> ${xpProgress}%       │
│ Location: <span style="color: ${this.colors.info};">${levelData.dungeon}</span>        │
└─────────────────────────────────────────────┘</pre>`;
  }

  // Render encounter header
  renderEncounterHeader(type, title) {
    const symbols = {
      daily: '═══',
      stakeholder: '📧',
      crisis: '⚠️',
      boss: '👔'
    };

    const symbol = symbols[type] || '═══';
    
    return `<div style="margin: 2px 0;">
<pre style="color: ${this.colors.warning}; font-size: 11px; font-weight: bold;">
${symbol} ${title.toUpperCase()} ${symbol}
</pre></div>`;
  }

  // Render choice options
  renderChoices(choices) {
    let html = '<div style="margin: 3px 0;">';
    
    choices.forEach((choice, index) => {
      const key = index + 1;
      html += `<div style="margin: 2px 0; color: ${this.colors.bright};">
  <span style="color: ${this.colors.primary};">[${key}]</span> ${this.escapeHtml(choice.text)}
  <span style="color: ${this.colors.muted}; font-size: 9px;">${this.escapeHtml(choice.effect || '')}</span>
</div>`;
    });

    html += '</div>';
    return html;
  }

  // Render result message
  renderResult(result) {
    const color = result.success ? this.colors.success : this.colors.error;
    const icon = result.success ? '✓' : '✗';
    
    return `<div style="margin: 2px 0; padding: 4px; border-left: 3px solid ${color};">
<span style="color: ${color}; font-weight: bold;">${icon} ${this.escapeHtml(result.title)}</span><br>
<span style="color: ${this.colors.bright};">${this.escapeHtml(result.message)}</span>
${result.changes ? this.renderStatChanges(result.changes) : ''}
</div>`;
  }

  // Render stat changes
  renderStatChanges(changes) {
    let html = '<div style="margin-top: 8px; font-size: 9px;">';
    
    if (changes.energy) {
      const color = changes.energy > 0 ? this.colors.success : this.colors.error;
      html += `<span style="color: ${color};">Energy ${changes.energy > 0 ? '+' : ''}${changes.energy}</span> `;
    }
    if (changes.credibility) {
      const color = changes.credibility > 0 ? this.colors.success : this.colors.error;
      html += `<span style="color: ${color};">Credibility ${changes.credibility > 0 ? '+' : ''}${changes.credibility}</span> `;
    }
    if (changes.morale) {
      const color = changes.morale > 0 ? this.colors.success : this.colors.error;
      html += `<span style="color: ${color};">Morale ${changes.morale > 0 ? '+' : ''}${changes.morale}</span> `;
    }
    if (changes.budget) {
      const color = changes.budget > 0 ? this.colors.success : this.colors.error;
      html += `<span style="color: ${color};">Budget ${changes.budget > 0 ? '+' : ''}${this.formatCurrency(Math.abs(changes.budget))}</span> `;
    }
    if (changes.xp) {
      html += `<span style="color: ${this.colors.warning};">+${changes.xp} XP</span> `;
    }
    
    html += '</div>';
    return html;
  }

  // Render level up screen
  renderLevelUp(oldLevel, newLevel) {
    const levelData = PMCareer.getLevelData(newLevel);
    
    return `<div style="margin: 6px 0; padding: 5px; border: 2px solid ${this.colors.warning}; text-align: center;">
<pre style="color: ${this.colors.warning}; font-size: 12px; font-weight: bold;">
★ ★ ★  PROMOTION!  ★ ★ ★
</pre>
<div style="color: ${this.colors.bright}; font-size: 14px; margin: 3px 0;">
You've been promoted to <span style="color: ${this.colors.success}; font-weight: bold;">${levelData.title}</span>!
</div>
<div style="color: ${this.colors.muted}; font-size: 10px;">
${this.escapeHtml(levelData.description)}
</div>
<div style="margin-top: 3px; color: ${this.colors.info}; font-size: 10px;">
New Skills: ${levelData.skills.join(', ')}
</div>
</div>`;
  }

  // Render inventory
  renderInventory(inventory) {
    if (!inventory || inventory.length === 0) {
      return `<div style="color: ${this.colors.muted}; font-style: italic;">No items yet. Keep progressing!</div>`;
    }

    let html = '<div style="margin: 3px 0;">';
    inventory.forEach(item => {
      html += `<div style="margin: 2px 0; color: ${this.colors.bright};">
  <span style="color: ${this.colors.success};">▸</span> ${this.escapeHtml(item.name)}
  <span style="color: ${this.colors.muted}; font-size: 9px;">${this.escapeHtml(item.effect)}</span>
</div>`;
    });
    html += '</div>';
    return html;
  }

  // Render save code display
  renderSaveCode(hash) {
    return `<div style="margin: 6px 0; padding: 5px; border: 1px solid ${this.colors.info}; background: rgba(86, 182, 194, 0.1);">
<div style="color: ${this.colors.info}; font-weight: bold; margin-bottom: 3px;">
═══ GAME SAVED ═══
</div>
<div style="color: ${this.colors.bright}; margin: 3px 0;">
Your save code:
</div>
<pre style="color: ${this.colors.warning}; background: #1e1e1e; padding: 4px; overflow-wrap: break-word; word-wrap: break-word; white-space: pre-wrap; font-size: 10px; border: 1px solid ${this.colors.muted};">${this.escapeHtml(hash)}</pre>
<div style="color: ${this.colors.muted}; font-size: 9px; margin-top: 3px;">
Copy this code. Type 'play' then 'l' to load your progress.
</div>
</div>`;
  }

  // Helper: Escape HTML
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Render game menu
  renderMenu() {
    return `<div style="margin: 6px 0;">
${this.renderTitle()}
<div style="color: ${this.colors.bright}; margin: 2px 0; line-height: 1.8;">
Navigate the corporate ladder from APM to CPO.<br>
Make strategic decisions. Ship products. Survive.<br>
</div>
<div style="margin: 6px 0; color: ${this.colors.info};">
<div style="margin: 2px 0;"><span style="color: ${this.colors.primary};">[n]</span> New Game - Start as Associate PM</div>
<div style="margin: 2px 0;"><span style="color: ${this.colors.primary};">[l]</span> Load Game - Enter your save hash</div>
<div style="margin: 2px 0;"><span style="color: ${this.colors.primary};">[h]</span> How to Play</div>
<div style="margin: 2px 0;"><span style="color: ${this.colors.primary};">[q]</span> Quit to Resume</div>
</div>
<div style="color: ${this.colors.muted}; font-size: 9px; font-style: italic;">
Choose wisely...
</div>
</div>`;
  }

  // Render help screen
  renderHelp() {
    return `<div style="margin: 6px 0; color: ${this.colors.bright}; line-height: 1.8;">
<div style="color: ${this.colors.warning}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">
HOW TO PLAY
</div>

<div style="margin-bottom: 15px;">
<span style="color: ${this.colors.success};">Goal:</span> Climb from Associate PM to CPO by making smart decisions, shipping products, and managing stakeholders.
</div>

<div style="margin-bottom: 15px;">
<span style="color: ${this.colors.success};">Resources:</span>
<div style="margin-left: 5px; font-size: 10px;">
• <span style="color: ${this.colors.info};">Energy</span> - Depleted by meetings and decisions<br>
• <span style="color: ${this.colors.info};">Credibility</span> - Your influence currency<br>
• <span style="color: ${this.colors.info};">Budget</span> - Hire, build, scale<br>
• <span style="color: ${this.colors.info};">Team Morale</span> - Affects velocity<br>
• <span style="color: ${this.colors.info};">Velocity</span> - How fast you ship
</div>
</div>

<div style="margin-bottom: 15px;">
<span style="color: ${this.colors.success};">Commands:</span>
<div style="margin-left: 5px; font-size: 10px;">
• <span style="color: ${this.colors.primary};">[1-4]</span> - Make decisions<br>
• <span style="color: ${this.colors.primary};">[w]</span> - Wait (auto-progress)<br>
• <span style="color: ${this.colors.primary};">[s]</span> - Save game<br>
• <span style="color: ${this.colors.primary};">[i]</span> - View inventory<br>
• <span style="color: ${this.colors.primary};">[stats]</span> - View full stats<br>
• <span style="color: ${this.colors.primary};">[q]</span> - Quit to menu
</div>
</div>

<div style="color: ${this.colors.warning};">
Press any key to return to menu...
</div>
</div>`;
  }

  // Render game over
  renderGameOver(state, reason) {
    return `<div style="margin: 6px 0; padding: 6px; border: 2px solid ${this.colors.error}; text-align: center;">
<pre style="color: ${this.colors.error}; font-size: 12px; font-weight: bold;">
╔════════════════════╗
║   GAME OVER        ║
╚════════════════════╝
</pre>
<div style="color: ${this.colors.bright}; margin: 2px 0;">
${this.escapeHtml(reason)}
</div>
<div style="color: ${this.colors.muted}; font-size: 10px;">
Final Level: ${state.level} (${PMCareer.getLevelData(state.level).title})<br>
Total XP: ${state.xp}<br>
Decisions Made: ${state.decisionsCount || 0}
</div>
<div style="margin-top: 5px; color: ${this.colors.info};">
<span style="color: ${this.colors.primary};">[n]</span> New Game  <span style="color: ${this.colors.primary};">[q]</span> Quit
</div>
</div>`;
  }

  // Render victory screen
  renderVictory(state) {
    return `<div style="margin: 6px 0; padding: 6px; border: 2px solid ${this.colors.success}; text-align: center;">
<pre style="color: ${this.colors.success}; font-size: 12px; font-weight: bold;">
╔═══════════════════════╗
║  🎉 VICTORY! 🎉       ║
║  YOU ARE NOW CPO!     ║
╚═══════════════════════╝
</pre>
<div style="color: ${this.colors.bright}; margin: 2px 0;">
You've conquered the corporate ladder!<br>
From Associate PM to Chief Product Officer.
</div>
<div style="color: ${this.colors.warning}; font-size: 10px;">
Total XP: ${state.xp}<br>
Decisions Made: ${state.decisionsCount || 0}<br>
Final Budget: ${this.formatCurrency(state.budget)}
</div>
<div style="margin-top: 5px; color: ${this.colors.muted}; font-size: 9px; font-style: italic;">
"Ship fast, measure everything, iterate relentlessly."
</div>
<div style="margin-top: 5px; color: ${this.colors.info};">
<span style="color: ${this.colors.primary};">[n]</span> New Game+  <span style="color: ${this.colors.primary};">[q]</span> Quit
</div>
</div>`;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameRenderer;
}


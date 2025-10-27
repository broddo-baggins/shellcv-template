// PM Dungeon Crawler: The Corporate Climb Game Content - Items, enemies, dialogue, and encounter system
// Encounters are loaded from modular files in /encounters/ directory

const PMContent = {
  // PM Equipment and Items
  items: {
    weapons: [
      { id: 'jira_sword', name: 'Jira Sword of Prioritization', level: 1, bonus: { prioritization: 5 }, cost: 0 },
      { id: 'figma_wand', name: 'Figma Wand', level: 2, bonus: { design: 10 }, cost: 5000 },
      { id: 'analytics_blade', name: 'Analytics Blade', level: 3, bonus: { dataDecisions: 15 }, cost: 15000 },
      { id: 'okr_hammer', name: 'OKR Hammer', level: 4, bonus: { alignment: 20 }, cost: 30000 },
      { id: 'vision_bow', name: 'Vision Bow', level: 5, bonus: { strategy: 25 }, cost: 50000 }
    ],
    
    armor: [
      { id: 'agile_robes', name: 'Agile Robes', effect: 'Reduce scope creep damage by 20%', cost: 10000 },
      { id: 'lean_armor', name: 'Lean Armor', effect: '+10% velocity, -15% waste', cost: 20000 },
      { id: 'rice_shield', name: 'RICE Shield', effect: 'Better prioritization decisions', cost: 15000 },
      { id: 'jtbd_cloak', name: 'Jobs-to-be-Done Cloak', effect: '+25% customer insight', cost: 25000 }
    ],
    
    consumables: [
      { id: 'coffee', name: 'Coffee', effect: '+10 Energy', cost: 0, uses: 1 },
      { id: 'slack_dnd', name: 'Slack DND', effect: 'Skip 3 meetings', cost: 0, uses: 3 },
      { id: 'one_on_one', name: '1-on-1 Scroll', effect: '+20 Team Morale', cost: 0, uses: 1 },
      { id: 'all_hands', name: 'All-Hands Potion', effect: '+30 Credibility', cost: 0, uses: 1 }
    ],
    
    artifacts: [
      { id: 'first_principles', name: '"First Principles" Amulet', effect: 'See root causes clearly', permanent: true },
      { id: 'north_star', name: '"North Star" Compass', effect: 'Never lose direction', permanent: true },
      { id: 'disagree_commit', name: '"Disagree & Commit" Ring', effect: 'Resolve conflicts 50% faster', permanent: true },
      { id: 'ship_it', name: '"Ship It" Badge', effect: '+50% velocity', permanent: true }
    ]
  },

  // Enemy/Challenge definitions
  enemies: [
    { id: 'meeting_marathon', name: 'Meeting Marathon Monster', drains: 'energy', difficulty: 1 },
    { id: 'scope_creep', name: 'Scope Creep Serpent', adds: 'features', difficulty: 2 },
    { id: 'tech_debt', name: 'Technical Debt Dragon', blocks: 'velocity', difficulty: 3 },
    { id: 'micromanager', name: 'Micromanager Wraith', removes: 'autonomy', difficulty: 2 },
    { id: 'budget_cut', name: 'Budget Cut Goblin', steals: 'resources', difficulty: 2 },
    { id: 'deadline_demon', name: 'Deadline Demon', pressure: 'time', difficulty: 3 },
    { id: 'politics_troll', name: 'Politics Troll', requires: 'navigation', difficulty: 3 },
    { id: 'analysis_paralysis', name: 'Analysis Paralysis Phantom', prevents: 'decisions', difficulty: 2 },
    { id: 'stakeholder_hydra', name: 'Stakeholder Hydra', multiplier: 'opinions', difficulty: 4 }
  ],

  // Encounter storage (loaded dynamically or from modular files)
  // In browser environment, encounters are loaded via script tags
  // Structure: { daily: [...], stakeholder: [...], crisis: [...], boss: [...] }
  encounters: {
    daily: typeof DailyEncounters !== 'undefined' ? DailyEncounters : [],
    stakeholder: typeof StakeholderEncounters !== 'undefined' ? StakeholderEncounters : [],
    crisis: typeof CrisisEncounters !== 'undefined' ? CrisisEncounters : [],
    boss: typeof BossEncounters !== 'undefined' ? BossEncounters : []
  },

  // Dialogue and flavor text
  dialogue: {
    success: [
      'Perfect execution! Shipped on time.',
      'Stakeholder satisfied! Credibility increased.',
      'Team morale boosted! Velocity up.',
      'Smart decision! Data backs you up.',
      'Well navigated! Political capital gained.',
      'Excellent prioritization! Focused on what matters.',
      'Ship it! Users are happy.'
    ],
    
    failure: [
      'Scope creep! Deadline missed.',
      'Stakeholder disappointed. Credibility decreased.',
      'Team burnout! Morale down.',
      'Missed the mark. Users confused.',
      'Political misstep. Lost influence.',
      'Poor prioritization. Wasted effort.',
      'Bug in production. Customer impact.'
    ],
    
    funny: [
      'You\'ve been CC\'d on 47 emails. Lose 2 Energy.',
      'Another meeting that could\'ve been a Slack message.',
      'Engineering says "just one more sprint."',
      'CEO: "Can we add AI to this?" You: "Sure..." *nervous laughter*',
      'Product-market fit found! (Just kidding, keep iterating.)',
      'Your roadmap is a beautiful fiction.',
      'Stakeholder used JARGON BLAST! It\'s super effective!',
      'You gained the power of "I\'ll circle back on that."',
      'Sprint velocity: Fast. Technical debt: Faster.',
      'Congratulations! You\'ve unlocked: Imposter Syndrome.'
    ],
    crisisFailure: [
      'Legal now knows your Slack handle.',
      'Status page updated to "We\'re investigating." Forever.',
      'Incident retro action item: Learn how to do incident retros.',
      'Security added you to a calendar invite called "Forever."',
      'New Jira epic created: "Clean up after the cleanup."',
      'You\'re now the owner of the ownership doc.'
    ]
  },

  // Random events for idle progression
  randomEvents: [
    { message: 'User loves the new feature! +5 Credibility', credibility: +5, xp: +10 },
    { message: 'Bug reported. -3 Credibility', credibility: -3 },
    { message: 'Team shipped ahead of schedule! +10 XP', xp: +10, morale: +5 },
    { message: 'Unexpected meeting. -10 Energy', energy: -10 },
    { message: 'Customer interview insights gained! +15 XP', xp: +15 },
    { message: 'Competitor launched similar feature. Pressure mounting.', credibility: -2 },
    { message: 'Engineering found elegant solution! +5 Velocity', velocity: +5, xp: +8 },
    { message: 'Sales closed big deal using your product! +$25k Budget', budget: +25000, credibility: +5 }
  ],

  // Helper to get random encounter
  getRandomEncounter(type, level, currentDungeon = 1) {
    const encounters = this.encounters[type] || [];
    if (encounters.length === 0) return null;
    
    // Filter by appropriate difficulty for level
    let filtered = encounters;
    
    // Gate by dungeon progression if minDungeon is present
    filtered = filtered.filter(e => !e.minDungeon || currentDungeon >= e.minDungeon);
    if (level <= 2) {
      filtered = filtered.slice(0, Math.ceil(filtered.length / 2));
    }
    
    const index = Math.floor(Math.random() * filtered.length);
    return { ...filtered[index] };
  },

  // Helper to get random event
  getRandomEvent() {
    const index = Math.floor(Math.random() * this.randomEvents.length);
    return { ...this.randomEvents[index] };
  },

  // Get boss encounter for dungeon level
  getBossEncounter(dungeonLevel) {
    return this.encounters.boss.find(boss => boss.dungeon === dungeonLevel) || this.encounters.boss[0];
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PMContent;
}

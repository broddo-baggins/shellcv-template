// PM Career Progression System
// Defines the 7-level career ladder from APM to CPO

const PMCareer = {
  levels: [
    {
      level: 1,
      title: 'Associate PM',
      shortTitle: 'APM',
      xpRequired: 100,
      stats: {
        maxEnergy: 100,
        maxCredibility: 100,
        budget: 0,
        baseVelocity: 20
      },
      skills: ['Note-taking', 'User Stories', 'Basic Prioritization'],
      dungeon: 'The Onboarding Gauntlet',
      description: 'Starting your PM journey. Learn the ropes and ship your first features.'
    },
    {
      level: 2,
      title: 'Product Manager',
      shortTitle: 'PM',
      xpRequired: 300,
      stats: {
        maxEnergy: 120,
        maxCredibility: 100,
        budget: 25000,
        baseVelocity: 25
      },
      skills: ['Roadmapping', 'Sprint Planning', 'Stakeholder Management'],
      dungeon: 'Feature Factory',
      description: 'Own your first product. Ship features and manage the backlog.'
    },
    {
      level: 3,
      title: 'Senior Product Manager',
      shortTitle: 'PM II',
      xpRequired: 600,
      stats: {
        maxEnergy: 150,
        maxCredibility: 100,
        budget: 100000,
        baseVelocity: 30
      },
      skills: ['Analytics', 'A/B Testing', 'OKRs', 'Data-Driven Decisions'],
      dungeon: 'Stakeholder Maze',
      description: 'Drive product strategy. Use data to make informed decisions.'
    },
    {
      level: 4,
      title: 'Lead Product Manager',
      shortTitle: 'Lead PM',
      xpRequired: 1000,
      stats: {
        maxEnergy: 180,
        maxCredibility: 100,
        budget: 250000,
        baseVelocity: 35
      },
      skills: ['Cross-Functional Leadership', 'Vision Setting', 'Technical Strategy'],
      dungeon: 'Scale Mountain',
      description: 'Lead multiple products. Set technical and product direction.'
    },
    {
      level: 5,
      title: 'Director of Product',
      shortTitle: 'Director',
      xpRequired: 1500,
      stats: {
        maxEnergy: 200,
        maxCredibility: 100,
        budget: 500000,
        baseVelocity: 40
      },
      skills: ['Team Building', 'Portfolio Management', 'Hiring', 'Process Design'],
      dungeon: 'Strategy Plains',
      description: 'Build and lead PM teams. Manage product portfolio.'
    },
    {
      level: 6,
      title: 'VP of Product',
      shortTitle: 'VP',
      xpRequired: 2500,
      stats: {
        maxEnergy: 250,
        maxCredibility: 100,
        budget: 1000000,
        baseVelocity: 45
      },
      skills: ['Company Strategy', 'Board Presentations', 'Org Design'],
      dungeon: 'Executive Peak',
      description: 'Shape company strategy. Present to board. Scale the organization.'
    },
    {
      level: 7,
      title: 'Chief Product Officer',
      shortTitle: 'CPO',
      xpRequired: 999999,
      stats: {
        maxEnergy: 300,
        maxCredibility: 100,
        budget: 9999999,
        baseVelocity: 50
      },
      skills: ['Executive Leadership', 'IPO/M&A', 'Company Vision'],
      dungeon: 'The C-Suite',
      description: 'You\'ve reached the top! Lead product for the entire company.'
    }
  ],

  getLevelData(level) {
    return this.levels[level - 1] || this.levels[0];
  },

  getNextLevel(currentLevel) {
    if (currentLevel >= 7) return null;
    return this.levels[currentLevel];
  },

  calculateXPForLevel(level) {
    const levelData = this.getLevelData(level);
    return levelData.xpRequired;
  },

  getProgressToNextLevel(currentXP, currentLevel) {
    if (currentLevel >= 7) return 100;
    
    const currentLevelData = this.getLevelData(currentLevel);
    const nextLevelData = this.getNextLevel(currentLevel);
    
    if (!nextLevelData) return 100;
    
    const currentLevelXP = currentLevel > 1 ? this.getLevelData(currentLevel - 1).xpRequired : 0;
    const xpIntoLevel = currentXP - currentLevelXP;
    const xpNeeded = nextLevelData.xpRequired - currentLevelXP;
    
    return Math.floor((xpIntoLevel / xpNeeded) * 100);
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PMCareer;
}


// Boss Encounters - Major career milestones and promotion challenges
// Highest difficulty, required for career progression

const BossEncounters = [
  {
    id: 'first_demo',
    title: 'First Sprint Demo',
    dungeon: 1,
    description: 'Present your first shipped feature to the team and stakeholders.',
    choices: [
      { text: 'Professional presentation', energy: -20, credibility: +20, xp: 50, success: 0.85, optimal: true },
      { text: 'Live product demo', energy: -25, credibility: +25, xp: 60, success: 0.7 },
      { text: 'Quick walkthrough', energy: -10, credibility: +10, xp: 30, success: 0.95 },
      { text: 'Delegate to engineer', credibility: -10, xp: 20, success: 0.8 }
    ],
    reward: { item: 'jira_sword', xp: 100, credibility: +20 }
  },
  {
    id: 'release_crisis',
    title: 'Release Day Crisis',
    dungeon: 2,
    description: 'Critical bug found in production 1 hour after launch. Press is watching.',
    choices: [
      { text: 'Immediate rollback', energy: -30, credibility: +15, morale: -10, xp: 40, success: 0.95, optimal: true },
      { text: 'Hot fix deployment', energy: -40, budget: -15000, credibility: +25, xp: 50, success: 0.75 },
      { text: 'Feature flag disable', energy: -20, credibility: +20, xp: 45, success: 0.9 },
      { text: 'Monitor and patch', energy: -25, credibility: -15, xp: 30, success: 0.6 }
    ],
    reward: { item: 'analytics_blade', xp: 150, budget: +25000 }
  },
  {
    id: 'the_pivot',
    title: 'The Pivot',
    dungeon: 3,
    description: 'CEO announces major direction change. Your roadmap is now irrelevant.',
    choices: [
      { text: 'Embrace the pivot', energy: -35, morale: -20, credibility: +30, xp: 60, success: 0.8, optimal: true },
      { text: 'Negotiate hybrid approach', energy: -40, credibility: +20, xp: 55, success: 0.7 },
      { text: 'Defend current strategy', energy: -30, credibility: -10, xp: 40, success: 0.6 },
      { text: 'Request transition time', energy: -25, morale: +10, xp: 50, success: 0.85 }
    ],
    reward: { item: 'okr_hammer', xp: 200, credibility: +30 }
  },
  {
    id: 'hypergrowth',
    title: 'Hypergrowth Hurricane',
    dungeon: 4,
    description: 'Team doubles overnight. Chaos ensues. Process breaks down.',
    choices: [
      { text: 'Build process immediately', energy: -50, velocity: -20, morale: +20, xp: 70, success: 0.75, optimal: true },
      { text: 'Hire process lead', budget: -100000, velocity: +10, xp: 60, success: 0.85 },
      { text: 'Let team self-organize', energy: -20, morale: +10, velocity: -30, xp: 40, success: 0.5 },
      { text: 'Slow hiring temporarily', credibility: -20, morale: -10, xp: 35, success: 0.9 }
    ],
    reward: { item: 'vision_bow', xp: 300, budget: +100000 }
  },
  {
    id: 'board_meeting',
    title: 'The Board Meeting',
    dungeon: 5,
    description: 'Present product strategy to board. They\'re skeptical about your vision.',
    choices: [
      { text: 'Data-driven presentation', energy: -45, credibility: +40, xp: 80, success: 0.85, optimal: true },
      { text: 'Vision storytelling', energy: -50, credibility: +50, xp: 90, success: 0.7 },
      { text: 'Competitive analysis focus', energy: -40, credibility: +30, xp: 70, success: 0.8 },
      { text: 'Financial projections', energy: -35, credibility: +25, xp: 65, success: 0.75 }
    ],
    reward: { item: 'first_principles', xp: 400, budget: +250000 }
  },
  {
    id: 'quarterly_miss',
    title: 'Quarterly Miss Meltdown',
    dungeon: 6,
    description: 'Revenue miss. Investors panic. CEO under pressure. Your products blamed.',
    choices: [
      { text: 'Take accountability', energy: -60, credibility: +45, morale: +20, xp: 100, success: 0.8, optimal: true },
      { text: 'Present recovery plan', energy: -55, credibility: +40, xp: 95, success: 0.85 },
      { text: 'Shift focus to next quarter', energy: -45, credibility: +25, xp: 75, success: 0.7 },
      { text: 'Blame market conditions', credibility: -30, xp: 40, success: 0.5 }
    ],
    reward: { item: 'north_star', xp: 500, credibility: +50 }
  },
  {
    id: 'ipo_acquisition',
    title: 'IPO/Acquisition Decision',
    dungeon: 7,
    description: 'Company at crossroads. Go public or sell? Board wants your recommendation.',
    choices: [
      { text: 'Recommend IPO', energy: -70, credibility: +60, xp: 150, success: 0.75 },
      { text: 'Recommend acquisition', energy: -70, credibility: +55, xp: 145, success: 0.8 },
      { text: 'Present both options', energy: -80, credibility: +70, xp: 160, success: 0.85, optimal: true },
      { text: 'Recommend staying private', energy: -60, credibility: +40, xp: 120, success: 0.65 }
    ],
    reward: { xp: 1000, credibility: +100, victory: true }
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BossEncounters;
}


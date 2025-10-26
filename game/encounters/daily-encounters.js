// Daily Encounters - Routine PM tasks and standup challenges
// Low difficulty, frequent, teaches basic PM skills

const DailyEncounters = [
  {
    id: 'blocked_engineer',
    title: 'Daily Standup',
    description: 'Engineer: "I\'m blocked on the API specs."',
    choices: [
      { text: 'Unblock immediately', energy: -5, morale: +5, xp: 5, success: 0.9 },
      { text: '"Sync after standup"', velocity: +5, xp: 8, success: 0.95, optimal: true },
      { text: '"Figure it out"', morale: -10, xp: 2, success: 0.6 },
      { text: 'Skip standup today', energy: +5, credibility: -3, success: 1.0 }
    ]
  },
  {
    id: 'unclear_story',
    title: 'Daily Standup',
    description: 'Designer: "This user story is unclear. What exactly do we want?"',
    choices: [
      { text: 'Clarify immediately', energy: -10, morale: +10, velocity: +5, xp: 10, success: 0.95, optimal: true },
      { text: '"Let\'s workshop it later"', energy: -5, velocity: -2, xp: 5, success: 0.7 },
      { text: '"Use your best judgment"', morale: -5, xp: 3, success: 0.5 },
      { text: 'Defer to PM II', credibility: -5, xp: 2, success: 0.8 }
    ]
  },
  {
    id: 'demo_prep',
    title: 'Sprint Demo Prep',
    description: 'Team: "Demo is in 1 hour. Feature X isn\'t quite ready."',
    choices: [
      { text: 'Demo what we have', credibility: -5, morale: +5, xp: 8, success: 0.7 },
      { text: 'Cut the unfinished part', credibility: +5, xp: 10, success: 0.9, optimal: true },
      { text: 'Delay the demo', energy: -10, credibility: -10, xp: 5, success: 0.8 },
      { text: 'All-hands polish sprint', energy: -20, morale: -15, credibility: +10, xp: 12, success: 0.6 }
    ]
  },
  {
    id: 'backlog_grooming',
    title: 'Backlog Refinement',
    description: 'Team: "We have 200+ tickets. Which ones matter?"',
    choices: [
      { text: 'RICE prioritization', energy: -15, velocity: +10, xp: 15, success: 0.9, optimal: true },
      { text: 'Quick gut check', energy: -5, xp: 5, success: 0.6 },
      { text: 'Engineering votes', morale: +5, velocity: -5, xp: 8, success: 0.7 },
      { text: 'Stakeholder priorities', credibility: +5, velocity: -10, xp: 10, success: 0.8 }
    ]
  },
  {
    id: 'tech_debt_request',
    title: 'Tech Debt Discussion',
    description: 'Senior Engineer: "We need to refactor. Velocity is slowing."',
    choices: [
      { text: 'Dedicate 20% capacity', velocity: -10, morale: +15, xp: 12, success: 0.85, optimal: true },
      { text: '"After this sprint"', morale: -5, xp: 5, success: 0.9 },
      { text: 'Schedule deep dive', energy: -10, credibility: +5, xp: 10, success: 0.8 },
      { text: 'Keep shipping features', velocity: +5, morale: -15, xp: 8, success: 0.6 }
    ]
  },
  {
    id: 'design_qa',
    title: 'Design Review',
    description: 'Designer: "Which of these 3 design options should we pursue?"',
    choices: [
      { text: 'A/B test all three', budget: -5000, energy: -15, xp: 18, success: 0.75 },
      { text: 'User research first', energy: -10, xp: 15, success: 0.9, optimal: true },
      { text: 'Pick one based on data', energy: -8, xp: 12, success: 0.8 },
      { text: '"Your call, you\'re the designer"', morale: +5, xp: 8, success: 0.7 }
    ]
  },
  {
    id: 'qa_blocker',
    title: 'QA Finding',
    description: 'QA: "Found bugs. Ship anyway or delay?"',
    choices: [
      { text: 'Ship with known bugs', credibility: -10, velocity: +10, xp: 5, success: 0.6 },
      { text: 'Delay until fixed', energy: -10, credibility: +10, xp: 12, success: 0.9, optimal: true },
      { text: 'Fix critical only', energy: -5, xp: 10, success: 0.85 },
      { text: 'Feature flag rollout', budget: -3000, credibility: +5, xp: 15, success: 0.8 }
    ]
  },
  {
    id: 'retrospective',
    title: 'Sprint Retrospective',
    description: 'Team: "What should we change about our process?"',
    choices: [
      { text: 'Structured retro framework', energy: -12, morale: +15, velocity: +5, xp: 14, success: 0.85, optimal: true },
      { text: '"What went well/badly?"', energy: -8, morale: +8, xp: 10, success: 0.9 },
      { text: 'Skip retro this time', energy: +5, morale: -10, xp: 2, success: 1.0 },
      { text: 'Anonymous feedback', energy: -10, morale: +10, xp: 12, success: 0.8 }
    ]
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DailyEncounters;
}


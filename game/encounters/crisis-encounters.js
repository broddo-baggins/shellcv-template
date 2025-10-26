// Crisis Encounters - High-pressure situations requiring quick decisions
// High difficulty, rare, high stakes and rewards

const CrisisEncounters = [
  {
    id: 'production_down',
    title: 'PRODUCTION DOWN',
    description: 'Login service crashed. 500+ users affected. SLA at risk.',
    pressure: 80,
    timeLimit: '45 minutes',
    choices: [
      { text: 'All hands on deck!', energy: -50, budget: -10000, credibility: +25, xp: 30, success: 1.0, optimal: true },
      { text: 'Call senior engineer', budget: -5000, energy: -20, credibility: +15, xp: 20, success: 0.8 },
      { text: 'Implement workaround', energy: -25, credibility: +10, xp: 18, success: 0.6 },
      { text: 'Comms strategy first', energy: -15, credibility: -5, xp: 12, success: 0.7 }
    ]
  },
  {
    id: 'security_breach',
    title: 'SECURITY INCIDENT',
    description: 'Potential data breach detected. Customer data may be exposed.',
    pressure: 95,
    choices: [
      { text: 'Activate incident response', energy: -40, budget: -25000, credibility: +30, xp: 40, success: 0.95, optimal: true },
      { text: 'Investigate first', energy: -20, credibility: +10, xp: 20, success: 0.7 },
      { text: 'Notify customers immediately', energy: -30, credibility: +15, morale: -10, xp: 25, success: 0.85 },
      { text: 'Consult legal team', energy: -25, credibility: +5, xp: 15, success: 0.8 }
    ]
  },
  {
    id: 'team_quit',
    title: 'Mass Resignation',
    description: '3 senior engineers just gave notice. Team morale is crashing.',
    choices: [
      { text: 'Emergency retention plan', energy: -35, budget: -50000, morale: +30, xp: 35, success: 0.7, optimal: true },
      { text: 'Hire replacements ASAP', budget: -75000, velocity: -20, xp: 25, success: 0.6 },
      { text: 'Restructure team', energy: -25, morale: -10, velocity: -15, xp: 20, success: 0.8 },
      { text: 'Accept and adapt', morale: -15, credibility: -10, xp: 10, success: 0.9 }
    ]
  },
  {
    id: 'competitor_launch',
    title: 'Competitor Launches Your Feature',
    description: 'Major competitor just shipped the exact feature you\'ve been building.',
    pressure: 70,
    choices: [
      { text: 'Accelerate launch', energy: -40, morale: -20, velocity: +15, xp: 30, success: 0.7 },
      { text: 'Pivot and differentiate', energy: -35, velocity: -10, xp: 35, success: 0.8, optimal: true },
      { text: 'Stay the course', credibility: -5, xp: 20, success: 0.9 },
      { text: 'Cancel and reprioritize', credibility: -15, budget: +25000, xp: 15, success: 0.85 }
    ]
  },
  {
    id: 'funding_crisis',
    title: 'Runway Crisis',
    description: 'CFO: "We have 4 months of runway. Cut burn or raise emergency round."',
    pressure: 85,
    choices: [
      { text: 'Freeze hiring', morale: -20, budget: +100000, credibility: +10, xp: 25, success: 0.9 },
      { text: 'Cut 20% of team', morale: -40, budget: +250000, credibility: -15, xp: 20, success: 0.95 },
      { text: 'Accelerate revenue features', energy: -45, velocity: -15, credibility: +20, xp: 35, success: 0.75, optimal: true },
      { text: 'Support fundraising', energy: -50, credibility: +25, xp: 40, success: 0.7 }
    ]
  },
  {
    id: 'pr_nightmare',
    title: 'Public Relations Crisis',
    description: 'Viral tweet: "This product is a privacy nightmare." 10k+ retweets.',
    pressure: 90,
    choices: [
      { text: 'Immediate public response', energy: -30, credibility: +10, xp: 25, success: 0.75 },
      { text: 'Fix issue first, then respond', energy: -40, budget: -15000, credibility: +20, xp: 35, success: 0.85, optimal: true },
      { text: 'Legal review first', energy: -25, credibility: -10, xp: 15, success: 0.8 },
      { text: 'Engage with critics directly', energy: -35, credibility: +15, xp: 30, success: 0.7 }
    ]
  },
  {
    id: 'regulatory_compliance',
    title: 'Compliance Violation Alert',
    description: 'Legal: "We\'re non-compliant with new regulations. Potential fines."',
    pressure: 88,
    choices: [
      { text: 'Halt all launches immediately', energy: -30, velocity: -30, credibility: +20, xp: 30, success: 0.95, optimal: true },
      { text: 'Compliance sprint', energy: -45, budget: -30000, morale: -20, xp: 35, success: 0.85 },
      { text: 'Hire compliance consultant', budget: -50000, energy: -20, xp: 28, success: 0.9 },
      { text: 'Risk assessment first', energy: -15, credibility: -5, xp: 18, success: 0.7 }
    ]
  },
  {
    id: 'acquisition_rumor',
    title: 'Acquisition Rumors',
    description: 'Team: "TechCrunch says we\'re being acquired. Is it true?"',
    pressure: 65,
    choices: [
      { text: 'Transparent communication', energy: -25, morale: +15, credibility: +20, xp: 30, success: 0.85, optimal: true },
      { text: '"No comment"', morale: -15, credibility: -5, xp: 10, success: 0.9 },
      { text: 'Deflect and focus on work', energy: -10, morale: -10, xp: 15, success: 0.7 },
      { text: 'Address in all-hands', energy: -30, morale: +10, credibility: +15, xp: 25, success: 0.8 }
    ]
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CrisisEncounters;
}


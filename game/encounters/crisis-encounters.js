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
    ],
    successMessages: [
      'Incident resolved. Postmortem titled "We learned a lot."',
      'Users logging in again. CFO stops pacing.'
    ],
    failureMessages: [
      'Status page now has a dark mode just for you.',
      'Support macro created: "We are still investigating."'
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
  },
  {
    id: 'tres_commas_investor',
    title: 'The Tres Commas Problem',
    description: 'Investor Russ: "I put doors on my cars that go LIKE THIS. Your app needs to make me feel THAT way." He demonstrates vertical doors.',
    pressure: 55,
    choices: [
      { text: 'Nod enthusiastically, pivot later', energy: -10, credibility: +15, xp: 25, success: 0.9, optimal: true },
      { text: '"Let me show you our metrics"', energy: -20, credibility: +5, xp: 20, success: 0.7 },
      { text: 'Agree to add car door animations', morale: -15, velocity: -10, budget: -20000, xp: 15, success: 0.95 },
      { text: 'Challenge his vision', credibility: -20, xp: 10, success: 0.4 }
    ]
  },
  {
    id: 'blockchain_pivot',
    title: 'Mandatory Blockchain Pivot',
    description: 'CEO: "Everything is blockchain now. Our to-do app needs NFTs by Friday or we\'re not Web3 enough."',
    pressure: 70,
    choices: [
      { text: 'Build MVP with buzzwords', energy: -40, velocity: -20, credibility: +10, xp: 30, success: 0.75 },
      { text: 'Explain why this is insane', energy: -25, credibility: +20, xp: 35, success: 0.6, optimal: true },
      { text: 'Hire crypto consultant', budget: -75000, energy: -15, xp: 20, success: 0.85 },
      { text: 'Just add "blockchain" to docs', energy: -5, credibility: -10, xp: 15, success: 0.95 }
    ]
  },
  {
    id: 'vp_nephew',
    title: 'The VP\'s Nephew',
    description: 'VP: "My nephew has some great ideas. He\'s 19 and joining as Senior Product Advisor. Listen to everything he says."',
    pressure: 60,
    choices: [
      { text: 'Assign him busy work', energy: -20, morale: -10, xp: 25, success: 0.8, optimal: true },
      { text: 'Actually listen to his ideas', energy: -30, velocity: -15, morale: -20, xp: 20, success: 0.5 },
      { text: 'Make him shadow you', energy: -35, morale: -5, xp: 30, success: 0.7 },
      { text: 'Escalate to HR diplomatically', credibility: -15, xp: 15, success: 0.6 }
    ]
  },
  {
    id: 'middle_out_compression',
    title: 'Technical Impossibility',
    description: 'CEO promises "revolutionary compression" to press. Engineer: "That violates the laws of physics." Press conference is in 2 hours.',
    pressure: 95,
    choices: [
      { text: 'Spin it as "aspirational vision"', energy: -30, credibility: +15, xp: 35, success: 0.8, optimal: true },
      { text: 'Cancel the press conference', credibility: -20, morale: +10, xp: 20, success: 0.7 },
      { text: 'Demo something else instead', energy: -40, velocity: -10, xp: 30, success: 0.75 },
      { text: 'Let CEO present, pray', energy: -10, credibility: -25, xp: 15, success: 0.5 }
    ]
  },
  {
    id: 'name_catastrophe',
    title: 'The Name Catastrophe',
    description: 'Marketing: "Our product name means something VERY inappropriate in Korean. We launch in Seoul tomorrow."',
    pressure: 85,
    choices: [
      { text: 'Emergency rebrand overnight', energy: -50, budget: -30000, morale: -20, xp: 40, success: 0.7, optimal: true },
      { text: 'Delay Korea launch', credibility: -15, budget: -20000, xp: 25, success: 0.9 },
      { text: '"All publicity is good publicity"', credibility: -30, morale: -15, xp: 10, success: 0.4 },
      { text: 'Lean into it with humor', energy: -20, credibility: +10, xp: 35, success: 0.6 }
    ]
  },
  {
    id: 'tech_debt_explosion',
    title: 'The Tech Debt Reckoning',
    description: 'CTO: "Remember all those shortcuts? The code is now 80% duct tape and prayers. Everything is on fire."',
    pressure: 90,
    choices: [
      { text: 'Declare tech debt bankruptcy', velocity: -40, budget: -100000, credibility: +20, xp: 50, success: 0.8, optimal: true },
      { text: 'Incremental fixes', energy: -30, velocity: -20, xp: 30, success: 0.7 },
      { text: 'Rewrite from scratch', budget: -200000, velocity: -50, morale: -20, xp: 40, success: 0.6 },
      { text: 'More duct tape', energy: -15, velocity: -30, xp: 20, success: 0.5 }
    ]
  },
  {
    id: 'feature_from_dream',
    title: 'CEO Had a Dream',
    description: 'CEO at 3am: "I had a vision. Users can control the app with their MIND. This is our north star now."',
    pressure: 50,
    choices: [
      { text: 'Research brain interfaces seriously', budget: -50000, energy: -40, xp: 25, success: 0.4 },
      { text: 'Propose voice control instead', energy: -25, credibility: +15, xp: 30, success: 0.85, optimal: true },
      { text: 'Wait for them to forget', energy: -10, credibility: -5, xp: 20, success: 0.7 },
      { text: 'Build "smart gesture" prototype', energy: -30, budget: -20000, xp: 28, success: 0.75 }
    ]
  },
  {
    id: 'designer_artiste',
    title: 'The Designer\'s Vision',
    description: 'Designer: "Buttons are so 2020. Users will navigate via interpretive color gradients." Engineer: "...what?"',
    pressure: 45,
    choices: [
      { text: 'Suggest A/B test', energy: -15, credibility: +10, xp: 25, success: 0.85, optimal: true },
      { text: 'Let them build it', morale: +10, velocity: -15, xp: 20, success: 0.6 },
      { text: 'Pull rank, mandate buttons', morale: -20, credibility: -10, xp: 15, success: 0.9 },
      { text: 'Compromise: gradient buttons', energy: -10, xp: 22, success: 0.8 }
    ]
  },
  {
    id: 'pivot_whiplash',
    title: 'The Pivot Carousel',
    description: 'This is the 4th pivot this quarter. Team: "Are we a social network or a sandwich app? I genuinely don\'t know anymore."',
    pressure: 75,
    choices: [
      { text: 'Demand strategy alignment', energy: -35, credibility: +25, morale: +15, xp: 40, success: 0.75, optimal: true },
      { text: 'Build modular architecture', energy: -40, velocity: -20, xp: 35, success: 0.8 },
      { text: 'Just ship what works now', velocity: +10, credibility: -10, xp: 25, success: 0.7 },
      { text: 'Update LinkedIn profile', morale: -30, xp: 10, success: 1.0 }
    ]
  },
  {
    id: 'conference_demo_disaster',
    title: 'Live Demo Disaster',
    description: 'Product demo at major conference. WiFi dies. Backup laptop has wrong build. Audience of 5000 waiting.',
    pressure: 98,
    choices: [
      { text: 'Switch to slides storytelling', energy: -30, credibility: +15, xp: 35, success: 0.85, optimal: true },
      { text: 'Stall with Q&A', energy: -20, credibility: +5, xp: 25, success: 0.7 },
      { text: 'Hotspot from phone', energy: -40, budget: -5000, xp: 30, success: 0.6 },
      { text: 'Cancel and reschedule', credibility: -25, xp: 15, success: 0.9 }
    ]
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CrisisEncounters;
}


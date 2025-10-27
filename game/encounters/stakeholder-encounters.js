// Stakeholder Encounters - Managing executives, sales, marketing, and customers
// Medium difficulty, teaches influence and negotiation

const StakeholderEncounters = [
  {
    id: 'sales_urgent',
    title: 'Incoming Email',
    minDungeon: 2,
    description: 'Sales VP: "Customer X needs feature Y by Friday. This is a deal-breaker." (They CC\'d your boss\'s boss.)',
    choices: [
      { text: 'Commit to Friday', energy: -15, velocity: -20, credibility: +15, xp: 20, success: 0.5 },
      { text: 'Negotiate timeline', energy: -10, credibility: +5, xp: 15, success: 0.7, optimal: true },
      { text: 'Decline politely', credibility: -5, xp: 10, success: 1.0 },
      { text: 'Build quick prototype', budget: -5000, energy: -10, credibility: +10, xp: 18, success: 0.8 }
    ],
    successMessages: [
      'Sales replies: "Totally reasonable." You screenshot it for future use.',
      'Timeline agreed. Deal still alive. Your heart rate drops 10 bpm.'
    ],
    failureMessages: [
      'New thread: "Escalation: Urgent Urgent URGENT".',
      'Customer forwards a calendar invite titled "Emergency."'
    ]
  },
  {
    id: 'exec_feature_request',
    title: 'Executive Corridor Conversation',
    minDungeon: 2,
    description: 'CTO: "I saw competitor X has feature Z. Why don\'t we?" (They cite a tweet thread.)',
    choices: [
      { text: '"Adding to roadmap now!"', credibility: -5, velocity: -10, xp: 5, success: 0.6 },
      { text: 'Explain our strategy', energy: -10, credibility: +10, xp: 15, success: 0.8, optimal: true },
      { text: '"Let me research it"', energy: -5, xp: 10, success: 0.9 },
      { text: 'Schedule strategy review', energy: -15, credibility: +15, xp: 20, success: 0.85 }
    ],
    successMessages: [
      'CTO nods. Strategy doc bookmarked instead of deleted.',
      'Your roadmap link now lives in their pinned tabs.'
    ],
    failureMessages: [
      'CTO replies-all to the tweet thread with your roadmap.',
      'Competitor shipped a press release while you debated naming.'
    ]
  },
  {
    id: 'customer_escalation',
    title: 'Customer Escalation',
    minDungeon: 2,
    description: 'Support: "VIP customer is furious about bug in production. CEO is CC\'d."',
    choices: [
      { text: 'Drop everything, fix now', energy: -30, budget: -10000, credibility: +20, xp: 25, success: 0.9, optimal: true },
      { text: 'Assign to engineer', energy: -10, morale: -5, credibility: +10, xp: 15, success: 0.7 },
      { text: 'Provide workaround', energy: -15, credibility: +5, xp: 12, success: 0.8 },
      { text: 'Escalate to engineering manager', credibility: -10, xp: 5, success: 0.6 }
    ]
  },
  {
    id: 'conflicting_stakeholders',
    title: 'Stakeholder Conflict',
    minDungeon: 3,
    description: 'Sales wants feature A. Marketing wants feature B. Both say "critical". Your calendar invites overlap perfectly.',
    choices: [
      { text: 'Build both (parallel tracks)', energy: -25, velocity: -15, budget: -15000, credibility: +10, xp: 20, success: 0.6 },
      { text: 'Use RICE to prioritize', energy: -15, credibility: +15, xp: 25, success: 0.85, optimal: true },
      { text: 'Ship A then B', credibility: -5, xp: 15, success: 0.7 },
      { text: 'Escalate to CEO', energy: -10, credibility: -5, xp: 10, success: 0.8 }
    ]
  },
  {
    id: 'roadmap_pressure',
    title: 'Roadmap Review Meeting',
    minDungeon: 3,
    description: 'VP of Sales: "Your roadmap doesn\'t align with our pipeline."',
    choices: [
      { text: 'Defend your roadmap', energy: -15, credibility: +10, xp: 18, success: 0.7 },
      { text: 'Compromise and adjust', energy: -20, credibility: +5, velocity: -10, xp: 15, success: 0.8 },
      { text: 'Data-driven discussion', energy: -25, credibility: +20, xp: 25, success: 0.85, optimal: true },
      { text: 'Schedule follow-up', energy: -10, xp: 10, success: 0.9 }
    ],
    successMessages: [
      'Numbers beat vibes. Everyone pretends this was the plan all along.',
      'Roadmap and pipeline shake hands.'
    ],
    failureMessages: [
      'Someone suggests a 2-hour weekly sync.',
      'Whiteboard marker runs out exactly when you make your point.'
    ]
  },
  {
    id: 'budget_request',
    title: 'Budget Meeting',
    minDungeon: 3,
    description: 'CFO: "Why do you need $50k more this quarter?"',
    choices: [
      { text: 'Detailed ROI projection', energy: -20, credibility: +15, budget: +50000, xp: 22, success: 0.8, optimal: true },
      { text: '"Trust me, we need it"', credibility: -10, xp: 5, success: 0.3 },
      { text: 'Reduce scope instead', credibility: +5, velocity: -10, xp: 12, success: 0.9 },
      { text: 'Share budget with marketing', credibility: +10, budget: +25000, xp: 18, success: 0.75 }
    ]
  },
  {
    id: 'marketing_launch',
    title: 'Marketing Partnership',
    minDungeon: 3,
    description: 'CMO: "We want to launch this big. Need product ready in 2 weeks."',
    choices: [
      { text: 'Commit to 2 weeks', energy: -30, morale: -15, credibility: +20, xp: 25, success: 0.6 },
      { text: 'Negotiate 4 weeks', energy: -15, credibility: +10, xp: 20, success: 0.85, optimal: true },
      { text: 'Soft launch first', energy: -10, credibility: +5, xp: 15, success: 0.9 },
      { text: 'Feature flag rollout', budget: -5000, credibility: +15, xp: 22, success: 0.8 }
    ]
  },
  {
    id: 'board_update',
    title: 'Board Update Request',
    minDungeon: 4,
    description: 'CEO: "Board wants product update. Can you present metrics?"',
    choices: [
      { text: 'Full presentation prep', energy: -35, credibility: +25, xp: 30, success: 0.85, optimal: true },
      { text: 'Quick slides', energy: -15, credibility: +10, xp: 18, success: 0.7 },
      { text: 'CEO presents, you attend', energy: -10, credibility: +5, xp: 12, success: 0.9 },
      { text: '"Need more time"', credibility: -5, xp: 8, success: 0.8 }
    ]
  },
  {
    id: 'sales_commission_feature',
    title: 'The Million Dollar Promise',
    minDungeon: 4,
    description: 'Sales: "I already told the client we have this feature. Demo is Monday. Also, I get commission if we close, so..."',
    choices: [
      { text: 'Pull an all-nighter miracle', energy: -60, morale: -30, credibility: +20, xp: 35, success: 0.5 },
      { text: 'Build a convincing fake demo', energy: -30, credibility: +10, xp: 28, success: 0.75, optimal: true },
      { text: 'Explain this is fraud', credibility: -10, morale: +10, xp: 20, success: 0.8 },
      { text: 'Let them crash and burn', credibility: +5, xp: 15, success: 0.9 }
    ]
  },
  {
    id: 'founder_mode',
    title: 'Founder Mode Activated',
    minDungeon: 4,
    description: 'CEO read Paul Graham essay, enters "Founder Mode." Now wants to review every pixel and line of code personally.',
    choices: [
      { text: 'Accommodate the micromanagement', energy: -50, morale: -25, velocity: -30, xp: 20, success: 0.7 },
      { text: 'Suggest weekly review cadence', energy: -25, credibility: +15, xp: 30, success: 0.8, optimal: true },
      { text: 'Show them your process', energy: -35, credibility: +10, xp: 25, success: 0.75 },
      { text: 'Wait for next trend', energy: -10, credibility: -5, xp: 18, success: 0.85 }
    ]
  },
  {
    id: 'influencer_advisor',
    title: 'The Instagram Influencer Advisor',
    minDungeon: 4,
    description: 'Board hired an "influencer growth advisor" with 2M followers. They want to "totally disrupt the UX" and add face filters to your B2B SaaS.',
    choices: [
      { text: 'Politely explain B2B market', energy: -20, credibility: +15, xp: 25, success: 0.7, optimal: true },
      { text: 'Build prototype to prove it fails', energy: -35, budget: -15000, xp: 28, success: 0.8 },
      { text: 'Actually try the filters', budget: -25000, morale: -20, xp: 20, success: 0.4 },
      { text: 'Nod and ignore', credibility: -10, xp: 15, success: 0.6 }
    ]
  },
  {
    id: 'competitor_intel',
    title: 'The Competitor Spy',
    minDungeon: 3,
    description: 'Sales brings "ex-competitor employee" who claims to have insider info. Starts describing their unreleased features. This feels illegal.',
    choices: [
      { text: 'Shut it down immediately', credibility: +20, morale: +10, xp: 30, success: 0.9, optimal: true },
      { text: 'Listen but don\'t act on it', energy: -10, credibility: +5, xp: 22, success: 0.75 },
      { text: 'Escalate to legal', energy: -15, credibility: +15, xp: 25, success: 0.85 },
      { text: 'Take notes frantically', credibility: -30, xp: 10, success: 0.5 }
    ]
  },
  {
    id: 'design_by_committee',
    title: 'Design By Committee',
    minDungeon: 3,
    description: '12 people on the call. Everyone has opinions. CEO\'s spouse just joined: "The logo should be bigger and use Comic Sans for fun."',
    choices: [
      { text: 'Diplomatically decline', energy: -20, credibility: +10, xp: 25, success: 0.75, optimal: true },
      { text: 'Make it bigger (not Comic Sans)', energy: -15, morale: -10, xp: 18, success: 0.85 },
      { text: 'Actually use Comic Sans', morale: -40, credibility: -25, xp: 10, success: 0.95 },
      { text: 'Propose user testing', energy: -25, credibility: +15, xp: 28, success: 0.8 }
    ]
  },
  {
    id: 'metrics_vanity',
    title: 'Vanity Metrics Obsession',
    minDungeon: 3,
    description: 'CEO: "We need to hit 1 million users this quarter." Current users: 147. Conversion rate: 0.3%.',
    choices: [
      { text: 'Explain sustainable growth', energy: -25, credibility: +15, xp: 30, success: 0.7, optimal: true },
      { text: 'Focus on engagement instead', energy: -20, credibility: +10, xp: 25, success: 0.8 },
      { text: 'Buy fake users', budget: -50000, credibility: -30, xp: 15, success: 0.95 },
      { text: 'Redefine what "user" means', energy: -15, credibility: -5, xp: 20, success: 0.85 }
    ]
  },
  {
    id: 'customer_wants_everything',
    title: 'The Everything Customer',
    minDungeon: 4,
    description: 'Enterprise client: "We need Slack integration, SSO, API access, custom theming, and AI chatbot. Budget: $500/month."',
    choices: [
      { text: 'Negotiate enterprise pricing', energy: -30, credibility: +20, budget: +100000, xp: 35, success: 0.75, optimal: true },
      { text: 'Build for future customers', energy: -40, budget: -50000, xp: 30, success: 0.7 },
      { text: 'Decline politely', credibility: +5, xp: 20, success: 0.9 },
      { text: 'Give them open source version', energy: -15, credibility: +10, xp: 22, success: 0.8 }
    ]
  },
  {
    id: 'thought_leader_ceo',
    title: 'CEO the Thought Leader',
    minDungeon: 4,
    description: 'CEO spent 40 hours writing LinkedIn post, 0 hours on strategy. Post went viral. Now wants to pivot company to match the post.',
    choices: [
      { text: 'Align strategy with vision', energy: -35, velocity: -20, credibility: +15, xp: 30, success: 0.7 },
      { text: 'Suggest iterative approach', energy: -25, credibility: +20, xp: 32, success: 0.8, optimal: true },
      { text: 'Support the pivot fully', energy: -40, morale: -15, xp: 25, success: 0.6 },
      { text: 'Wait for next viral post', energy: -10, credibility: -10, xp: 18, success: 0.75 }
    ]
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StakeholderEncounters;
}


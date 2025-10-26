// Stakeholder Encounters - Managing executives, sales, marketing, and customers
// Medium difficulty, teaches influence and negotiation

const StakeholderEncounters = [
  {
    id: 'sales_urgent',
    title: 'Incoming Email',
    description: 'Sales VP: "Customer X needs feature Y by Friday. This is a deal-breaker."',
    choices: [
      { text: 'Commit to Friday', energy: -15, velocity: -20, credibility: +15, xp: 20, success: 0.5 },
      { text: 'Negotiate timeline', energy: -10, credibility: +5, xp: 15, success: 0.7, optimal: true },
      { text: 'Decline politely', credibility: -5, xp: 10, success: 1.0 },
      { text: 'Build quick prototype', budget: -5000, energy: -10, credibility: +10, xp: 18, success: 0.8 }
    ]
  },
  {
    id: 'exec_feature_request',
    title: 'Executive Corridor Conversation',
    description: 'CTO: "I saw competitor X has feature Z. Why don\'t we?"',
    choices: [
      { text: '"Adding to roadmap now!"', credibility: -5, velocity: -10, xp: 5, success: 0.6 },
      { text: 'Explain our strategy', energy: -10, credibility: +10, xp: 15, success: 0.8, optimal: true },
      { text: '"Let me research it"', energy: -5, xp: 10, success: 0.9 },
      { text: 'Schedule strategy review', energy: -15, credibility: +15, xp: 20, success: 0.85 }
    ]
  },
  {
    id: 'customer_escalation',
    title: 'Customer Escalation',
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
    description: 'Sales wants feature A. Marketing wants feature B. Both say "critical".',
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
    description: 'VP of Sales: "Your roadmap doesn\'t align with our pipeline."',
    choices: [
      { text: 'Defend your roadmap', energy: -15, credibility: +10, xp: 18, success: 0.7 },
      { text: 'Compromise and adjust', energy: -20, credibility: +5, velocity: -10, xp: 15, success: 0.8 },
      { text: 'Data-driven discussion', energy: -25, credibility: +20, xp: 25, success: 0.85, optimal: true },
      { text: 'Schedule follow-up', energy: -10, xp: 10, success: 0.9 }
    ]
  },
  {
    id: 'budget_request',
    title: 'Budget Meeting',
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
    description: 'CEO: "Board wants product update. Can you present metrics?"',
    choices: [
      { text: 'Full presentation prep', energy: -35, credibility: +25, xp: 30, success: 0.85, optimal: true },
      { text: 'Quick slides', energy: -15, credibility: +10, xp: 18, success: 0.7 },
      { text: 'CEO presents, you attend', energy: -10, credibility: +5, xp: 12, success: 0.9 },
      { text: '"Need more time"', credibility: -5, xp: 8, success: 0.8 }
    ]
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StakeholderEncounters;
}


// Daily Encounters - Routine PM tasks and standup challenges
// Low difficulty, frequent, teaches basic PM skills

const DailyEncounters = [
  {
    id: 'blocked_engineer',
    title: 'Unblocked Standup',
    description: 'Engineer: "I\'m blocked on the API specs."',
    choices: [
      { text: 'Unblock immediately', energy: -5, morale: +5, xp: 5, success: 0.9 },
      { text: '"Sync after standup"', velocity: +5, xp: 8, success: 0.95, optimal: true },
      { text: '"Figure it out"', morale: -10, xp: 2, success: 0.6 },
      { text: 'Skip standup today', energy: +5, credibility: -3, success: 1.0 }
    ],
    successMessages: [
      'Blocker cleared. Engineer promises a celebratory PR description.',
      'Standup stays on time. Your calendar breathes a sigh of relief.'
    ],
    failureMessages: [
      'Blocker returns with friends. New thread titled "Quick question".',
      'Standup derails into architecture debate.'
    ]
  },
  {
    id: 'unclear_story',
    title: 'Designer Sync',
    description: 'Designer: "This user story is unclear. What exactly do we want?"',
    choices: [
      { text: 'Clarify immediately', energy: -10, morale: +10, velocity: +5, credibility: +5, xp: 10, success: 0.95, optimal: true },
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
      { text: 'RICE prioritization', energy: -15, velocity: +10, credibility: +5, xp: 15, success: 0.9, optimal: true },
      { text: 'Quick gut check', energy: -5, xp: 5, success: 0.6 },
      { text: 'Engineering votes', morale: +5, velocity: -5, xp: 8, success: 0.7 },
      { text: 'Stakeholder priorities', credibility: +5, velocity: -10, xp: 10, success: 0.8 }
    ],
    successMessages: [
      'Top 10 tickets rise like cream. Everyone nods like adults.',
      'Duplicate tickets merged. Jira weeps less.'
    ],
    failureMessages: [
      'Backlog hydra grows two tickets for every one you close.',
      'Someone adds a ticket: "Refine the backlog refinement."'
    ]
  },
  {
    id: 'tech_debt_request',
    title: 'Tech Debt Discussion',
    description: 'Senior Engineer: "We need to refactor. Velocity is slowing."',
    choices: [
      { text: 'Dedicate 20% capacity', velocity: -10, morale: +15, credibility: +5, xp: 12, success: 0.85, optimal: true },
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
      { text: 'User research first', energy: -10, credibility: +5, xp: 15, success: 0.9, optimal: true },
      { text: 'Pick one based on data', energy: -8, xp: 12, success: 0.8 },
      { text: '"Your call, you\'re the designer"', morale: +5, xp: 8, success: 0.7 }
    ],
    successMessages: [
      'Users validate the direction. Mockups graduate to pixels.',
      'Design debt avoided. Future-you sends a thank-you Slack.'
    ],
    failureMessages: [
      'Usability test discovers users are humans, not robots.',
      'Turns out "best color" wasn\'t the bottleneck.'
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
      { text: 'Structured retro framework', energy: -12, morale: +15, velocity: +5, credibility: +5, xp: 14, success: 0.85, optimal: true },
      { text: '"What went well/badly?"', energy: -8, morale: +8, xp: 10, success: 0.9 },
      { text: 'Skip retro this time', energy: +5, morale: -10, xp: 2, success: 1.0 },
      { text: 'Anonymous feedback', energy: -10, morale: +10, xp: 12, success: 0.8 }
    ]
  },
  {
    id: 'zoom_disaster',
    title: 'The Zoom Incident',
    minDungeon: 2,
    description: 'You\'re screen-sharing. Browser tab shows "How to deal with difficult coworkers." That coworker is on the call.',
    choices: [
      { text: 'Laugh it off as research', energy: -20, credibility: -5, morale: +5, xp: 15, success: 0.7, optimal: true },
      { text: 'Pretend nothing happened', credibility: -10, morale: -10, xp: 10, success: 0.6 },
      { text: 'Blame it on a friend', credibility: -15, xp: 8, success: 0.5 },
      { text: 'Turn it into teaching moment', energy: -15, credibility: +10, xp: 20, success: 0.8 }
    ]
  },
  {
    id: 'jira_escape',
    title: 'JIRA Ticket Avalanche',
    minDungeon: 2,
    description: 'You have 247 unread JIRA notifications. Your sprint has 89 tickets. Half are marked "URGENT!!!"',
    choices: [
      { text: 'Declare JIRA bankruptcy', energy: -25, morale: +15, velocity: +10, xp: 20, success: 0.75, optimal: true },
      { text: 'Triage everything', energy: -50, morale: -20, xp: 25, success: 0.8 },
      { text: 'Mute all notifications', energy: -5, credibility: -10, xp: 10, success: 0.9 },
      { text: 'Delegate to intern', morale: -10, xp: 12, success: 0.7 }
    ]
  },
  {
    id: 'slack_chaos',
    title: 'Slack Channel Explosion',
    minDungeon: 2,
    description: 'Someone created #random-product-ideas. CEO posted "What if ChatGPT but for dogs?" It has 127 replies.',
    choices: [
      { text: 'Archive the channel', energy: -10, credibility: -5, xp: 15, success: 0.7 },
      { text: 'Engage thoughtfully', energy: -20, credibility: +10, xp: 18, success: 0.8, optimal: true },
      { text: 'Create #serious-product-ideas', energy: -15, morale: -5, xp: 16, success: 0.75 },
      { text: 'Mute and move on', energy: -2, credibility: -3, xp: 10, success: 0.9 }
    ]
  },
  {
    id: 'standup_rambler',
    title: 'The Standup Novel',
    description: 'Engineer gives 15-minute standup update about every semicolon they wrote. Team is dying inside.',
    choices: [
      { text: 'Gently interrupt', energy: -10, morale: +10, credibility: +5, xp: 15, success: 0.8, optimal: true },
      { text: 'Let them finish (suffer)', energy: -20, morale: -15, xp: 10, success: 0.9 },
      { text: 'Time-box standups going forward', energy: -12, credibility: +5, xp: 18, success: 0.85 },
      { text: 'Make standups async', velocity: +5, morale: +5, xp: 20, success: 0.7 }
    ],
    successMessages: [
      'Standup returns to haiku length. Team regains the will to ship.',
      'Meeting timer becomes your new best friend.'
    ],
    failureMessages: [
      'Standup mutates into a dramatic reading of git diffs.',
      'Calendar invites: doubled. Attention spans: halved.'
    ]
  },
  {
    id: 'coffee_negotiation',
    title: 'Coffee Chat Ambush',
    minDungeon: 2,
    description: '"Quick coffee?" turns into 90-minute feature pitch. Your other meetings are starting.',
    choices: [
      { text: 'Politely exit after idea capture', energy: -10, credibility: +5, xp: 15, success: 0.85, optimal: true },
      { text: 'Cancel other meetings', energy: -20, credibility: -10, xp: 12, success: 0.7 },
      { text: 'Multitask on laptop', morale: -10, credibility: -5, xp: 10, success: 0.6 },
      { text: 'Schedule proper follow-up', energy: -8, credibility: +10, xp: 18, success: 0.9 }
    ]
  },
  {
    id: 'meeting_tetris',
    title: 'Calendar Tetris',
    minDungeon: 2,
    description: 'You have 11 meetings today. 3 conflict. All are marked "urgent." Lunch doesn\'t exist.',
    choices: [
      { text: 'Decline, suggest async updates', energy: -15, credibility: +10, xp: 20, success: 0.8, optimal: true },
      { text: 'Attend all, eat during calls', energy: -35, morale: -15, xp: 18, success: 0.7 },
      { text: 'Delegate representation', energy: -10, credibility: +5, xp: 15, success: 0.85 },
      { text: 'Take back your calendar', energy: -20, credibility: +15, xp: 25, success: 0.75 }
    ]
  },
  {
    id: 'docs_404',
    title: 'The Missing Documentation',
    minDungeon: 3,
    description: 'New engineer: "Where\'s the onboarding docs?" You: *sweating* "Let me Slack you a link..." Link is 404.',
    choices: [
      { text: 'Pair program instead', energy: -25, morale: +10, credibility: +5, xp: 20, success: 0.85, optimal: true },
      { text: 'Frantically write docs now', energy: -40, xp: 25, success: 0.7 },
      { text: '"Figure it out, that\'s the culture"', morale: -20, xp: 10, success: 0.6 },
      { text: 'Assign them to write the docs', morale: -10, credibility: -5, xp: 15, success: 0.8 }
    ]
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DailyEncounters;
}


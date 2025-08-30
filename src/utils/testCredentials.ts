// Test user credentials for easy login
export const TEST_USERS = [
  {
    email: 'sarah@example.com',
    password: 'password123',
    username: 'sarah_roaster',
    displayName: 'Sarah the Roaster',
    description: 'Professional roaster with years of experience burning people online 🔥'
  },
  {
    email: 'mike@example.com',
    password: 'password123',
    username: 'mike_debater',
    displayName: 'Mike the Debater',
    description: 'Champion debater who never backs down from a challenge 💪'
  },
  {
    email: 'alex@example.com',
    password: 'password123',
    username: 'alex_legend',
    displayName: 'Alex Legend',
    description: 'Rising star in the roasting world. Watch out for my legendary burns! ⚡'
  },
  {
    email: 'jamie@example.com',
    password: 'password123',
    username: 'jamie_pro',
    displayName: 'Jamie Pro',
    description: 'Quick wit, sharp tongue, and unmatched comebacks. The roast master! 🎯'
  }
];

export const getRandomTestUser = () => {
  return TEST_USERS[Math.floor(Math.random() * TEST_USERS.length)];
};
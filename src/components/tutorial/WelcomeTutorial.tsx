import { useEffect } from 'react';
import { Step } from 'react-joyride';
import { useTutorial } from './TutorialProvider';
import { useAuth } from '@/hooks/useAuth';

const welcomeSteps: Step[] = [
  {
    target: 'body',
    content: 'Welcome to SeeFinish! Let\'s take a quick tour to get you started.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tutorial="search"]',
    content: 'Use this search bar to find roasts, debates, and other users.',
    placement: 'bottom',
  },
  {
    target: '[data-tutorial="sidebar-home"]',
    content: 'This is your dashboard where you can see the latest content.',
    placement: 'right',
  },
  {
    target: '[data-tutorial="sidebar-roasts"]',
    content: 'Click here to view and create roasts - your witty burns!',
    placement: 'right',
  },
  {
    target: '[data-tutorial="sidebar-debates"]',
    content: 'Join debates here to compete and earn real money!',
    placement: 'right',
  },
  {
    target: '[data-tutorial="sidebar-leaderboard"]',
    content: 'Check the leaderboard to see top performers and your ranking.',
    placement: 'right',
  },
  {
    target: '[data-tutorial="sidebar-wallet"]',
    content: 'Connect your wallet here to start earning Solana and Naira.',
    placement: 'right',
  },
  {
    target: '[data-tutorial="create-roast"]',
    content: 'Start by creating your first roast! Share your wit with the community.',
    placement: 'top',
  },
  {
    target: 'body',
    content: 'That\'s it! You\'re ready to start roasting and debating. Have fun!',
    placement: 'center',
  },
];

export const WelcomeTutorial = () => {
  const { startTutorial } = useTutorial();
  const { user, profile } = useAuth();

  useEffect(() => {
    // Only show tutorial for new users (check if they have low XP)
    if (user && profile && profile.xp_points === 0) {
      const hasSeenTutorial = localStorage.getItem(`tutorial-welcome-${user.id}`);
      
      if (!hasSeenTutorial) {
        // Start tutorial after a short delay
        const timer = setTimeout(() => {
          startTutorial(welcomeSteps);
          localStorage.setItem(`tutorial-welcome-${user.id}`, 'true');
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [user, profile, startTutorial]);

  return null;
};
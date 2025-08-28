import { createContext, useContext, useState, ReactNode } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useAuth } from '@/hooks/useAuth';

interface TutorialContextType {
  startTutorial: (steps: Step[]) => void;
  isRunning: boolean;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

interface TutorialProviderProps {
  children: ReactNode;
}

export const TutorialProvider = ({ children }: TutorialProviderProps) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { user } = useAuth();

  const startTutorial = (tutorialSteps: Step[]) => {
    setSteps(tutorialSteps);
    setIsRunning(true);
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setIsRunning(false);
      setSteps([]);
    }
  };

  return (
    <TutorialContext.Provider value={{ startTutorial, isRunning }}>
      {children}
      {user && (
        <Joyride
          steps={steps}
          run={isRunning}
          continuous
          showProgress
          showSkipButton
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: 'hsl(var(--primary))',
              backgroundColor: 'hsl(var(--background))',
              textColor: 'hsl(var(--foreground))',
              arrowColor: 'hsl(var(--background))',
              overlayColor: 'rgba(0, 0, 0, 0.5)',
            },
            tooltip: {
              borderRadius: '8px',
              fontSize: '14px',
            },
            beacon: {
              borderRadius: '50%',
            },
          }}
        />
      )}
    </TutorialContext.Provider>
  );
};
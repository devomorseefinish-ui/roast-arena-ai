import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
  type?: 'success' | 'celebration' | 'victory';
  onComplete?: () => void;
}

export const ConfettiEffect = ({ trigger, type = 'success', onComplete }: ConfettiEffectProps) => {
  useEffect(() => {
    if (trigger) {
      let animationId: number;

      const runConfetti = () => {
        switch (type) {
          case 'victory':
            // Burst from multiple angles for victories
            const count = 200;
            const defaults = {
              origin: { y: 0.7 },
              zIndex: 9999,
            };

            function fire(particleRatio: number, opts: any) {
              confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
              });
            }

            fire(0.25, {
              spread: 26,
              startVelocity: 55,
            });

            fire(0.2, {
              spread: 60,
            });

            fire(0.35, {
              spread: 100,
              decay: 0.91,
              scalar: 0.8,
            });

            fire(0.1, {
              spread: 120,
              startVelocity: 25,
              decay: 0.92,
              scalar: 1.2,
            });

            fire(0.1, {
              spread: 120,
              startVelocity: 45,
            });
            break;

          case 'celebration':
            // Continuous burst for celebrations
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const skew = 1;

            function randomInRange(min: number, max: number) {
              return Math.random() * (max - min) + min;
            }

            (function frame() {
              const timeLeft = animationEnd - Date.now();
              const ticks = Math.max(200, 500 * (timeLeft / duration));

              confetti({
                particleCount: 2,
                startVelocity: 0,
                ticks: ticks,
                origin: {
                  x: Math.random(),
                  y: Math.random() * skew - 0.2,
                },
                colors: ['#FFE15D', '#FF6B6B', '#4DABF7', '#69DB7C', '#FF8787'],
                shapes: ['circle', 'square'],
                gravity: randomInRange(0.4, 0.6),
                scalar: randomInRange(0.4, 1),
                drift: randomInRange(-0.4, 0.4),
                zIndex: 9999,
              });

              if (timeLeft > 0) {
                animationId = requestAnimationFrame(frame);
              } else if (onComplete) {
                onComplete();
              }
            })();
            break;

          default:
            // Simple success confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#FFE15D', '#FF6B6B', '#4DABF7', '#69DB7C'],
              zIndex: 9999,
            });
            
            if (onComplete) {
              setTimeout(onComplete, 1000);
            }
            break;
        }
      };

      runConfetti();

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [trigger, type, onComplete]);

  return null;
};
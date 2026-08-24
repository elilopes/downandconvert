import React, { useEffect, useState, useRef } from 'react';

export const MouseFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [waveOffset, setWaveOffset] = useState<number[]>(new Array(12).fill(0));
  const [isVisible, setIsVisible] = useState(false);
  
  const waveRef = useRef<number[]>(new Array(12).fill(0));
  const prevYRef = useRef<number>(-100);
  const velocityYRef = useRef<number>(0);

  const text = 'down&convert';
  const letters = text.split('');

  useEffect(() => {
    // Only show on devices with fine pointer (mouse)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth trailing physics and vertical wave effect
    const animate = () => {
      time += 0.08;

      // Track vertical velocity (movement speed up/down)
      const dy = targetY - currentY;
      velocityYRef.current += (dy - velocityYRef.current) * 0.2;

      // Lerp for smooth trailing effect
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      // Calculate vertical wave offset per letter based on vertical velocity and sin wave
      const velocity = velocityYRef.current;
      const waveAmplitude = Math.min(Math.max(velocity * 0.45, -18), 18);

      const newWave = letters.map((_, i) => {
        // Continuous wave plus dynamic wave when moving up/down
        const idleWave = Math.sin(time + i * 0.4) * 2.5;
        const motionWave = Math.sin(time * 2 - i * 0.5) * waveAmplitude;
        return idleWave + motionWave;
      });

      waveRef.current = newWave;
      setWaveOffset(newWave);
      setPosition({ x: currentX, y: currentY });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[99999] select-none transition-opacity duration-300 flex items-center"
      style={{
        left: `${position.x + 14}px`,
        top: `${position.y + 14}px`,
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <div className="flex items-center">
        {letters.map((char, index) => {
          // Delay each letter color sequence progressively so color travels from first to last
          // Animation total duration is 3.5s, delay is staggered
          const delay = (index / letters.length) * 3.5;
          const yOffset = waveOffset[index] || 0;

          return (
            <span
              key={index}
              className="text-[12px] font-black tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-rainbow-letter inline-block"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transform: `translateY(${yOffset}px)`,
                animationDelay: `-${delay}s`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

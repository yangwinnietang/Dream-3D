import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const GetStartedButton = ({ 
  text = 'Get Started',
  onClick,
  className = '',
  baseColor = '#ffffff',
  pillColor = '#060010',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#060010',
  ease = 'power2.easeOut'
}) => {
  const buttonRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current || !circleRef.current || !textRef.current) return;

    // 初始化样式
    gsap.set(circleRef.current, {
      scale: 0,
      backgroundColor: pillColor,
      transformOrigin: 'center'
    });

    gsap.set(textRef.current, {
      color: pillTextColor,
      zIndex: 10,
      position: 'relative'
    });

    gsap.set(buttonRef.current, {
      backgroundColor: baseColor,
      border: `2px solid ${pillColor}`,
      borderRadius: '50px',
      padding: '18px 36px', // 增大内边距
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      fontWeight: '600',
      fontSize: '20px', // 增大字体
      transition: 'all 0.3s ease'
    });

    // 创建动画时间线
    tlRef.current = gsap.timeline({ paused: true });
    tlRef.current
      .to(circleRef.current, {
        scale: 1,
        duration: 0.4,
        ease: ease
      })
      .to(textRef.current, {
        color: hoveredPillTextColor,
        duration: 0.2,
        ease: ease
      }, '-=0.2');

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [baseColor, pillColor, hoveredPillTextColor, pillTextColor, ease]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (tlRef.current) {
      tlRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tlRef.current) {
      tlRef.current.reverse();
    }
  };

  const handleClick = (e) => {
    // 点击动画效果
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`pill-button ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'inline-block',
        outline: 'none',
        userSelect: 'none',
        minWidth: '120px',
        textAlign: 'center'
      }}
    >
      <div
        ref={circleRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '50px',
          zIndex: 1
        }}
      />
      <span
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'inline-block'
        }}
      >
        {text}
      </span>
    </button>
  );
};

export default GetStartedButton;
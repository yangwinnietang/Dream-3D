import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { ANIMATION_CONFIG } from '../../config/animations';

const buildKeyframes = (from, steps) => { // 构建关键帧
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => { keyframes[k] = [from[k], ...steps.map(s => s[k])]; });



  return keyframes;
};

const BlurText = ({
  text = '',
  delay = ANIMATION_CONFIG.TYPEWRITER.delay,
  className = '',
  animateBy = ANIMATION_CONFIG.TYPEWRITER.animateBy,
  direction = ANIMATION_CONFIG.TYPEWRITER.direction,
  threshold = ANIMATION_CONFIG.TYPEWRITER.threshold,
  rootMargin = ANIMATION_CONFIG.TYPEWRITER.rootMargin,
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = ANIMATION_CONFIG.TYPEWRITER.stepDuration
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split(''); // 分割文本
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => { // 可见性检测
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(ref.current); } }, { threshold, rootMargin });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(() => direction === 'top' ? ANIMATION_CONFIG.TYPEWRITER.defaultFrom : { filter: 'blur(10px)', opacity: 0, y: 50 }, [direction]); // 默认起始状态

  const defaultTo = useMemo(() => ANIMATION_CONFIG.TYPEWRITER.defaultTo, [direction]); // 默认结束状态




  const fromSnapshot = animationFrom ?? defaultFrom;

  const toSnapshots = animationTo ?? defaultTo;



  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));



  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition = { duration: totalDuration, times, delay: (index * delay) / 1000 };
        spanTransition.ease = easing;

        return (
          <motion.span className="inline-block will-change-[transform,filter,opacity]" key={index} initial={fromSnapshot} animate={inView ? animateKeyframes : fromSnapshot} transition={spanTransition} onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}>
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;


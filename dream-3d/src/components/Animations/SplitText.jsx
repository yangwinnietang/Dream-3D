import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ANIMATION_CONFIG } from '../../config/animations';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = ANIMATION_CONFIG.SPLIT_TEXT.delay,
  duration = ANIMATION_CONFIG.SPLIT_TEXT.duration,
  ease = ANIMATION_CONFIG.SPLIT_TEXT.ease,
  splitType = ANIMATION_CONFIG.SPLIT_TEXT.splitType,
  from = ANIMATION_CONFIG.SPLIT_TEXT.from,
  to = ANIMATION_CONFIG.SPLIT_TEXT.to,
  threshold = ANIMATION_CONFIG.SPLIT_TEXT.threshold,
  rootMargin = ANIMATION_CONFIG.SPLIT_TEXT.rootMargin,
  textAlign = ANIMATION_CONFIG.SPLIT_TEXT.textAlign,
  tag = 'h1',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => { // 字体加载检测
    if (document.fonts.status === 'loaded') { setFontsLoaded(true); } else { document.fonts.ready.then(() => { setFontsLoaded(true); }); }
  }, []);

  useGSAP(() => {
    if (!ref.current || !text || !fontsLoaded) return;
    const el = ref.current;

    if (el._rbsplitInstance) { try { el._rbsplitInstance.revert(); } catch (_) { /* noop */ } el._rbsplitInstance = null; } // 清理旧实例

    const startPct = (1 - threshold) * 100; // 计算触发位置
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign = marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    let targets;
    const assignTargets = self => { // 分配动画目标
      if (splitType.includes('chars') && self.chars.length) targets = self.chars;
      if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
      if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
      if (!targets) targets = self.chars || self.words || self.lines;
    };

    const splitInstance = new GSAPSplitText(el, { // 创建分割实例
      type: splitType, smartWrap: true, autoSplit: splitType === 'lines', linesClass: 'split-line', wordsClass: 'split-word', charsClass: 'split-char', reduceWhiteSpace: false,
      onSplit: self => {
        assignTargets(self);
        const tween = gsap.fromTo(targets, { ...from }, { ...to, duration, ease, stagger: delay / 1000, delay: 0.5, onComplete: () => { animationCompletedRef.current = true; onLetterAnimationComplete?.(); }, willChange: 'transform, opacity', force3D: true });
        return tween;
      }
    });

    el._rbsplitInstance = splitInstance;

    return () => { // 清理函数
      try { splitInstance.revert(); } catch (_) { /* noop */ }
      el._rbsplitInstance = null;
    };
  }, { dependencies: [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded, onLetterAnimationComplete], scope: ref });

  const renderTag = () => { // 渲染标签
    const style = { textAlign, overflow: 'hidden', display: 'inline-block', whiteSpace: 'normal', wordWrap: 'break-word', willChange: 'transform, opacity' };
    const classes = `split-parent ${className}`;
    switch (tag) {
      case 'h1': return <h1 ref={ref} style={style} className={classes}>{text}</h1>;
      case 'h2': return <h2 ref={ref} style={style} className={classes}>{text}</h2>;
      case 'h3': return <h3 ref={ref} style={style} className={classes}>{text}</h3>;
      case 'h4': return <h4 ref={ref} style={style} className={classes}>{text}</h4>;
      case 'h5': return <h5 ref={ref} style={style} className={classes}>{text}</h5>;
      case 'h6': return <h6 ref={ref} style={style} className={classes}>{text}</h6>;
      default: return <p ref={ref} style={style} className={classes}>{text}</p>;
    }
  };
  return renderTag();
};

export default SplitText;
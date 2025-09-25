// 动画配置统一管理
export const ANIMATION_CONFIG = {
  // 液体背景配置
  LIQUID_BACKGROUND: {
    colors: ['#5227FF', '#FF9FFC', '#B19EEF'], // 颜色数组
    mouseForce: 20, // 鼠标力度
    cursorSize: 100, // 光标大小
    resolution: 0.5, // 分辨率
    dt: 0.014, // 时间步长
    BFECC: true, // 误差补偿
    isViscous: false, // 粘性
    viscous: 30, // 粘性系数
    iterationsViscous: 32, // 粘性迭代
    iterationsPoisson: 32, // 泊松迭代
    isBounce: false, // 边界反弹
    autoDemo: true, // 自动演示
    autoSpeed: 0.5, // 自动速度
    autoIntensity: 2.2, // 自动强度
    takeoverDuration: 0.25, // 接管时长
    autoResumeDelay: 3000, // 自动恢复延迟
    autoRampDuration: 0.6 // 自动渐变时长
  },
  
  // 分割文字动画配置
  SPLIT_TEXT: {
    delay: 100, // 延迟时间(ms)
    duration: 2.0, // 动画时长(s)
    ease: 'power2.out', // 缓动函数
    splitType: 'chars', // 分割类型
    from: { opacity: 0, y: 40 }, // 起始状态
    to: { opacity: 1, y: 0 }, // 结束状态
    threshold: 0.1, // 触发阈值
    rootMargin: '0px', // 根边距
    textAlign: 'center' // 文字对齐
  },
  
  // 打字机动画配置
  TYPEWRITER: {
    delay: 150, // 字符延迟(ms)
    animateBy: 'words', // 动画单位
    direction: 'top', // 动画方向
    threshold: 0.1, // 触发阈值
    rootMargin: '0px', // 根边距
    stepDuration: 0.35, // 步骤时长
    defaultFrom: { filter: 'blur(10px)', opacity: 0, y: -50 }, // 默认起始
    defaultTo: [
      { filter: 'blur(5px)', opacity: 0.5, y: 5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ] // 默认结束
  }
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import LiquidEther from '../Background/LiquidEther';
import SplitText from '../Animations/SplitText';
import BlurText from '../Animations/BlurText';
import TextType from '../Animations/TextType';
import CardSwap, { Card } from '../Gallery/CardSwap';
import GetStartedButton from '../UI/GetStartedButton';
import styles from '../../styles/components.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const handleTitleComplete = () => { console.log('Dream 3D title animation completed!'); }; // 标题动画完成回调
  const handleSloganComplete = () => { console.log('Slogan animation completed!'); }; // 宣传语动画完成回调
  const handleGetStarted = () => { navigate('/create'); }; // 跳转到create页面

  return (
    <div className={styles.container}>

      {/* 背景层 */}
      <div className={styles.backgroundLayer}>
        <LiquidEther style={{ width: '100%', height: '100%' }} />
      </div>
      
      {/* 内容层 */}
      <div className={styles.contentLayer}>
        <SplitText 
          text="Dream 3D" 
          tag="h1" 
          className={styles.title}
          onLetterAnimationComplete={handleTitleComplete}
        />
        <BlurText 
          text="Bring Creativity Within Easy Reach" 
          className={styles.slogan}
          onAnimationComplete={handleSloganComplete}
        />
        <TextType 
          text="Welcome to Dream 3D"
          className={styles.welcome}
          typingSpeed={75}
          pauseDuration={20000}
          showCursor={true}
          cursorCharacter="|"
          loop={true}
        />
        
        {/* Get Started 按钮 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <GetStartedButton 
            onClick={handleGetStarted}
          />
        </div>
      </div>

      {/* 图片展示区 - 固定在右下角 */}
      <CardSwap
        cardDistance={60}
        verticalDistance={70}
        delay={5000}
        pauseOnHover={false}
        width={400}
        height={280}
      >
        <Card>
          <div style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>3D Model Gallery</h3>
            <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>Stunning 3D printed artworks</p>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Creative Design</h3>
            <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>Unlimited creative possibilities</p>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Tech Innovation</h3>
            <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>Cutting-edge 3D printing technology</p>
          </div>
        </Card>
      </CardSwap>
    </div>
  );
};

export default HomePage;
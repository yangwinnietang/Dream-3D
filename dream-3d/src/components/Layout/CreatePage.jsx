import Dither from '../Background/Dither';
import TextType from '../Animations/TextType';

const CreatePage = () => {
  return (
    <div className="create-page" style={{ 
      width: '100%', 
      height: '100vh', 
      position: 'relative'
    }}>
      {/* 完全按照create.md的Dither背景 */}
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%',
        zIndex: 1
      }}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      
      {/* 顶部标题 */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        textAlign: 'center',
        color: 'white',
        textShadow: '0 4px 8px rgba(0,0,0,0.7)'
      }}>
        <TextType 
          text="Create Your 3D World"
          as="h1"
          typingSpeed={75}
          pauseDuration={20000}
          showCursor={true}
          cursorCharacter="|"
          loop={true}
          className=""
          style={{ 
            fontSize: '5rem', 
            fontWeight: 'bold', 
            margin: 0,
            textShadow: '0 6px 12px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap'
          }}
        />
        <p style={{ 
          fontSize: '1.5rem', 
          marginTop: '20px',
          opacity: 0.9,
          textShadow: '0 2px 4px rgba(0,0,0,0.6)'
        }}>
          Experience unprecedented 3D creation
        </p>
      </div>
    </div>
  );
};

export default CreatePage;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FloresContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000;
`;

const FloresContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: yellow;
  font-family: "Arial Narrow", Arial, sans-serif;
  text-align: center;
`;

const Titulo = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  animation: fadeIn 3s ease-in-out forwards;
  letter-spacing: 10px;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const AudioPlayer = styled.audio`
  display: none;
`;

const FloresAmarillas = ({ visible }) => {
  const [audioStarted, setAudioStarted] = useState(false);
  
  // Iniciar audio cuando el componente sea visible
  useEffect(() => {
    let isMounted = true;
    
    if (visible && !audioStarted && isMounted) {
      setAudioStarted(true);
    }
    
    return () => {
      isMounted = false;
    };
  }, [visible, audioStarted]);
  
  if (!visible) {
    return null;
  }

  return (
    <FloresContainer>
      {audioStarted && (
        <AudioPlayer 
          src="/sound/flores-amarillas.mp3" 
          autoPlay 
          controls={false}
          onError={(e) => console.log('Error de audio:', e)}
        />
      )}
      <FloresContent>
        <Titulo>
          Estas flores amarillas son un reflejo de la alegría que traes a mi vida.
          <br /><br />
          Gracias por iluminar mis días con tu presencia.
        </Titulo>
      </FloresContent>
    </FloresContainer>
  );
};

export default FloresAmarillas;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMusic } from 'react-icons/fa';

const AudioContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  pointer-events: none;
`;

const AudioIndicator = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-dorado);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    border: 2px solid var(--color-dorado);
    opacity: 0;
    animation: ${props => props.reproduciendo ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    70% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const AudioVisualizer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 20px;
  width: 20px;
  gap: 2px;
  
  .bar {
    width: 3px;
    background-color: white;
    border-radius: 3px;
  }
`;

function MusicPlayer({ reproduciendo }) {
  const audioRef = useRef(null);
  
  useEffect(() => {
    let isMounted = true;
    let audioElement = null;
    
    try {
      // Crear elemento de audio
      if (!audioRef.current) {
        audioElement = new Audio();
        audioElement.src = '/sound/cancion.mp3'; // Cambiado a una ruta local
        audioElement.loop = true;
        audioElement.volume = 0.7;
        audioRef.current = audioElement;
      }
      
      // Reproducir o pausar según el estado
      if (reproduciendo && audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Error al reproducir audio:', error);
        });
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
    } catch (error) {
      console.error('Error con el elemento de audio:', error);
    }
    
    // Limpiar al desmontar
    return () => {
      isMounted = false;
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      } catch (error) {
        console.error('Error al limpiar el audio:', error);
      }
    };
  }, [reproduciendo]);
  
  // Crear barras de visualización
  const renderBars = () => {
    if (!reproduciendo) {
      return <FaMusic size={16} />;
    }
    
    return (
      <AudioVisualizer>
        {[1, 2, 3, 4].map((bar, index) => (
          <motion.div
            key={index}
            className="bar"
            initial={{ height: 5 }}
            animate={{ 
              height: [5, 15, 5],
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </AudioVisualizer>
    );
  };
  
  return (
    <AudioContainer>
      <AudioIndicator
        reproduciendo={reproduciendo}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: reproduciendo ? [0, 10, -10, 0] : 0
        }}
        transition={{ 
          duration: 0.5,
          rotate: {
            duration: 2,
            repeat: reproduciendo ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        {renderBars()}
      </AudioIndicator>
    </AudioContainer>
  );
}

export default MusicPlayer; 
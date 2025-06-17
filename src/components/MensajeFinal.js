import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container, Typography, Button, Paper } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaMusic, FaPause } from 'react-icons/fa';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
// Removed FloresAmarillas import

gsap.registerPlugin(TextPlugin);

const MensajeSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-negro-fondo) 0%, var(--color-negro-papel) 100%);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundHearts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Heart = styled.div`
  position: absolute;
  opacity: 0.2;
  z-index: 0;
`;

const ContentCard = styled(motion(Paper))`
  padding: 50px;
  border-radius: 20px;
  background-color: var(--color-negro-papel);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); // Shadow might need adjustment for dark theme
  backdrop-filter: blur(10px); // Keep for effect
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const Title = styled(motion(Typography))`
  text-align: center;
  margin-bottom: 30px;
  color: var(--color-celeste-pastel);
  font-family: var(--fuente-romantica);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--color-celeste-pastel), transparent);
  }
`;

const MessageText = styled(motion(Typography))`
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.8;
  font-size: 1.1rem;
  white-space: pre-line; /* To render \n as line breaks */
  
  .highlight {
    color: var(--color-azul-principal);
    font-weight: 500;
  }
`;

const ButtonWrapper = styled(motion.div)`
  text-align: center;
  margin-top: 30px;
`;

const MusicButton = styled(Button)`
  position: relative;
  overflow: hidden;
  padding-left: 50px;
  
  .icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }
  
  &:hover .icon {
    transform: translateY(-50%) scale(1.2);
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  z-index: 0;
  opacity: 0.6;
`;

function MensajeFinal({ onReproducir, reproduciendo, onShowYellowFlowers }) { // Added onShowYellowFlowers
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const textRef = useRef(null);
  const heartsRef = useRef(null);
  const floatingElementsRef = useRef([]);
  // Removed useState for mostrarFlores
  
  // Animación cuando el componente entra en vista
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // Animación de texto con GSAP
      if (textRef.current) {
        // New text content for GSAP animation
        const mensajePrincipal = "Día a día aprendiendo a ser\nMiro hacia atrás\nY todo el camino hecho\nLo que pudo ser y lo que fue\nMi oportunidad\nDe comenzar de nuevo\nY lo demás\nFrancamente no importa\n\n¿Quién fui todo este tiempo? No sé\n¿Quién soy o seré?\n¿Habré cumplido un sueño?\nIntentando la felicidad\nA prueba y error\nLa vida es un momento\nY lo demás\nFrancamente no importa\n\nTe miro fijo y me sonreís\nNo pierdo un día lejos de ti\nMi chance es hoy\nMiro tus ojos y me veo ahí\nAprovechando cada ocasión\nMi chance es hoy\n\nTantas cosas que habré hecho bien\nTantas que hice mal\nY que ni ahí me entero\nCuánto que desperdicié sin ver\nQue estuviste ahí\nConmigo todo el tiempo\nY hoy lo demás\nFrancamente no importa\n\nTe miro fijo y me sonreís\nNo pierdo un día lejos de ti\nMi chance es hoy\nMiro tus ojos y me veo ahí\nAprovechando cada ocasión\nMi chance es hoy\n\nY hoy lo demás\nFrancamente no importa\nTe miro fijo y me sonreís\nNo pierdo un día lejos de ti\nMi chance es hoy\nMiro tus ojos y me veo ahí\nAprovechando cada ocasión\nMi chance es hoy\n\nTe miro fijo y me sonreís\nNo pierdo un día lejos de ti\nMi chance es hoy\nMiro tus ojos y me veo ahí\nAprovechando cada ocasión\nMi chance es hoy\n\nTe miro fijo y me sonreís\nNo pierdo un día lejos de ti\nMi chance es hoy\nMiro tus ojos y me veo ahí\nAprovechando cada ocasión\nMi chance es hoy";
        textRef.current.innerHTML = ''; // Clear existing HTML if any (though GSAP text plugin might do this)
        
        gsap.to(textRef.current, {
          duration: 15, // Increased duration for longer text
          text: {
            value: mensajePrincipal,
            delimiter: ' ' // Could use '' for character by character, or ' ' for word by word
          },
          ease: "none",
          delay: 0.5
        });
      }
    }
  }, [controls, inView]);
  
  // Crear corazones flotantes en el fondo
  useEffect(() => {
    if (heartsRef.current) {
      const createHearts = () => {
        const hearts = [];
        
        for (let i = 0; i < 20; i++) {
          const size = Math.random() * 40 + 20;
          const heart = document.createElement('div');
          heart.classList.add('background-heart');
          heart.style.width = `${size}px`;
          heart.style.height = `${size}px`;
          heart.style.position = 'absolute';
          heart.style.left = `${Math.random() * 100}%`;
          heart.style.top = `${Math.random() * 100}%`;
          heart.style.opacity = `${Math.random() * 0.2 + 0.1}`;
          heart.style.color = 'var(--color-blanco)';
          heart.innerHTML = '<svg viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>';
          
          hearts.push(heart);
          heartsRef.current.appendChild(heart);
        }
        
        // Animación de los corazones
        gsap.to('.background-heart', {
          y: 'random(-100, 100)',
          x: 'random(-100, 100)',
          rotation: 'random(-20, 20)',
          scale: 'random(0.8, 1.2)',
          duration: 'random(10, 20)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.2
        });
        
        return hearts;
      };
      
      const hearts = createHearts();
      
      return () => {
        hearts.forEach(heart => {
          if (heart.parentNode === heartsRef.current) {
            heartsRef.current.removeChild(heart);
          }
        });
      };
    }
  }, []);
  
  // Animación para elementos flotantes decorativos
  useEffect(() => {
    if (floatingElementsRef.current.length) {
      gsap.to(floatingElementsRef.current, {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-10, 10)',
        duration: 'random(5, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });
    }
  }, []);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };
  
  return (
    <MensajeSection id="mensaje">
      {/* Removed local FloresAmarillas instance */}
      <BackgroundHearts ref={heartsRef} /> {/* Always visible */}
      
      {/* Elementos decorativos flotantes */}
      {/* Always visible */}
      <>
        <FloatingElement
            ref={el => floatingElementsRef.current[0] = el}
            style={{ top: '10%', left: '5%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <FaHeart size={40} color="white" />
          </FloatingElement>
          
          <FloatingElement
            ref={el => floatingElementsRef.current[1] = el}
            style={{ bottom: '15%', right: '8%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <FaHeart size={60} color="white" />
          </FloatingElement>
          
          <FloatingElement
            ref={el => floatingElementsRef.current[2] = el}
            style={{ top: '30%', right: '15%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <FaHeart size={30} color="white" />
          </FloatingElement>
        </>
      {/* Removed !mostrarFlores condition for Container */}
      <Container>
          <ContentCard
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
          >
          <Title variant="h2" variants={itemVariants}>
            Como me siento
          </Title>
          
          {/* MessageText will be populated by GSAP with lyrics. Initial children (if any) will be replaced. */}
          <MessageText variant="body1" variants={itemVariants} ref={textRef}>
            {/* Placeholder content can be put here, but GSAP will overwrite it */}
          </MessageText>
          
          <ButtonWrapper variants={itemVariants}>
            <MusicButton
              variant="contained"
              color="secondary"
              size="large"
              onClick={onReproducir}
              startIcon={reproduciendo ? <FaPause className="icon" /> : <FaMusic className="icon" />}
              sx={{
                backgroundColor: 'var(--color-azul-principal)',
                '&:hover': {
                  backgroundColor: 'var(--color-azul-oscuro)'
                },
                marginRight: '10px'
              }}
            >
              {reproduciendo ? 'Pausar nuestra canción' : 'Reproducir nuestra canción'}
            </MusicButton>
            
            <Button
              variant="contained"
              color="secondary" // Using secondary for a different look from primary MusicButton
              size="large"
              onClick={onShowYellowFlowers} // Use prop
              sx={{
                backgroundColor: 'var(--color-gris-azulado)',
                '&:hover': {
                  backgroundColor: '#455a64' // Darker shade of gris-azulado (secondary.dark)
                }
              }}
            >
              Ver flores amarillas
            </Button>
          </ButtonWrapper>
          </ContentCard>
        </Container>
      )}
    </MensajeSection>
  );
}

export default MensajeFinal; 
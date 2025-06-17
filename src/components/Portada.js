import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortadaContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
`;

const ParallaxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/imagenes/1.jpg');
  background-size: cover;
  background-position: center;
  z-index: -2;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(18, 18, 18, 0.7) 0%, rgba(18, 18, 18, 0.4) 100%);
  z-index: -1;
`;

const ContentWrapper = styled(motion.div)`
  text-align: center;
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
`;

const Title = styled(Typography)`
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  .highlight {
    color: var(--color-celeste-pastel);
    font-family: var(--fuente-romantica);
  }
`;

const Subtitle = styled(Typography)`
  color: white;
  margin-bottom: 40px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
    z-index: -1;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const FloatingHearts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const Heart = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  transform: rotate(45deg);
  opacity: ${props => props.opacity};
  
  &:before,
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: ${props => props.color};
    border-radius: 50%;
    position: absolute;
  }
  
  &:before {
    left: -50%;
  }
  
  &:after {
    top: -50%;
  }
`;

function Portada() {
  const typedRef = useRef(null);
  const titleRef = useRef(null);
  const parallaxRef = useRef(null);
  const heartsContainerRef = useRef(null);
  
  useEffect(() => {
    // Efecto de máquina de escribir
    const typed = new Typed(typedRef.current, {
      strings: ['miro las estrellas pa\\\' encontrarte'],
      typeSpeed: 80,
      startDelay: 1500,
      showCursor: true,
      cursorChar: '✨',
      loop: false
    });
    
    // Parallax con GSAP
    gsap.to(parallaxRef.current, {
      y: '15%',
      ease: 'power1.out',
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Crear corazones flotantes
    const createFloatingHearts = () => {
      if (!heartsContainerRef.current) return;
      
      const colors = ['var(--color-celeste-pastel)', 'var(--color-azul-principal)', 'var(--color-gris-azulado)', '#FFFFFF'];
      
      for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        const size = Math.random() * 20 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.5 + 0.3;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 10;
        
        heart.classList.add('heart');
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.background = color;
        heart.style.opacity = opacity;
        heart.style.left = `${left}%`;
        heart.style.top = '100%';
        heart.style.position = 'absolute';
        heart.style.transform = 'rotate(45deg)'; // Base rotation for the .heart class to work
        heart.style.animation = `floatUpEffect ${animationDuration}s linear infinite`; // Use new keyframe
        
        // Set CSS variable for the globally defined .heart pseudo-elements
        heart.style.setProperty('--heart-color', color);
        
        // No longer need to inject <style> tags dynamically
        
        heartsContainerRef.current.appendChild(heart);
        
        // Eliminar el corazón después de la animación
        setTimeout(() => {
          if (heart.parentNode === heartsContainerRef.current) {
            heartsContainerRef.current.removeChild(heart);
          }
          // No longer need to remove style tag
        }, animationDuration * 1000);
      }
    };
    
    // Iniciar corazones flotantes
    createFloatingHearts();
    const heartsInterval = setInterval(createFloatingHearts, 10000);
    
    return () => {
      typed.destroy();
      clearInterval(heartsInterval);
    };
  }, []);

  return (
    <PortadaContainer>
      <ParallaxBackground ref={parallaxRef} />
      <Overlay />
      
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title variant="h1" ref={titleRef}>
          Para <span className="highlight">Geor</span>, <br />
          <span ref={typedRef}></span>
        </Title>
        
        <Subtitle variant="h5">
          No soy un extraño aquí.
        </Subtitle>
        
        <StyledButton
          component={ScrollLink}
          to="historia"
          spy={true}
          smooth={true}
          offset={-70}
          duration={800}
          variant="outlined"
          color="primary"
          size="large"
          sx={{ 
            borderColor: 'white', 
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Clickea y vuela.
        </StyledButton>
      </ContentWrapper>
      
      <FloatingHearts ref={heartsContainerRef} />
    </PortadaContainer>
  );
}

export default Portada; 
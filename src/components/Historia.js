import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Container, Typography, Card, CardMedia, CardContent, Box } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HistoriaSection = styled.section`
  min-height: 100vh;
  background-color: var(--color-negro-fondo);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.div)`
  text-align: center;
  margin-bottom: 80px;
  
  h2 {
    font-size: 3.5rem;
    /* color: var(--color-rosa-oscuro); // Will inherit from global var(--color-blanco-texto) or use theme */
    /* Forcing specific color if desired: */
    color: var(--color-celeste-pastel);
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: var(--color-gris-texto);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  &:before {
    content: '';
    position: absolute;
    width: 6px;
    background: linear-gradient(to bottom, var(--color-azul-principal), var(--color-celeste-pastel));
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    border-radius: 20px;
    
    @media (max-width: 768px) {
      left: 31px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  margin-bottom: 70px;
  
  &:nth-child(odd) {
    left: 0;
    
    @media (max-width: 768px) {
      left: 0;
      width: 100%;
      padding-left: 70px;
      padding-right: 25px;
    }
  }
  
  &:nth-child(even) {
    left: 50%;
    
    @media (max-width: 768px) {
      left: 0;
      width: 100%;
      padding-left: 70px;
      padding-right: 25px;
    }
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: var(--color-azul-principal);
    border: 4px solid var(--color-celeste-pastel);
    border-radius: 50%;
    top: 15px;
    z-index: 1;
    box-shadow: 0 0 0 4px rgba(41, 121, 255, 0.3); /* Derived from --color-azul-principal #2979ff */
    
    @media (max-width: 768px) {
      left: 15px !important;
    }
  }
  
  &:nth-child(odd):after {
    right: -17px;
  }
  
  &:nth-child(even):after {
    left: -17px;
  }
`;

const TimelineContent = styled(Card)`
  padding: 0;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const TimelineDate = styled.div`
  position: absolute;
  top: -30px;
  font-family: var(--fuente-romantica);
  color: var(--color-celeste-pastel);
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DecorationElement = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-azul-principal) 0%, transparent 70%);
  opacity: 0.5; /* Keep opacity or adjust if needed, e.g., 0.2 for darker theme */
  z-index: -1;
`;

const momentos = [
  {
    id: 1,
    fecha: 'Primer encuentro',
    imagen: '/imagenes/2.jpg',
    texto: 'Aquel día en que nuestras miradas se cruzaron por primera vez, supe que algo especial comenzaba. El tiempo se detuvo y el mundo alrededor desapareció.'
  },
  {
    id: 2,
    fecha: 'Nuestra primera cita',
    imagen: '/imagenes/3.jpg',
    texto: 'Las mariposas, las risas y ese primer café que se convirtió en horas de conversación. Cada palabra compartida tejía hilos invisibles entre nosotros.'
  },
  {
    id: 3,
    fecha: 'Aventuras juntos',
    imagen: '/imagenes/4.jpg',
    texto: 'Cada viaje, cada paseo, cada momento a tu lado se convierte en una aventura inolvidable. Contigo, hasta lo cotidiano se transforma en extraordinario.'
  },
  {
    id: 4,
    fecha: 'Momentos especiales',
    imagen: '/imagenes/5.jpg',
    texto: 'Esos instantes mágicos que quedan grabados en el corazón para siempre. Pequeños tesoros de felicidad que construyen nuestra historia de amor.'
  }
];

function Historia() {
  const controls = useAnimation();
  const titleControls = useAnimation();
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const timelineRef = useRef(null);
  const decorationsRef = useRef([]);
  
  // Animación para el título
  useEffect(() => {
    if (titleInView) {
      titleControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
  }, [titleControls, titleInView]);
  
  // Animaciones con GSAP para la timeline
  useEffect(() => {
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      
      gsap.fromTo(items, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Animación para los elementos decorativos
    if (decorationsRef.current.length) {
      gsap.to(decorationsRef.current, {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }
  }, []);
  
  return (
    <HistoriaSection id="historia">
      {/* Elementos decorativos */}
      <DecorationElement 
        ref={el => decorationsRef.current[0] = el} 
        style={{ top: '10%', left: '5%' }} 
      />
      <DecorationElement 
        ref={el => decorationsRef.current[1] = el} 
        style={{ top: '60%', right: '8%' }} 
      />
      <DecorationElement 
        ref={el => decorationsRef.current[2] = el} 
        style={{ bottom: '15%', left: '15%' }} 
      />
      
      <Container>
        <Title
          ref={titleRef}
          animate={titleControls}
          initial={{ y: 50, opacity: 0 }}
        >
          <Typography variant="h2">Nuestra Historia</Typography>
          <Typography className="subtitle">
            Un recorrido por los momentos que han tejido nuestra historia de amor
          </Typography>
        </Title>
        
        <TimelineContainer ref={timelineRef}>
          {momentos.map((momento, index) => (
            <TimelineItem 
              key={momento.id} 
              className="timeline-item"
              initial={{ opacity: 0 }}
            >
              <TimelineDate>
                {momento.fecha}
              </TimelineDate>
              
              <TimelineContent>
                <CardMedia
                  component="img"
                  height="250"
                  image={momento.imagen}
                  alt={momento.fecha}
                  sx={{ 
                    transition: 'transform 0.5s ease',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {momento.texto}
                  </Typography>
                </CardContent>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </HistoriaSection>
  );
}

export default Historia; 
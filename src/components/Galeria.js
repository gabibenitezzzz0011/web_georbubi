import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GaleriaSection = styled.section`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ParallaxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/imagenes/5.jpg');
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
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: -1;
`;

const Title = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
  z-index: 1;
  
  h2 {
    font-size: 3.5rem;
    color: var(--color-blanco);
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: var(--color-blanco);
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

const GaleriaContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 400px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    &:hover img {
      transform: scale(1.1);
    }
  }
  
  .swiper-slide-active {
    transform: scale(1.1);
    z-index: 2;
  }
  
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background-color: var(--color-rosa);
    opacity: 0.7;
    
    &-active {
      opacity: 1;
      background-color: var(--color-rosa-oscuro);
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--color-rosa-oscuro);
    background-color: rgba(255, 255, 255, 0.8);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:after {
      font-size: 20px;
    }
  }
`;

const FotoInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  .swiper-slide:hover & {
    transform: translateY(0);
  }
  
  h3 {
    font-family: var(--fuente-titulo);
    margin-bottom: 5px;
  }
  
  p {
    font-size: 0.9rem;
    margin: 0;
  }
`;

const ButtonContainer = styled(motion.div)`
  margin-top: 60px;
  text-align: center;
  z-index: 1;
`;

const FloreceButton = styled(Button)`
  position: relative;
  overflow: hidden;
  
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

// Datos de las fotos
const fotos = [
  {
    id: 1,
    imagen: '/imagenes/6.jpg',
    titulo: 'Momentos Especiales',
    descripcion: 'Los pequeños instantes que hacen grande nuestra historia'
  },
  {
    id: 2,
    imagen: '/imagenes/7.jpg',
    titulo: 'Juntos',
    descripcion: 'Cada día es una nueva aventura a tu lado'
  },
  {
    id: 3,
    imagen: '/imagenes/8.jpg',
    titulo: 'Recuerdos',
    descripcion: 'Memorias que atesoramos en nuestro corazón'
  },
  {
    id: 4,
    imagen: '/imagenes/9.jpg',
    titulo: 'Amor Eterno',
    descripcion: 'Un sentimiento que crece con cada amanecer'
  },
  {
    id: 5,
    imagen: '/imagenes/1.jpg',
    titulo: 'Nuestro Camino',
    descripcion: 'Construyendo sueños paso a paso'
  },
  {
    id: 6,
    imagen: '/imagenes/2.jpg',
    titulo: 'Conexión',
    descripcion: 'Dos almas que se encontraron para no separarse'
  }
];

function Galeria({ onFlorecer, onMostrarFloresAmarillas }) {
  const parallaxRef = useRef(null);
  const titleRef = useRef(null);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [isFloresAmarillasAnimating, setIsFloresAmarillasAnimating] = useState(false);
  
  // Efecto parallax con GSAP
  useEffect(() => {
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        y: '15%',
        ease: 'power1.out',
        scrollTrigger: {
          trigger: parallaxRef.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
    
    // Animación para el título
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);
  
  const handleFlorecer = () => {
    setIsButtonAnimating(true);
    
    // Llamar a la función de florecer pasada como prop
    if (onFlorecer) {
      onFlorecer();
    }
    
    // Restablecer el estado de animación después de un tiempo
    setTimeout(() => {
      setIsButtonAnimating(false);
    }, 2000);
  };
  
  const handleFloresAmarillas = () => {
    setIsFloresAmarillasAnimating(true);
    
    // Llamar a la función para mostrar flores amarillas
    if (onMostrarFloresAmarillas) {
      onMostrarFloresAmarillas();
    }
    
    // Restablecer el estado de animación después de un tiempo
    setTimeout(() => {
      setIsFloresAmarillasAnimating(false);
    }, 2000);
  };
  
  return (
    <GaleriaSection id="galeria">
      <ParallaxBackground ref={parallaxRef} />
      <Overlay />
      
      <Container>
        <Title ref={titleRef}>
          <Typography variant="h2">Nuestros Momentos</Typography>
          <Typography className="subtitle">
            Una colección de recuerdos que hemos creado juntos
          </Typography>
        </Title>
        
        <GaleriaContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <StyledSwiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          >
            {fotos.map(foto => (
              <SwiperSlide key={foto.id}>
                <img src={foto.imagen} alt={foto.titulo} />
                <FotoInfo>
                  <Typography variant="h3">{foto.titulo}</Typography>
                  <Typography variant="body2">{foto.descripcion}</Typography>
                </FotoInfo>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </GaleriaContainer>
        
        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <FloreceButton
              variant="contained"
              color="primary"
              size="large"
              onClick={handleFlorecer}
              disabled={isButtonAnimating}
              sx={{
                backgroundColor: 'var(--color-rosa)',
                '&:hover': {
                  backgroundColor: 'var(--color-rosa-oscuro)'
                }
              }}
            >
              {isButtonAnimating ? '¡Floreciendo!' : 'Haz florecer esta página'}
            </FloreceButton>
            
            <FloreceButton
              variant="contained"
              size="large"
              onClick={handleFloresAmarillas}
              disabled={isFloresAmarillasAnimating}
              sx={{
                backgroundColor: '#d4af37',
                '&:hover': {
                  backgroundColor: '#c09c2c'
                }
              }}
            >
              {isFloresAmarillasAnimating ? '¡Mostrando flores amarillas!' : 'Flores Amarillas'}
            </FloreceButton>
          </Box>
        </ButtonContainer>
      </Container>
    </GaleriaSection>
  );
}

export default Galeria; 
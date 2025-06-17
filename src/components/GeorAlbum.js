import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material'; // Removed Box
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination, Navigation, Autoplay } from 'swiper/modules'; // Added EffectCube
import 'swiper/css';
import 'swiper/css/effect-cube'; // Added CSS for EffectCube
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
  background-image: url('/imagenes/geor/geor-bg.jpg'); // Specific background for Geor
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
    rgba(20, 20, 20, 0.8) 0%, /* Darker overlay for Geor */
    rgba(50, 50, 50, 0.6) 100%
  );
  z-index: -1;
`;

const Title = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
  z-index: 1;

  h2 {
    font-size: 3.8rem; /* Slightly larger title for Geor */
    color: #E0E0E0; /* Light grey title color */
    font-family: 'Cinzel', serif; /* Example of a different font */
    margin-bottom: 20px;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);

    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  }

  .subtitle {
    font-size: 1.3rem;
    color: #BDBDBD; /* Lighter grey subtitle */
    font-family: 'Lato', sans-serif; /* Example of a different font */
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
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
    width: 14px; /* Larger bullets for Geor */
    height: 14px;
    background-color: #A0A0A0; /* Grey bullets */
    opacity: 0.6;

    &-active {
      opacity: 1;
      background-color: #E0E0E0; /* Light grey active bullet */
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #E0E0E0; /* Light grey navigation arrows */
    background-color: rgba(30, 30, 30, 0.7); /* Darker background for nav buttons */
    width: 44px; /* Slightly larger nav buttons */
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

// Datos de las fotos
const fotos = [
  {
    id: 1,
    imagen: '/imagenes/geor/1.jpg', // Placeholder
    titulo: 'Geor Moment 1',
    descripcion: 'Description for Geor Moment 1'
  },
  {
    id: 2,
    imagen: '/imagenes/geor/2.jpg', // Placeholder
    titulo: 'Geor Moment 2',
    descripcion: 'Description for Geor Moment 2'
  },
  // Add more photos as needed
];

function GeorAlbum() { // Renamed component, removed props
  const parallaxRef = useRef(null);
  const titleRef = useRef(null);
  // Removed button-related state

  // Efecto parallax con GSAP
  useEffect(() => {
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        y: '30%', // Increased intensity
        ease: 'power1.out',
        scrollTrigger: {
          trigger: parallaxRef.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Animación para el título (initial fade-in and slide-up)
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

      // Parallax for the title itself using the existing titleRef
      gsap.to(titleRef.current, {
        y: '-10%', // Move upwards slightly
        ease: 'power1.out',
        scrollTrigger: {
          trigger: parallaxRef.current.parentElement, // Trigger with the main parallax container
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, []);

  // Removed handleFlorecer and handleFloresAmarillas functions

  return (
    <GaleriaSection id="geor-album"> {/* Changed id */}
      <ParallaxBackground ref={parallaxRef} />
      <Overlay />

      <Container>
        <Title ref={titleRef}>
          <Typography variant="h2">GEOR</Typography> {/* Updated title */}
          <Typography className="subtitle">
            A special collection of moments. {/* Updated subtitle */}
          </Typography>
        </Title>

        <GaleriaContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <StyledSwiper
            effect={'cube'} // Changed effect to cube
            grabCursor={true}
            centeredSlides={true} // Keep true for cube if you want it centered
            slidesPerView={'auto'} // For cube, often '1' is used, but 'auto' might work depending on styling
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 3500, // Slightly adjusted delay for variety
              disableOnInteraction: false,
            }}
            modules={[EffectCube, Pagination, Navigation, Autoplay]} // Added EffectCube module
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

        {/* Removed ButtonContainer and FloreceButton */}
      </Container>
    </GaleriaSection>
  );
}

export default GeorAlbum;

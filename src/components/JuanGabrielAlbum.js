import React, { useEffect, useRef } from 'react'; // Removed useState
import styled from 'styled-components';
import { Container, Typography } from '@mui/material'; // Removed Box
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
  background-image: url('/imagenes/juangabriel/jg-bg.jpg'); // Specific background for Juan Gabriel
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
    rgba(178, 34, 34, 0.7) 0%, /* Firebrick red overlay for Juan Gabriel */
    rgba(255, 140, 0, 0.5) 100% /* DarkOrange overlay */
  );
  z-index: -1;
`;

const Title = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
  z-index: 1;

  h2 {
    font-size: 3.6rem;
    color: #FFD700; /* Gold title color */
    font-family: 'Playfair Display', serif; /* Elegant font for Juan Gabriel */
    margin-bottom: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  }

  .subtitle {
    font-size: 1.25rem;
    color: #FFF0E1; /* Light creamy color for subtitle */
    font-family: 'Roboto Slab', serif; /* Robust font for subtitle */
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
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
    width: 11px;
    height: 11px;
    background-color: #FFB74D; /* Light orange bullets */
    opacity: 0.75;

    &-active {
      opacity: 1;
      background-color: #FF9800; /* Orange active bullet */
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #B22222; /* Firebrick red navigation arrows */
    background-color: rgba(255, 224, 189, 0.8); /* Light peach background for nav */
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

// Datos de las fotos
const fotos = [
  {
    id: 1,
    imagen: '/imagenes/juangabriel/1.jpg', // Placeholder
    titulo: 'Juan Gabriel Moment 1',
    descripcion: 'Description for Juan Gabriel Moment 1'
  },
  {
    id: 2,
    imagen: '/imagenes/juangabriel/2.jpg', // Placeholder
    titulo: 'Juan Gabriel Moment 2',
    descripcion: 'Description for Juan Gabriel Moment 2'
  },
  // Add more photos as needed
];

function JuanGabrielAlbum() { // Renamed component, removed props
  const parallaxRef = useRef(null);
  const titleRef = useRef(null);
  // Removed button-related state

  // Efecto parallax con GSAP
  useEffect(() => {
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        y: '35%',
        ease: 'linear', // Changed ease
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

  // Removed handleFlorecer and handleFloresAmarillas functions

  return (
    <GaleriaSection id="juangabriel-album"> {/* Changed id */}
      <ParallaxBackground ref={parallaxRef} />
      <Overlay />

      <Container>
        <Title ref={titleRef}>
          <Typography variant="h2">Juan Gabriel</Typography> {/* Updated title */}
          <Typography className="subtitle">
            Melodies and memories of El Divo de Juárez. {/* Updated subtitle */}
          </Typography>
        </Title>

        <GaleriaContainer
          initial={{ opacity: 0, x: -100 }} // Slide from left
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 50 }} // Spring animation
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

        {/* Removed ButtonContainer and FloreceButton */}
      </Container>
    </GaleriaSection>
  );
}

export default JuanGabrielAlbum;

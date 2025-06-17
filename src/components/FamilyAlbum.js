import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material'; // Removed Box
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Navigation, Autoplay } from 'swiper/modules'; // Added EffectFade
import 'swiper/css';
import 'swiper/css/effect-fade'; // Added CSS for EffectFade
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
  background-image: url('/imagenes/family/family-bg.jpg'); // Specific background for Family
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
    rgba(100, 100, 150, 0.6) 0%, /* Light blue/purple overlay for Family */
    rgba(150, 100, 100, 0.4) 100%
  );
  z-index: -1;
`;

const Title = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
  z-index: 1;

  h2 {
    font-size: 3.4rem;
    color: #f5f5f5; /* Off-white title */
    font-family: 'Merriweather', serif; /* Different font for Family */
    margin-bottom: 20px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);

    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  }

  .subtitle {
    font-size: 1.15rem;
    color: #e0e0e0; /* Lighter subtitle */
    font-family: 'Open Sans', sans-serif; /* Different font for Family */
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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
    width: 10px;
    height: 10px;
    background-color: #D1C4E9; /* Light purple bullets */
    opacity: 0.8;

    &-active {
      opacity: 1;
      background-color: #B39DDB; /* Darker purple active bullet */
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #7E57C2; /* Deep purple navigation arrows */
    background-color: rgba(230, 230, 250, 0.8); /* Light lavender background for nav */
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
    imagen: '/imagenes/family/1.jpg', // Placeholder
    titulo: 'Family Moment 1',
    descripcion: 'Description for Family Moment 1'
  },
  {
    id: 2,
    imagen: '/imagenes/family/2.jpg', // Placeholder
    titulo: 'Family Moment 2',
    descripcion: 'Description for Family Moment 2'
  },
  // Add more photos as needed
];

function FamilyAlbum() { // Renamed component, removed props
  const parallaxRef = useRef(null);
  const titleRef = useRef(null);
  // Removed button-related state

  // Efecto parallax con GSAP
  useEffect(() => {
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        y: '25%',
        x: '-5%', // Added horizontal movement
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

  // Removed handleFlorecer and handleFloresAmarillas functions

  return (
    <GaleriaSection id="family-album"> {/* Changed id */}
      <ParallaxBackground ref={parallaxRef} />
      <Overlay />

      <Container>
        <Title ref={titleRef}>
          <Typography variant="h2">Family Memories</Typography> {/* Updated title */}
          <Typography className="subtitle">
            Cherished moments with our loved ones. {/* Updated subtitle */}
          </Typography>
        </Title>

        <GaleriaContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <StyledSwiper
            effect={'fade'} // Changed effect to fade
            grabCursor={true}
            centeredSlides={true} // Fade effect typically uses one slide at a time
            slidesPerView={1} // Best for fade effect
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 2800, // Adjusted delay
              disableOnInteraction: false,
            }}
            modules={[EffectFade, Pagination, Navigation, Autoplay]} // Added EffectFade module
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

export default FamilyAlbum;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container, Typography, Button, Box, IconButton } from '@mui/material'; // Added IconButton
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import { Close as CloseIcon, ArrowBackIosNew as ArrowBackIcon, ArrowForwardIos as ArrowForwardIcon } from '@mui/icons-material'; // Added Icons
// Swiper imports removed
import { gsap } from 'gsap'; // Keep for title animation for now
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Keep for title animation for now

gsap.registerPlugin(ScrollTrigger);

const MomentosEternosSection = styled.section` // Renamed
  min-height: 100vh;
  // position: relative; // May not be needed if no overlay/parallax
  // overflow: hidden; // May not be needed
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-negro-fondo); // Use global dark theme
`;

// ParallaxBackground and Overlay removed

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
    color: var(--color-gris-texto); /* Updated color for dark theme */
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

// GaleriaContainer removed, ImageGrid and GridItem take its place.

const ImageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto 0;
`;

const GridItem = styled(motion.div)`
  background-color: var(--color-negro-papel);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 0 15px var(--color-azul-principal);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

// New photo data structure
const momentosData = [
  { id: 1, imagen: '/imagenes/4.jpg', tituloAlt: 'Recuerdo 1', fraseCharly: 'Yendo de la cama al living.' },
  { id: 2, imagen: '/imagenes/5.jpg', tituloAlt: 'Recuerdo 2', fraseCharly: 'Clics modernos llenan el aire.' },
  { id: 3, imagen: '/imagenes/6.jpg', tituloAlt: 'Recuerdo 3', fraseCharly: 'No soy un extraño aquí.' },
  { id: 4, imagen: '/imagenes/7.jpg', tituloAlt: 'Recuerdo 4', fraseCharly: 'Rasguña las piedras...' },
  { id: 5, imagen: '/imagenes/8.jpg', tituloAlt: 'Recuerdo 5', fraseCharly: 'Mientras miro las nuevas olas.' },
  { id: 6, imagen: '/imagenes/9.jpg', tituloAlt: 'Recuerdo 6', fraseCharly: 'Adela en el carrousel.' }
];

function MomentosEternos() { // Renamed, props removed
  // const parallaxRef = useRef(null); // Removed
  const titleRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Removed isButtonAnimating, isFloresAmarillasAnimating states
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.85, y: -50, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  // Animation variants for grid and items
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const openModal = (foto, index) => {
    setSelectedImage(foto);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < momentosData.length) {
      setCurrentIndex(newIndex);
      setSelectedImage(momentosData[newIndex]);
    }
  };

  useEffect(() => {
    // Parallax effect removed
    
    // Animación para el título (can keep for now)
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
  
  // handleFlorecer and handleFloresAmarillas removed
  
  return (
    <MomentosEternosSection id="momentos-eternos"> {/* Renamed and id updated */}
      {/* ParallaxBackground and Overlay removed */}
      
      <Container>
        <Title ref={titleRef}>
          <Typography variant="h2">Momentos Eternos</Typography> {/* Updated title */}
          <Typography className="subtitle">
            ...grabados en el alma. {/* Updated subtitle */}
          </Typography>
        </Title>
        
        <ImageGrid
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {momentosData.map((foto, index) => (
            <GridItem
              key={foto.id}
              variants={itemVariants}
              onClick={() => openModal(foto, index)}
            >
              <img src={foto.imagen} alt={foto.tituloAlt} />
            </GridItem>
          ))}
        </ImageGrid>

        <Box sx={{ textAlign: 'center', marginTop: '50px', marginBottom: '30px' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            Añadir Recuerdo
          </Button>
        </Box>
      </Container>

      <AnimatePresence>
        {selectedImage && (
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // Close on backdrop click
          >
            <ModalContent
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on content
            >
              <CloseButton onClick={closeModal}>
                <CloseIcon />
              </CloseButton>
              <img src={selectedImage.imagen} alt={selectedImage.tituloAlt} />
              <p>{selectedImage.fraseCharly}</p>
              <ModalNavContainer>
                <NavButton onClick={() => navigateImage(-1)} disabled={currentIndex === 0}>
                  <ArrowBackIcon />
                </NavButton>
                <NavButton onClick={() => navigateImage(1)} disabled={currentIndex === momentosData.length - 1}>
                  <ArrowForwardIcon />
                </NavButton>
              </ModalNavContainer>
            </ModalContent>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </MomentosEternosSection>
  );
}

// Styled components for Modal
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled(motion.div)`
  background-color: var(--color-negro-papel);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    max-width: 100%;
    max-height: 65vh;
    object-fit: contain;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  p {
    color: var(--color-blanco-texto);
    font-family: var(--fuente-romantica);
    font-size: 1.8rem;
    margin-top: 10px;
    text-align: center;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute !important;
  top: 15px;
  right: 15px;
  color: var(--color-blanco-texto) !important;
  background-color: rgba(0,0,0,0.3) !important;
  &:hover {
    background-color: rgba(0,0,0,0.5) !important;
  }
`;

const NavButton = styled(IconButton)`
  color: var(--color-blanco-texto) !important;
  background-color: rgba(0,0,0,0.3) !important;
  margin: 0 15px !important;
  &:hover {
    background-color: rgba(0,0,0,0.5) !important;
  }
  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const ModalNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;


export default MomentosEternos; // Renamed export
import React from 'react';
import styled from 'styled-components';
import { Container, Typography, Button, Box } from '@mui/material'; // Common imports
import { motion } from 'framer-motion';

const CositasSection = styled(motion.section)`
  min-height: 100vh;
  background-color: var(--color-negro-fondo);
  color: var(--color-blanco-texto);
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* For decorative elements */
  overflow: hidden; /* If decorative elements might overflow */
`;

// Title styled component (can be similar to other sections)
const TitleWrapper = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
  z-index: 1;

  h2 { /* Assuming main title is h2 */
    font-size: 3.5rem;
    color: var(--color-celeste-pastel); /* Example color */
    margin-bottom: 10px; /* Adjusted margin */
    font-family: var(--fuente-titulo); /* Ensure font is applied */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Softer shadow for dark theme */

    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  }

  .subtitle { /* Assuming subtitle is a p or Typography component */
    font-size: 1.5rem; /* Larger subtitle */
    color: var(--color-gris-texto);
    font-family: var(--fuente-romantica); /* Romantic font for subtitle */
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

function Cositas() {
  // Placeholder for future state and logic

  // Placeholder data for "Mi Historia"
  const cronicasData = [
    { id: 1, text: "Aquí va una frase de rock nacional...", imagePlaceholder: "Reliquia #1" },
    { id: 2, text: "Otra anécdota esperando ser contada...", imagePlaceholder: "Hallazgo #2" },
    { id: 3, text: "Un pensamiento fugaz, ahora eterno...", imagePlaceholder: "Tesoro #3" },
  ];

  // Animation variants for container and card
  const cronicasContainerVariants = { // Corrected rename
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cronicaCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  };

  const decorVariants = {
    float: (i) => ({ // i is a custom prop for varying animation
      y: ["0px", `${5 + i * 2}px`, `${-5 - i * 2}px`, "0px"],
      rotate: [0, i % 2 === 0 ? 5 : -5, i % 2 === 0 ? -5 : 5, 0],
      transition: {
        duration: 8 + i * 1.5, // Vary duration
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    })
  };

  return (
    <CositasSection id="cositas">
      <Container>
        <TitleWrapper
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Typography variant="h2" component="h2">
            Mi Pequeño Infierno Privado
          </Typography>
          <Typography variant="h5" component="p" className="subtitle">
            Crónicas
          </Typography>
        </TitleWrapper>

        <CronicasContainer
          variants={cronicasContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {cronicasData.map(cronica => (
            <CronicaCard key={cronica.id} variants={cronicaCardVariants}>
              <div className="placeholder-image">{cronica.imagePlaceholder}</div>
              <p>{cronica.text}</p>
            </CronicaCard>
          ))}
        </CronicasContainer>

        <MiniReproductorContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }} // Delay after cards
        >
          <div className="album-art">
            <span>YT</span>
          </div>
          <div className="song-info">
            <h4>Canción de Charly (Placeholder)</h4>
            <p>Escuchando en YouTube</p>
          </div>
          <div className="controls">
            <button aria-label="previous"><svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M11.536 12.536a.5.5 0 0 1-.708.708L6 8.707V12.5a.5.5 0 0 1-1 0V3.5a.5.5 0 0 1 1 0v3.793l4.828-4.535a.5.5 0 0 1 .708.708L7.207 8l4.329 4.536z"/></svg></button>
            <button aria-label="play/pause"><svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg></button>
            <button aria-label="next"><svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M4.464 12.536a.5.5 0 0 0 .708.708L10 8.707V12.5a.5.5 0 0 0 1 0V3.5a.5.5 0 0 0-1 0v3.793L5.172 2.465a.5.5 0 0 0-.708.708L8.793 8l-4.329 4.536z"/></svg></button>
          </div>
        </MiniReproductorContainer>

        <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            Subir Mis Cositas
          </Button>
        </Box>
      </Container>
      {/* Decorative Elements */}
      <DecorElement custom={1} variants={decorVariants} animate="float" style={{ top: '15%', left: '10%', fontSize: '2.5rem', opacity: 0.3 }}>✨</DecorElement>
      <DecorElement custom={2} variants={decorVariants} animate="float" style={{ top: '70%', left: '5%', fontSize: '1.5rem', opacity: 0.2, transform: 'rotate(15deg)' }}>⭐</DecorElement>
      <DecorElement custom={3} variants={decorVariants} animate="float" style={{ top: '20%', right: '8%', fontSize: '2rem', opacity: 0.25 }}>🍄</DecorElement>
      <DecorElement custom={4} variants={decorVariants} animate="float" style={{ top: '80%', right: '12%', fontSize: '3rem', opacity: 0.15, transform: 'rotate(-10deg)' }}>🍄</DecorElement>
      <DecorElement custom={5} variants={decorVariants} animate="float" style={{ bottom: '5%', left: '45%', fontSize: '1.8rem', opacity: 0.3 }}>🌟</DecorElement>
    </CositasSection>
  );
}

// Styled components for "Mi Historia"
const CronicasContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px 0;
  width: 100%;
  margin-top: 40px;
`;

const CronicaCard = styled(motion.div)`
  background-color: var(--color-negro-papel);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;

  .placeholder-image {
    width: 100%;
    height: 180px;
    background-color: var(--color-gris-azulado);
    border-radius: 6px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-gris-texto);
    font-size: 1.2rem;
  }

  p {
    color: var(--color-blanco-texto);
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const MiniReproductorContainer = styled(motion.div)`
  background-color: var(--color-negro-papel);
  border-radius: 12px;
  padding: 25px;
  margin-top: 50px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  .album-art {
    width: 80px;
    height: 80px;
    background-color: var(--color-gris-azulado);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-blanco-texto);
    font-size: 1.5rem;
  }

  .song-info {
    flex-grow: 1;
    h4 {
      color: var(--color-celeste-pastel);
      font-family: var(--fuente-texto);
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0 0 5px 0;
    }
    p {
      color: var(--color-gris-texto);
      font-size: 0.9rem;
      margin: 0;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
    button {
      background-color: rgba(173, 216, 230, 0.1); /* Using fixed pastel blue for now */
      color: var(--color-celeste-pastel);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: rgba(173, 216, 230, 0.2);
      }
    }
  }
`;

const DecorElement = styled(motion.div)`
  position: absolute;
  color: var(--color-gris-azulado);
  font-size: 2rem;
  user-select: none;
  pointer-events: none;
  z-index: 0;
`;

export default Cositas;

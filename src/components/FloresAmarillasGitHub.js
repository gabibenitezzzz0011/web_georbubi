import React from 'react';
import styled from 'styled-components';
import { Button, Paper, Typography } from '@mui/material'; // Removed Box
import { motion } from 'framer-motion'; // Import motion

// Single definition for SectionContainer, based on Paper for Material UI features
const SectionContainer = styled(Paper)`
  padding: 50px 30px;
  /* margin is removed here, will be controlled by the motion.div wrapper */
  text-align: center;
  background: linear-gradient(135deg, #fff59d 0%, #ffee58 100%); /* Yellow gradient background */
  border-radius: 20px; /* More rounded corners */
  box-shadow: 0 12px 35px rgba(255, 235, 59, 0.3); /* Yellowish shadow */
  position: relative;
  overflow: hidden;

  /* Adding some subtle flower-like decorative elements */
  &:before, &:after {
    content: '🌼'; /* Using emoji for simplicity, could be SVG or pseudo-elements */
    position: absolute;
    font-size: 3rem;
    opacity: 0.2;
  }

  &:before {
    top: 20px;
    left: 20px;
    transform: rotate(-15deg);
  }

  &:after {
    bottom: 20px;
    right: 20px;
    transform: rotate(15deg);
  }
`;

const Title = styled(Typography)`
  margin-bottom: 25px; /* Increased margin */
  color: #c77700; /* Darker, rich yellow/orange */
  font-family: 'Pacifico', cursive; /* Using a previously chosen playful font */
  font-size: 2.8rem; /* Adjusted font size */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const Description = styled(Typography)`
  margin-bottom: 35px; /* Increased margin */
  color: #8D6E63; /* Softer brownish text */
  font-family: 'Quicksand', sans-serif; /* Using a previously chosen soft font */
  font-size: 1.1rem; /* Adjusted font size */
  line-height: 1.7;
`;

const VisitButton = styled(Button)`
  background: linear-gradient(45deg, #ffc107 30%, #ff8f00 90%); /* Vibrant yellow gradient button */
  color: #424242; /* Dark grey text for contrast */
  padding: 12px 30px; /* Larger padding */
  font-family: 'Roboto', sans-serif; /* Standard, readable font for button */
  font-weight: bold;
  border-radius: 50px; /* Pill-shaped button */
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(45deg, #ffa000 30%, #ff6f00 90%); /* Darker gradient on hover */
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 160, 0, 0.5);
  }
`;

function FloresAmarillasGitHub() {
  return (
    <motion.div // Wrapper for entry animation
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ maxWidth: '700px', margin: '60px auto' }} // Layout styles applied to the wrapper
    >
      <SectionContainer elevation={5}> {/* Original SectionContainer */}
        <Title variant="h3" component="h2">
          Proyecto Flores Amarillas
        </Title>
        <Description variant="body1">
          Sigue el progreso de cómo florece este proyecto especial y observa la magia detrás de las flores amarillas que tanto te gustan. ¡Tu curiosidad es bienvenida!
        </Description>
        <VisitButton
          variant="contained"
          size="large"
          href="https://github.com/DaniCodex/flores-amarillas-tres"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver el Proyecto en GitHub  Código Tres
        </VisitButton>
      </SectionContainer>
    </motion.div>
  );
}

export default FloresAmarillasGitHub;

import React, { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';
import Header from './components/Header';
import Portada from './components/Portada';
import Historia from './components/Historia';
import Galeria from './components/Galeria'; // This will be MomentosEternos
import Cositas from './components/Cositas'; // Import new component
import MensajeFinal from './components/MensajeFinal';
import Petalos from './components/Petalos';
import Flores from './components/Flores';
import FloresAmarillas from './components/FloresAmarillas';
import MusicPlayer from './components/MusicPlayer';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
`;

function App() {
  const [mostrarFlores, setMostrarFlores] = useState(false);
  const [mostrarPetalos, setMostrarPetalos] = useState(true);
  const [mostrarFloresAmarillas, setMostrarFloresAmarillas] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);

  useEffect(() => {
    // Iniciar animación de pétalos al cargar la página
    setMostrarPetalos(true);
  }, []);

  const handleFlorecer = () => {
    setMostrarFlores(true);
    setTimeout(() => setMostrarFlores(false), 15000);
  };
  
  const handleMostrarFloresAmarillas = () => {
    setMostrarFloresAmarillas(true);
    setTimeout(() => setMostrarFloresAmarillas(false), 10000);
  };

  const toggleReproduccion = () => {
    setReproduciendo(!reproduciendo);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <Header />
        
        <Element name="portada">
          <Portada />
        </Element>
        
        <Element name="historia">
          <Historia />
        </Element>
        
        <Element name="galeria">
          <Galeria />
        </Element>
        
        <Element name="cositas"> {/* Add Cositas section */}
          <Cositas />
        </Element>

        <Element name="mensaje">
          <MensajeFinal
            onReproducir={toggleReproduccion}
            reproduciendo={reproduciendo}
            onShowYellowFlowers={handleMostrarFloresAmarillas}
          />
        </Element>
        
        {mostrarPetalos && <Petalos />}
        {mostrarFlores && <Flores />}
        <FloresAmarillas visible={mostrarFloresAmarillas} />
        
        <MusicPlayer reproduciendo={reproduciendo} />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 
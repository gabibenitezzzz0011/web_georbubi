import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const PetalosContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
`;

const Petalo = styled.div`
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.8;
  pointer-events: none;
  transform-origin: center;
`;

function Petalos() {
  const containerRef = useRef(null);
  const petalosRef = useRef([]);
  const animationsRef = useRef([]);
  
  useEffect(() => {
    let isMounted = true;
    const currentContainerRef = containerRef.current;
    if (!currentContainerRef) return;
    
    const colors = ['#ffcad4', '#f4acb7', '#d8bbff', '#f8e9e9', '#ffd1dc'];
    const createPetalos = () => {
      if (!isMounted || !currentContainerRef) return;
      
      // Limpiar pétalos anteriores
      petalosRef.current.forEach(petalo => {
        if (petalo && petalo.parentNode === currentContainerRef) {
          currentContainerRef.removeChild(petalo);
        }
      });
      
      // Limpiar animaciones anteriores
      animationsRef.current.forEach(animation => {
        if (animation) {
          animation.kill();
        }
      });
      
      petalosRef.current = [];
      animationsRef.current = [];
      
      // Crear nuevos pétalos
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          if (!isMounted || !currentContainerRef) return;
          
          const petalo = document.createElement('div');
          const tamaño = Math.random() * 20 + 10; // Entre 10px y 30px
          const posX = Math.random() * window.innerWidth;
          const duracion = Math.random() * 10 + 5; // Entre 5s y 15s
          const color = colors[Math.floor(Math.random() * colors.length)];
          const rotacion = Math.random() * 360;
          const escala = Math.random() * 0.3 + 0.7;
          
          // Estilos del pétalo
          petalo.style.width = `${tamaño}px`;
          petalo.style.height = `${tamaño}px`;
          petalo.style.left = `${posX}px`;
          petalo.style.top = '-50px';
          petalo.style.backgroundColor = color;
          petalo.style.borderRadius = '50% 0 50% 0';
          petalo.style.transform = `rotate(${rotacion}deg) scale(${escala})`;
          petalo.style.position = 'absolute';
          petalo.style.opacity = '0';
          
          currentContainerRef.appendChild(petalo);
          petalosRef.current.push(petalo);
          
          // Animación con GSAP
          const timeline = gsap.timeline();
          
          timeline
            .to(petalo, {
              opacity: Math.random() * 0.5 + 0.3,
              duration: 0.5
            })
            .to(petalo, {
              y: window.innerHeight + 100,
              x: `+=${Math.random() * 200 - 100}`,
              rotation: `+=${Math.random() * 360 - 180}`,
              duration: duracion,
              ease: 'none',
              onComplete: () => {
                if (isMounted && currentContainerRef && petalo.parentNode === currentContainerRef) {
                  currentContainerRef.removeChild(petalo);
                  
                  // Eliminar referencias para evitar memory leaks
                  const index = petalosRef.current.indexOf(petalo);
                  if (index !== -1) {
                    petalosRef.current.splice(index, 1);
                    animationsRef.current.splice(index, 1);
                  }
                }
              }
            }, '-=0.5');
          
          // Añadir oscilación horizontal
          gsap.to(petalo, {
            x: `+=${Math.random() * 100 - 50}`,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
          
          // Añadir rotación continua
          gsap.to(petalo, {
            rotation: `+=${Math.random() * 360}`,
            duration: Math.random() * 10 + 5,
            repeat: -1,
            ease: 'sine.inOut'
          });
          
          animationsRef.current.push(timeline);
        }, i * 300);
      }
    };
    
    // Crear pétalos iniciales
    createPetalos();
    
    // Crear nuevos pétalos cada 15 segundos
    const interval = setInterval(createPetalos, 15000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
      
      // Limpiar todas las animaciones
      animationsRef.current.forEach(animation => {
        if (animation) {
          animation.kill();
        }
      });
      
      // Limpiar todos los pétalos
      if (currentContainerRef) {
        petalosRef.current.forEach(petalo => {
          if (petalo && petalo.parentNode === currentContainerRef) {
            currentContainerRef.removeChild(petalo);
          }
        });
      }
    };
  }, []);
  
  return <PetalosContainer ref={containerRef} />;
}

export default Petalos; 
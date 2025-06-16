import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const FloresContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;
`;

function Flores() {
  const containerRef = useRef(null);
  const floresRef = useRef([]);
  const animationsRef = useRef([]);
  
  useEffect(() => {
    // Verificar que el componente esté montado
    let isMounted = true;
    const currentContainerRef = containerRef.current;
    
    // Definir tipos de flores
    const tiposFlores = [
      {
        color: '#ffcad4',
        bordeColor: '#f4acb7',
        petalos: 5
      },
      {
        color: '#d8bbff',
        bordeColor: '#c9a0dc',
        petalos: 6
      },
      {
        color: '#d4af37',
        bordeColor: '#c09c2c',
        petalos: 8
      }
    ];
    
    // Crear una flor SVG
    const crearFlorSVG = (tipo) => {
      const { color, bordeColor, petalos } = tipo;
      
      // Crear elemento SVG
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      
      // Crear centro de la flor
      const centro = document.createElementNS(svgNS, "circle");
      centro.setAttribute('cx', '50');
      centro.setAttribute('cy', '50');
      centro.setAttribute('r', '12');
      centro.setAttribute('fill', bordeColor);
      svg.appendChild(centro);
      
      // Crear pétalos
      const anguloIncremento = (2 * Math.PI) / petalos;
      
      for (let i = 0; i < petalos; i++) {
        const angulo = i * anguloIncremento;
        const x1 = 50 + 30 * Math.cos(angulo);
        const y1 = 50 + 30 * Math.sin(angulo);
        
        const petalo = document.createElementNS(svgNS, "ellipse");
        petalo.setAttribute('cx', x1);
        petalo.setAttribute('cy', y1);
        petalo.setAttribute('rx', '18');
        petalo.setAttribute('ry', '10');
        petalo.setAttribute('fill', color);
        petalo.setAttribute('stroke', bordeColor);
        petalo.setAttribute('stroke-width', '1');
        petalo.setAttribute('transform', `rotate(${(angulo * 180) / Math.PI + 90}, ${x1}, ${y1})`);
        
        svg.appendChild(petalo);
      }
      
      return svg;
    };
    
    // Crear flores
    const crearFlores = () => {
      // Verificar que el componente esté montado
      if (!isMounted || !currentContainerRef) return;
      
      // Limpiar flores anteriores
      floresRef.current.forEach(flor => {
        if (flor && currentContainerRef && flor.parentNode === currentContainerRef) {
          currentContainerRef.removeChild(flor);
        }
      });
      
      // Limpiar animaciones anteriores
      animationsRef.current.forEach(animation => {
        if (animation) {
          animation.kill();
        }
      });
      
      floresRef.current = [];
      animationsRef.current = [];
      
      // Crear nuevas flores
      const anchoPantalla = window.innerWidth;
      
      for (let i = 0; i < 20; i++) {
        const posX = (anchoPantalla / 20) * i + Math.random() * 20;
        
        setTimeout(() => {
          if (!isMounted || !currentContainerRef) return;
          
          // Contenedor de la flor
          const florContainer = document.createElement('div');
          const tamaño = Math.random() * 40 + 30; // Entre 30px y 70px
          const tipoFlor = tiposFlores[Math.floor(Math.random() * tiposFlores.length)];
          
          // Estilos del contenedor
          florContainer.style.position = 'absolute';
          florContainer.style.width = `${tamaño}px`;
          florContainer.style.height = `${tamaño}px`;
          florContainer.style.left = `${posX}px`;
          florContainer.style.bottom = `-${tamaño}px`;
          florContainer.style.opacity = '0';
          florContainer.style.transformOrigin = 'center bottom';
          
          // Crear SVG de la flor
          const florSVG = crearFlorSVG(tipoFlor);
          florContainer.appendChild(florSVG);
          
          currentContainerRef.appendChild(florContainer);
          floresRef.current.push(florContainer);
          
          // Animación con GSAP
          const timeline = gsap.timeline();
          
          timeline
            .to(florContainer, {
              bottom: `${Math.random() * 20 + 10}%`,
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out'
            })
            .to(florContainer, {
              rotation: Math.random() * 10 - 5,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            }, '-=1')
            .to(florContainer, {
              scale: 1.1,
              duration: 1.5,
              ease: 'power2.out'
            }, '-=2');
          
          // Añadir oscilación suave
          gsap.to(florContainer, {
            x: `+=${Math.random() * 20 - 10}`,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
          
          // Desvanecer después de un tiempo
          gsap.to(florContainer, {
            opacity: 0,
            scale: 0.8,
            duration: 1.5,
            delay: 8,
            ease: 'power2.in',
            onComplete: () => {
              if (isMounted && currentContainerRef && florContainer.parentNode === currentContainerRef) {
                currentContainerRef.removeChild(florContainer);
                
                // Eliminar referencias para evitar memory leaks
                const index = floresRef.current.indexOf(florContainer);
                if (index !== -1) {
                  floresRef.current.splice(index, 1);
                  animationsRef.current.splice(index, 1);
                }
              }
            }
          });
          
          animationsRef.current.push(timeline);
        }, i * 100);
      }
    };
    
    // Crear flores iniciales
    crearFlores();
    
    return () => {
      // Marcar que el componente está desmontado
      isMounted = false;
      
      // Limpiar todas las animaciones
      animationsRef.current.forEach(animation => {
        if (animation) {
          animation.kill();
        }
      });
      
      // Limpiar todas las flores
      if (currentContainerRef) {
        floresRef.current.forEach(flor => {
          if (flor && flor.parentNode === currentContainerRef) {
            currentContainerRef.removeChild(flor);
          }
        });
      }
    };
  }, []);
  
  return <FloresContainer ref={containerRef} />;
}

export default Flores; 
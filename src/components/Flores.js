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
      { color: 'var(--color-celeste-pastel)', bordeColor: 'var(--color-blanco-texto)', petalos: 7, centroColor: 'var(--color-azul-principal)' },
      { color: 'var(--color-azul-principal)', bordeColor: 'var(--color-celeste-pastel)', petalos: 5, centroColor: 'var(--color-blanco-texto)' },
      { color: 'rgba(255, 255, 255, 0.8)', bordeColor: 'var(--color-celeste-pastel)', petalos: 6, centroColor: 'var(--color-azul-principal)' }
    ];
    
    // Crear una flor SVG
    const crearFlorSVG = (tipo) => {
      const { color, bordeColor, petalos, centroColor } = tipo; // Added centroColor
      
      // Crear elemento SVG
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      
      const anguloIncremento = (2 * Math.PI) / petalos;

      // Capa de pétalos trasera (más pequeña, ligeramente desfasada)
      const radioCapaTrasera = 20;
      const rxTrasero = 15;
      const ryTrasero = 8;
      for (let i = 0; i < petalos; i++) {
        const angulo = i * anguloIncremento + (anguloIncremento / 3); // Desfase
        const x1 = 50 + radioCapaTrasera * Math.cos(angulo);
        const y1 = 50 + radioCapaTrasera * Math.sin(angulo);

        const petaloTrasero = document.createElementNS(svgNS, "ellipse");
        petaloTrasero.setAttribute('cx', x1);
        petaloTrasero.setAttribute('cy', y1);
        petaloTrasero.setAttribute('rx', `${rxTrasero}`);
        petaloTrasero.setAttribute('ry', `${ryTrasero}`);
        petaloTrasero.setAttribute('fill', color); // Mismo color base
        petaloTrasero.setAttribute('fill-opacity', '0.6'); // Más transparente
        petaloTrasero.setAttribute('stroke', bordeColor);
        petaloTrasero.setAttribute('stroke-width', '0.5');
        petaloTrasero.setAttribute('transform', `rotate(${(angulo * 180) / Math.PI + 90}, ${x1}, ${y1})`);
        svg.appendChild(petaloTrasero);
      }

      // Crear pétalos principales
      const radioPrincipal = 30;
      const rxPrincipal = 18;
      const ryPrincipal = 10;
      for (let i = 0; i < petalos; i++) {
        const angulo = i * anguloIncremento;
        const x1 = 50 + radioPrincipal * Math.cos(angulo);
        const y1 = 50 + radioPrincipal * Math.sin(angulo);
        
        const petalo = document.createElementNS(svgNS, "ellipse");
        petalo.setAttribute('cx', x1);
        petalo.setAttribute('cy', y1);
        petalo.setAttribute('rx', `${rxPrincipal}`);
        petalo.setAttribute('ry', `${ryPrincipal}`);
        petalo.setAttribute('fill', color);
        petalo.setAttribute('stroke', bordeColor);
        petalo.setAttribute('stroke-width', '1');
        petalo.setAttribute('transform', `rotate(${(angulo * 180) / Math.PI + 90}, ${x1}, ${y1})`);
        svg.appendChild(petalo);
      }
      
      // Crear centro de la flor (encima de todo)
      const centro = document.createElementNS(svgNS, "circle");
      centro.setAttribute('cx', '50');
      centro.setAttribute('cy', '50');
      centro.setAttribute('r', '12');
      centro.setAttribute('fill', centroColor || bordeColor); // Usar centroColor o fallback a bordeColor
      svg.appendChild(centro);

      // Pequeño detalle en el centro
      const detalleCentro = document.createElementNS(svgNS, "circle");
      detalleCentro.setAttribute('cx', '50');
      detalleCentro.setAttribute('cy', '50');
      detalleCentro.setAttribute('r', '6');
      detalleCentro.setAttribute('fill', color);
      detalleCentro.setAttribute('fill-opacity', '0.5');
      svg.appendChild(detalleCentro);

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
          florContainer.style.bottom = `-${tamaño * 1.5}px`; // Ensure fully hidden
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
              bottom: `${Math.random() * 20 + 10}%`, // Keep random height
              opacity: 1,
              rotation: `random(-15, 15)`, // Add random rotation
              duration: 1.8, // New duration
              ease: 'back.out(1.7)' // New ease
            })
            .to(florContainer, {
              rotation: `random(-10, 10)`, // Keep sway, adjust range if needed
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
            delay: 12, // Increased delay
            ease: 'power2.inOut', // Changed ease
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
        }, i * 200); // Increased stagger
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
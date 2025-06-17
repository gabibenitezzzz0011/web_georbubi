// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false
    });

    // Efecto de máquina de escribir para el título principal
    const titulo = document.getElementById('titulo-principal');
    new Typed('#titulo-principal', {
        strings: [titulo.textContent],
        typeSpeed: 50,
        startDelay: 1000,
        showCursor: false,
        onComplete: function() {
            titulo.style.borderRight = 'none';
        }
    });

    // Scroll suave para navegación
    const btnScroll = document.querySelector('.btn-scroll');
    if (btnScroll) {
        btnScroll.addEventListener('click', function() {
            const historiaSection = document.getElementById('historia');
            historiaSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Función para crear pétalos cayendo
    function crearPetalos() {
        const petalosContainer = document.getElementById('petalos-container');
        const colores = ['#ffcad4', '#f4acb7', '#d8bbff', '#f8e9e9', '#ffd1dc'];
        
        // Crear 30 pétalos
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const petalo = document.createElement('div');
                petalo.classList.add('petalo');
                
                // Estilos aleatorios para cada pétalo
                const tamaño = Math.random() * 20 + 10; // Entre 10px y 30px
                const posX = Math.random() * window.innerWidth;
                const duracion = Math.random() * 10 + 5; // Entre 5s y 15s
                const color = colores[Math.floor(Math.random() * colores.length)];
                
                petalo.style.width = `${tamaño}px`;
                petalo.style.height = `${tamaño}px`;
                petalo.style.left = `${posX}px`;
                petalo.style.backgroundColor = color;
                petalo.style.borderRadius = '50% 0 50% 0';
                petalo.style.transform = `rotate(${Math.random() * 360}deg)`;
                petalo.style.animation = `caida ${duracion}s linear infinite`;
                petalo.style.animationDelay = `${Math.random() * 5}s`;
                
                petalosContainer.appendChild(petalo);
                
                // Eliminar el pétalo después de un tiempo para no sobrecargar el DOM
                setTimeout(() => {
                    petalo.remove();
                }, duracion * 1000);
            }, i * 300);
        }
    }

    // Iniciar animación de pétalos cayendo cada 15 segundos
    crearPetalos();
    setInterval(crearPetalos, 15000);

    // Función para crear flores
    function crearFlor(x) {
        const floresContainer = document.getElementById('flores-container');
        const flor = document.createElement('div');
        flor.classList.add('flor');
        
        // Estilos para la flor
        const tamaño = Math.random() * 40 + 30; // Entre 30px y 70px
        const tipo = Math.floor(Math.random() * 3); // 3 tipos de flores
        
        flor.style.width = `${tamaño}px`;
        flor.style.height = `${tamaño}px`;
        flor.style.left = `${x}px`;
        
        // Crear pétalos de la flor con pseudo-elementos y CSS
        if (tipo === 0) {
            // Flor rosa
            flor.style.backgroundColor = '#ffcad4';
            flor.style.borderRadius = '50%';
            flor.style.boxShadow = '0 0 0 10px #f4acb7, 0 0 0 20px #ffcad4';
        } else if (tipo === 1) {
            // Flor lila
            flor.style.backgroundColor = '#d8bbff';
            flor.style.borderRadius = '50%';
            flor.style.boxShadow = '0 0 0 10px #c9a0dc, 0 0 0 20px #d8bbff';
        } else {
            // Flor dorada
            flor.style.backgroundColor = '#d4af37';
            flor.style.borderRadius = '50%';
            flor.style.boxShadow = '0 0 0 10px #c09c2c, 0 0 0 20px #d4af37';
        }
        
        floresContainer.appendChild(flor);
        
        // Animar la flor para que "florezca"
        setTimeout(() => {
            flor.style.transform = 'translateY(-100px) scale(1)';
            flor.style.opacity = '1';
        }, 100);
        
        // Eliminar la flor después de un tiempo
        setTimeout(() => {
            flor.style.opacity = '0';
            setTimeout(() => {
                flor.remove();
            }, 2000);
        }, 10000);
    }

    // Botón para hacer florecer la página
    const btnFlorecer = document.getElementById('btn-florecer');
    if (btnFlorecer) {
        btnFlorecer.addEventListener('click', function() {
            // Crear 20 flores distribuidas por la parte inferior de la pantalla
            const anchoPantalla = window.innerWidth;
            for (let i = 0; i < 20; i++) {
                const posX = (anchoPantalla / 20) * i + Math.random() * 20;
                setTimeout(() => {
                    crearFlor(posX);
                }, i * 100);
            }
        });
    }

    // Reproducir/pausar canción
    const btnCancion = document.getElementById('btn-cancion');
    const cancion = document.getElementById('cancion');
    
    if (btnCancion && cancion) {
        btnCancion.addEventListener('click', function() {
            if (cancion.paused) {
                cancion.play();
                btnCancion.textContent = 'Pausar nuestra canción';
            } else {
                cancion.pause();
                btnCancion.textContent = 'Reproducir nuestra canción';
            }
        });
    }

    // Efecto parallax al hacer scroll
    // window.addEventListener('scroll', function() {
    //     const parallaxElements = document.querySelectorAll('.parallax-bg');
    //     parallaxElements.forEach(element => {
    //         const scrollPosition = window.pageYOffset;
    //         element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    //     });
    // });
}); 
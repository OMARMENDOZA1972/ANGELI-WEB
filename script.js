document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DE LA SIDEBAR ---
    const menuButton = document.querySelector('.hamburger-btn');
    const sidebarNav = document.getElementById('sidebar-nav');
    const navLinks = sidebarNav.querySelectorAll('a');

    function toggleMenu() {
        const isOpen = sidebarNav.classList.toggle('is-open');
        menuButton.setAttribute('aria-expanded', isOpen);
    }

    menuButton.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebarNav.classList.contains('is-open')) {
                toggleMenu(); 
            }
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = sidebarNav.contains(event.target);
        const isClickOnButton = menuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && sidebarNav.classList.contains('is-open')) {
            toggleMenu(); 
        }
    });

    // --- 2. LÓGICA DEL LIGHTBOX DE FOTOS ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    // Nuevo selector para el botón de cierre del modal de fotos
    const photoCloseButton = document.querySelector('#lightbox .lightbox-close-btn'); 
    const photoItems = document.querySelectorAll('.photo-item img');

    // Función para abrir el lightbox de fotos
    photoItems.forEach(img => {
        img.addEventListener('click', () => {
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');
            
            // 1. Asigna la fuente y el alt a la imagen del modal
            lightboxImage.setAttribute('src', imgSrc);
            lightboxImage.setAttribute('alt', imgAlt);
            
            // 2. Muestra el modal
            lightbox.classList.add('is-visible');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; 
        });
    });

    // Función para cerrar el lightbox de FOTOS
    function closePhotoLightbox() {
        lightbox.classList.remove('is-visible');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; 
    }

    // 1. Cierra con el botón 'X'
    photoCloseButton.addEventListener('click', closePhotoLightbox);

    // 2. Cierra haciendo clic fuera de la imagen
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closePhotoLightbox();
        }
    });

    // --- 3. LÓGICA DEL LIGHTBOX DE VIDEOS ---
    const videoLightbox = document.getElementById('video-lightbox');
    const lightboxIframe = document.getElementById('lightbox-iframe'); 
    const videoCloseButton = document.querySelector('.video-close-btn');
    const videoItems = document.querySelectorAll('.video-item');

    // Función para abrir el lightbox de videos
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video-src');
            
            // Asigna la fuente al IFRAME con autoplay
            lightboxIframe.setAttribute('src', videoSrc + '?autoplay=1');
            
            // Muestra el modal
            videoLightbox.classList.add('is-visible');
            videoLightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; 
        });
    });

    // Función para cerrar el lightbox de videos
    function closeVideoLightbox() {
        // DETENER LA REPRODUCCIÓN: borramos el src del iframe
        lightboxIframe.setAttribute('src', ''); 
        
        videoLightbox.classList.remove('is-visible');
        videoLightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; 
    }

    // 1. Cierra con el botón 'X'
    videoCloseButton.addEventListener('click', closeVideoLightbox);

    // 2. Cierra haciendo clic fuera del video
    videoLightbox.addEventListener('click', (event) => {
        if (event.target === videoLightbox) {
            closeVideoLightbox();
        }
    });

    // --- 4. LÓGICA DE CIERRE GLOBAL CON ESC ---
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
             // Si el modal de fotos está abierto, ciérralo
             if (lightbox.classList.contains('is-visible')) {
                closePhotoLightbox();
             } 
             // Si el modal de video está abierto, ciérralo
             else if (videoLightbox.classList.contains('is-visible')) {
                closeVideoLightbox();
             }
        }
    });
});
// --- 5. LÓGICA DEL SLIDER DE HISTORIA ---
    const slider = document.querySelector('.history-slider');
    const sliderTrack = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide-item');
    const prevButton = slider.querySelector('.slider-prev');
    const nextButton = slider.querySelector('.slider-next');
    const dotsContainer = slider.querySelector('.slider-dots');
    let currentIndex = 0;
    const slideCount = slides.length;

    // 1. Crear Puntos Indicadores
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
    }
    const dots = slider.querySelectorAll('.dot');

    // 2. Función para mover el slider
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1; // Volver al último
        } else if (index >= slideCount) {
            index = 0; // Volver al primero
        }

        currentIndex = index;
        const offset = -currentIndex * 100;
        sliderTrack.style.transform = `translateX(${offset}%)`;
        
        // Actualizar puntos
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // 3. Inicializar y Eventos de Botones
    goToSlide(0); // Mostrar la primera slide al cargar

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // 4. Autoplay (Opcional, pero sugerido)
    let autoSlide = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000); // Cambia cada 5 segundos

    // Pausar el autoplay al interactuar con el slider
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
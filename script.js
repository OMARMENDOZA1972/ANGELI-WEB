document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de la Sidebar (MANTENER CÓDIGO EXISTENTE) ---
    // ... (El código de toggleMenu, menuButton y navLinks debe permanecer igual) ...
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


    // --- Lógica del Lightbox/Modal de Fotos (MANTENER CÓDIGO EXISTENTE) ---
    // ... (El código de lightbox, lightboxImage, closeButton para FOTOS debe permanecer igual) ...
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const photoCloseButton = document.querySelector('.lightbox-close-btn'); // Asume que este es el botón de la foto
    const photoItems = document.querySelectorAll('.photo-item img');

    // Función para abrir el lightbox de FOTOS
    photoItems.forEach(img => {
        img.addEventListener('click', () => {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt');
            
            lightboxImage.setAttribute('src', src);
            lightboxImage.setAttribute('alt', alt);
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

    photoCloseButton.addEventListener('click', closePhotoLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closePhotoLightbox();
        }
    });

    // --- Lógica del Lightbox/Modal de VIDEOS (AÑADIR ESTO) ---
    const videoLightbox = document.getElementById('video-lightbox');
    const lightboxVideoElement = document.getElementById('lightbox-video');
    const videoCloseButton = document.querySelector('.video-close-btn'); // Nuevo selector
    const videoItems = document.querySelectorAll('.video-item');

    // Función para abrir el lightbox de videos
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video-src');
            
            // 1. Asigna la fuente al elemento <source> del video modal
            lightboxVideoElement.querySelector('source').setAttribute('src', videoSrc);
            
            // 2. Carga el nuevo video (necesario para que <video> sepa que la fuente cambió)
            lightboxVideoElement.load();
            
            // 3. Muestra el modal
            videoLightbox.classList.add('is-visible');
            videoLightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; 
            
            // 4. Asegúrate de que empiece a reproducirse (autoplay en HTML es a veces bloqueado, esto lo fuerza)
            lightboxVideoElement.play();
        });
    });

    // Función para cerrar el lightbox de videos
    function closeVideoLightbox() {
        // Pausa el video para evitar que se siga reproduciendo en segundo plano
        lightboxVideoElement.pause();
        
        videoLightbox.classList.remove('is-visible');
        videoLightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; 
        
        // Opcional: Remueve la fuente para liberar memoria (puede ser útil)
        lightboxVideoElement.querySelector('source').setAttribute('src', '');
        lightboxVideoElement.load();
    }

    // 1. Cierra con el botón 'X'
    videoCloseButton.addEventListener('click', closeVideoLightbox);

    // 2. Cierra haciendo clic fuera del video
    videoLightbox.addEventListener('click', (event) => {
        if (event.target === videoLightbox) {
            closeVideoLightbox();
        }
    });

    // 3. Cierra con la tecla ESC (Se debe añadir a la lógica de keydown global)
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
// (Navbar "sticky") ---
    window.addEventListener('scroll', function() {
        var nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // (Menu Hamburger) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navbarLinks = document.getElementById('navbar-links');
    const navLinks = document.querySelectorAll('.nav-link'); 

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('open');
        navbarLinks.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarLinks.classList.contains('open')) {
                menuToggle.classList.remove('open');
                navbarLinks.classList.remove('open');
                document.body.classList.remove('no-scroll');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // (Carrossel de Imagens) ---
    const carouselSlides = document.getElementById('carouselSlides');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideInterval = 5000; 

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        const offset = -currentSlide * 100;
        carouselSlides.style.transform = `translateX(${offset}%)`;
    }

    function changeSlide(direction) {
        showSlide(currentSlide + direction);
    }

    let autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, slideInterval);

    carouselSlides.addEventListener('mouseover', () => {
        clearInterval(autoPlayInterval);
    });

    carouselSlides.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            changeSlide(1);
        }, slideInterval);
    });

    showSlide(currentSlide); // Inicializa o primeiro slide

    // --- (Carrossel de Serviços) ---
const servicesCarouselSlides = document.getElementById('servicesCarouselSlides');
const serviceCards = document.querySelectorAll('.service-card');
let currentServiceSlide = 0;

// Constantes para o carrossel
const cardsPerViewDesktop = 3; // Quantos cards visíveis no desktop
const cardsPerViewTablet = 2;  // Quantos cards visíveis no tablet
const cardsPerViewMobile = 1;  // Quantos cards visíveis no mobile

// Tempo do autoplay (7000ms = 7 segundos)
const serviceSlideInterval = 3000; 

// Helper: Pega quantos cards devem estar visíveis
function getCardsPerView() {
    if (window.innerWidth <= 600) {
        return cardsPerViewMobile;
    } else if (window.innerWidth <= 1024) {
        return cardsPerViewTablet;
    }
    return cardsPerViewDesktop;
}

// Helper: Atualiza a posição (transform)
function updateServiceCarouselTransform() {
    if (serviceCards.length === 0) return; // Evita erro se não houver cards

    const firstCard = serviceCards[0];
    const cardStyle = window.getComputedStyle(firstCard);
    const cardWidth = firstCard.offsetWidth; // Largura real do card (ex: 340px)
    const cardMarginRight = parseFloat(cardStyle.marginRight); // Pega a margem (ex: 20px)

    const moveAmount = cardWidth + cardMarginRight; // Distância total para mover por card (ex: 360px)
    const offset = currentServiceSlide * moveAmount;
    
    servicesCarouselSlides.style.transform = `translateX(-${offset}px)`;
}

// Função principal: Mostra o slide (com limites)
function showServiceSlide(index) {
    const cardsPerView = getCardsPerView();
    const totalCards = serviceCards.length;

    // Ajusta o limite máximo para não mostrar "espaço vazio" no final
    // O último índice possível é (total de cards - quantos estão na tela)
    const maxSlideIndex = totalCards - cardsPerView;

    if (index > maxSlideIndex) {
        currentServiceSlide = 0; // Volta para o início
    } else if (index < 0) {
        currentServiceSlide = maxSlideIndex; // Vai para o final
    } else {
        currentServiceSlide = index;
    }
    updateServiceCarouselTransform();
}

// Função para os botões: Muda o slide
function changeServiceSlide(direction) {
    // A lógica de `showServiceSlide` já cuida dos limites
    showServiceSlide(currentServiceSlide + direction);
}

// --- LÓGICA DO AUTOPLAY (Movimento Sozinho) ---

// 1. Inicia o intervalo de autoplay
let serviceAutoPlayInterval = setInterval(() => {
    changeServiceSlide(1); // Avança 1 card
}, serviceSlideInterval);

// 2. Pausa o autoplay quando o mouse está sobre o carrossel
servicesCarouselSlides.addEventListener('mouseover', () => {
    clearInterval(serviceAutoPlayInterval);
});

// 3. Retoma o autoplay quando o mouse sai
servicesCarouselSlides.addEventListener('mouseleave', () => {
    serviceAutoPlayInterval = setInterval(() => {
        changeServiceSlide(1);
    }, serviceSlideInterval);
});

// --- FIM DA LÓGICA DO AUTOPLAY ---

// Atualiza o carrossel quando a janela é redimensionada
window.addEventListener('resize', () => {
    // Apenas recalcula a posição atual para evitar quebra de layout
    updateServiceCarouselTransform(); 
});

// Inicializa o carrossel de serviços na posição correta
showServiceSlide(currentServiceSlide);
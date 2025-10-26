// (Navbar "sticky") ---
window.addEventListener('scroll', function () {
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

menuToggle.addEventListener('click', function () {
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

// Tempo do autoplay (7000ms = 7 segundos)
const serviceSlideInterval = 7000;

// Helper: Pega quantos cards devem estar visíveis
function getCardsPerView() {
    // Apenas 1 card por vez no mobile (largura <= 600px)
    if (window.innerWidth <= 600) {
        return 1; // 1 card por vez no mobile
    } else if (window.innerWidth <= 1024) {
        return 2; // 2 cards por vez no tablet
    }
    return 3; // 3 cards por vez no desktop
}

// Helper: Atualiza a posição (transform)
function updateServiceCarouselTransform() {
    if (serviceCards.length === 0) return;

    // Pegamos as dimensões do primeiro card
    const firstCard = serviceCards[0];
    const cardStyle = window.getComputedStyle(firstCard);
    const cardWidth = firstCard.offsetWidth;
    const cardMarginRight = parseFloat(cardStyle.marginRight);

    // Calculamos o quanto devemos mover
    // Se for mobile, move sempre a largura de UM card + sua margem
    // Se não for mobile, a lógica de moveAmount * currentServiceSlide continua funcionando com base nos cardsPerView do CSS
    const moveAmount = cardWidth + cardMarginRight;
    const offset = currentServiceSlide * moveAmount;

    servicesCarouselSlides.style.transform = `translateX(-${offset}px)`;
}

// Função principal: Mostra o slide (com limites)
function showServiceSlide(index) {
    const cardsPerView = getCardsPerView(); // Pega a quantidade correta para a tela atual
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

let serviceAutoPlayInterval = setInterval(() => {
    changeServiceSlide(1);
}, serviceSlideInterval);

servicesCarouselSlides.addEventListener('mouseover', () => {
    clearInterval(serviceAutoPlayInterval);
});

servicesCarouselSlides.addEventListener('mouseleave', () => {
    serviceAutoPlayInterval = setInterval(() => {
        changeServiceSlide(1);
    }, serviceSlideInterval);
});

// --- FIM DA LÓGICA DO AUTOPLAY ---

// Atualiza o carrossel quando a janela é redimensionada
window.addEventListener('resize', () => {
    // Recalcula a posição atual para evitar quebra de layout e recalcula cardsPerView
    showServiceSlide(currentServiceSlide);
});

// Inicializa o carrossel de serviços na posição correta
showServiceSlide(currentServiceSlide);

/* ===================
   SCRIPT PARA CARDS DO MAPA
==================== */
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os elementos necessários
    const markers = document.querySelectorAll('.mapa-marker');
    const cards = document.querySelectorAll('.mapa-card');
    const closeButtons = document.querySelectorAll('.mapa-card-close');

    // Função para esconder todas as caixas
    function hideAllCards() {
        cards.forEach(card => {
            card.classList.remove('show');
        });
    }

    // 1. Adiciona o evento de clique em cada MARCADOR
    markers.forEach(marker => {
        marker.addEventListener('click', (e) => {
            e.preventDefault();

            // Pega o ID do card alvo (ex: "card-mg")
            const targetId = marker.dataset.target;
            const targetCard = document.getElementById(targetId);

            // Esconde todos os cards ANTES de mostrar o novo
            hideAllCards();

            // Mostra o card clicado
            if (targetCard) {
                targetCard.classList.add('show');
            }
        });
    });

    // 2. Adiciona o evento de clique em cada BOTÃO DE FECHAR
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Encontra o card "pai" mais próximo e o esconde
            button.closest('.mapa-card').classList.remove('show');
        });
    });

    // 3. (BÔNUS) Fechar ao clicar fora do card
    document.addEventListener('click', (e) => {
        // Checa se o clique foi fora de um card E fora de um marcador
        if (!e.target.closest('.mapa-card') && !e.target.closest('.mapa-marker')) {
            hideAllCards();
        }
    });

});
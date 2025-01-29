// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Redirect to Buy Now in a New Tab
function redirectToBuy() {
    window.open("https://dexscreener.com/solana/00000000000000000000000", "_blank"); 
}

// Copy Contract Address
function copyAddress() {
    const copyText = document.getElementById("contract-address");
    const textArea = document.createElement("textarea");
    textArea.value = copyText.textContent || copyText.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Cambiar el texto del botón para indicar que se copió
    const copyButton = document.querySelector(".copy-button");
    copyButton.textContent = "Copied!";
    setTimeout(() => {
        copyButton.textContent = "Copy Address";
    }, 2000);
}

// Floating Button Confetti Effect
const floatingButton = document.getElementById('floating-button');

// Function to create a confetti particle
function createConfetti(x, y) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.textContent = ['*', '-', '/'][Math.floor(Math.random() * 3)]; // Random symbol
    confetti.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`; // Random color
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => confetti.remove(), 1000);
}

// Function to generate multiple confetti particles
function generateConfetti(e) {
    const { clientX: x, clientY: y } = e;

    for (let i = 0; i < 20; i++) {
        createConfetti(x + Math.random() * 30 - 15, y + Math.random() * 30 - 15);
    }
}

// Hover and click events for floating button
if (floatingButton) {
    floatingButton.addEventListener('mouseover', generateConfetti);
    floatingButton.addEventListener('click', generateConfetti);
}

// Section Fade-in Animation on Scroll
const sections = document.querySelectorAll('section');

if (sections.length > 0) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-in-out';
        observer.observe(section);
    });
}

// Image Animation for Quotes Section
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.animated-img');
    window.addEventListener('scroll', () => {
        images.forEach(image => {
            if (image.getBoundingClientRect().top < window.innerHeight) {
                image.classList.add('visible');
            }
        });
    });
});

// Interactivity in the FAQ
document.querySelectorAll('.faq-section dt').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const arrowIcon = question.querySelector('.arrow-icon');

        // Toggle visibility of the answer
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            arrowIcon.textContent = '▼';
        } else {
            answer.style.display = 'block';
            arrowIcon.textContent = '▲';
        }
    });
});

// Elementos del carrusel
const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentIndex = 0;

// Duplicar elementos para un efecto infinito
const images = Array.from(track.children);
images.forEach((image) => {
  const clone = image.cloneNode(true);
  track.appendChild(clone);
});

// Actualizar el carrusel
const updateCarousel = () => {
  const width = track.querySelector('.carousel-image').clientWidth;
  track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
  track.style.transform = `translateX(-${currentIndex * width}px)`;

  // Reiniciar sin transición al final o al inicio
  if (currentIndex === -1) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentIndex = images.length - 1;
      track.style.transform = `translateX(-${currentIndex * width}px)`;
    }, 600);
  } else if (currentIndex === images.length) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentIndex = 0;
      track.style.transform = `translateX(0px)`;
    }, 600);
  }
};

// Botones de navegación
nextButton.addEventListener('click', () => {
  currentIndex++;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex--;
  updateCarousel();
});

// Auto-movimiento
let autoSlide = setInterval(() => {
  currentIndex++;
  updateCarousel();
}, 3000); // Cambia cada 3 segundos

// Detener el auto-movimiento al interactuar
const stopAutoSlide = () => {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    currentIndex++;
    updateCarousel();
  }, 3000);
};

prevButton.addEventListener('click', stopAutoSlide);
nextButton.addEventListener('click', stopAutoSlide);
track.addEventListener('mouseover', () => clearInterval(autoSlide)); // Pausa al pasar el mouse
track.addEventListener('mouseout', stopAutoSlide); // Reanuda al quitar el mouse

// Ajustar al redimensionar
window.addEventListener('resize', updateCarousel);

// Configuración inicial
updateCarousel();

// Updated Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-menu');
    const body = document.body;

    if (!hamburger || !navMenu) {
        console.error('Menu elements not found');
        return;
    }

    // Toggle menu with logging
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        console.log('Hamburger clicked'); // Debug log
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        }, 250);
    });
});


//play

// Get elements
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const audio = document.getElementById('audio');

// Ensure the audio loops infinitely
audio.loop = true;

// Event listener for play button
playBtn.addEventListener('click', () => {
    audio.play()
        .then(() => {
            playBtn.style.display = 'none';  // Hide the play button
            stopBtn.style.display = 'inline-block';  // Show the stop button
        })
        .catch((error) => {
            console.error('Autoplay failed:', error);
            // Handle error: maybe show a message to the user or retry
        });
});

// Event listener for stop button
stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playBtn.style.display = 'inline-block';  // Show the play button
    stopBtn.style.display = 'none';  // Hide the stop button
});


const coin = document.querySelector('.coin');

// Detectar si el dispositivo es móvil
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

if (isMobile) {
    coin.addEventListener('touchmove', (event) => {
        const touch = event.touches[0];
        apply3DEffect(touch.clientX, touch.clientY, coin);
    });

    coin.addEventListener('touchend', () => resetEffect(coin));
} else {
    coin.addEventListener('mousemove', (event) => {
        apply3DEffect(event.clientX, event.clientY, coin);
    });

    coin.addEventListener('mouseleave', () => resetEffect(coin));
}

function apply3DEffect(x, y, element) {
    const rect = element.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;

    const rotateX = ((offsetY / rect.height) - 0.5) * -20;
    const rotateY = ((offsetX / rect.width) - 0.5) * 20;

    element.style.transition = 'transform 0.1s ease-out';
    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetEffect(element) {
    element.style.transition = 'transform 0.3s ease-out';
    element.style.transform = 'rotateX(0deg) rotateY(0deg)';
}


document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll("#burn-wallet .grid div");
    let currentIndex = 0;
  
    function activateNextCard() {
      if (currentIndex < cards.length) {
        cards[currentIndex].classList.add("active");
        currentIndex++;
  
        // Llamar a la siguiente tarjeta después de un pequeño intervalo
        setTimeout(activateNextCard, 1000);
      }
    }
  
    // Comenzar la animación
    activateNextCard();
  });
  
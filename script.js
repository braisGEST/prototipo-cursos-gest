// Header sticky con efecto al hacer scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Animación de aparición/desaparición de cards al hacer scroll
const allCards = document.querySelectorAll('.card');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.classList.remove('fade-out');
    } else {
      if (entry.target.classList.contains('visible')) {
        entry.target.classList.add('fade-out');
        entry.target.classList.remove('visible');
      }
    }
  });
}, observerOptions);

allCards.forEach(card => {
  cardObserver.observe(card);
});

// Filtrado de cards con animación
const buttons = document.querySelectorAll('.tag[data-filter]');
const cards = document.querySelectorAll('.card[data-tags]');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // Fade out rápido para todas las cards
    cards.forEach(card => {
      card.classList.add('filtering', 'fade-out');
    });

    setTimeout(() => {
      cards.forEach(card => {
        const tags = card.dataset.tags;

        if (filter === 'all' || tags.includes(filter)) {
          card.classList.remove('hidden', 'fade-out');
          // Re-observar la card para la animación de scroll
          cardObserver.unobserve(card);
          card.classList.remove('visible');
          setTimeout(() => {
            cardObserver.observe(card);
            card.classList.remove('filtering');
          }, 50);
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible', 'fade-out', 'filtering');
        }
      });
    }, 200);
  });
});

/**
 * SKYTOP TRAVEL & TOURS - LIGHTWEIGHT SLIDERS & CAROUSELS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Testimonial Carousel Toggle
  const testimonials = [
    {
      quote: "Skytop made our family trip to Thailand smooth, unforgettable, and truly sustainable. Their guides and local insights were second to none! Highly recommended.",
      author: "Matthew Brown",
      role: "Frequent Traveler",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The Dubai and Greece packages exceeded all expectations. Flawless hotel bookings, private transport, and friendly guides everywhere we went.",
      author: "Sarah Smith",
      role: "Adventure Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    }
  ];

  let currentIdx = 0;
  const quoteEl = document.getElementById('testimonialQuote');
  const nameEl = document.getElementById('clientName');
  const roleEl = document.getElementById('clientRole');
  const avatarEl = document.getElementById('clientAvatar');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  function updateTestimonial(idx) {
    if (!quoteEl || !nameEl || !roleEl) return;
    const t = testimonials[idx];
    quoteEl.textContent = `"${t.quote}"`;
    nameEl.textContent = t.author;
    roleEl.textContent = t.role;
    if (avatarEl) avatarEl.src = t.avatar;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentIdx);
    });

    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % testimonials.length;
      updateTestimonial(currentIdx);
    });
  }

  // =========================================================================
  // TOUR CATEGORIES OWL CAROUSEL ARC SLIDER
  // =========================================================================
  const categoriesCarousel = document.getElementById('categoriesCarousel');
  const categoriesDotsContainer = document.getElementById('categoriesDots');

  if (categoriesCarousel) {
    const cards = Array.from(categoriesCarousel.querySelectorAll('.owl-item-card'));
    const totalCards = cards.length;
    let activeIndex = 2; // Default center item (Airbirds)

    // Render Dots Navigation
    if (categoriesDotsContainer && totalCards > 0) {
      categoriesDotsContainer.innerHTML = '';
      cards.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `owl-dot-btn ${idx === activeIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => setActiveSlide(idx));
        categoriesDotsContainer.appendChild(dot);
      });
    }

    function updateDots(idx) {
      if (!categoriesDotsContainer) return;
      const dots = categoriesDotsContainer.querySelectorAll('.owl-dot-btn');
      dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === idx);
      });
    }

    function setActiveSlide(idx) {
      activeIndex = idx;
      
      cards.forEach((card, cardIdx) => {
        const diff = cardIdx - activeIndex;

        if (diff === -2) {
          card.setAttribute('data-arc', 'left-2');
        } else if (diff === -1) {
          card.setAttribute('data-arc', 'left-1');
        } else if (diff === 0) {
          card.setAttribute('data-arc', 'center');
        } else if (diff === 1) {
          card.setAttribute('data-arc', 'right-1');
        } else if (diff === 2) {
          card.setAttribute('data-arc', 'right-2');
        } else if (diff < -2) {
          card.setAttribute('data-arc', 'left-2');
        } else {
          card.setAttribute('data-arc', 'right-2');
        }
      });

      updateDots(idx);
    }

    // Add click listeners on cards
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        setActiveSlide(idx);
      });
    });

    // Touch / Swipe support
    let startX = 0;
    let isDragging = false;

    categoriesCarousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    categoriesCarousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (diffX > 40 && activeIndex < totalCards - 1) {
        setActiveSlide(activeIndex + 1);
      } else if (diffX < -40 && activeIndex > 0) {
        setActiveSlide(activeIndex - 1);
      }
    }, { passive: true });

    // Initial positioning
    setActiveSlide(activeIndex);
  }
});

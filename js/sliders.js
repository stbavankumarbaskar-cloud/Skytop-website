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

  // Helper for signed circular distance in infinite loop
  function getCircularDiff(idx, activeIdx, total) {
    let diff = (idx - activeIdx) % total;
    if (diff < -Math.floor(total / 2)) {
      diff += total;
    } else if (diff > Math.floor(total / 2)) {
      diff -= total;
    }
    return diff;
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
      activeIndex = (idx + totalCards) % totalCards;
      
      cards.forEach((card, cardIdx) => {
        const diff = getCircularDiff(cardIdx, activeIndex, totalCards);

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

      updateDots(activeIndex);
    }

    // Add click listeners on cards
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        setActiveSlide(idx);
      });
    });

    // Touch / Swipe support with infinite loop
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

      if (diffX > 40) {
        setActiveSlide(activeIndex + 1);
      } else if (diffX < -40) {
        setActiveSlide(activeIndex - 1);
      }
    }, { passive: true });

    // Initial positioning
    setActiveSlide(activeIndex);
  }

  // =========================================================================
  // TOP DESTINATION 3D COVERFLOW OWL CAROUSEL (INFINITE LOOP)
  // =========================================================================
  const destinationsCarousel = document.getElementById('destinationsCarousel');
  const destinationTabsContainer = document.getElementById('destinationTabs');

  if (destinationsCarousel) {
    const coverCards = Array.from(destinationsCarousel.querySelectorAll('.coverflow-card'));
    const totalCoverCards = coverCards.length;
    let coverActiveIdx = 0; // Default active (Maldives)

    function updateCoverflow(idx) {
      coverActiveIdx = (idx + totalCoverCards) % totalCoverCards;

      coverCards.forEach((card, cIdx) => {
        const diff = getCircularDiff(cIdx, coverActiveIdx, totalCoverCards);

        if (diff === -2) {
          card.setAttribute('data-pos', 'left-2');
        } else if (diff === -1) {
          card.setAttribute('data-pos', 'left-1');
        } else if (diff === 0) {
          card.setAttribute('data-pos', 'center');
        } else if (diff === 1) {
          card.setAttribute('data-pos', 'right-1');
        } else if (diff === 2) {
          card.setAttribute('data-pos', 'right-2');
        } else if (diff < -2) {
          card.setAttribute('data-pos', 'left-2');
        } else {
          card.setAttribute('data-pos', 'right-2');
        }
      });

      // Update Tab Active State
      if (destinationTabsContainer) {
        const tabs = destinationTabsContainer.querySelectorAll('.tab-btn');
        tabs.forEach((tab, tIdx) => {
          tab.classList.toggle('active', tIdx === coverActiveIdx);
        });
      }
    }

    // Tab button clicks
    if (destinationTabsContainer) {
      const tabs = destinationTabsContainer.querySelectorAll('.tab-btn');
      tabs.forEach((tab, tIdx) => {
        tab.addEventListener('click', () => {
          updateCoverflow(tIdx);
        });
      });
    }

    // Card click navigation
    coverCards.forEach((card, cIdx) => {
      card.addEventListener('click', () => {
        updateCoverflow(cIdx);
      });
    });

    // Touch & Drag Support with Infinite Loop
    let dragStartX = 0;
    let isCoverDragging = false;

    destinationsCarousel.addEventListener('mousedown', (e) => {
      dragStartX = e.clientX;
      isCoverDragging = true;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isCoverDragging) return;
      isCoverDragging = false;
      const diffX = dragStartX - e.clientX;
      if (diffX > 40) {
        updateCoverflow(coverActiveIdx + 1);
      } else if (diffX < -40) {
        updateCoverflow(coverActiveIdx - 1);
      }
    });

    destinationsCarousel.addEventListener('touchstart', (e) => {
      dragStartX = e.touches[0].clientX;
      isCoverDragging = true;
    }, { passive: true });

    destinationsCarousel.addEventListener('touchend', (e) => {
      if (!isCoverDragging) return;
      isCoverDragging = false;
      const diffX = dragStartX - e.changedTouches[0].clientX;
      if (diffX > 40) {
        updateCoverflow(coverActiveIdx + 1);
      } else if (diffX < -40) {
        updateCoverflow(coverActiveIdx - 1);
      }
    }, { passive: true });

    // Initial Coverflow Positioning
    updateCoverflow(coverActiveIdx);
  }
});

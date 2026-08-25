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
});

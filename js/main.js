/**
 * SKYTOP TRAVEL & TOURS - MAIN JAVASCRIPT
 * Handles Navigation, Mobile Drawer Toggle, Backdrop, Search Filters, and Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // Dynamic HTML Inclusion function for Header & Footer
  async function loadIncludes() {
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
      const file = el.getAttribute('data-include');
      if (file) {
        try {
          const resp = await fetch(file);
          if (resp.ok) {
            el.innerHTML = await resp.text();
          }
        } catch (e) {
          console.warn('Could not load include file:', file, e);
        }
      }
    }
    initNavigation();
  }

  function initNavigation() {
    // Robust Event Delegation for Navigation Drawer (Guarantees click handling on all pages)
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('#mobileMenuToggle');
      const closeBtn = e.target.closest('#drawerClose');
      const backdrop = e.target.closest('#backdropOverlay');

      const drawer = document.getElementById('mobileNavDrawer');
      const backdropOverlay = document.getElementById('backdropOverlay');

      if (toggleBtn) {
        e.preventDefault();
        if (drawer) drawer.classList.add('open');
        if (backdropOverlay) backdropOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else if (closeBtn || backdrop) {
        e.preventDefault();
        if (drawer) drawer.classList.remove('open');
        if (backdropOverlay) backdropOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Active Navigation Link Highlighting
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-nav-links a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.toLowerCase() || '';
      if ((currentPath.includes('about.html') && href.includes('about.html')) ||
          (currentPath.includes('destinations.html') && href.includes('destinations.html')) ||
          (currentPath.includes('book.html') && href.includes('book.html')) ||
          ((currentPath.endsWith('/') || currentPath.includes('index.html')) && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  loadIncludes();

  // Floating Search Bar Form Submission
  const heroSearchForm = document.getElementById('heroSearchForm');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const destination = document.getElementById('searchDestination')?.value || 'All';
      const category = document.getElementById('searchCategory')?.value || 'All';
      const duration = document.getElementById('searchDuration')?.value || 'Any';
      alert(`Searching tours for Destination: ${destination}, Category: ${category}, Duration: ${duration}`);
    });
  }

  // Destinations Page Floating Search Form Submission & Real-time Filter
  const destSearchForm = document.getElementById('destSearchForm');
  if (destSearchForm) {
    destSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const whereTo = document.getElementById('searchWhereTo')?.value.toLowerCase().trim() || '';
      const selectedType = document.getElementById('searchTypeSelect')?.value || 'All Types';

      const cards = document.querySelectorAll('.dest-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const category = card.getAttribute('data-category') || '';
        
        const matchWhere = !whereTo || text.includes(whereTo);
        const matchType = selectedType === 'All Types' || category.toLowerCase().includes(selectedType.toLowerCase());

        if (matchWhere && matchType) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing to Skytop Newsletter with ${emailInput.value}!`);
        emailInput.value = '';
      }
    });
  }
});

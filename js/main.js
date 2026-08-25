/**
 * SKYTOP TRAVEL & TOURS - MAIN JAVASCRIPT
 * Handles Navigation, Mobile Drawer Toggle, Backdrop, Search Filters, and Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileToggleBtn = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerCloseBtn = document.getElementById('drawerClose');
  const backdropOverlay = document.getElementById('backdropOverlay');

  function openDrawer() {
    if (mobileNavDrawer && backdropOverlay) {
      mobileNavDrawer.classList.add('open');
      backdropOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileNavDrawer && backdropOverlay) {
      mobileNavDrawer.classList.remove('open');
      backdropOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', openDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (backdropOverlay) {
    backdropOverlay.addEventListener('click', closeDrawer);
  }

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

  // Destination Tab Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const destinationCards = document.querySelectorAll('.destination-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      destinationCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

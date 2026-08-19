/* ==========================================================================
   Figma Industrial Theme - JavaScript Interactivity
   Before/After Slider, UK Map Pins, Back To Top, Mobile Menu
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Before / After Comparison Image Slider
  const initComparisonSliders = () => {
    const wrappers = document.querySelectorAll('.figma-comparison-wrapper');
    
    wrappers.forEach(wrapper => {
      const overlay = wrapper.querySelector('.figma-comparison-overlay');
      const handle = wrapper.querySelector('.figma-slider-handle');
      if (!overlay || !handle) return;

      let isDragging = false;

      const setPosition = (x) => {
        const rect = wrapper.getBoundingClientRect();
        let offsetX = x - rect.left;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        const percentage = (offsetX / rect.width) * 100;
        overlay.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
      };

      const handleMove = (e) => {
        if (!isDragging) return;
        const pageX = e.touches ? e.touches[0].clientX : e.clientX;
        setPosition(pageX);
      };

      const startDrag = (e) => {
        isDragging = true;
        const pageX = e.touches ? e.touches[0].clientX : e.clientX;
        setPosition(pageX);
      };

      const stopDrag = () => {
        isDragging = false;
      };

      handle.addEventListener('mousedown', startDrag);
      wrapper.addEventListener('mousedown', startDrag);
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', stopDrag);

      handle.addEventListener('touchstart', startDrag, { passive: true });
      wrapper.addEventListener('touchstart', startDrag, { passive: true });
      window.addEventListener('touchmove', handleMove, { passive: true });
      window.addEventListener('touchend', stopDrag);
    });
  };

  // 2. Region Pills & UK Map Pin Activation
  const initMapPills = () => {
    const pills = document.querySelectorAll('.figma-region-pill');
    const pins = document.querySelectorAll('.figma-map-pin');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const region = pill.getAttribute('data-region');
        
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        pins.forEach(pin => {
          if (pin.getAttribute('data-region') === region) {
            pin.style.transform = 'scale(1.8)';
            pin.style.boxShadow = '0 0 0 8px rgba(237, 91, 45, 0.4), 0 0 24px #ED5B2D';
          } else {
            pin.style.transform = 'scale(1)';
            pin.style.boxShadow = '0 0 0 4px rgba(237, 91, 45, 0.3), 0 0 16px #ED5B2D';
          }
        });
      });
    });

    pins.forEach(pin => {
      pin.addEventListener('click', () => {
        const region = pin.getAttribute('data-region');
        pills.forEach(p => {
          if (p.getAttribute('data-region') === region) {
            p.click();
          }
        });
      });
    });
  };

  // 3. Back to Top Smooth Scroll
  const initBackToTop = () => {
    const backBtn = document.querySelector('.figma-back-to-top');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  };

  // Initialize all interactive modules
  initComparisonSliders();
  initMapPills();
  initBackToTop();
});

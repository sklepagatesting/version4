// textAnimations.js
document.addEventListener('fontLoadedAndPageVisible', () => {
  console.log('Font loaded and page visible, initializing text animations.');

  // Combine both classes
  const textElements = document.querySelectorAll('.rise, .sliding-up');

  textElements.forEach(textElement => {
    // Avoid double-processing if innerHTML already contains spans
    if (textElement.querySelector('span')) return;

    const words = textElement.textContent.trim().split(' ');
    textElement.innerHTML = words.map((word, index) => {
      const separator = (index < words.length - 1) ? '&nbsp;' : '';
      return `<span style="animation-delay: ${index * 0.1}s">${word}${separator}</span>`;
    }).join('');

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(textElement);
  });
});





 const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const textLine = entry.target.querySelector('.text-line');
        if (textLine) {
          textLine.classList.add('animate');
          textLine.style.animationDelay = `${i * 1}s`; // apply delay when animating
          observer.unobserve(entry.target); // stop observing to prevent repeat
        }
      }
    });
  }, {
    threshold: 1 // lower threshold for small text blocks
  });

  document.querySelectorAll('.text-container').forEach(container => {
    observer.observe(container);
  });



function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|Tablet|Touch/i.test(navigator.userAgent);
  }

  function setMobileViewportHeight() {
    if (!isMobileDevice()) return;

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('DOMContentLoaded', setMobileViewportHeight);
  window.addEventListener('resize', setMobileViewportHeight);
$("#carouselExampleIndicators").carousel({
    interval: 5000
});

// Load the module.
const perfundo = require('perfundo');
// Initialize a perfundo Lightbox.
perfundo('.perfundo', {
  // This are the default options.
  disableHistory: false,
  swipe: true,
  keyboard: true,
  classNames: {
    link: `js-perfundo-link`,
    overlay: `js-perfundo-overlay`,
    close: `js-perfundo-close`,
    prev: `js-perfundo-prev`,
    next: `js-perfundo-next`,
    active: `is-active`
  }
});
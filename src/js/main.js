import './quote.js';
import './mobileMenu.js';

const currentPath = window.location.pathname;

document
  .querySelectorAll('.header-menu-link, .mobile-nav-link')
  .forEach(link => {
    const href = link.getAttribute('href').replace('../', '');

    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }

    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
      import('./render.js');
    }
  });

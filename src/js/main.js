import './quote.js';
import './mobileMenu.js';
import { renderLocalData } from './renderLocalData.js';

const currentPath = window.location.pathname;

document
  .querySelectorAll('.header-menu-link, .mobile-nav-link')
  .forEach(link => {
    const href = link.getAttribute('href').replace('../', '');

    console.log(currentPath)

    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }

    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
      import('./render.js');
    } else {
      if (localStorage.getItem('Favorites')) {
        document.querySelector('.empty-wrapper').innerHTML = '';
        renderLocalData();
      }
    }
  });

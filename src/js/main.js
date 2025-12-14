import './quote.js';
import './mobileMenu.js';
import { renderLocalData } from './renderLocalData.js';

const currentPage = location.pathname.split('/').pop() || 'index.html';

document
  .querySelectorAll('.header-menu-link, .mobile-nav-link')
  .forEach(link => {
    const href = link.getAttribute('href').split("/").pop()


    if (currentPage.endsWith(href)) {
      link.classList.add('active');
    }

    if (currentPage.endsWith('index.html') || currentPage.endsWith('/')) {
      import('./render.js');
    } else {
      if (localStorage.getItem('Favorites')) {
        document.querySelector('.empty-wrapper').innerHTML = '';
        renderLocalData();
      }
    }
  });

import { refs } from './refs.js';
const currentPage = location.pathname.split('/').pop() || 'index.html';

document
  .querySelectorAll('.header-menu-link, .mobile-nav-link')
  .forEach(link => {
    const href = link.getAttribute('href').split('/').pop();

    if (currentPage.endsWith(href)) {
      link.classList.add('active');
    }
  });

refs.mobileMenuBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.remove('hidden');
  document.body.classList.add('noScroll');
});

refs.closeMobileMenuBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.add('hidden');
  document.body.classList.remove('noScroll');
});

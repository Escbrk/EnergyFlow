import { refs } from './refs.js';

refs.mobileMenuBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.remove('hidden');
});

refs.closeMobileMenuBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.add('hidden');
});

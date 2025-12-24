import { refs } from '../refs.js';

export const closeAllModals = () => {
  refs.backdrop.classList.add('hidden');
  document.body.classList.remove('noScroll');
  refs.backdrop.querySelector('.exercise').innerHTML = '';
  refs.backdrop.querySelector('.rating').innerHTML = '';
};

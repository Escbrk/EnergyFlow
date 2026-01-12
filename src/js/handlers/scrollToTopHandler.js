import { refs } from '../refs.js';

window.addEventListener('scroll', () => {
  const scroll = window.scrollY;

  scroll >= 500
    ? (refs.scrollToTop.style.display = 'flex')
    : (refs.scrollToTop.style.display = 'none');
});

refs.scrollToTop.addEventListener('click', () => {
  scrollTo(top);
});

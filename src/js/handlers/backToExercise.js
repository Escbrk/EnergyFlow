import { refs } from '../refs.js';

export const backToExercise = () => {
  refs.backdrop.querySelector('.exercise').classList.remove('hidden');
  refs.backdrop.querySelector('.rating').innerHTML = '';
};

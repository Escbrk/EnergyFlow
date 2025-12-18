import { renderExerciseById } from './modal.js';
import { refs } from './refs.js';

refs.favList.addEventListener('click', e => {
  const target = e.target.closest('.startBtn');

  if (target) {
    const id = e.target.closest('.exercise-info').dataset.id;
    const type = e.currentTarget.dataset.type;
    renderExerciseById(id, type);
  }
});

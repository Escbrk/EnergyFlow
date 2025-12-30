import { globalState } from './globalState.js';
import { refs } from './refs.js';
import { renderExercise, renderInfo } from './exercises.js';
import { renderExerciseById } from './modal.js';
import exercisePagination from './pagination.js';

const filterList = document.querySelector('.filter-list');

const exerciseFilterBtn = [
  ...filterList.querySelectorAll('button[data-filter]'),
];

filterList.addEventListener('click', e => {
  const target = e.target.dataset.filter;
  globalState.query = e.target.textContent.trim();

  if (target) {
    exerciseFilterBtn.forEach(el => {
      el.classList.remove('active');
      el.disabled = false;
    });

    e.target.classList.add('active');
    e.target.disabled = true;
    exercisePagination();
    renderExercise(globalState.query);
  }
});

renderExercise(globalState.query);

refs.exerciseList.addEventListener('click', async e => {
  const target = e.target.closest('.exercise-item');

  if (target) {
    globalState.query = target.children[0].textContent.toLowerCase();
    globalState.category = target.children[1].textContent;

    exerciseFilterBtn.forEach(el => {
      el.disabled = false;
    });

    exercisePagination();
    await renderInfo({
      category: globalState.category,
      query: globalState.query,
    });
    refs.exerciseSearchForm.classList.remove('hidden');
  }

  const targetBtn = e.target.closest('.startBtn');

  if (targetBtn) {
    const id = e.target.closest('.exercise-info').dataset.id;
    const type = e.currentTarget.dataset.type;

    await renderExerciseById(id, type);
    refs.backdrop.classList.remove('hidden');
    document.body.classList.add('noScroll');
  }
});

refs.exerciseSearchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(refs.exerciseSearchForm);
  globalState.searchTarget = Object.fromEntries(formData).search.toLowerCase();

  exercisePagination();
  const status = await renderInfo({
    category: globalState.category,
    query: globalState.query,
    searchTarget: globalState.searchTarget,
  });

  if (!status) {
    refs.exerciseSearchForm.reset();
  }
});

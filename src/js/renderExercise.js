import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getExercise } from './api.js';
import { capitalize } from './capitalize.js';
import { refs } from './refs.js';
import exercisePagination from './pagination.js';
import { setActivePage } from './activePage.js';

export const renderExercise = async (query, choosenPage) => {
  try {
    const { results, totalPages, page } = await getExercise(query, choosenPage);
    const markup = results
      .map(
        ({ imgUrl, name, filter }) => `
          <li class="exercise-item" style="--img: url(${imgUrl})">
            <h3 class="exercise-subtitle">${capitalize(name)}</h3>
            <p class="exercise-name">${filter}</p>
          </li>
          `
      )
      .join('');

    refs.exerciseList.innerHTML = markup;
    refs.categoryContainer.innerHTML = '';

    refs.exerciseSearchForm.classList.add('hidden');
    document.querySelector('.search-input').value = '';

    exercisePagination(page, totalPages);
    setActivePage(page);
  } catch ({ message }) {
    iziToast.error({
      title: 'Error',
      message: `Failet to fetch exercises: ${message}`,
    });
  }
};

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getExercise, getExerciseInfo } from './api.js';
import { capitalize } from './capitalize.js';
import { refs } from './refs.js';
import exercisePagination from './pagination.js';
import { setActivePage } from './activePage.js';
import spritePath from '../img/svg/sprite.svg';
import { globalState } from './globalState.js';


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

export const renderInfo = async ({
  category,
  query,
  currentPage,
  searchTarget,
}) => {
  try {
    const { results, totalPages, page } = await getExerciseInfo(
      category,
      query,
      currentPage,
      searchTarget
    );

    let markup = results
      .map(({ target, rating, burnedCalories, bodyPart, time, name, _id }) => {
        const formattedRating = String(rating.toFixed(1));

        return `
            <li class="exercise-info" data-id=${_id}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${spritePath}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${formattedRating}
                <svg>
                  <use href="${spritePath}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${spritePath}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${name}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${burnedCalories} / ${time} min</span></li>
                    <li class="info-item">Body part: <span>${capitalize(
                      bodyPart
                    )}</span></li>
                    <li class="info-item">Target: <span>${capitalize(
                      target
                    )}</span></li>
                  </ul>
            </li>
    `;
      })
      .join('');

    refs.categoryContainer.innerHTML = `<span class="exercise-category">${capitalize(
      globalState.query
    )}</span>`;

    let isEmpty;

    if (markup.trim() === '') {
      isEmpty = true;
      markup = `<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>`;
    } else {
      isEmpty = false;
    }

    refs.exerciseList.innerHTML = markup;

    isEmpty ? exercisePagination() : exercisePagination(page, totalPages);

    setActivePage(page);

    return isEmpty;
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch information about exercises',
    });
  }
};

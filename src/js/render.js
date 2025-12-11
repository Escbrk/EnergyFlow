import spritePath from '../img/svg/sprite.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getExercise, getExerciseInfo, getExerciseById } from './api.js';
import exercisePagination from './pagination.js';
import { setActivePage } from './activePage.js';
import { globalState } from './globalState.js';
import { refs } from './refs.js';

const capitalize = str => (str ? str[0].toUpperCase() + str.slice(1) : '');

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
      message: `Failet to fetch exercisec: ${message}`,
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

export const renderExerciseById = async id => {
  try {
    const {
      name,
      bodyPart,
      target,
      rating,
      equipment,
      popularity,
      burnedCalories,
      description,
      gifUrl,
    } = await getExerciseById(id);

    const formattedRating = String(rating.toFixed(1));

    const markup = `
    <div class="modal-window">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${spritePath}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${gifUrl}
          alt=${capitalize(name)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${capitalize(name)}</h2>
        <p class="modal-rating">
          ${formattedRating}
          <svg>
            <use href="${spritePath}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${capitalize(target)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${capitalize(bodyPart)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${capitalize(equipment)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${popularity}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${burnedCalories}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${description}
        </p>

        <ul class="btns-list">
          <li>
            <button type="button" class="favorite-btn">
              Add to favorites
              <svg>
                <use href="${spritePath}#icon-heart"></use>
              </svg>
            </button>
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;

    refs.backdrop.innerHTML = markup;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch current exercise',
    });

    setTimeout(() => {
      refs.backdrop.classList.add('hidden');
    }, 0);
  }
};

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
    renderExercise(globalState.query);
  }
});

renderExercise();

refs.exerciseList.addEventListener('click', async e => {
  const target = e.target.closest('.exercise-item');

  if (target) {
    globalState.query = target.children[0].textContent.toLowerCase();
    globalState.category = target.children[1].textContent;

    exerciseFilterBtn.forEach(el => {
      el.disabled = false;
    });

    await renderInfo({
      category: globalState.category,
      query: globalState.query,
    });
    refs.exerciseSearchForm.classList.remove('hidden');
  }

  const targetBtn = e.target.closest('.startBtn');

  if (targetBtn) {
    const id = e.target.closest('.exercise-info').dataset.id;
    await renderExerciseById(id);
    refs.backdrop.classList.remove('hidden');
    document.body.classList.add('noScroll');
  }
});

refs.exerciseSearchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(refs.exerciseSearchForm);
  globalState.searchTarget = Object.fromEntries(formData).search.toLowerCase();
  const status = await renderInfo({
    category: globalState.category,
    query: globalState.query,
    searchTarget: globalState.searchTarget,
  });

  if (!status) {
    refs.exerciseSearchForm.reset();
  }
});

refs.backdrop.addEventListener('click', e => {
  const closeModalBtn = e.target.closest('.close-modal-btn');
  // const favoritesBtn = e.target.closest('.favorite-btn');
  // const ratingBtn = e.target.closest('.rating-btn');

  if (closeModalBtn || e.target.classList.contains('backdrop')) {
    refs.backdrop.classList.add('hidden');
    document.body.classList.remove('noScroll');
  }
});

document.body.addEventListener('keydown', e => {
  if (!refs.backdrop.classList.contains('hidden') && e.code === 'Escape') {
    refs.backdrop.classList.add('hidden');
    document.body.classList.remove('noScroll');
  }
});

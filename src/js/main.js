import { getQuote, getExercise, getExerciseInfo } from './api.js';
import spritePath from '../img/svg/sprite.svg';

const refs = {
  quoteBlock: document.getElementById('quote'),
  exerciseList: document.querySelector('.exercise-list'),
  pagination: document.querySelector('.pagination'),
  filterList: document.querySelector('.filter-list'),
  categoryContainer: document.querySelector('.category-container'),
  exerciseSearchForm: document.querySelector('.exercise-search-form'),
};

const createQuoteMarkup = async () => {
  let stored = localStorage.getItem('DailyQuote');
  let data = stored ? JSON.parse(stored) : null;

  const isExpired = !data || Date.now() - data.date > 86400000;

  if (isExpired) {
    const { author, quote } = await getQuote();
    data = { author, quote, dateStamp: Date.now() };

    localStorage.setItem('DailyQuote', JSON.stringify(data));

    refs.quoteBlock.children[1].textContent = data.quote;
    refs.quoteBlock.children[2].textContent = data.author;
  }

  refs.quoteBlock.children[1].textContent = data.quote;
  refs.quoteBlock.children[2].textContent = data.author;
};

let query;
let category;
let markup;
let searchTarget;
const exerciseFilterBtn = [
  ...refs.filterList.querySelectorAll('button[data-filter]'),
];

const renderExercise = async (query, choosenPage) => {
  const { results, totalPages, page } = await getExercise(query, choosenPage);
  markup = results
    .map(
      ({ imgUrl, name, filter }) => `
          <li class="exercise-item" style="--img: url(${imgUrl})">
            <h3 class="exercise-subtitle">${
              name[0].toUpperCase() + name.slice(1)
            }</h3>
            <p class="exercise-name">${filter}</p>
          </li>
          `
    )
    .join('');

  refs.exerciseList.innerHTML = markup;
  refs.categoryContainer.innerHTML = '';
  refs.exerciseSearchForm.classList.add('hidden');

  exercisePagination(page, totalPages);
  setActivePage(page);
};

const exercisePagination = (current = 0, total = 0, maxVisible = 3) => {
  const half = Math.floor(maxVisible / 2);

  let start = current - half;
  let end = current + half;

  if (start < 1) {
    start = 1;
    end = maxVisible;
  }

  if (end > total) {
    end = total;
    start = total - maxVisible + 1;
  }

  if (start < 1) start = 1;

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const result = [];

  //! Left "..."
  if (start > 1) {
    result.push(1); //! First page
    result.push('...'); //! Spacer
  }

  //! Main pages
  result.push(...pages);

  //! Right "..."
  if (end < total) {
    result.push('...'); //! Spacer
    result.push(total); //! Last page
  }

  const paginationBtns = result
    .map(
      el => `<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${el}</button>
            </li>`
    )
    .join('');

  refs.pagination.innerHTML = paginationBtns;

  [...document.querySelectorAll('.pages_list-btn')].forEach(el => {
    if (el.textContent.trim() === '...') {
      el.classList.add('disabled');
    }
  });
};

const renderInfo = async ({ category, query, currentPage, searchTarget }) => {
  const { results, totalPages, page } = await getExerciseInfo(
    category,
    query,
    currentPage,
    searchTarget
  );

  markup = results
    .map(({ target, rating, burnedCalories, bodyPart, time, name }) => {
      const formattedRating = String(rating.toFixed(1));

      const upperWords = {
        bodyPart: bodyPart[0].toUpperCase() + bodyPart.slice(1),
        target: target[0].toUpperCase() + target.slice(1),
      };

      return `
            <li class="exercise-info">
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
                    <li class="info-item">Body part: <span>${upperWords.bodyPart}</span></li>
                    <li class="info-item">Target: <span>${upperWords.target}</span></li>
                  </ul>
            </li>
    `;
    })
    .join('');

  const upperCaseQuery = query[0].toUpperCase() + query.slice(1);
  refs.categoryContainer.innerHTML = `<span class="exercise-category">${upperCaseQuery}</span>`;

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
};

const setActivePage = activePage => {
  const pageListFilterBtn = [...document.querySelectorAll('.pages_list-btn')];

  pageListFilterBtn.forEach(el => {
    const numericPage = parseFloat(el.textContent);
    const currentPage = parseFloat(activePage);

    if (numericPage === currentPage) {
      el.classList.add('active');
      el.disabled = true;
    } else {
      el.classList.remove('active');
      el.disabled = false;
    }
  });
};

createQuoteMarkup();
renderExercise();

refs.pagination.addEventListener('click', e => {
  if (e.target.classList.contains('pages_list-btn')) {
    const currentPage = parseFloat(e.target.textContent);
    const target = document.querySelector('.exercise-info');

    target
      ? renderInfo({ category, query, currentPage, searchTarget })
      : renderExercise(query, currentPage);
  }
});

refs.filterList.addEventListener('click', e => {
  const target = e.target.dataset.filter;
  query = e.target.textContent.trim();

  if (target) {
    exerciseFilterBtn.forEach(el => {
      el.classList.remove('active');
      el.disabled = false;
    });

    e.target.classList.add('active');
    e.target.disabled = true;
    renderExercise(query);
  }
});

refs.exerciseList.addEventListener('click', e => {
  const target = e.target.closest('.exercise-item');

  if (target) {
    query = target.children[0].textContent.toLowerCase();
    category = target.children[1].textContent;

    exerciseFilterBtn.forEach(el => {
      el.disabled = false;
    });

    renderInfo({ category, query });
    refs.exerciseSearchForm.classList.remove('hidden');
  }
});

refs.exerciseSearchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(refs.exerciseSearchForm);
  searchTarget = Object.fromEntries(formData).search.toLowerCase();
  const status = await renderInfo({ category, query, searchTarget });

  if (!status) {
    e.target.reset();
  }
});

import { getQuote, getExercise, getExerciseInfo } from './api.js';

const refs = {
  quoteBlock: document.getElementById('quote'),
  exerciseList: document.querySelector('.exercise-list'),
  pagination: document.querySelector('.pagination'),
  filterList: document.querySelector('.filter-list'),
  categoryContainer: document.querySelector('.category-container'),
};

const createQuoteMarkup = async () => {
  let stored = localStorage.getItem('DailyQuote');
  let data = stored ? JSON.parse(stored) : null;

  const isExpired = !data || Date.now() - data.date > 86400000;

  if (isExpired) {
    const { author, quote } = await getQuote();
    data = { author, quote, date: Date.now() };

    localStorage.setItem('DailyQuote', JSON.stringify(data));

    refs.quoteBlock.children[1].textContent = data.quote;
    refs.quoteBlock.children[2].textContent = data.author;
  }

  refs.quoteBlock.children[1].textContent = data.quote;
  refs.quoteBlock.children[2].textContent = data.author;
};

let query;
let category;
const exerciseFilterBtn = [
  ...refs.filterList.querySelectorAll('button[data-filter]'),
];

const renderExercise = async (query, choosenPage) => {
  const { results, totalPages, page } = await getExercise(query, choosenPage);
  const markup = results
    .map(
      ({ imgUrl, name, filter }) => `
          <li class="exercise-item" style="--img: url(${imgUrl})">
            <h3 class="exercise-subtitle">${name}</h3>
            <p class="exercise-name">${filter}</p>
          </li>
          `
    )
    .join('');

  refs.exerciseList.innerHTML = markup;
  refs.categoryContainer.innerHTML = '';

  // refs.exerciseList.style = '';

  exerciseFilterBtnMarkup(totalPages);
  setActivePage(page);
};

const exerciseFilterBtnMarkup = totalPages => {
  let pages = '';

  for (let i = 1; i <= totalPages; i++) {
    pages += `<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${i}</button>
              </li>`;
  }
  refs.pagination.innerHTML = pages;
};

const renderInfo = async (category, query, currentPage) => {
  const { results, totalPages, page } = await getExerciseInfo(
    category,
    query,
    currentPage
  );
  const markup = results
    .map(({ target, rating, burnedCalories, bodyPart, time, name }) => {
      const formattedRating = String(rating.toFixed(1)).padEnd(2, 0);

      return `
            <li class="exercise-info">
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="img/svg/sprite.svg#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${formattedRating}
                <svg>
                  <use href="img/svg/sprite.svg#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="img/svg/sprite.svg#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${name}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${burnedCalories} / ${time} min</span></li>
                    <li class="info-item">Body part: <span>${bodyPart}</span></li>
                    <li class="info-item">Target: <span>${target}</span></li>
                  </ul>
            </li>
    `;
    })
    .join('');

  refs.categoryContainer.innerHTML = `<span class="exercise-category">${query}</span>`;

  refs.exerciseList.innerHTML = markup;
  // refs.exerciseList.style = 'gap: 28px 20px';

  // exerciseFilterBtnMarkup(totalPages); //! Turn back on
  setActivePage(page);
};

const setActivePage = activePage => {
  const pageListexerciseFilterBtn = [
    ...document.querySelectorAll('.pages_list-btn'),
  ];

  pageListexerciseFilterBtn.forEach(el => {
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
    const page = parseFloat(e.target.textContent);
    const target = document.querySelector('.exercise-info');

    target ? renderInfo(category, query, page) : renderExercise(query, page);
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
    query = target.children[0].textContent;
    category = target.children[1].textContent;

    exerciseFilterBtn.forEach(el => {
      el.disabled = false;
    });

    renderInfo(category, query);
  }
});

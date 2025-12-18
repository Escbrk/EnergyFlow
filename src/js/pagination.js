import { refs } from './refs.js';
import { globalState } from './globalState.js';
import { renderExercise, renderInfo } from './exercises.js';

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

refs.pagination.addEventListener('click', e => {
  if (e.target.classList.contains('pages_list-btn')) {
    const currentPage = parseFloat(e.target.textContent);
    const target = document.querySelector('.exercise-info');

    target
      ? renderInfo({
          category: globalState.category,
          query: globalState.query,
          currentPage,
          searchTarget: globalState.searchTarget,
        })
      : renderExercise(globalState.query, currentPage);
  }
});

export default exercisePagination;

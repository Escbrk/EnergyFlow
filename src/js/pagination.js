import { refs } from './refs.js';

export const exercisePagination = (current = 0, total = 0, maxVisible = 3) => {
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

    if (start > 2) {
      result.push('...'); //! Spacer
    }
  }

  //! Main pages
  result.push(...pages);

  //! Right "..."
  if (end < total) {
    result.push('...'); //! Spacer

    if (end < total - 1) {
      result.push(total); //! Last page
    }
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

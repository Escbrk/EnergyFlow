import '../css/styles.css';
import { getQuote, getExercise } from './api.js';

const refs = {
  quoteBlock: document.getElementById('quote'),
  exerciseList: document.querySelector('.exercise-list'),
  pagesList: document.querySelector('.pages-list'),
  filterList: document.querySelector('.filter-list'),
};

const createQuoteMarkup = async () => {
  const { author, quote } = await getQuote();

  refs.quoteBlock.children[1].textContent = quote;
  refs.quoteBlock.children[2].textContent = author;
};

let query;

const renderExercise = async (query, choosenPage) => {
  const { results, totalPages, page } = await getExercise(query, choosenPage);

  const markup = results
    .map(({ imgUrl, name, filter }) => {
      return `
          <li class="exercise-item" style="--img: url(${imgUrl})">
            <h3 class="exercise-subtitle">${name}</h3>
            <p class="exercise-name">${filter}</p>
          </li>
          `;
    })
    .join('');

  refs.exerciseList.innerHTML = markup;

  let pages = '';

  for (let i = 1; i <= totalPages; i++) {
    pages += `<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${i}</button>
              </li>`;
  }
  refs.pagesList.innerHTML = pages;

  setActivePage(page);
};

const setActivePage = activePage => {
  const pageListBtn = [...document.querySelectorAll('.pages_list-btn')];

  pageListBtn.forEach(el => {
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

refs.pagesList.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('pages_list-btn')) {
    const page = parseFloat(e.target.textContent);
    renderExercise(query, page);
  }
});

refs.filterList.addEventListener('click', e => {
  e.preventDefault();

  const target = e.target.dataset.filter;
  query = e.target.textContent.trim().split(' ').join('+');
  const btn = [...refs.filterList.querySelectorAll('button[data-filter]')];

  if (target) {
    btn.forEach(el => {
      el.classList.remove('active');
      el.disabled = false;
    });

    e.target.classList.add('active');
    e.target.disabled = true;
  }

  if (query) {
    renderExercise(query);
  }
});

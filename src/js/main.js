import { getQuote, getExercise } from './api.js';

const refs = {
  quoteBlock: document.getElementById('quote'),
  exerciseList: document.querySelector('.exercise-list'),
};

const createMarkup = async () => {
  const { author, quote } = await getQuote().then(data => data);

  refs.quoteBlock.children[1].textContent = quote;
  refs.quoteBlock.children[2].textContent = author;
};

createMarkup();

const createExerciseMarkup = async () => {
  const { results } = await getExercise().then(res => res);

  const markup = results
    .map(({ imgUrl, name, filter }) => {
      return `
          <li class="exercise-item" style="background: linear-gradient(
            0deg,
            rgba(16, 16, 16, 0.7) 0%,
            rgba(16, 16, 16, 0.7) 100%
          ),
          url(${imgUrl}) lightgray -16.825px 0.844px / 121.36% 108.504% no-repeat;">
            <h3 class="exercise-subtitle">${name}</h3>
            <p class="exercise-name">${filter}</p>
          </li>
          `;
    })
    .join('');

  refs.exerciseList.innerHTML = markup;
};

createExerciseMarkup();

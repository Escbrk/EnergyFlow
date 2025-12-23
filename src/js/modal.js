import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs.js';
import { globalState } from './globalState.js';
import { getExerciseById } from './api.js';
import spritePath from '../img/svg/sprite.svg';
import { capitalize } from './capitalize.js';

import './handlers/modal-handler.js';

iziToast.settings({
  zindex: 999999,
  position: 'bottomRight',
});

export const renderExerciseById = async (id, type) => {
  try {
    globalState.data = await getExerciseById(id);

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
      _id,
    } = globalState.data;

    const formattedRating = String(rating.toFixed(1));

    const favBtn =
      type === 'available'
        ? `
            <button type="button" class="favorite-btn" data-action="add">
              Add to favorites
              <svg>
                <use href="${spritePath}#icon-heart"></use>
              </svg>
            </button>`
        : `<button type="button" class="favorite-btn" data-action="delete">
              Remove
              <svg>
                <use href="${spritePath}#icon-heart-broken"></use>
              </svg>
            </button>`;

    const markup = `
    <div class="modal-window" data-id="${_id}" >
      <button type="button" class="close-modal-btn" data-modal-type="exercise">
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
          ${favBtn}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;

    refs.backdrop.querySelector('.exercise').innerHTML = markup;
    refs.backdrop.classList.remove('hidden');
    document.body.classList.add('noScroll');
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

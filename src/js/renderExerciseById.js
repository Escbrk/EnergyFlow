import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs.js';
import { getExerciseById } from './api.js';
import spritePath from '../img/svg/sprite.svg';
import { capitalize } from './capitalize.js';

iziToast.settings({
  zindex: 999999,
  position: 'bottomRight',
});

let data;

export const renderExerciseById = async id => {
  try {
    data = await getExerciseById(id);

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
    } = data;

    const formattedRating = String(rating.toFixed(1));

    const markup = `
    <div class="modal-window" data-id="${_id}">
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
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch current exercise',
    });

    setTimeout(() => {
      refs.backdrop.classList.add('hidden');
    }, 0);
  }
};

refs.backdrop.addEventListener('click', e => {
  const closeModalBtn = e.target.closest('.close-modal-btn');
  const favoritesBtn = e.target.closest('.favorite-btn');
  // const ratingBtn = e.target.closest('.rating-btn');

  if (favoritesBtn) {
    const savedData = JSON.parse(localStorage.getItem('Favorites')) || [];
    const exist = savedData.some(({ _id }) => _id === data._id);

    if (exist) {
      iziToast.warning({
        title: 'Warning',
        message: 'Already exist in your favorite list',
      });
      return;
    }

    savedData.push(data);
    localStorage.setItem('Favorites', JSON.stringify(savedData));
    iziToast.success({
      title: 'Succes',
      message: 'Succesfully added to your favorite list',
    });
  }

  if (closeModalBtn || e.target.classList.contains('backdrop')) {
    refs.backdrop.classList.add('hidden');
    document.body.classList.remove('noScroll');
  }
});

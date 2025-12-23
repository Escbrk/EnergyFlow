import { refs } from '../refs.js';
import { globalState } from '../globalState.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderLocalData } from '../renderLocalData.js';
import { deleteItem } from './deleteHandler.js';

import spritePath from '../../img/svg/sprite.svg';

refs.backdrop.addEventListener('click', e => {
  const closeModalBtn = e.target.closest('.close-modal-btn');
  const favoritesBtn = e.target.closest('.favorite-btn');
  const ratingBtn = e.target.closest('.rating-btn');

  const savedData = JSON.parse(localStorage.getItem('Favorites')) || [];

  if (favoritesBtn) {
    const action = favoritesBtn.dataset.action;

    switch (action) {
      case 'add':
        const exist = savedData.some(({ _id }) => _id === globalState.data._id);

        if (exist && exist.length !== 0) {
          iziToast.warning({
            title: 'Warning',
            message: 'Already exist in your favorite list',
          });
          return;
        }

        savedData.push(globalState.data);
        localStorage.setItem('Favorites', JSON.stringify(savedData));
        iziToast.success({
          title: 'Succes',
          message: 'Succesfully added to your favorite list',
        });
        break;

      case 'delete':
        const id = e.target.closest('.modal-window').dataset.id;

        deleteItem(id);
        renderLocalData();
        refs.backdrop.classList.add('hidden');
        document.body.classList.remove('noScroll');
        break;
    }
  }

  if (closeModalBtn || e.currentTarget.classList.contains('backdrop')) {
    const type = closeModalBtn?.dataset.modalType;

    switch (type) {
      case 'rating':
        refs.backdrop.querySelector('.exercise')?.classList.remove('hidden');
        refs.backdrop.querySelector('.rating').innerHTML = '';
        break;

      case 'exercise':
        refs.backdrop.classList.add('hidden');
        refs.backdrop.querySelector('.exercise').innerHTML = '';
        document.body.classList.remove('noScroll');
        break;
    }

    if (e.target.classList.contains('exercise')) {
      refs.backdrop.classList.add('hidden');
      refs.backdrop.querySelector('.exercise').innerHTML = '';
      document.body.classList.remove('noScroll');
    }
  }

  if (ratingBtn) {
    refs.backdrop.querySelector('.exercise').classList.add('hidden');
    refs.backdrop.querySelector('.rating').innerHTML = `
        <div class="rating-window">
          <button type="button" class="close-modal-btn" data-modal-type="rating">
            <svg>
              <use href="${spritePath}#icon-close"></use>
            </svg>
          </button>
          <p>Rating</p>
          <p>0.0 * * * * *</p>

          <form>
            <label for="email"></label>
            <input type="email" name="email" id="email" />

            <label for="message"></label>
            <textarea name="message" id="message"></textarea>

            <button type="submit">Send</button>
          </form>
        </div>
    `;
  }
});

document.body.addEventListener('keydown', e => {
  if (!refs.backdrop.classList.contains('hidden') && e.code === 'Escape') {
    if (!document.querySelector('.rating-window')) {
      refs.backdrop.classList.add('hidden');
      document.body.classList.remove('noScroll');

      refs.backdrop.querySelector('.exercise').innerHTML = '';
      refs.backdrop.querySelector('.rating').innerHTML = '';
    }
  }
});

import { refs } from '../refs.js';
import { globalState } from '../globalState.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderLocalData } from '../renderLocalData.js';
import { deleteItem } from './deleteHandler.js';
import { ratingForm } from '../ratingForm.js';
import { sendRating } from '../api.js';
import { backToExercise } from './backToExercise.js';
import { closeAllModals } from './closeAllModals.js';

refs.backdrop.addEventListener('click', async e => {
  const closeModalBtn = e.target.closest('.close-modal-btn');
  const favoritesBtn = e.target.closest('.favorite-btn');
  const ratingBtn = e.target.closest('.rating-btn');
  const ratingSubmitBtn = e.target.closest('.ratingSubmitBtn');
  let id = e.target.closest('.modal-window')?.dataset.id;

  const savedData = JSON.parse(localStorage.getItem('Favorites')) || [];

  if (favoritesBtn) {
    const action = favoritesBtn.dataset.action;

    switch (action) {
      case 'add':
        const exist = savedData.some(({ _id }) => _id === globalState.data._id);

        if (exist) {
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
        closeAllModals();
        break;
    }
  }

  if (closeModalBtn || e.currentTarget.classList.contains('backdrop')) {
    const type = closeModalBtn?.dataset.modalType;

    if (type === 'rating' || e.target.classList.contains('rating')) {
      backToExercise();
    }

    if (type === 'exercise' || e.target.classList.contains('exercise')) {
      closeAllModals();
    }
  }

  if (ratingBtn) {
    refs.backdrop.querySelector('.exercise').classList.add('hidden');
    refs.backdrop.querySelector('.rating').innerHTML = ratingForm(id);
  }

  if (ratingSubmitBtn) {
    ratingSubmitBtn.disabled = true;
    id = e.target.closest('.rating-window')?.dataset.id;

    e.preventDefault();
    const form = e.target.closest('.ratingForm');
    const formData = new FormData(form);
    formData.delete('message');

    const data = Object.fromEntries(formData);
    data.rate = Number(data.rate);

    try {
      await sendRating(id, data);

      backToExercise();
      closeAllModals();

      iziToast.success({
        title: 'Succes',
        message: 'Rating was succesfully updated!',
      });
    } catch (err) {
      iziToast.error({
        title: 'Error',
        message: err.response.data.message,
      });
    } finally {
      ratingSubmitBtn.disabled = false;
    }
  }
});

document.body.addEventListener('keydown', e => {
  if (!refs.backdrop.classList.contains('hidden') && e.code === 'Escape') {
    if (document.querySelector('.rating-window')) {
      backToExercise();
    } else {
      closeAllModals();
    }
  }
});

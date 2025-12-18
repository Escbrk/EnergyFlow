import { refs } from '../refs.js';
import { globalState } from '../globalState.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderLocalData } from '../renderLocalData.js';
import { deleteItem } from './deleteHandler.js';

refs.backdrop.addEventListener('click', e => {
  const closeModalBtn = e.target.closest('.close-modal-btn');
  const favoritesBtn = e.target.closest('.favorite-btn');
  const id = e.target.closest('.modal-window').dataset.id;
  // const ratingBtn = e.target.closest('.rating-btn');

  const savedData = JSON.parse(localStorage.getItem('Favorites')) || [];

  if (favoritesBtn) {
    const action = favoritesBtn.dataset.action;
    if (action === 'add') {
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
    }

    if (action === 'delete') {
      deleteItem(id);
      renderLocalData();
      refs.backdrop.classList.add('hidden');
      document.body.classList.remove('noScroll');
    }
  }

  if (closeModalBtn || e.target.classList.contains('backdrop')) {
    refs.backdrop.classList.add('hidden');
    document.body.classList.remove('noScroll');
  }
});

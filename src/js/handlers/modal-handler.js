import { refs } from '../refs.js';
import { globalState } from '../globalState.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

refs.backdrop.addEventListener('click', e => {
  const closeModalBtn = e.target.closest('.close-modal-btn');
  const favoritesBtn = e.target.closest('.favorite-btn');
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
      const exist = savedData.some(({ _id }) => _id === globalState.data._id);
      if (exist && exist.length !== 0) {
        const updatedData = savedData.filter(
          ({ _id }) => _id !== globalState.data._id
        );

        localStorage.setItem('Favorites', JSON.stringify(updatedData));
        iziToast.success({
          title: 'Succes',
          message: 'Succesfully deleted from your favorite list',
        });

        refs.backdrop.classList.add('hidden');
      }
    }
  }

  if (closeModalBtn || e.target.classList.contains('backdrop')) {
    refs.backdrop.classList.add('hidden');
    document.body.classList.remove('noScroll');
  }
});

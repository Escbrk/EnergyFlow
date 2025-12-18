import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const deleteItem = id => {
  const savedData = JSON.parse(localStorage.getItem('Favorites'));

  const updatedData = savedData.filter(({ _id }) => _id !== id);

  localStorage.setItem('Favorites', JSON.stringify(updatedData));
  iziToast.success({
    title: 'Succes',
    message: 'Succesfully deleted from your favorite list',
  });
};

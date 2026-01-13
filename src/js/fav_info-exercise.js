import { globalState } from './globalState.js';
import { deleteItem } from './handlers/deleteHandler.js';
import { localDataPagination } from './handlers/localDataPagination.js';
import { renderExerciseById } from './modal.js';
import { refs } from './refs.js';
import { renderLocalData } from './renderLocalData.js';

refs.favList.addEventListener('click', e => {
  const id = e.target.closest('.exercise-info')?.dataset.id;
  const target = e.target.closest('.startBtn');
  const deleteBtn = e.target.closest('.deleteBtn');

  if (target) {
    const type = e.currentTarget.dataset.type;
    renderExerciseById(id, type);
  }

  if (deleteBtn) {
    deleteItem(id);
    renderLocalData(localDataPagination(globalState.activeLocalPage));
  }
});

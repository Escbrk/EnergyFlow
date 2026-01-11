import { exercisePagination } from '../pagination.js';

export const localDataPagination = page => {
  const limit = window.innerWidth <= 767 ? 8 : 12;
  const localData = JSON.parse(localStorage.getItem('favorites')) || [];
  const totalItems = localData.length;
  const totalPages = Math.ceil(totalItems / limit);

  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;

  exercisePagination(page, totalPages);

  return localData.slice(startIdx, endIdx);
};

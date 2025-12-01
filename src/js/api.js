import axios from 'axios';

axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

export const getQuote = async () => {
  const { data } = await axios.get('quote');
  return data;
};

export const getExercise = async (query = 'Muscles', page = 1) => {
  const windowWidth = window.innerWidth;
  let limit = null;

  if (windowWidth <= 767) {
    limit = 8;
  } else {
    limit = 12;
  }

  const { data } = await axios.get(
    `filters?filter=${query}&page=${page}&limit=${limit}`
  );

  return data;
};

export const getExerciseInfo = async (category, query, page = 1) => {
  const windowWidth = window.innerWidth;
  let limit = null;

  if (windowWidth <= 1439) {
    limit = 8;
  } else {
    limit = 9;
  }

  const { data } = await axios.get(
    `exercises?${category}=${query}&page=${page}&limit=${limit}`
  );

  return data;
};


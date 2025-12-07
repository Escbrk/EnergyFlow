import axios from 'axios';

axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

export const getQuote = async () => {
  const { data } = await axios.get('quote');
  return data;
};

let limit;

export const getExercise = async (query = 'Muscles', page = 1) => {
  limit = window.innerWidth <= 767 ? 8 : 12;

  const { data } = await axios.get(
    `filters?filter=${query}&page=${page}&limit=${limit}`
  );

  return data;
};

export const getExerciseInfo = async (
  category,
  query,
  page = 1,
  searchTarget = ''
) => {
  limit = window.innerWidth <= 1439 ? 8 : 9;

  const fixedCategory = category.includes(' ') ? 'bodypart' : category;

  const { data } = await axios.get(
    `exercises?${fixedCategory.toLowerCase()}=${query}&keyword=${searchTarget}&page=${page}&limit=${limit}`
  );

  return data;
};

export const getExerciseById = async id => {
  const { data } = await axios.get(`exercises/${id}`);
  console.log(data)

  return data;
};

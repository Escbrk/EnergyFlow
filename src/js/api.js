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

export const getExerciseInfo = () => {
  const { data } = axios.get(
    `exercises?bodypart=back&muscles=lats&equipment=barbell&keyword=pull&page=1&limit=10`
  );

  return data;
};

import axios from 'axios';

axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

export const getQuote = async () => {
  const { data } = await axios.get('quote');

  return data;
};

export const getExercise = async () => {
  const { data } = await axios.get('filters?filter=Muscles&page=1&limit=12');

  return data;
};

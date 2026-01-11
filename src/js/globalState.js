export const globalState = {
  query: undefined,
  category: '',
  searchTarget: '',
  data: null,
  currentPage: location.pathname.split('/').pop() || 'index.html',
};

export const setActivePage = activePage => {
  const pageListFilterBtn = [...document.querySelectorAll('.pages_list-btn')];

  pageListFilterBtn.forEach(el => {
    const numericPage = parseFloat(el.textContent);
    const currentPage = parseFloat(activePage);

    if (numericPage === currentPage) {
      el.classList.add('active');
      el.disabled = true;
    } else {
      el.classList.remove('active');
      el.disabled = false;
    }
  });
};

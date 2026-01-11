import { refs } from './refs.js';
import spritePath from '../img/svg/sprite.svg';
import { localDataPagination } from './handlers/localDataPagination';
import { globalState } from './globalState.js';
import { renderExercise, renderInfo } from './exercises.js';
import { setActivePage } from './activePage';

let activePage = 1;

export const renderLocalData = localData => {
  const markup = localData
    .map(({ name, bodyPart, burnedCalories, time, target, _id }) => {
      return `
            <li class="exercise-info" data-id=${_id}>
              <button class="startBtn" type="button" >Start
                <svg class="exercise-arrow-icon">
                  <use href="${spritePath}#icon-arrow"></use>
                </svg>
              </button>
             <div class="wrapp">
                <p class="info-label">Workout</p>
                 <button type="button" class="deleteBtn">
                    <svg class="info-delete">
                      <use href="${spritePath}#icon-trash"></use>
                    </svg>
                 </button>
             </div>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${spritePath}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${name}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${burnedCalories} / ${time} min</span></li>
                    <li class="info-item">Body part: <span>${bodyPart}</span></li>
                    <li class="info-item">Target: <span>${target}</span></li>
                  </ul>
            </li>
    `;
    })
    .join('');

  if (refs.favList) {
    refs.favList.innerHTML = markup;
    refs.emptyWrapper.style.display = localData.length === 0 ? 'flex' : 'none';
    setActivePage(activePage);
  }
};

if (globalState.currentPage !== 'index.html') {
  renderLocalData(localDataPagination(activePage));
}

refs.pagination.addEventListener('click', e => {
  if (e.target.classList.contains('pages_list-btn')) {
    const currentPage = parseFloat(e.target.textContent);

    if (isNaN(currentPage)) return;

    const target = document.querySelector('.exercise-info');
    const exerciseSection = document.querySelector('.exercises-section');
    const favWrapper = document.querySelector('.fav-wrapper');

    if (exerciseSection) {
      exerciseSection.scrollIntoView();

      target
        ? renderInfo({
            category: globalState.category,
            query: globalState.query,
            currentPage,
            searchTarget: globalState.searchTarget,
          })
        : renderExercise(globalState.query, currentPage);
    }

    if (favWrapper) {
      favWrapper.scrollIntoView();

      activePage = currentPage;
      renderLocalData(localDataPagination(activePage));
    }
  }
});

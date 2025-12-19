import { refs } from './refs.js';
import spritePath from '../img/svg/sprite.svg';

export const renderLocalData = () => {
  const localData = JSON.parse(localStorage.getItem('Favorites')) || [];
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
  }
};

renderLocalData();

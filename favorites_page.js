import{r as i,s as a,d as p}from"./assets/modal-NorLfKWN.js";import"./assets/vendor-CLTxG5yw.js";const n=JSON.parse(localStorage.getItem("Favorites")),d=()=>{const s=n.map(({name:r,bodyPart:t,burnedCalories:e,time:o,target:l,_id:c})=>`
            <li class="exercise-info" data-id=${c}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${a}#icon-arrow"></use>
                </svg>
              </button>
             <div class="wrapp">
                <p class="info-label">Workout</p>
                 <button type="button">
                    <svg class="info-delete">
                      <use href="${a}#icon-trash"></use>
                    </svg>
                 </button>
             </div>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${a}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${r}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${e} / ${o} min</span></li>
                    <li class="info-item">Body part: <span>${t}</span></li>
                    <li class="info-item">Target: <span>${l}</span></li>
                  </ul>
            </li>
    `).join("");i.favList.innerHTML=s};n&&(d(),i.emptyWrapper.style="display: none");i.favList.addEventListener("click",s=>{if(s.target.closest(".startBtn")){const t=s.target.closest(".exercise-info").dataset.id,e=s.currentTarget.dataset.type;p(t,e)}});
//# sourceMappingURL=favorites_page.js.map

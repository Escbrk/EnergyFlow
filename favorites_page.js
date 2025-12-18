import{s as a,r as i,d as p}from"./assets/modal-BJfMWSnD.js";import"./assets/vendor-CLTxG5yw.js";const d=()=>{const s=JSON.parse(localStorage.getItem("Favorites")),r=s.map(({name:t,bodyPart:e,burnedCalories:n,time:o,target:l,_id:c})=>`
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
                  <h2 class="info-title">${t}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${n} / ${o} min</span></li>
                    <li class="info-item">Body part: <span>${e}</span></li>
                    <li class="info-item">Target: <span>${l}</span></li>
                  </ul>
            </li>
    `).join("");i.favList.innerHTML=r,i.emptyWrapper.style.display=s.length===0?"flex":"none"};d();i.favList.addEventListener("click",s=>{if(s.target.closest(".startBtn")){const t=s.target.closest(".exercise-info").dataset.id,e=s.currentTarget.dataset.type;p(t,e)}});
//# sourceMappingURL=favorites_page.js.map

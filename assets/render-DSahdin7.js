import{i as h}from"./vendor-CLTxG5yw.js";import{r as a,g as S,a as B,b as T}from"./main-DK5qwCDm.js";const g="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",i={query:"",category:"",searchTarget:""},y=(e=0,t=0,s=3)=>{const n=Math.floor(s/2);let r=e-n,l=e+n;r<1&&(r=1,l=s),l>t&&(l=t,r=t-s+1),r<1&&(r=1);const u=[];for(let c=r;c<=l;c++)u.push(c);const o=[];//! Left "..."
if(r>1){o.push(1);//! First page
o.push("...");//! Spacer
}//! Main pages
o.push(...u);//! Right "..."
if(l<t){o.push("...");//! Spacer
o.push(t);//! Last page
}const d=o.map(c=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${c}</button>
            </li>`).join("");a.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(c=>{c.textContent.trim()==="..."&&c.classList.add("disabled")})};a.pagination.addEventListener("click",e=>{if(e.target.classList.contains("pages_list-btn")){const t=parseFloat(e.target.textContent);document.querySelector(".exercise-info")?v({category:i.category,query:i.query,currentPage:t,searchTarget:i.searchTarget}):b(i.query,t)}});const x=e=>{[...document.querySelectorAll(".pages_list-btn")].forEach(s=>{const n=parseFloat(s.textContent),r=parseFloat(e);n===r?(s.classList.add("active"),s.disabled=!0):(s.classList.remove("active"),s.disabled=!1)})},p=e=>e?e[0].toUpperCase()+e.slice(1):"",b=async(e,t)=>{try{const{results:s,totalPages:n,page:r}=await S(e,t),l=s.map(({imgUrl:u,name:o,filter:d})=>`
          <li class="exercise-item" style="--img: url(${u})">
            <h3 class="exercise-subtitle">${p(o)}</h3>
            <p class="exercise-name">${d}</p>
          </li>
          `).join("");a.exerciseList.innerHTML=l,a.categoryContainer.innerHTML="",a.exerciseSearchForm.classList.add("hidden"),document.querySelector(".search-input").value="",y(r,n),x(r)}catch({message:s}){h.error({title:"Error",message:`Failet to fetch exercisec: ${s}`})}},v=async({category:e,query:t,currentPage:s,searchTarget:n})=>{try{const{results:r,totalPages:l,page:u}=await B(e,t,s,n);let o=r.map(({target:c,rating:m,burnedCalories:f,bodyPart:E,time:q,name:w,_id:k})=>{const F=String(m.toFixed(1));return`
            <li class="exercise-info" data-id=${k}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${g}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${F}
                <svg>
                  <use href="${g}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${g}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${w}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${f} / ${q} min</span></li>
                    <li class="info-item">Body part: <span>${p(E)}</span></li>
                    <li class="info-item">Target: <span>${p(c)}</span></li>
                  </ul>
            </li>
    `}).join("");a.categoryContainer.innerHTML=`<span class="exercise-category">${p(i.query)}</span>`;let d;return o.trim()===""?(d=!0,o='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,a.exerciseList.innerHTML=o,d?y():y(u,l),x(u),d}catch(r){console.log(r),h.error({title:"Error",message:"Failed to fetch information about exercises"})}},C=async e=>{try{const{name:t,bodyPart:s,target:n,rating:r,equipment:l,popularity:u,burnedCalories:o,description:d,gifUrl:c}=await T(e),m=String(r.toFixed(1)),f=`
    <div class="modal-window">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${g}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${c}
          alt=${p(t)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${p(t)}</h2>
        <p class="modal-rating">
          ${m}
          <svg>
            <use href="${g}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${p(n)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${p(s)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${p(l)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${u}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${o}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${d}
        </p>

        <ul class="btns-list">
          <li>
            <button type="button" class="favorite-btn">
              Add to favorites
              <svg>
                <use href="${g}#icon-heart"></use>
              </svg>
            </button>
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;a.backdrop.innerHTML=f}catch{h.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{a.backdrop.classList.add("hidden")},0)}},L=document.querySelector(".filter-list"),$=[...L.querySelectorAll("button[data-filter]")];L.addEventListener("click",e=>{const t=e.target.dataset.filter;i.query=e.target.textContent.trim(),t&&($.forEach(s=>{s.classList.remove("active"),s.disabled=!1}),e.target.classList.add("active"),e.target.disabled=!0,b(i.query))});b();a.exerciseList.addEventListener("click",async e=>{const t=e.target.closest(".exercise-item");if(t&&(i.query=t.children[0].textContent.toLowerCase(),i.category=t.children[1].textContent,$.forEach(n=>{n.disabled=!1}),await v({category:i.category,query:i.query}),a.exerciseSearchForm.classList.remove("hidden")),e.target.closest(".startBtn")){const n=e.target.closest(".exercise-info").dataset.id;await C(n),a.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}});a.exerciseSearchForm.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(a.exerciseSearchForm);i.searchTarget=Object.fromEntries(t).search.toLowerCase(),await v({category:i.category,query:i.query,searchTarget:i.searchTarget})||a.exerciseSearchForm.reset()});a.backdrop.addEventListener("click",e=>{(e.target.closest(".close-modal-btn")||e.target.classList.contains("backdrop"))&&(a.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});document.body.addEventListener("keydown",e=>{!a.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(a.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});export{b as renderExercise,C as renderExerciseById,v as renderInfo};
//# sourceMappingURL=render-DSahdin7.js.map

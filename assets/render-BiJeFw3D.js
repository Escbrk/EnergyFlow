import{g as B,s as p,r,a as T,b as C}from"./main-9DL81nUm.js";import{i as f}from"./vendor-CLTxG5yw.js";const o={query:"",category:"",searchTarget:""},g=t=>t?t[0].toUpperCase()+t.slice(1):"",$=t=>{[...document.querySelectorAll(".pages_list-btn")].forEach(s=>{const i=parseFloat(s.textContent),a=parseFloat(t);i===a?(s.classList.add("active"),s.disabled=!0):(s.classList.remove("active"),s.disabled=!1)})},x=async({category:t,query:e,currentPage:s,searchTarget:i})=>{try{const{results:a,totalPages:c,page:u}=await B(t,e,s,i);let n=a.map(({target:l,rating:y,burnedCalories:h,bodyPart:b,time:w,name:q,_id:k})=>{const F=String(y.toFixed(1));return`
            <li class="exercise-info" data-id=${k}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${p}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${F}
                <svg>
                  <use href="${p}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${p}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${q}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${h} / ${w} min</span></li>
                    <li class="info-item">Body part: <span>${g(b)}</span></li>
                    <li class="info-item">Target: <span>${g(l)}</span></li>
                  </ul>
            </li>
    `}).join("");r.categoryContainer.innerHTML=`<span class="exercise-category">${g(o.query)}</span>`;let d;return n.trim()===""?(d=!0,n='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,r.exerciseList.innerHTML=n,d?v():v(u,c),$(u),d}catch(a){console.log(a),f.error({title:"Error",message:"Failed to fetch information about exercises"})}},v=(t=0,e=0,s=3)=>{const i=Math.floor(s/2);let a=t-i,c=t+i;a<1&&(a=1,c=s),c>e&&(c=e,a=e-s+1),a<1&&(a=1);const u=[];for(let l=a;l<=c;l++)u.push(l);const n=[];//! Left "..."
if(a>1){n.push(1);//! First page
n.push("...");//! Spacer
}//! Main pages
n.push(...u);//! Right "..."
if(c<e){n.push("...");//! Spacer
n.push(e);//! Last page
}const d=n.map(l=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${l}</button>
            </li>`).join("");r.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(l=>{l.textContent.trim()==="..."&&l.classList.add("disabled")})};r.pagination.addEventListener("click",t=>{if(t.target.classList.contains("pages_list-btn")){const e=parseFloat(t.target.textContent);document.querySelector(".exercise-info")?x({category:o.category,query:o.query,currentPage:e,searchTarget:o.searchTarget}):L(o.query,e)}});const L=async(t,e)=>{try{const{results:s,totalPages:i,page:a}=await T(t,e),c=s.map(({imgUrl:u,name:n,filter:d})=>`
          <li class="exercise-item" style="--img: url(${u})">
            <h3 class="exercise-subtitle">${g(n)}</h3>
            <p class="exercise-name">${d}</p>
          </li>
          `).join("");r.exerciseList.innerHTML=c,r.categoryContainer.innerHTML="",r.exerciseSearchForm.classList.add("hidden"),document.querySelector(".search-input").value="",v(a,i),$(a)}catch({message:s}){f.error({title:"Error",message:`Failet to fetch exercises: ${s}`})}};f.settings({zindex:999999,position:"bottomRight"});let m;const P=async t=>{try{m=await C(t);const{name:e,bodyPart:s,target:i,rating:a,equipment:c,popularity:u,burnedCalories:n,description:d,gifUrl:l,_id:y}=m,h=String(a.toFixed(1)),b=`
    <div class="modal-window" data-id="${y}">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${p}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${l}
          alt=${g(e)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${g(e)}</h2>
        <p class="modal-rating">
          ${h}
          <svg>
            <use href="${p}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${g(i)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${g(s)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${g(c)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${u}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${n}/3 min</span>
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
                <use href="${p}#icon-heart"></use>
              </svg>
            </button>
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;r.backdrop.innerHTML=b}catch(e){console.log(e),f.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{r.backdrop.classList.add("hidden")},0)}};r.backdrop.addEventListener("click",t=>{const e=t.target.closest(".close-modal-btn");if(t.target.closest(".favorite-btn")){const i=JSON.parse(localStorage.getItem("Favorites"))||[];if(i.some(({_id:c})=>c===m._id)){f.warning({title:"Warning",message:"Already exist in your favorite list"});return}i.push(m),localStorage.setItem("Favorites",JSON.stringify(i)),f.success({title:"Succes",message:"Succesfully added to your favorite list"})}(e||t.target.classList.contains("backdrop"))&&(r.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});const S=document.querySelector(".filter-list"),E=[...S.querySelectorAll("button[data-filter]")];S.addEventListener("click",t=>{const e=t.target.dataset.filter;o.query=t.target.textContent.trim(),e&&(E.forEach(s=>{s.classList.remove("active"),s.disabled=!1}),t.target.classList.add("active"),t.target.disabled=!0,L(o.query))});L();r.exerciseList.addEventListener("click",async t=>{const e=t.target.closest(".exercise-item");if(e&&(o.query=e.children[0].textContent.toLowerCase(),o.category=e.children[1].textContent,E.forEach(i=>{i.disabled=!1}),await x({category:o.category,query:o.query}),r.exerciseSearchForm.classList.remove("hidden")),t.target.closest(".startBtn")){const i=t.target.closest(".exercise-info").dataset.id;await P(i),r.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}});r.exerciseSearchForm.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(r.exerciseSearchForm);o.searchTarget=Object.fromEntries(e).search.toLowerCase(),await x({category:o.category,query:o.query,searchTarget:o.searchTarget})||r.exerciseSearchForm.reset()});document.body.addEventListener("keydown",t=>{!r.backdrop.classList.contains("hidden")&&t.code==="Escape"&&(r.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});
//# sourceMappingURL=render-BiJeFw3D.js.map

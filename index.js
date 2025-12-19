import{r as i,g as r,a as T,c as g,b as B,s as p,d as C}from"./assets/modal-kzpZIIlx.js";import{i as y}from"./assets/vendor-CLTxG5yw.js";const f=(e=0,t=0,s=3)=>{const n=Math.floor(s/2);let a=e-n,l=e+n;a<1&&(a=1,l=s),l>t&&(l=t,a=t-s+1),a<1&&(a=1);const d=[];for(let c=a;c<=l;c++)d.push(c);const o=[];//! Left "..."
if(a>1){o.push(1);//! First page
o.push("...");//! Spacer
}//! Main pages
o.push(...d);//! Right "..."
if(l<t){o.push("...");//! Spacer
o.push(t);//! Last page
}const u=o.map(c=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${c}</button>
            </li>`).join("");i.pagination.innerHTML=u,[...document.querySelectorAll(".pages_list-btn")].forEach(c=>{c.textContent.trim()==="..."&&c.classList.add("disabled")})};i.pagination.addEventListener("click",e=>{if(e.target.classList.contains("pages_list-btn")){const t=parseFloat(e.target.textContent);document.querySelector(".exercise-info")?m({category:r.category,query:r.query,currentPage:t,searchTarget:r.searchTarget}):h(r.query,t)}});const x=e=>{[...document.querySelectorAll(".pages_list-btn")].forEach(s=>{const n=parseFloat(s.textContent),a=parseFloat(e);n===a?(s.classList.add("active"),s.disabled=!0):(s.classList.remove("active"),s.disabled=!1)})},h=async(e,t)=>{try{const{results:s,totalPages:n,page:a}=await T(e,t),l=s.map(({imgUrl:d,name:o,filter:u})=>`
          <li class="exercise-item" style="--img: url(${d})">
            <h3 class="exercise-subtitle">${g(o)}</h3>
            <p class="exercise-name">${u}</p>
          </li>
          `).join("");i.exerciseList.innerHTML=l,i.categoryContainer.innerHTML="",i.exerciseSearchForm.classList.add("hidden"),document.querySelector(".search-input").value="",f(a,n),x(a)}catch({message:s}){y.error({title:"Error",message:`Failet to fetch exercises: ${s}`})}},m=async({category:e,query:t,currentPage:s,searchTarget:n})=>{try{const{results:a,totalPages:l,page:d}=await B(e,t,s,n);let o=a.map(({target:c,rating:v,burnedCalories:q,bodyPart:E,time:$,name:F,_id:S})=>{const w=String(v.toFixed(1));return`
            <li class="exercise-info" data-id=${S}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${p}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${w}
                <svg>
                  <use href="${p}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${p}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${F}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${q} / ${$} min</span></li>
                    <li class="info-item">Body part: <span>${g(E)}</span></li>
                    <li class="info-item">Target: <span>${g(c)}</span></li>
                  </ul>
            </li>
    `}).join("");i.categoryContainer.innerHTML=`<span class="exercise-category">${g(r.query)}</span>`;let u;return o.trim()===""?(u=!0,o='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):u=!1,i.exerciseList.innerHTML=o,u?f():f(d,l),x(d),u}catch(a){console.log(a),y.error({title:"Error",message:"Failed to fetch information about exercises"})}},L=document.querySelector(".filter-list"),b=[...L.querySelectorAll("button[data-filter]")];L.addEventListener("click",e=>{const t=e.target.dataset.filter;r.query=e.target.textContent.trim(),t&&(b.forEach(s=>{s.classList.remove("active"),s.disabled=!1}),e.target.classList.add("active"),e.target.disabled=!0,h(r.query))});h();i.exerciseList.addEventListener("click",async e=>{const t=e.target.closest(".exercise-item");if(t&&(r.query=t.children[0].textContent.toLowerCase(),r.category=t.children[1].textContent,b.forEach(n=>{n.disabled=!1}),await m({category:r.category,query:r.query}),i.exerciseSearchForm.classList.remove("hidden")),e.target.closest(".startBtn")){const n=e.target.closest(".exercise-info").dataset.id,a=e.currentTarget.dataset.type;await C(n,a),i.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}});i.exerciseSearchForm.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(i.exerciseSearchForm);r.searchTarget=Object.fromEntries(t).search.toLowerCase(),await m({category:r.category,query:r.query,searchTarget:r.searchTarget})||i.exerciseSearchForm.reset()});
//# sourceMappingURL=index.js.map

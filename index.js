import{r,g as i,a as B,c as p,b as C,s as f,d as k}from"./assets/modal-Bd_7Yji5.js";import{i as y}from"./assets/vendor-CLTxG5yw.js";const g=(e=0,t=0,s=3)=>{const n=Math.floor(s/2);let a=e-n,l=e+n;a<1&&(a=1,l=s),l>t&&(l=t,a=t-s+1),a<1&&(a=1);const d=[];for(let c=a;c<=l;c++)d.push(c);const o=[];//! Left "..."
if(a>1){o.push(1);//! First page
o.push("...");//! Spacer
}//! Main pages
o.push(...d);//! Right "..."
if(l<t){o.push("...");//! Spacer
o.push(t);//! Last page
}const u=o.map(c=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${c}</button>
            </li>`).join("");r.pagination.innerHTML=u,[...document.querySelectorAll(".pages_list-btn")].forEach(c=>{c.textContent.trim()==="..."&&c.classList.add("disabled")})};r.pagination.addEventListener("click",e=>{if(e.target.classList.contains("pages_list-btn")){const t=parseFloat(e.target.textContent);document.querySelector(".exercise-info")?m({category:i.category,query:i.query,currentPage:t,searchTarget:i.searchTarget}):h(i.query,t)}});const x=e=>{[...document.querySelectorAll(".pages_list-btn")].forEach(s=>{const n=parseFloat(s.textContent),a=parseFloat(e);n===a?(s.classList.add("active"),s.disabled=!0):(s.classList.remove("active"),s.disabled=!1)})},L=()=>'<span class="loader"></span>',h=async(e,t)=>{r.exerciseList.innerHTML=`<li>${L()}</li>`;try{const{results:s,totalPages:n,page:a}=await B(e,t),l=s.map(({imgUrl:d,name:o,filter:u})=>`
          <li class="exercise-item" style="--img: url(${d})">
            <h3 class="exercise-subtitle">${p(o)}</h3>
            <p class="exercise-name">${u}</p>
          </li>
          `).join("");r.exerciseList.innerHTML=l,r.categoryContainer.innerHTML="",r.exerciseSearchForm.classList.add("hidden"),document.querySelector(".search-input").value="",g(a,n),x(a)}catch({message:s}){y.error({title:"Error",message:`Failet to fetch exercises: ${s}`})}},m=async({category:e,query:t,currentPage:s,searchTarget:n})=>{r.exerciseList.innerHTML=`<li>${L()}</li>`;try{const{results:a,totalPages:l,page:d}=await C(e,t,s,n);let o=a.map(({target:c,rating:$,burnedCalories:q,bodyPart:E,time:F,name:S,_id:T})=>{const w=String($.toFixed(1));return`
            <li class="exercise-info" data-id=${T}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${f}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${w}
                <svg>
                  <use href="${f}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${f}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${S}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${q} / ${F} min</span></li>
                    <li class="info-item">Body part: <span>${p(E)}</span></li>
                    <li class="info-item">Target: <span>${p(c)}</span></li>
                  </ul>
            </li>
    `}).join("");r.categoryContainer.innerHTML=`<span class="exercise-category">${p(i.query)}</span>`;let u;return o.trim()===""?(u=!0,o='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):u=!1,r.exerciseList.innerHTML=o,u?g():g(d,l),x(d),u}catch(a){console.log(a),y.error({title:"Error",message:"Failed to fetch information about exercises"})}},b=document.querySelector(".filter-list"),v=[...b.querySelectorAll("button[data-filter]")];b.addEventListener("click",e=>{const t=e.target.dataset.filter;i.query=e.target.textContent.trim(),t&&(v.forEach(s=>{s.classList.remove("active"),s.disabled=!1}),e.target.classList.add("active"),e.target.disabled=!0,g(),h(i.query))});h();r.exerciseList.addEventListener("click",async e=>{const t=e.target.closest(".exercise-item");if(t&&(i.query=t.children[0].textContent.toLowerCase(),i.category=t.children[1].textContent,v.forEach(n=>{n.disabled=!1}),g(),await m({category:i.category,query:i.query}),r.exerciseSearchForm.classList.remove("hidden")),e.target.closest(".startBtn")){const n=e.target.closest(".exercise-info").dataset.id,a=e.currentTarget.dataset.type;await k(n,a),r.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}});r.exerciseSearchForm.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(r.exerciseSearchForm);i.searchTarget=Object.fromEntries(t).search.toLowerCase(),g(),await m({category:i.category,query:i.query,searchTarget:i.searchTarget})||r.exerciseSearchForm.reset()});
//# sourceMappingURL=index.js.map
